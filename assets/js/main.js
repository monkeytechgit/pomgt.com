/* POMGT · navbar, smooth scroll reveals, counters, progress bar, parallax and animated illustrations that start when they enter the viewport */
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var EN = /^en/i.test(root.lang);
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav = document.querySelector('.nav');

  // ---------- Scroll progress bar + back-to-top + hero parallax (one rAF per frame)
  var bar = document.createElement('div');
  bar.className = 'progress'; bar.setAttribute('aria-hidden', 'true');
  if (nav) nav.appendChild(bar);
  var top = document.createElement('button');
  top.type = 'button'; top.className = 'to-top';
  top.setAttribute('aria-label', EN ? 'Back to top' : 'Volver arriba');
  top.innerHTML = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>';
  top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
  document.body.appendChild(top);
  var heroBg = document.querySelector('.hero-bg');
  var parallax = heroBg && !reduce && window.matchMedia('(min-width:961px)').matches;
  var ticking = false;
  var frame = function () {
    ticking = false;
    var y = window.scrollY, h = root.scrollHeight - window.innerHeight;
    if (nav) nav.classList.toggle('scrolled', y > 8);
    bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(y / h, 1) : 0) + ')';
    top.classList.toggle('show', y > window.innerHeight * 1.2);
    if (parallax && y < 1100) heroBg.style.translate = '0 ' + (y * 0.14).toFixed(1) + 'px';
  };
  var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  frame();

  // ---------- Modules dropdown: close on outside click / Escape (desktop)
  var dd = document.querySelector('.menu details');
  if (dd) {
    document.addEventListener('click', function (e) { if (!dd.contains(e.target)) dd.removeAttribute('open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') dd.removeAttribute('open'); });
    if (window.matchMedia('(hover:hover) and (min-width:921px)').matches) {
      var li = dd.parentNode, t;
      li.addEventListener('mouseenter', function () { clearTimeout(t); dd.setAttribute('open', ''); });
      li.addEventListener('mouseleave', function () { t = setTimeout(function () { dd.removeAttribute('open'); }, 180); });
    }
  }

  // ---------- Mobile menu: animated open/close, scroll lock, close on outside tap / Escape
  var toggle = document.getElementById('nav-toggle');
  if (toggle) {
    var sync = function () { root.classList.toggle('menu-open', toggle.checked); };
    toggle.addEventListener('change', sync);
    document.addEventListener('click', function (e) {
      if (toggle.checked && nav && !nav.contains(e.target)) { toggle.checked = false; sync(); }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && toggle.checked) { toggle.checked = false; sync(); } });
    window.matchMedia('(min-width:921px)').addEventListener('change', function (m) { if (m.matches && toggle.checked) { toggle.checked = false; sync(); } });
    document.querySelectorAll('.menu a').forEach(function (a) { a.addEventListener('click', function () { toggle.checked = false; sync(); }); });
    document.querySelectorAll('.menu > li').forEach(function (li, i) { li.style.setProperty('--i', i); });
  }

  // ---------- Staggered reveals for lists and grids (no markup changes needed)
  var groups = '.grid,.modules,.steps,.plans,.hero-points,.flow-caps,.band,.feature-text .checks,.faq,.sitemap,.info-list';
  document.querySelectorAll(groups).forEach(function (g) {
    if (g.classList.contains('reveal') || g.closest('.reveal-scale')) return;
    var i = 0;
    [].forEach.call(g.children, function (c) {
      if (c.classList.contains('reveal') || c.classList.contains('reveal-scale')) return;
      c.classList.add('reveal', 'reveal-soft');
      c.style.setProperty('--d', Math.min(i++, 8) * 70 + 'ms');
    });
  });

  var load = function (img) { if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); } };
  var count = function (el) {
    var target = parseFloat(el.dataset.count), dec = (el.dataset.count.split('.')[1] || '').length;
    var pre = el.dataset.pre || '', suf = el.dataset.suf || '', t0 = null;
    var fmt = function (v) { return pre + v.toLocaleString(root.lang, { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf; };
    if (reduce) { el.textContent = fmt(target); return; }
    var step = function (ts) {
      if (!t0) t0 = ts; var p = Math.min((ts - t0) / 1600, 1), e = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(target * e);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal,.reveal-scale').forEach(function (el) { el.classList.add('in'); });
    document.querySelectorAll('img[data-src]').forEach(load);
    document.querySelectorAll('[data-count]').forEach(count);
    return;
  }
  // Animated SVG illustrations load when they enter the viewport so their animation starts in view
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      el.classList.add('in');
      if (el.tagName === 'IMG') load(el);
      el.querySelectorAll && el.querySelectorAll('img[data-src]').forEach(load);
      el.querySelectorAll && el.querySelectorAll('[data-count]').forEach(count);
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  document.querySelectorAll('.reveal,.reveal-scale,img[data-src]').forEach(function (el) { io.observe(el); });

  // Fallback mailto form (only used when leads.js is not present)
  var form = document.querySelector('form.form[action^="mailto:"]');
  if (form) form.addEventListener('submit', function (e) {
    var action = form.getAttribute('action');
    e.preventDefault();
    var d = new FormData(form), body = [];
    d.forEach(function (v, k) { body.push(k + ': ' + v); });
    window.location.href = action + '?subject=' + encodeURIComponent(form.dataset.subject || 'POMGT') + '&body=' + encodeURIComponent(body.join('\n'));
    form.classList.add('sent');
  });
})();
