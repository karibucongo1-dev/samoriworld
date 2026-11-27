/* kc-flights-widget.js (v2, deployed 2026-11-19; previous version in deploy-backups).
Usage: <div id="kc-flights" data-origin="LHR" data-dest="DOH"></div><script src="/kc-flights-widget.js" defer></script>
Optional: data-api="/kc-flights.php". With data-dest the destination is fixed (guide pages); without it a selector is shown. */
(function () {
'use strict';
function kcInit(early) {
  var root = document.getElementById('kc-flights');
  if (!root) {
    if (early) return; // never inject into hydrating pages before load
    if (!/\/flights\/?$/.test(location.pathname)) return;
    var secs = [].slice.call(document.querySelectorAll('main section'));
    var anchor = secs.filter(function (s) { return /Popular Routes/.test(s.textContent || ''); })[0];
    if (!anchor) return;
    root = document.createElement('div'); root.id = 'kc-flights';
    anchor.parentNode.insertBefore(root, anchor);
  }
  if (root.getAttribute('data-ready')) return;
  root.setAttribute('data-ready', '1');

  var ORIGIN = root.dataset.origin || 'LHR';
  var API = root.dataset.api || '/kc-flights.php';
  var FIXED = (root.dataset.dest || '').toUpperCase();
  var DEST = {
    FIH: 'Kinshasa (FIH)', FBM: 'Lubumbashi (FBM)', BZV: 'Brazzaville (BZV)',
    PNR: 'Pointe-Noire (PNR)', GOM: 'Goma (GOM)', FKI: 'Kisangani (FKI)',
    MJM: 'Mbuji-Mayi (MJM)', KGA: 'Kananga (KGA)'
  };
  var ORIG = { LHR: 'London Heathrow', LGW: 'London Gatwick', CDG: 'Paris CDG', BRU: 'Brussels', AMS: 'Amsterdam', JNB: 'Johannesburg', NBO: 'Nairobi', ADD: 'Addis Ababa' };

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function addDays(d, n) { var x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; }
  function parseYmd(s) { var p = String(s).split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function fmtDay(s) { var d = parseYmd(s); return isNaN(d.getTime()) ? String(s) : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); }
  function num(v) { return typeof v === 'number' && isFinite(v) ? v : null; }
  function money(v, cur) {
    if (num(v) == null) return '';
    var up = Math.ceil(v - 1e-9);
    var c = String(cur || '').toUpperCase();
    try { return new Intl.NumberFormat('en-GB', { style: 'currency', currency: c || 'GBP', maximumFractionDigits: 0 }).format(up); }
    catch (e) { return (c ? c + ' ' : '') + up.toLocaleString('en-GB'); }
  }
  function mins(s) {
    var m = /(\d+)\s*h(?:\D+(\d+)\s*m)?/i.exec(s || '');
    if (m) return (+m[1]) * 60 + (+m[2] || 0);
    var m2 = /(\d+)\s*m/i.exec(s || '');
    return m2 ? +m2[1] : null;
  }

  if (!document.getElementById('kc-flights-style')) {
    var st = document.createElement('style'); st.id = 'kc-flights-style';
    st.textContent = '#kc-flights{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:720px;margin:1rem auto;padding:1rem;border:1px solid #ddd;border-radius:12px;color:#1c2430;box-sizing:border-box}' +
      '#kc-flights *{box-sizing:border-box}#kc-flights h3{margin:0 0 .2rem;font-size:1.2rem}#kc-flights .sub{margin:0 0 .8rem;font-size:.9rem;color:#5b6675}' +
      '#kc-flights form{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:.6rem}' +
      '#kc-flights fieldset{border:0;margin:0;padding:0;grid-column:1/-1;display:flex;gap:1rem;flex-wrap:wrap}#kc-flights legend{font-size:.8rem;color:#555;padding:0;margin-bottom:.2rem}' +
      '#kc-flights fieldset label{flex-direction:row;align-items:center;gap:.4rem;font-size:.95rem;color:#1c2430;min-height:44px}' +
      '#kc-flights label{font-size:.8rem;color:#555;display:flex;flex-direction:column;gap:.2rem}' +
      '#kc-flights select,#kc-flights input[type=date]{padding:.5rem;border:1px solid #bbb;border-radius:8px;font-size:1rem;min-height:44px;min-width:0;width:100%;background:#fff}' +
      '#kc-flights input[type=radio]{width:20px;height:20px}' +
      '#kc-flights .fixed{display:flex;flex-direction:column;gap:.2rem;font-size:.8rem;color:#555}#kc-flights .fixed b{font-size:1rem;color:#1c2430;min-height:44px;display:flex;align-items:center}' +
      '#kc-flights .fixed a{font-size:.8rem}' +
      '#kc-flights button.go{padding:.6rem 1rem;border:0;border-radius:8px;background:#0a7d3b;color:#fff;font-size:1rem;cursor:pointer;align-self:end;min-height:44px}' +
      '#kc-flights button.go[disabled]{opacity:.6;cursor:wait}' +
      '#kc-flights .st{margin:.8rem 0 0;font-size:.92rem;color:#5b6675}#kc-flights .st.err{color:#a4261b}' +
      '#kc-flights .ctx{margin:.8rem 0 0;font-weight:600;font-size:.92rem}' +
      '#kc-flights .sort{margin:.5rem 0 0;font-size:.85rem}#kc-flights .sort select{width:auto;min-height:36px;padding:.25rem .5rem}' +
      '#kc-flights .row{display:flex;justify-content:space-between;gap:.6rem;padding:.7rem 0;border-top:1px solid #eee;align-items:center}' +
      '#kc-flights .p{font-weight:700;font-size:1.15rem}#kc-flights .m{font-size:.85rem;color:#666}' +
      '#kc-flights a.b{display:inline-flex;align-items:center;min-height:44px;background:#0a7d3b;color:#fff;padding:.4rem .9rem;border-radius:8px;text-decoration:none}' +
      '#kc-flights .stale{margin:.6rem 0 0;font-size:.82rem;color:#8a5a00}' +
      '#kc-flights .n{font-size:.78rem;color:#6b7686;margin-top:.6rem}' +
      '@media(max-width:600px){#kc-flights .sort select{min-height:44px}}' +
      '@media(max-width:380px){#kc-flights{padding:.75rem}#kc-flights form{grid-template-columns:1fr}}';
    document.head.appendChild(st);
  }

  var today = new Date();
  var horizon = ymd(addDays(today, 340));
  root.textContent = '';
  var h = el('h3', null, FIXED && DEST[FIXED] ? 'Flights to ' + DEST[FIXED].replace(/ \(.*\)/, '') : 'Check flight fares');
  root.appendChild(h);
  root.appendChild(el('p', 'sub', 'Indicative fares per adult, economy not guaranteed. Prices come from Google Flights data and change quickly.'));

  var form = el('form'); form.setAttribute('novalidate', '');
  function field(labelText, node) { var l = el('label', null, labelText); l.appendChild(node); return l; }
  function mkSelect(name, map, sel) {
    var s = el('select'); s.name = name;
    Object.keys(map).forEach(function (k) { var o = el('option', null, map[k]); o.value = k; if (k === sel) o.selected = true; s.appendChild(o); });
    return s;
  }
  var fs = el('fieldset'); var lg = el('legend', null, 'Trip type'); fs.appendChild(lg);
  function radio(val, text, checked) {
    var l = el('label'); var r = el('input'); r.type = 'radio'; r.name = 'trip'; r.value = val; r.checked = checked;
    l.appendChild(r); l.appendChild(document.createTextNode(text)); return l;
  }
  fs.appendChild(radio('oneway', 'One way', true)); fs.appendChild(radio('return', 'Return', false));
  form.appendChild(fs);

  var selFrom = mkSelect('from', ORIG, ORIGIN);
  form.appendChild(field('From', selFrom));
  var selTo = null;
  if (FIXED && DEST[FIXED]) {
    var fx = el('div', 'fixed'); fx.appendChild(el('span', null, 'To')); fx.appendChild(el('b', null, DEST[FIXED]));
    var chg = el('a', null, 'Change destination'); chg.href = '/destinations/'; fx.appendChild(chg);
    form.appendChild(fx);
  } else {
    selTo = mkSelect('to', DEST, 'FIH'); form.appendChild(field('To', selTo));
  }
  var dDep = el('input'); dDep.type = 'date'; dDep.name = 'date'; dDep.min = ymd(today); dDep.max = horizon; dDep.value = ymd(addDays(today, 21)); dDep.required = true;
  var dRet = el('input'); dRet.type = 'date'; dRet.name = 'return'; dRet.min = ymd(addDays(today, 1)); dRet.max = horizon;
  var retWrap = field('Return', dRet); retWrap.hidden = true;
  form.appendChild(field('Depart', dDep)); form.appendChild(retWrap);
  var go = el('button', 'go', 'Check fares'); go.type = 'submit'; form.appendChild(go);
  root.appendChild(form);

  var status = el('p', 'st'); status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite'); root.appendChild(status);
  var out = el('div'); root.appendChild(out);

  function tripMode() { return form.querySelector('input[name=trip]:checked').value; }
  function syncTrip() {
    var ret = tripMode() === 'return';
    retWrap.hidden = !ret;
    if (!ret) dRet.value = '';
    else if (!dRet.value && dDep.value) dRet.value = ymd(addDays(parseYmd(dDep.value), 7));
  }
  [].forEach.call(form.querySelectorAll('input[name=trip]'), function (r) { r.addEventListener('change', syncTrip); });
  dDep.addEventListener('change', function () {
    if (!dDep.value) return;
    var d = parseYmd(dDep.value);
    dRet.min = ymd(addDays(d, 1));
    if (tripMode() === 'return' && (!dRet.value || parseYmd(dRet.value) <= d)) dRet.value = ymd(addDays(d, 7));
  });

  var seq = 0, ctl = null, last = null, sortMode = 'price';
  function setStatus(t, isErr) { status.textContent = t; status.className = 'st' + (isErr ? ' err' : ''); }

  var errText = {
    bad_airport: 'Please choose valid airports.', same_airport: 'Departure and destination airports must be different.',
    origin_not_allowed: 'We cannot search from that airport yet.', destination_not_allowed: 'We cannot search that destination yet.',
    bad_date: 'Please choose a departure date that is today or later.', bad_return: 'The return date must be after the departure date.',
    too_far_ahead: 'Please choose dates within the next 11 months.',
    rate_limited: 'Fare checks are busy right now. Please try again later.',
    not_configured: 'Fare checking is not available right now.',
    timeout: 'The fare service did not respond in time, so we could not check fares. This does not mean there are no flights.',
    api_error: 'The fare service had a problem, so we could not check fares. This does not mean there are no flights.',
    unavailable: 'The fare service had a problem, so we could not check fares. This does not mean there are no flights.',
    no_results: 'No fares were found for this route and date. Try nearby dates.'
  };
  var staleText = { rate_limited: 'Fare checks are busy', timeout: 'The fare service was slow', api_error: 'The fare service had a problem', no_results: 'No new fares were returned', not_configured: 'Fare checking is unavailable' };

  function searchLink(url, text) {
    if (typeof url !== 'string' || !/^https:\/\/www\.aviasales\.com\//.test(url)) return null;
    var p = el('p'); var a = el('a', 'b', text); a.href = url; a.target = '_blank'; a.rel = 'sponsored noopener'; p.appendChild(a); return p;
  }
  function verdictText(v) {
    var s = String(v || '').toLowerCase();
    return /^(low|typical|high)$/.test(s) ? 'Google rates this price as ' + s + ' for the route' : '';
  }
  function sorted(fares) {
    var a = fares.slice();
    if (sortMode === 'stops') a.sort(function (x, y) { return (x.stops == null ? 99 : x.stops) - (y.stops == null ? 99 : y.stops) || x.price - y.price; });
    else if (sortMode === 'time') a.sort(function (x, y) { var mx = mins(x.duration), my = mins(y.duration); return (mx == null ? 1e9 : mx) - (my == null ? 1e9 : my) || x.price - y.price; });
    else a.sort(function (x, y) { return x.price - y.price; });
    return a;
  }

  function render(d) {
    last = d; out.textContent = '';
    var route = d.from + ' to ' + d.to + ' · ' + fmtDay(d.date) + (d.trip === 'return' && d.return ? ' to ' + fmtDay(d.return) : '') + ' · ' + (d.trip === 'return' ? 'Return' : 'One way') + ' · ' + (d.adults || 1) + (d.adults === 1 || !d.adults ? ' adult' : ' adults');
    out.appendChild(el('p', 'ctx', route));
    if (d.source === 'stale') out.appendChild(el('p', 'stale', (staleText[d.stale_reason] || 'We could not refresh fares') + ', so these are older saved fares. Check current prices on Aviasales.'));
    var sw = el('div', 'sort'); var sl = el('label', null, 'Sort: '); sl.setAttribute('for', 'kc-sort');
    var ss = el('select'); ss.id = 'kc-sort';
    [['price', 'Lowest price'], ['stops', 'Fewest stops'], ['time', 'Shortest journey']].forEach(function (o) { var op = el('option', null, o[1]); op.value = o[0]; if (o[0] === sortMode) op.selected = true; ss.appendChild(op); });
    ss.addEventListener('change', function () { sortMode = ss.value; render(last); var n = document.getElementById('kc-sort'); if (n) n.focus(); });
    sl.appendChild(ss); sw.appendChild(sl); out.appendChild(sw);
    sorted(d.fares).forEach(function (x) {
      var row = el('div', 'row'); var left = el('div');
      left.appendChild(el('div', 'p', money(x.price, d.currency)));
      var stops = x.stops === 0 ? 'Direct' : (x.stops == null ? '' : x.stops + ' stop' + (x.stops > 1 ? 's' : ''));
      var airline = /air congo/i.test(x.airline || '') ? 'Air Congo' : x.airline;
      left.appendChild(el('div', 'm', [airline, stops, x.duration].filter(Boolean).join(' · ')));
      var vt = verdictText(x.verdict); if (vt) left.appendChild(el('div', 'm', vt));
      row.appendChild(left); out.appendChild(row);
    });
    var when = '';
    if (d.checked_at) { var t = new Date(d.checked_at * 1000); if (!isNaN(t.getTime())) when = t.toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }); }
    var note = 'Fares are per adult for ' + (d.trip === 'return' ? 'the return trip' : 'a one-way trip') + ', from Google Flights data' + (when ? ', ' + (d.source === 'live' ? 'checked ' : 'last checked ') + when : '') + (d.source === 'cache' ? ' (recently checked, saved result)' : '') + '. Baggage, fees and fare conditions are not shown. Prices change quickly and are not guaranteed.';
    out.appendChild(el('p', 'n', note));
    var lk = searchLink(d.search_url, 'Compare on Aviasales'); if (lk) out.appendChild(lk);
    out.appendChild(el('p', 'n', 'Compare on Aviasales opens a new route search with our partner Aviasales. It runs its own search, so its prices and availability can differ from the fares above, and no fare is reserved for you. We may earn a commission if you book through the link, at no extra cost to you. You book and pay on the partner site.'));
    setStatus('Fares updated for ' + d.from + ' to ' + d.to + '.', false);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (go.disabled) return;
    var ret = tripMode() === 'return';
    var from = selFrom.value, to = FIXED && DEST[FIXED] ? FIXED : selTo.value;
    if (!dDep.value) { setStatus('Please choose a departure date.', true); return; }
    if (dDep.value < ymd(today)) { setStatus(errText.bad_date, true); return; }
    if (dDep.value > horizon) { setStatus(errText.too_far_ahead, true); return; }
    if (from === to) { setStatus(errText.same_airport, true); return; }
    if (ret) {
      if (!dRet.value) { setStatus('Please choose a return date or switch to one way.', true); return; }
      if (dRet.value <= dDep.value) { setStatus(errText.bad_return, true); return; }
      if (dRet.value > horizon) { setStatus(errText.too_far_ahead, true); return; }
    }
    var q = new URLSearchParams(); q.set('from', from); q.set('to', to); q.set('date', dDep.value); if (ret) q.set('return', dRet.value);
    var my = ++seq;
    if (ctl) { try { ctl.abort(); } catch (x) {} }
    ctl = ('AbortController' in window) ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 35000);
    go.disabled = true; go.textContent = 'Checking...';
    out.textContent = '';
    setStatus('Checking fares. This usually takes a few seconds.', false);
    fetch(API + '?' + q.toString(), { credentials: 'omit', signal: ctl ? ctl.signal : undefined })
      .then(function (r) { return r.json().catch(function () { return { ok: false, error: 'api_error' }; }); })
      .then(function (d) {
        if (my !== seq) return;
        if (d && d.ok && d.fares && d.fares.length) { render(d); return; }
        var code = d && d.error ? d.error : 'api_error';
        setStatus(errText[code] || errText.api_error, code !== 'no_results' ? true : false);
        var lk = searchLink(d && d.search_url, 'Compare on Aviasales'); if (lk) out.appendChild(lk);
      })
      .catch(function () { if (my === seq) setStatus('Could not reach the fare service, or it took too long. This does not mean there are no flights. Please try again.', true); })
      .then(function () { clearTimeout(timer); if (my === seq) { go.disabled = false; go.textContent = 'Check fares'; } });
  });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { kcInit(true); }); else kcInit(true);
if (document.readyState !== 'complete') window.addEventListener('load', function () { setTimeout(function () { kcInit(false); }, 600); }); else setTimeout(function () { kcInit(false); }, 600);
})();
