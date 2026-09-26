/* Karibu Congo hotel search (karibucongo.com/hotel-search.js).
   karibucongo.com is a static Next.js export that is not built from this repo.
   Its /hotels/ page had a search form that submitted nowhere. This script hides
   that form and puts a working Klook hotel search in its place (tracked via
   Travelpayouts, Klook programme 137), and corrects the page wording. React can
   re-render the page after load, so a MutationObserver re-applies the changes.
   Loaded on every page so client-side navigation to /hotels/ is covered too.
   Klook city ids: search on klook.com/hotels and read city_id from the URL.
   Klook has no Kinshasa hotels (checked 26 Sep 2026). */
(function () {
  'use strict';
  var TRACKED = 'https://tp.media/r?campaign_id=137&marker=746332&p=4110&trs=551169&u=';
  var DEST = [
    [7191, 'Nairobi', 'Nairobi, Kenya'],
    [20245, 'Mombasa', 'Mombasa, Kenya'],
    [40117052, 'Zanzibar', 'Zanzibar, Tanzania'],
    [7271, 'Kigali', 'Kigali, Rwanda'],
    [19408, 'Kampala', 'Kampala, Uganda'],
    [704677, 'Entebbe', 'Entebbe, Uganda'],
    [4850, 'Luanda', 'Luanda, Angola'],
    [273, 'Johannesburg', 'Johannesburg, South Africa'],
    [14, 'Mauritius', 'Mauritius'],
    [78, 'Dubai', 'Dubai, United Arab Emirates'],
    [131, 'Abu Dhabi', 'Abu Dhabi, United Arab Emirates'],
    [162, 'Doha', 'Doha, Qatar'],
    [106, 'London', 'London, United Kingdom'],
    [107, 'Paris', 'Paris, France'],
    [93, 'New York', 'New York, United States'],
    [6, 'Singapore', 'Singapore'],
    [49, 'Kuala Lumpur', 'Kuala Lumpur, Malaysia']
  ];
  var TEXT = [
    ['We check Booking.com, Agoda, and more so you get the best rate \u2014 free cancellation on most stays.',
     'Search hotels across Africa and beyond and book on Klook, with free cancellation on many stays.'],
    ['Compare across providers', 'Trusted booking partner'],
    ["We check Booking.com, Agoda, and more side by side, so you don't have to tab-hop for the best rate.",
     'Klook lists thousands of hotels worldwide, with clear prices and guest reviews.'],
    ['Free cancellation on most stays', 'Free cancellation on many stays']
  ];
  var CSS = '#kc-hotel-search{width:100%;margin:0 0 4px}' +
    '.kc-hs-form{display:flex;flex-wrap:wrap;gap:10px;align-items:flex-end;border:1px solid rgba(0,0,0,.08);border-radius:16px;background:#fff;padding:14px;box-shadow:0 10px 25px rgba(15,118,110,.06)}' +
    '.kc-hs-f{display:flex;flex-direction:column;gap:4px;flex:1 1 150px;text-align:left;font-size:12px;font-weight:500;color:#71717a}' +
    '.kc-hs-f select,.kc-hs-f input{font:inherit;font-size:14px;color:#18181b;padding:8px 10px;border:1px solid #e4e4e7;border-radius:10px;background:#fff;min-height:40px;box-sizing:border-box;width:100%}' +
    '#kc-hotel-search button{flex:0 0 auto;background:#0d9488;color:#fff;border:0;border-radius:12px;padding:12px 22px;font-weight:600;font-size:14px;cursor:pointer;min-height:40px}' +
    '#kc-hotel-search button:hover{background:#0f766e}' +
    '.kc-hs-note{margin:10px 0 0;font-size:12px;color:#71717a;text-align:left}' +
    '.kc-hs-err{margin:10px 0 0;font-size:14px;color:#dc2626;text-align:left}';

  function iso(d) { return d.toISOString().slice(0, 10); }
  function addDays(day, n) { var d = new Date(day + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return iso(d); }

  function addCss() {
    if (document.getElementById('kc-hs-css')) return;
    var s = document.createElement('style');
    s.id = 'kc-hs-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function build() {
    var wrap = document.createElement('div');
    wrap.id = 'kc-hotel-search';
    var opts = DEST.map(function (d) { return '<option value="' + d[0] + '">' + d[1] + '</option>'; }).join('');
    var adults = [1, 2, 3, 4, 5, 6].map(function (n) { return '<option' + (n === 2 ? ' selected' : '') + '>' + n + '</option>'; }).join('');
    wrap.innerHTML =
      '<form class="kc-hs-form">' +
      '<label class="kc-hs-f"><span>Destination</span><select name="city">' + opts + '</select></label>' +
      '<label class="kc-hs-f"><span>Check-in</span><input type="date" name="ci"></label>' +
      '<label class="kc-hs-f"><span>Check-out</span><input type="date" name="co"></label>' +
      '<label class="kc-hs-f"><span>Adults</span><select name="ad">' + adults + '</select></label>' +
      '<button type="submit">Search Hotels</button></form>' +
      '<p class="kc-hs-err" role="alert" hidden></p>' +
      '<p class="kc-hs-note">Hotels in Kinshasa are not available through our booking partner yet. Searches open hotel results on Klook in a new tab. We may earn a commission if you book, at no extra cost to you.</p>';
    var form = wrap.querySelector('form');
    var err = wrap.querySelector('.kc-hs-err');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var today = iso(new Date());
      var id = form.city.value;
      var dest = DEST.filter(function (d) { return String(d[0]) === id; })[0] || DEST[0];
      var ci = form.ci.value || addDays(today, 14);
      var co = form.co.value || addDays(ci, 3);
      var problem = ci < today ? 'Check-in cannot be in the past.' : (co <= ci ? 'Check-out must be after check-in.' : '');
      err.textContent = problem;
      err.hidden = !problem;
      if (problem) return;
      var q = 'city_id=' + dest[0] + '&stype=city&svalue=' + dest[0] +
        '&title=' + encodeURIComponent(dest[1]) + '&override=' + encodeURIComponent(dest[2]) +
        '&check_in=' + ci + '&check_out=' + co + '&adult_num=' + form.ad.value + '&child_num=0&room_num=1&age=';
      window.open(TRACKED + encodeURIComponent('https://www.klook.com/en-GB/hotels/searchresult/?' + q), '_blank', 'noopener');
    });
    return wrap;
  }

  function oldForm() {
    /* The old box is not a real <form>: find its "Search Hotels" button and
       take the nearest container that also holds the date inputs. */
    var buttons = document.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
      var b = buttons[i];
      if (b.closest('#kc-hotel-search') || !/^\s*Search Hotels\s*$/i.test(b.textContent)) continue;
      for (var p = b.parentElement; p && p !== document.body; p = p.parentElement) {
        if (p.querySelector('input[type=date]')) return p;
      }
    }
    return null;
  }

  function fixText() {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = w.nextNode())) {
      var v = n.nodeValue.trim();
      for (var i = 0; i < TEXT.length; i++) if (v === TEXT[i][0]) n.nodeValue = TEXT[i][1];
    }
  }

  var busy = false;
  function apply() {
    if (busy || !document.body || !/^\/hotels\/?$/.test(location.pathname)) return;
    busy = true;
    try {
      fixText();
      var f = oldForm();
      if (f && f.parentNode) {
        addCss();
        f.style.display = 'none';
        f.setAttribute('aria-hidden', 'true');
        if (!document.getElementById('kc-hotel-search')) f.parentNode.insertBefore(build(), f);
      }
    } catch (e) {
      /* never let one failure stop the observer */
    } finally {
      busy = false;
    }
  }

  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    setTimeout(function () { queued = false; apply(); }, 50);
  }

  /* In-site navigation changes the URL after the new page is drawn, so also
     re-check whenever the address changes. */
  function watchHistory() {
    ['pushState', 'replaceState'].forEach(function (m) {
      var orig = history[m];
      if (typeof orig !== 'function') return;
      history[m] = function () {
        var r = orig.apply(this, arguments);
        setTimeout(apply, 0);
        setTimeout(apply, 400);
        return r;
      };
    });
    window.addEventListener('popstate', function () { setTimeout(apply, 0); setTimeout(apply, 400); });
  }

  function init() {
    watchHistory();
    apply();
    if (window.MutationObserver) {
      new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
