/* kc-stays-widget-test.js (v2 TEST COPY): per-provider status/freshness, adults label, stale-input notice, sort, total/nights average. */
(function () {
'use strict';
var root = document.getElementById('kc-stays');
if (!root || root.getAttribute('data-ready')) return;
root.setAttribute('data-ready', '1');
var dest = (root.getAttribute('data-dest') || '').toLowerCase();
var endpoint = root.getAttribute('data-endpoint') || '/kc-stays.php';
var defNights = parseInt(root.getAttribute('data-nights') || '3', 10) || 3;
var leadDays = parseInt(root.getAttribute('data-lead-days') || '21', 10) || 21;
var css = '' +
    '#kc-stays{max-width:720px;margin:28px auto;font:16px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#1c2430}' +
    '#kc-stays *{box-sizing:border-box}' +
    '#kc-stays .ks-box{border:1px solid #d9dee5;border-radius:14px;padding:18px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.05)}' +
    '#kc-stays h3{margin:0 0 4px;font-size:1.2rem}' +
    '#kc-stays .ks-sub{margin:0 0 14px;color:#5b6675;font-size:.9rem}' +
    '#kc-stays form{display:grid;grid-template-columns:1fr 1fr 110px auto;gap:10px;align-items:end}' +
    '#kc-stays label{display:block;font-size:.78rem;color:#5b6675;margin-bottom:3px}' +
    '#kc-stays input,#kc-stays select{width:100%;padding:9px 10px;border:1px solid #c5ccd6;border-radius:8px;font:inherit;background:#fff}' +
    '#kc-stays button.ks-go{padding:10px 18px;border:0;border-radius:8px;background:#0b5fff;color:#fff;font:inherit;font-weight:600;cursor:pointer}' +
    '#kc-stays button.ks-go[disabled]{opacity:.6;cursor:wait}' +
    '#kc-stays .ks-msg{margin:14px 0 0;color:#5b6675;font-size:.92rem}' +
    '#kc-stays .ks-err{color:#a4261b}' +
    '#kc-stays h4{margin:18px 0 8px;font-size:1rem}' +
    '#kc-stays .ks-list{display:grid;gap:10px}' +
    '#kc-stays .ks-card{display:grid;grid-template-columns:92px 1fr auto;gap:12px;align-items:center;padding:10px;border:1px solid #e3e7ed;border-radius:10px}' +
    '#kc-stays .ks-img{width:92px;height:76px;border-radius:8px;background:#eef1f5;object-fit:cover}' +
    '#kc-stays .ks-name{font-weight:600;font-size:.97rem;margin:0 0 2px}' +
    '#kc-stays .ks-meta{font-size:.82rem;color:#5b6675;margin:0}' +
    '#kc-stays .ks-score{display:inline-block;background:#0b3d91;color:#fff;border-radius:6px;padding:0 6px;font-weight:700;font-size:.8rem;margin-right:6px}' +
    '#kc-stays .ks-price{text-align:right;white-space:nowrap}' +
    '#kc-stays .ks-price b{display:block;font-size:1.1rem}' +
    '#kc-stays .ks-price small{display:block;color:#5b6675;font-size:.74rem}' +
    '#kc-stays a.ks-btn{display:inline-block;margin-top:6px;padding:6px 12px;border-radius:7px;background:#0b5fff;color:#fff;text-decoration:none;font-size:.82rem;font-weight:600}' +
    '#kc-stays a.ks-btn.ks-alt{background:#fff;color:#0b5fff;border:1px solid #0b5fff}' +
    '#kc-stays .ks-more{margin:12px 0 0;font-size:.88rem}' +
    '#kc-stays .ks-note{margin:14px 0 0;font-size:.76rem;color:#6b7686}' +
    '@media(max-width:600px){#kc-stays form{grid-template-columns:1fr 1fr}#kc-stays form .ks-guests,#kc-stays form .ks-submit{grid-column:span 1}#kc-stays .ks-card{grid-template-columns:76px 1fr}#kc-stays .ks-img{width:76px;height:64px}#kc-stays .ks-price{grid-column:1/-1;text-align:left}}';
  css += '#kc-stays .ks-ctx{margin:14px 0 0;font-weight:600;font-size:.92rem}#kc-stays .ks-prov{margin:6px 0 0;font-size:.82rem;color:#5b6675}#kc-stays .ks-prov.ks-bad{color:#a4261b}#kc-stays .ks-sort{margin:10px 0 0;font-size:.85rem}#kc-stays .ks-sort select{width:auto;padding:5px 8px}#kc-stays .ks-stale{margin:8px 0 0;font-size:.82rem;color:#8a5a00}';
css += '/*mobile-fix-v2*/#kc-stays input[type=date]{min-width:0}@media(max-width:600px){#kc-stays input,#kc-stays select,#kc-stays button.ks-go{min-height:44px}#kc-stays a.ks-btn{padding:13px 14px}#kc-stays .ks-box{padding:14px}}@media(max-width:380px){#kc-stays form{grid-template-columns:1fr}}';
var st = document.createElement('style');
st.textContent = css;
document.head.appendChild(st);

function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
function pad(n) { return (n < 10 ? '0' : '') + n; }
function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
function addDays(d, n) { var x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; }
function parseYmd(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
function safeHref(u) { return typeof u === 'string' && /^https:\/\//.test(u) ? u : null; }
function num(v) { return typeof v === 'number' && isFinite(v) ? v : null; }
var money = function (v, cur) {
  if (num(v) == null) return '';
  try { return new Intl.NumberFormat('en-GB', { style: 'currency', currency: cur || 'GBP', maximumFractionDigits: 0 }).format(v); }
  catch (e) { return (cur || '') + ' ' + Math.round(v); }
};
function fmtWhen(iso) {
  if (!iso) return '';
  var t = new Date(iso);
  if (isNaN(t.getTime())) return '';
  return t.toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}
function fmtDay(s) {
  var d = parseYmd(s);
  return isNaN(d.getTime()) ? s : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

var title = root.getAttribute('data-title') || (dest ? dest.replace(/(^|-)([a-z])/g, function (m, a, b) { return a + b.toUpperCase(); }) : 'your destination');
var box = el('div', 'ks-box');
box.appendChild(el('h3', null, 'Stays in ' + title));
box.appendChild(el('p', 'ks-sub', 'Hotel and apartment prices for your dates, from Booking.com and Airbnb.'));

var today = new Date();
var start = addDays(today, leadDays);
var form = el('form');
form.setAttribute('novalidate', '');
function field(labelText, node, cls) {
  var w = el('div', cls || '');
  var l = el('label', null, labelText);
  l.setAttribute('for', node.id);
  w.appendChild(l); w.appendChild(node);
  return w;
}
var inIn = el('input'); inIn.type = 'date'; inIn.id = 'ks-in'; inIn.min = ymd(today); inIn.value = ymd(start);
var inOut = el('input'); inOut.type = 'date'; inOut.id = 'ks-out'; inOut.min = ymd(addDays(today, 1)); inOut.value = ymd(addDays(start, defNights));
var sel = el('select'); sel.id = 'ks-guests';
for (var g = 1; g <= 6; g++) { var o = el('option', null, g + (g === 1 ? ' adult' : ' adults')); o.value = String(g); if (g === 2) o.selected = true; sel.appendChild(o); }
var go = el('button', 'ks-go', 'Search'); go.type = 'submit';
form.appendChild(field('Check-in', inIn));
form.appendChild(field('Check-out', inOut));
form.appendChild(field('Adults', sel, 'ks-guests'));
var sw = el('div', 'ks-submit'); sw.appendChild(go); form.appendChild(sw);
box.appendChild(form);

var msg = el('p', 'ks-msg', 'Pick your dates and press Search.');
msg.setAttribute('role', 'status');
msg.setAttribute('aria-live', 'polite');
box.appendChild(msg);
var stale = el('p', 'ks-stale');
stale.hidden = true;
box.appendChild(stale);
var results = el('div');
box.appendChild(results);
root.appendChild(box);

var lastData = null, sortMode = 'default', reqSeq = 0, ctl = null;

function markStale() {
  if (!lastData) return;
  var same = inIn.value === lastData.checkin && inOut.value === lastData.checkout && sel.value === String(lastData.adults);
  stale.hidden = same;
  if (!same) stale.textContent = 'You changed the search. The results below are still for ' + fmtDay(lastData.checkin) + ' to ' + fmtDay(lastData.checkout) + ', ' + lastData.adults + (lastData.adults === 1 ? ' adult' : ' adults') + '. Press Search to update.';
}
inIn.addEventListener('change', function () {
  if (inIn.value) {
    var d = parseYmd(inIn.value);
    inOut.min = ymd(addDays(d, 1));
    if (!inOut.value || parseYmd(inOut.value) <= d) inOut.value = ymd(addDays(d, defNights));
  }
  markStale();
});
inOut.addEventListener('change', markStale);
sel.addEventListener('change', markStale);

function setMsg(text, isErr) { msg.textContent = text; msg.className = 'ks-msg' + (isErr ? ' ks-err' : ''); }

function card(item, kind, cur, nights) {
  var c = el('div', 'ks-card');
  var img = el('img', 'ks-img');
  img.alt = ''; img.loading = 'lazy'; img.referrerPolicy = 'no-referrer'; img.width = 92; img.height = 76;
  if (item.image) { img.src = item.image; img.onerror = function () { img.style.visibility = 'hidden'; }; } else { img.style.visibility = 'hidden'; }
  c.appendChild(img);
  var mid = el('div');
  mid.appendChild(el('p', 'ks-name', item.name));
  var meta = el('p', 'ks-meta');
  if (kind === 'hotel') {
    if (num(item.score) != null) { var sc = el('span', 'ks-score', item.score + '/10'); sc.title = 'Booking.com guest score, out of 10'; meta.appendChild(sc); }
    var bits = [];
    if (num(item.reviews) != null) bits.push(item.reviews.toLocaleString('en-GB') + ' reviews');
    if (item.area) bits.push(item.area);
    meta.appendChild(document.createTextNode(bits.join(' · ')));
    mid.appendChild(meta);
    if (item.room) mid.appendChild(el('p', 'ks-meta', item.room.length > 70 ? item.room.slice(0, 67) + '...' : item.room));
  } else {
    var b2 = [];
    if (num(item.rating) != null) b2.push('★ ' + item.rating + '/5 Airbnb' + (num(item.reviews) != null ? ' (' + item.reviews + ')' : ''));
    if (item.type) b2.push(item.type);
    if (num(item.bedrooms) != null) b2.push(item.bedrooms + (item.bedrooms === 1 ? ' bedroom' : ' bedrooms'));
    meta.textContent = b2.join(' · ');
    mid.appendChild(meta);
  }
  c.appendChild(mid);
  var pr = el('div', 'ks-price');
  pr.appendChild(el('b', null, money(item.price, cur)));
  pr.appendChild(el('small', null, 'total, ' + nights + (nights === 1 ? ' night' : ' nights')));
  if (kind === 'stay' && num(item.avg_night) != null && nights > 1) pr.appendChild(el('small', null, 'avg ' + money(item.avg_night, cur) + ' / night'));
  var href = safeHref(item.link);
  if (href) {
    var a = el('a', 'ks-btn' + (kind === 'stay' ? ' ks-alt' : ''), kind === 'hotel' ? 'View on Booking.com' : 'View on Airbnb');
    a.href = href; a.target = '_blank'; a.rel = 'noopener nofollow sponsored';
    pr.appendChild(a);
  }
  c.appendChild(pr);
  return c;
}

var failText = {
  timeout: 'did not respond in time.',
  rate_limited: 'search limit reached for now. Please try again later.',
  cap: 'is temporarily unavailable.',
  error: 'is unavailable right now.'
};
function provLine(label, p, linkHref, linkText) {
  if (!p || p.status === 'off') return null;
  var good = (p.status === 'ok' || p.status === 'empty') && !p.stale;
  var when = fmtWhen(p.fetched_at);
  var t, bad = false;
  if (p.status === 'ok') t = label + ': ' + (p.cached ? 'recently checked' : 'checked') + (when ? ' ' + when : '') + (p.cached ? ' (saved result)' : '') + '.';
  else if (p.status === 'empty') t = label + ': no results found for these dates' + (when ? ' (checked ' + when + ')' : '') + '.';
  else if (p.stale) { t = label + ': could not refresh, so these are older saved prices' + (when ? ' from ' + when : '') + '.'; bad = true; }
  else { t = label + ' ' + (failText[p.status] || failText.error); bad = true; }
  var line = el('p', 'ks-prov' + (bad ? ' ks-bad' : ''), t);
  if (bad && !p.stale && linkHref) { line.appendChild(document.createTextNode(' ')); var a = el('a', null, linkText); a.href = linkHref; a.target = '_blank'; a.rel = 'noopener nofollow'; line.appendChild(a); }
  return line;
}
function byPrice(arr) { return arr.slice().sort(function (a, b) { return (num(a.price) == null ? 1e12 : a.price) - (num(b.price) == null ? 1e12 : b.price); }); }

function render(d) {
  lastData = d;
  stale.hidden = true;
  results.textContent = '';
  var cur = d.currency, any = false;
  var bl = d.links && safeHref(d.links.booking), al = d.links && safeHref(d.links.airbnb);
  var ctx = el('p', 'ks-ctx', (d.destination || title) + ': ' + fmtDay(d.checkin) + ' to ' + fmtDay(d.checkout) + ' · ' + d.nights + (d.nights === 1 ? ' night' : ' nights') + ' · ' + d.adults + (d.adults === 1 ? ' adult' : ' adults'));
  results.appendChild(ctx);
  var pb = provLine('Booking.com', d.providers && d.providers.booking, bl, 'Search on Booking.com');
  var pa = provLine('Airbnb', d.providers && d.providers.airbnb, al, 'Search on Airbnb');
  if (pb) results.appendChild(pb);
  if (pa) results.appendChild(pa);
  var hotels = d.hotels || [], stays = d.stays || [];
  if (hotels.length || stays.length) {
    var sw2 = el('div', 'ks-sort');
    var sl = el('label', null, 'Sort: '); sl.setAttribute('for', 'ks-sort');
    sl.style.display = 'inline';
    var ss = el('select'); ss.id = 'ks-sort';
    [['default', 'Provider order'], ['price', 'Lowest total price']].forEach(function (o2) { var op = el('option', null, o2[1]); op.value = o2[0]; if (o2[0] === sortMode) op.selected = true; ss.appendChild(op); });
    ss.addEventListener('change', function () { sortMode = ss.value; render(lastData); document.getElementById('ks-sort').focus(); });
    sw2.appendChild(sl); sw2.appendChild(ss);
    results.appendChild(sw2);
  }
  if (hotels.length) {
    any = true;
    results.appendChild(el('h4', null, 'Hotels (Booking.com)'));
    var l1 = el('div', 'ks-list');
    (sortMode === 'price' ? byPrice(hotels) : hotels).forEach(function (h) { l1.appendChild(card(h, 'hotel', cur, d.nights)); });
    results.appendChild(l1);
  }
  if (stays.length) {
    any = true;
    results.appendChild(el('h4', null, 'Apartments and homes (Airbnb)'));
    var l2 = el('div', 'ks-list');
    (sortMode === 'price' ? byPrice(stays) : stays).forEach(function (s) { l2.appendChild(card(s, 'stay', cur, d.nights)); });
    results.appendChild(l2);
  }
  var more = el('p', 'ks-more');
  if (bl) { var a1 = el('a', null, 'See all hotels on Booking.com'); a1.href = bl; a1.target = '_blank'; a1.rel = 'noopener nofollow sponsored'; more.appendChild(a1); }
  if (bl && al) more.appendChild(document.createTextNode(' · '));
  if (al) { var a2 = el('a', null, 'See all homes on Airbnb'); a2.href = al; a2.target = '_blank'; a2.rel = 'noopener nofollow'; more.appendChild(a2); }
  results.appendChild(more);
  var note = 'Prices are totals for ' + d.nights + (d.nights === 1 ? ' night' : ' nights') + ' for ' + d.adults + (d.adults === 1 ? ' adult' : ' adults') +
    ' at the times shown above. Totals and rooms can change quickly and taxes, fees and cancellation terms can differ between providers, so confirm the room, final price and terms on Booking.com or Airbnb. You book and pay with the provider, not on Samori World.';
  if (d.affiliate) note += ' We may earn a commission if you book through our Booking.com links, at no extra cost to you.';
  results.appendChild(el('p', 'ks-note', note));
  setMsg(any ? 'Results updated for ' + (d.destination || title) + '.' : 'No stays found for those dates.', false);
}

var errText = {
  rate_limited: 'You have searched a lot in the last hour. Please try again a little later.',
  unavailable: 'Prices are not available right now.',
  not_configured: 'Stay search is not set up yet.',
  too_many_nights: 'Please choose a stay of 14 nights or fewer.',
  too_far_ahead: 'Please choose dates within the next 11 months.',
  bad_checkin: 'Please choose a check-in date that is today or later.',
  bad_checkout: 'Check-out must be after check-in.'
};

form.addEventListener('submit', function (ev) {
  ev.preventDefault();
  if (go.disabled) return;
  if (!inIn.value || !inOut.value) { setMsg('Please choose both dates.', true); return; }
  if (parseYmd(inOut.value) <= parseYmd(inIn.value)) { setMsg('Check-out must be after check-in.', true); return; }
  var qs = 'dest=' + encodeURIComponent(dest) + '&checkin=' + encodeURIComponent(inIn.value) +
    '&checkout=' + encodeURIComponent(inOut.value) + '&adults=' + encodeURIComponent(sel.value);
  var my = ++reqSeq;
  if (ctl) { try { ctl.abort(); } catch (e) {} }
  go.disabled = true; go.textContent = 'Searching...';
  stale.hidden = true;
  results.textContent = '';
  setMsg('Checking Booking.com and Airbnb for your dates. This can take up to a minute.', false);
  ctl = ('AbortController' in window) ? new AbortController() : null;
  var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 50000);
  fetch(endpoint + '?' + qs, { credentials: 'omit', signal: ctl ? ctl.signal : undefined })
    .then(function (r) { return r.json().catch(function () { return { ok: false, error: 'unavailable' }; }); })
    .then(function (d) {
      if (my !== reqSeq) return;
      if (d && d.ok) { render(d); return; }
      setMsg((d && errText[d.error]) || 'Something went wrong. Please try again.', true);
      if (d && d.links) {
        var more = el('p', 'ks-more');
        var bl = safeHref(d.links.booking), al = safeHref(d.links.airbnb);
        if (bl) { var a1 = el('a', null, 'Search on Booking.com'); a1.href = bl; a1.target = '_blank'; a1.rel = 'noopener nofollow sponsored'; more.appendChild(a1); }
        if (bl && al) more.appendChild(document.createTextNode(' · '));
        if (al) { var a2 = el('a', null, 'Search on Airbnb'); a2.href = al; a2.target = '_blank'; a2.rel = 'noopener nofollow'; more.appendChild(a2); }
        results.appendChild(more);
      }
    })
    .catch(function () { if (my === reqSeq) setMsg('Could not reach the price service, or it took too long. Please try again.', true); })
    .then(function () { clearTimeout(timer); if (my === reqSeq) { go.disabled = false; go.textContent = 'Search'; } });
});
})();
