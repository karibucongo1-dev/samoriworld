<?php
// kc-flights.php (v2, deployed 2026-11-19). Previous version: deploy-backups/flights-20261119-karibu-kc-flights.php.bak
// Changes: Referer/Origin/Sec-Fetch-Site check, stricter validation, explicit error codes (timeout, rate_limited,
// not_configured, api_error, no_results), currency and search echo in every response, stale-reason on saved fares.
declare(strict_types=1);
@ini_set('display_errors', '0');
@set_time_limit(40);
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

$cfg = require __DIR__ . '/kc-flights-config.php';

function out(array $d, int $code = 200): never {
    http_response_code($code);
    echo json_encode($d, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// Only answer requests from our own pages: Referer or Origin on the allow-list, or a browser-declared same-origin fetch.
// (Headers can be forged by non-browser clients, so the daily and per-IP caps remain the real protection.)
$ref = parse_url($_SERVER['HTTP_REFERER'] ?? '', PHP_URL_HOST) ?: '';
$orig = parse_url($_SERVER['HTTP_ORIGIN'] ?? '', PHP_URL_HOST) ?: '';
$sfs = strtolower((string)($_SERVER['HTTP_SEC_FETCH_SITE'] ?? ''));
$fromUs = ($ref !== '' && in_array($ref, $cfg['allowed_referers'], true)) || ($orig !== '' && in_array($orig, $cfg['allowed_referers'], true)) || $sfs === 'same-origin';
if (!$fromUs) out(['ok' => false, 'error' => 'forbidden'], 403);

$from = strtoupper(trim((string)($_GET['from'] ?? $cfg['origin'])));
$to = strtoupper(trim((string)($_GET['to'] ?? '')));
$date = trim((string)($_GET['date'] ?? ''));
$ret = trim((string)($_GET['return'] ?? ''));
$okDate = fn(string $d) => (bool)preg_match('/^\d{4}-\d{2}-\d{2}$/', $d) && strtotime($d) !== false;
$horizon = strtotime('today') + 86400 * 340;

if (!preg_match('/^[A-Z]{3}$/', $from) || !preg_match('/^[A-Z]{3}$/', $to)) out(['ok' => false, 'error' => 'bad_airport'], 400);
if ($from === $to) out(['ok' => false, 'error' => 'same_airport'], 400);
if ($cfg['allowed_origins'] && !in_array($from, $cfg['allowed_origins'], true)) out(['ok' => false, 'error' => 'origin_not_allowed'], 400);
if ($cfg['allowed_dest'] && !in_array($to, $cfg['allowed_dest'], true)) out(['ok' => false, 'error' => 'destination_not_allowed'], 400);
if (!$okDate($date) || strtotime($date) < strtotime('today')) out(['ok' => false, 'error' => 'bad_date'], 400);
if (strtotime($date) > $horizon) out(['ok' => false, 'error' => 'too_far_ahead'], 400);
if ($ret !== '' && (!$okDate($ret) || strtotime($ret) <= strtotime($date))) out(['ok' => false, 'error' => 'bad_return'], 400);
if ($ret !== '' && strtotime($ret) > $horizon) out(['ok' => false, 'error' => 'too_far_ahead'], 400);

$roundtrip = $ret !== '';
$dir = $cfg['cache_dir'];
if (!is_dir($dir)) { @mkdir($dir, 0750, true); @file_put_contents("$dir/.htaccess", "Require all denied\n"); }

// Aviasales route search (partner link). It runs its own search, so prices there can differ from the fares shown here.
function fallbackLink(array $cfg, string $from, string $to, string $date, string $ret): string {
    $d = date('dm', strtotime($date));
    $r = $ret !== '' ? date('dm', strtotime($ret)) : '';
    return 'https://www.aviasales.com/search/' . $from . $d . $to . $r . '1?marker=' . rawurlencode($cfg['tp_marker']);
}
$fallback = fallbackLink($cfg, $from, $to, $date, $ret);
$ctx = ['trip' => $roundtrip ? 'return' : 'oneway', 'from' => $from, 'to' => $to, 'date' => $date, 'return' => $roundtrip ? $ret : null, 'adults' => 1, 'currency' => $cfg['currency'], 'search_url' => $fallback];

function fail(array $ctx, string $error, int $code, array $extra = []): never { out(['ok' => false, 'error' => $error] + $extra + $ctx, $code); }

$key = md5(implode('|', ['v2', $cfg['site'], $from, $to, $date, $ret, $cfg['currency']]));
$file = "$dir/$key.json";
$ttl = (int)($cfg['cache_hours'] * 3600);
$cached = is_file($file) ? json_decode((string)file_get_contents($file), true) : null;
if (!is_array($cached) || !isset($cached['saved_at'], $cached['fares']) || !is_array($cached['fares']) || !$cached['fares']) $cached = null;

if ($cached && (time() - (int)$cached['saved_at']) < $ttl) {
    out(['ok' => true, 'source' => 'cache', 'checked_at' => (int)$cached['saved_at'], 'fares' => $cached['fares']] + $ctx);
}
function stale(array $ctx, array $cached, string $reason): never {
    out(['ok' => true, 'source' => 'stale', 'stale_reason' => $reason, 'checked_at' => (int)$cached['saved_at'], 'fares' => $cached['fares']] + $ctx);
}

function bump(string $path, int $limit): bool {
    $fp = @fopen($path, 'c+');
    if (!$fp) return true;
    flock($fp, LOCK_EX);
    $n = (int)trim((string)stream_get_contents($fp));
    $ok = $n < $limit;
    if ($ok) { ftruncate($fp, 0); rewind($fp); fwrite($fp, (string)($n + 1)); }
    flock($fp, LOCK_UN); fclose($fp);
    return $ok;
}
if (!is_string($cfg['rapidapi_key'] ?? null) || strlen($cfg['rapidapi_key']) < 20 || str_contains($cfg['rapidapi_key'], 'PASTE_')) {
    if ($cached) stale($ctx, $cached, 'not_configured');
    fail($ctx, 'not_configured', 503);
}
$ip = hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'x');
$overBudget = !bump("$dir/day-" . date('Ymd') . '.count', (int)$cfg['daily_call_cap'])
    || !bump("$dir/ip-" . substr($ip, 0, 16) . '-' . date('YmdH') . '.count', (int)$cfg['per_ip_per_hour']);
if (mt_rand(1, 50) === 1) foreach (glob("$dir/*.count") ?: [] as $f) if (filemtime($f) < time() - 172800) @unlink($f);
if ($overBudget) {
    if ($cached) stale($ctx, $cached, 'rate_limited');
    fail($ctx, 'rate_limited', 429);
}

$body = ['from_airport' => $from, 'to_airport' => $to, 'departure_date' => $date, 'currency' => $cfg['currency'], 'limit' => 8, 'sort_type' => 'Price'];
if ($roundtrip) $body['return_date'] = $ret;

$ch = curl_init('https://' . $cfg['rapidapi_host'] . ($roundtrip ? $cfg['path_roundtrip'] : $cfg['path_oneway']));
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($body),
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'x-rapidapi-key: ' . $cfg['rapidapi_key'],
        'x-rapidapi-host: ' . $cfg['rapidapi_host'],
    ],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 8,
    CURLOPT_TIMEOUT => 25,
]);
$raw = curl_exec($ch);
$http = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
$errno = curl_errno($ch);
curl_close($ch);

$json = is_string($raw) ? json_decode($raw, true) : null;
$fares = [];
if ($http === 200 && is_array($json)) {
    $list = $json;
    foreach (['flights', 'results', 'itineraries', 'data'] as $k) {
        if (isset($json[$k]) && is_array($json[$k])) { $list = $json[$k]; break; }
    }
    foreach ($list as $f) {
        if (!is_array($f) || !isset($f['price'])) continue;
        $price = $f['price_as_number'] ?? (is_array($f['price']) ? ($f['price']['amount'] ?? null) : $f['price']);
        if (!is_numeric($price)) continue;
        $fares[] = [
            'price' => (float)$price,
            'airline' => is_array($f['airline'] ?? null) ? implode(', ', $f['airline']) : (string)($f['airline'] ?? ''),
            'stops' => isset($f['stops']) && is_numeric($f['stops']) ? (int)$f['stops'] : null,
            'duration' => (string)($f['duration'] ?? ''),
            'verdict' => (string)($f['price_range_in_relation_to_other_periods'] ?? $f['price_level'] ?? $f['verdict'] ?? ''),
        ];
    }
    usort($fares, fn($a, $b) => $a['price'] <=> $b['price']);
    $fares = array_slice($fares, 0, 5);
}

if ($fares) {
    $now = time();
    @file_put_contents($file, json_encode(['saved_at' => $now, 'fares' => $fares]), LOCK_EX);
    out(['ok' => true, 'source' => 'live', 'checked_at' => $now, 'fares' => $fares] + $ctx);
}
$reason = $errno === 28 ? 'timeout' : ($http === 429 ? 'rate_limited' : ($http === 200 ? 'no_results' : 'api_error'));
if ($cached) stale($ctx, $cached, $reason);
fail($ctx, $reason, $reason === 'no_results' ? 200 : 502);
