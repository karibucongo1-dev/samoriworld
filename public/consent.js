/* Samori World consent manager (samori.net). Same behaviour and look as samori.co.uk/consent.js.
 * Optional analytics and affiliate-tracking scripts load ONLY after the visitor clicks "Accept".
 * The choice is stored in localStorage for 12 months, then asked again.
 * Static pages:  <script src="/consent.js" data-load="metricool,travelpayouts" defer></script>
 * React pages:   window.samoriConsent.load('travelpayouts')  (calls made before this file loads are queued)
 */
(function () {
  'use strict';
  var KEY = 'samori_consent_v1';
  var MAX_AGE = 365 * 24 * 60 * 60 * 1000;
  var FONT = "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  var me = document.currentScript;

  /* Metricool hash for the main site; a page can override it with data-metricool-hash. */
  var METRICOOL_HASH = (me && me.getAttribute('data-metricool-hash')) || '80ef38afb3ce1d8cbe475d061ec93daa';
  var TRAVELPAYOUTS_SRC = 'https://emrld.ltd/NTUxMTY5.js?t=551169';

  var loaders = {
    metricool: function () {
      var s = document.createElement('script');
      s.src = 'https://tracker.metricool.com/resources/be.js';
      s.async = true;
      s.onload = function () {
        if (typeof beTracker !== 'undefined') { beTracker.t({ hash: METRICOOL_HASH }); }
      };
      document.head.appendChild(s);
    },
    travelpayouts: function () {
      var s = document.createElement('script');
      s.src = TRAVELPAYOUTS_SRC;
      s.async = true;
      document.head.appendChild(s);
    }
  };

  var wanted = [];
  var loaded = {};

  function read() {
    try {
      var o = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (o && (o.v === 'granted' || o.v === 'denied') && (Date.now() - o.t) < MAX_AGE) return o.v;
    } catch (e) {}
    return null;
  }
  function write(v) {
    try { localStorage.setItem(KEY, JSON.stringify({ v: v, t: Date.now() })); } catch (e) {}
  }
  function css(el, s) { for (var k in s) { el.style[k] = s[k]; } return el; }

  function flush() {
    if (read() !== 'granted') return;
    wanted.forEach(function (name) {
      if (loaded[name] || !loaders[name]) return;
      loaded[name] = true;
      loaders[name]();
    });
  }
  function request(names) {
    [].concat(names).forEach(function (name) {
      if (wanted.indexOf(name) === -1) wanted.push(name);
    });
    flush();
  }

  var banner = null;
  function button(label, value) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    css(b, {
      flex: '1 1 0', minWidth: '120px', padding: '10px 16px', borderRadius: '8px',
      border: '1px solid #14141C', background: '#14141C', color: '#FFFFFF',
      font: '600 14px/1.2 ' + FONT, cursor: 'pointer'
    });
    b.addEventListener('click', function () { decide(value); });
    return b;
  }
  function showBanner() {
    if (banner) { banner.querySelector('button').focus(); return; }
    banner = document.createElement('div');
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie consent');
    css(banner, {
      position: 'fixed', left: '16px', right: '16px', bottom: '16px', maxWidth: '640px',
      margin: '0 auto', background: '#FFFFFF', color: '#14141C',
      border: '1px solid rgba(20,20,28,.14)', borderRadius: '12px',
      boxShadow: '0 12px 32px rgba(20,20,28,.18)', padding: '16px 18px',
      zIndex: '2147483000', font: '400 14px/1.55 ' + FONT
    });
    var p = document.createElement('p');
    css(p, { margin: '0 0 12px' });
    p.appendChild(document.createTextNode('We’d like to use optional analytics and affiliate-tracking scripts (Metricool and Travelpayouts). They only load if you accept. '));
    var a = document.createElement('a');
    a.href = '/privacy/';
    a.textContent = 'Privacy policy';
    css(a, { color: 'inherit', textDecoration: 'underline' });
    p.appendChild(a);
    var row = document.createElement('div');
    css(row, { display: 'flex', gap: '10px', flexWrap: 'wrap' });
    row.appendChild(button('Reject', 'denied'));
    row.appendChild(button('Accept', 'granted'));
    banner.appendChild(p);
    banner.appendChild(row);
    document.body.appendChild(banner);
  }
  function hideBanner() {
    if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
    banner = null;
  }
  function decide(v) {
    var anyLoaded = Object.keys(loaded).length > 0;
    write(v);
    hideBanner();
    if (v === 'granted') { flush(); }
    else if (anyLoaded) { location.reload(); }  /* withdrawing: reload so the scripts stop */
  }

  function footerLinks() {
    var f = document.querySelector('footer');
    if (!f || f.querySelector('[data-samori-legal]')) return;
    var host = f.querySelector('.wrap') ||
      (f.firstElementChild && f.firstElementChild.tagName === 'DIV' ? f.firstElementChild : f);
    var d = document.createElement('div');
    d.setAttribute('data-samori-legal', '');
    css(d, { marginTop: '10px', fontSize: '12px', opacity: '.85' });
    var a1 = document.createElement('a');
    a1.href = '/privacy/';
    a1.textContent = 'Privacy';
    var a2 = document.createElement('a');
    a2.href = '#';
    a2.textContent = 'Cookie settings';
    a2.addEventListener('click', function (e) { e.preventDefault(); showBanner(); });
    [a1, a2].forEach(function (x) { css(x, { color: 'inherit', textDecoration: 'underline' }); });
    d.appendChild(a1);
    d.appendChild(document.createTextNode(' · '));
    d.appendChild(a2);
    host.appendChild(d);
  }

  window.samoriConsent = { open: showBanner, status: read, load: request };

  function init() {
    footerLinks();
    var attr = me && me.getAttribute('data-load');
    if (attr) request(attr.split(',').map(function (s) { return s.trim(); }));
    request(window.__samoriConsentQueue || []);
    window.__samoriConsentQueue = [];
    if (read() === null) showBanner();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
