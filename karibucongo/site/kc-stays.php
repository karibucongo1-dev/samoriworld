<?php
// kc-stays.php (v2, deployed 2026-11-19). Previous version backed up in deploy-backups/karibucongo-20261119-kc-stays.php.bak
// Changes: per-provider cache, status and fetched_at; partial failures are never cached as complete;
// provider per-night figure replaced by avg_night = total / nights; config version in cache key.
declare(strict_types=1);
@ini_set('display_errors', '0');
@set_time_limit(50);
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');
$cfg = require __DIR__ . '/kc-stays-config.php';

function out(array $d, int $code = 200): never {
    http_response_code($code);
    echo json_encode($d, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// Only answer requests from our own pages: Referer or Origin on the allow-list, or a browser-declared same-origin fetch.
// (Headers can be forged by non-browser clients, so the hourly limit and daily caps remain the real protection.)
$ref = parse_url($_SERVER['HTTP_REFERER'] ?? '', PHP_URL_HOST) ?: '';
$orig = parse_url($_SERVER['HTTP_ORIGIN'] ?? '', PHP_URL_HOST) ?: '';
$sfs = strtolower((string)($_SERVER['HTTP_SEC_FETCH_SITE'] ?? ''));
$fromUs = ($ref !== '' && in_array($ref, $cfg['allowed_referers'], true)) || ($orig !== '' && in_array($orig, $cfg['allowed_referers'], true)) || $sfs === 'same-origin';
if (!$fromUs) out(['ok' => false, 'error' => 'forbidden'], 403);

if (!is_string($cfg['rapidapi_key'] ?? null) || strlen($cfg['rapidapi_key']) < 20 || str_starts_with($cfg['rapidapi_key'], 'PASTE_')) {
    out(['ok' => false, 'error' => 'not_configured'], 503);
}

$slug = strtolower(trim((string)($_GET['dest'] ?? '')));
$ci = trim((string)($_GET['checkin'] ?? ''));
$co = trim((string)($_GET['checkout'] ?? ''));
$adults = max(1, min(6, (int)($_GET['adults'] ?? 2)));
$okDate = fn(string $d) => (bool)preg_match('/^\d{4}-\d{2}-\d{2}$/', $d) && strtotime($d) !== false;

if (!isset($cfg['allowed_dest'][$slug])) out(['ok' => false, 'error' => 'destination_not_allowed'], 400);
$destName = $cfg['allowed_dest'][$slug];
if (!$okDate($ci) || strtotime($ci) < strtotime('today')) out(['ok' => false, 'error' => 'bad_checkin'], 400);
if (strtotime($ci) > strtotime('today') + 86400 * (int)$cfg['max_days_ahead']) out(['ok' => false, 'error' => 'too_far_ahead'], 400);
if (!$okDate($co) || strtotime($co) <= strtotime($ci)) out(['ok' => false, 'error' => 'bad_checkout'], 400);
$nights = (int)round((strtotime($co) - strtotime($ci)) / 86400);
if ($nights > (int)$cfg['max_nights']) out(['ok' => false, 'error' => 'too_many_nights', 'max_nights' => (int)$cfg['max_nights']], 400);

$dir = $cfg['cache_dir'];
if (!is_dir($dir)) { @mkdir($dir, 0750, true); @file_put_contents("$dir/.htaccess", "Require all denied\n"); }

function hostIs(string $host, string $domain): bool {
    $host = strtolower($host);
    return $host === $domain || str_ends_with($host, '.' . $domain);
}
function cleanBookingLink(?string $url, string $ci, string $co, int $adults): ?string {
    if (!$url) return null;
    $p = parse_url($url);
    if (!$p || ($p['scheme'] ?? '') !== 'https' || !hostIs($p['host'] ?? '', 'booking.com') || empty($p['path'])) return null;
    return 'https://www.booking.com' . $p['path'] . '?' . http_build_query([
        'checkin' => $ci, 'checkout' => $co, 'group_adults' => $adults, 'no_rooms' => 1, 'group_children' => 0,
    ]);
}
function cleanAirbnbLink(?string $url, string $ci, string $co, int $adults): ?string {
    if (!$url) return null;
    $p = parse_url($url);
    if (!$p || ($p['scheme'] ?? '') !== 'https' || !hostIs($p['host'] ?? '', 'airbnb.com') || !preg_match('#^/rooms/\d+$#', $p['path'] ?? '')) return null;
    return 'https://www.airbnb.com' . $p['path'] . '?' . http_build_query(['check_in' => $ci, 'check_out' => $co, 'adults' => $adults]);
}
function cleanImage(?string $url): ?string {
    if (!$url) return null;
    $p = parse_url($url);
    if (!$p || ($p['scheme'] ?? '') !== 'https') return null;
    $h = $p['host'] ?? '';
    return (hostIs($h, 'bstatic.com') || hostIs($h, 'muscache.com')) ? $url : null;
}
function affiliateBooking(array $cfg, ?string $clean, string $slug): ?string {
    if (!$clean) return null;
    $a = $cfg['booking_affiliate'] ?? ['mode' => 'off'];
    $mode = $a['mode'] ?? 'off';
    if ($mode === 'aid' && preg_match('/^\d{4,12}$/', (string)($a['aid'] ?? ''))) {
        return $clean . '&aid=' . $a['aid'] . '&label=' . rawurlencode('samori-stays-' . $slug);
    }
    if ($mode === 'prefix' && str_starts_with((string)($a['prefix'] ?? ''), 'https://')) {
        return $a['prefix'] . rawurlencode($clean);
    }
    return $clean;
}
function numOrNull(mixed $v): int|float|null { return is_numeric($v) ? $v + 0 : null; }
function strOrNull(mixed $v, int $max = 200): ?string {
    return is_string($v) && $v !== '' ? mb_substr($v, 0, $max) : null;
}
function bump(string $file, int $limit): bool {
    $fp = @fopen($file, 'c+');
    if (!$fp) return true;
    flock($fp, LOCK_EX);
    $n = (int)trim((string)stream_get_contents($fp));
    $ok = $n < $limit;
    if ($ok) { ftruncate($fp, 0); rewind($fp); fwrite($fp, (string)($n + 1)); }
    flock($fp, LOCK_UN); fclose($fp);
    return $ok;
}
function visitorOk(string $dir, string $salt, int $limit): bool {
    $ip = $_SERVER['REMOTE_ADDR'] ?? '0';
    $file = "$dir/stays-rl-" . substr(hash('sha256', $salt . $ip), 0, 24) . '.json';
    $fp = @fopen($file, 'c+');
    if (!$fp) return true;
    flock($fp, LOCK_EX);
    $times = json_decode((string)stream_get_contents($fp), true);
    $times = array_values(array_filter(is_array($times) ? $times : [], fn($t) => is_int($t) && $t > time() - 3600));
    $ok = count($times) < $limit;
    if ($ok) $times[] = time();
    ftruncate($fp, 0); rewind($fp); fwrite($fp, json_encode($times));
    flock($fp, LOCK_UN); fclose($fp);
    return $ok;
}
function normBooking(array $rows, array $cfg, string $slug, string $ci, string $co, int $adults): array {
    $hotels = [];
    $areaRe = $cfg['area_match'][$slug] ?? null;
    foreach ($rows as $r) {
        if (!is_array($r) || !is_numeric($r['price'] ?? null)) continue;
        $name = strOrNull($r['name'] ?? null);
        if ($areaRe && !preg_match($areaRe, (string)($r['location'] ?? ''))) continue;
        $link = cleanBookingLink($r['link'] ?? null, $ci, $co, $adults);
        if (!$name || !$link) continue;
        $hotels[] = [
            'name' => $name, 'price' => numOrNull($r['price']), 'score' => numOrNull($r['review_score'] ?? null),
            'reviews' => numOrNull($r['review_count'] ?? null), 'room' => strOrNull($r['room_type'] ?? null, 90),
            'area' => strOrNull($r['location'] ?? null, 80), 'image' => cleanImage($r['image_url'] ?? null), 'link' => $link,
        ];
        if (count($hotels) >= (int)$cfg['max_hotels']) break;
    }
    return $hotels;
}
function normAirbnb(array $rows, array $cfg, string $slug, string $ci, string $co, int $adults, int $nights): array {
    $stays = [];
    foreach ($rows as $r) {
        if (!is_array($r) || !is_numeric($r['price_total'] ?? ($r['price'] ?? null))) continue;
        if (($r['available'] ?? true) === false) continue;
        $g = $cfg['geo'][$slug] ?? null;
        if ($g) {
            $la = $r['latitude'] ?? null; $lo = $r['longitude'] ?? null;
            if (!is_numeric($la) || !is_numeric($lo)) continue;
            $dLat = deg2rad((float)$la - $g[0]); $dLon = deg2rad((float)$lo - $g[1]);
            $h = sin($dLat / 2) ** 2 + cos(deg2rad($g[0])) * cos(deg2rad((float)$la)) * sin($dLon / 2) ** 2;
            if (6371 * 2 * asin(min(1, sqrt($h))) > $g[2]) continue;
        }
        $name = strOrNull($r['name'] ?? null);
        $link = cleanAirbnbLink($r['link'] ?? null, $ci, $co, $adults);
        if (!$name || !$link) continue;
        $total = numOrNull($r['price_total'] ?? $r['price']);
        $stays[] = [
            'name' => $name, 'price' => $total, 'avg_night' => $total !== null && $nights > 0 ? round($total / $nights, 2) : null,
            'was' => numOrNull($r['price_original_total'] ?? null),
            'rating' => numOrNull($r['rating'] ?? ($r['review_score'] ?? null)), 'reviews' => numOrNull($r['review_count'] ?? null),
            'type' => strOrNull($r['room_type'] ?? null, 40), 'bedrooms' => numOrNull($r['bedrooms'] ?? null), 'beds' => numOrNull($r['beds'] ?? null),
            'image' => cleanImage($r['image_url'] ?? null), 'link' => $link,
        ];
        if (count($stays) >= (int)$cfg['max_stays']) break;
    }
    return $stays;
}
function readCache(string $file, int $ttl, int $emptyTtl): array {
    if (!is_file($file)) return [null, false];
    $d = json_decode((string)@file_get_contents($file), true);
    if (!is_array($d) || !isset($d['rows'], $d['fetched_at']) || !is_array($d['rows'])) return [null, false];
    $limit = $d['rows'] ? $ttl : $emptyTtl;
    return [$d, (time() - (int)filemtime($file)) < $limit];
}
function fallbackRes(?array $c, string $status): array {
    $has = is_array($c) && !empty($c['rows']);
    return ['status' => $status, 'fetched_at' => $has ? $c['fetched_at'] : null, 'cached' => $has, 'stale' => $has, 'rows' => $has ? $c['rows'] : []];
}

$links = [
    'booking' => affiliateBooking($cfg, 'https://www.booking.com/searchresults.html?' . http_build_query([
        'ss' => $destName, 'checkin' => $ci, 'checkout' => $co, 'group_adults' => $adults, 'no_rooms' => 1, 'group_children' => 0,
    ]), $slug),
    'airbnb' => 'https://www.airbnb.com/s/' . rawurlencode(str_replace(', ', '--', $destName)) . '/homes?' . http_build_query([
        'checkin' => $ci, 'checkout' => $co, 'adults' => $adults,
    ]),
];

$cfgVer = substr(md5(json_encode([$cfg['area_match'][$slug] ?? null, $cfg['geo'][$slug] ?? null, (int)$cfg['max_hotels'], (int)$cfg['max_stays'], $cfg['skip_booking'] ?? []])), 0, 8);
$ttl = (int)($cfg['cache_hours'] * 3600);
$emptyTtl = min($ttl, 1800);
$today = date('Ymd');
$bodyCommon = ['destination' => $destName, 'checkin_date' => $ci, 'checkout_date' => $co, 'adults' => $adults, 'currency' => $cfg['currency']];

$defs = [];
if (!empty($cfg['use_booking']) && !in_array($slug, $cfg['skip_booking'] ?? [], true)) {
    $defs['booking'] = ['host' => 'booking-live-api.p.rapidapi.com', 'body' => $bodyCommon + ['children' => 0], 'cap' => (int)$cfg['daily_cap_booking']];
}
if (!empty($cfg['use_airbnb'])) {
    $defs['airbnb'] = ['host' => 'airbnb-live-api.p.rapidapi.com', 'body' => $bodyCommon, 'cap' => (int)$cfg['daily_cap_airbnb']];
}

$res = [];
$need = [];
foreach ($defs as $name => $p) {
    $file = "$dir/stays2-$name-" . md5(implode('|', ['v2', $cfg['site'], $name, $slug, $ci, $co, $adults, $cfg['currency'], $cfgVer])) . '.json';
    [$c, $fresh] = readCache($file, $ttl, $emptyTtl);
    $defs[$name]['file'] = $file;
    $defs[$name]['cache'] = $c;
    if ($fresh) {
        $res[$name] = ['status' => $c['rows'] ? 'ok' : 'empty', 'fetched_at' => $c['fetched_at'], 'cached' => true, 'stale' => false, 'rows' => $c['rows']];
    } else {
        $need[] = $name;
    }
}

if ($need) {
    $limited = !visitorOk($dir, (string)$cfg['site'], (int)$cfg['per_visitor_per_hour']);
    $mh = curl_multi_init();
    $handles = [];
    foreach ($need as $name) {
        $p = $defs[$name];
        if ($limited) { $res[$name] = fallbackRes($p['cache'], 'rate_limited'); continue; }
        if (!bump("$dir/stays-cap-$name-$today.txt", $p['cap'])) { $res[$name] = fallbackRes($p['cache'], 'cap'); continue; }
        $ch = curl_init('https://' . $p['host'] . '/search');
        curl_setopt_array($ch, [
            CURLOPT_POST => true, CURLOPT_POSTFIELDS => json_encode($p['body']), CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CONNECTTIMEOUT => 8, CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json', 'Accept: application/json',
                'x-rapidapi-key: ' . $cfg['rapidapi_key'], 'x-rapidapi-host: ' . $p['host'],
            ],
        ]);
        curl_multi_add_handle($mh, $ch);
        $handles[$name] = $ch;
    }
    if ($handles) {
        do {
            $mrc = curl_multi_exec($mh, $active);
            if ($active) curl_multi_select($mh, 1.0);
        } while ($active && $mrc === CURLM_OK);
    }
    foreach ($handles as $name => $ch) {
        $body = curl_multi_getcontent($ch);
        $code = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $errno = curl_errno($ch);
        curl_multi_remove_handle($mh, $ch);
        curl_close($ch);
        $p = $defs[$name];
        $j = $code === 200 && is_string($body) ? json_decode($body, true) : null;
        if (is_array($j) && isset($j['properties']) && is_array($j['properties'])) {
            $rows = $name === 'booking'
                ? normBooking($j['properties'], $cfg, $slug, $ci, $co, $adults)
                : normAirbnb($j['properties'], $cfg, $slug, $ci, $co, $adults, $nights);
            $now = gmdate('c');
            @file_put_contents($p['file'], json_encode(['fetched_at' => $now, 'rows' => $rows], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), LOCK_EX);
            $res[$name] = ['status' => $rows ? 'ok' : 'empty', 'fetched_at' => $now, 'cached' => false, 'stale' => false, 'rows' => $rows];
        } else {
            $st = $errno === 28 ? 'timeout' : ($code === 429 ? 'rate_limited' : 'error');
            $res[$name] = fallbackRes($p['cache'], $st);
        }
    }
    curl_multi_close($mh);
}

$hotels = $res['booking']['rows'] ?? [];
foreach ($hotels as &$h) { $h['link'] = affiliateBooking($cfg, $h['link'] ?? null, $slug); }
unset($h);
$stays = $res['airbnb']['rows'] ?? [];

$prov = [];
$times = [];
$anyCached = false; $anyStale = false; $anyGood = false;
foreach (['booking', 'airbnb'] as $n) {
    if (!isset($res[$n])) { $prov[$n] = ['status' => 'off', 'fetched_at' => null, 'cached' => false, 'stale' => false, 'count' => 0]; continue; }
    $r = $res[$n];
    $prov[$n] = ['status' => $r['status'], 'fetched_at' => $r['fetched_at'], 'cached' => $r['cached'], 'stale' => $r['stale'], 'count' => count($r['rows'])];
    if ($r['fetched_at']) $times[] = $r['fetched_at'];
    $anyCached = $anyCached || $r['cached'];
    $anyStale = $anyStale || $r['stale'];
    $anyGood = $anyGood || in_array($r['status'], ['ok', 'empty'], true) || $r['stale'];
}
if (!$anyGood) out(['ok' => false, 'error' => 'unavailable', 'providers' => $prov, 'links' => $links], 502);
sort($times);
out([
    'ok' => true, 'dest' => $slug, 'destination' => $destName, 'checkin' => $ci, 'checkout' => $co, 'nights' => $nights,
    'adults' => $adults, 'currency' => $cfg['currency'], 'fetched_at' => $times[0] ?? null,
    'providers' => $prov, 'hotels' => $hotels, 'stays' => $stays, 'links' => $links,
    'affiliate' => ($cfg['booking_affiliate']['mode'] ?? 'off') !== 'off', 'cached' => $anyCached, 'stale' => $anyStale,
]);
