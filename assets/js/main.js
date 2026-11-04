/* POMGT · navbar, scroll reveals, counters and animated illustrations that start when they enter the viewport */
(function () {
  document.documentElement.classList.add('js');
  var nav = document.querySelector('.nav');
  var onScroll = function () { if (nav) nav.classList.toggle('scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Modules dropdown: close on outside click / Escape (desktop)
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
  var toggle = document.getElementById('nav-toggle');
  document.querySelectorAll('.menu a').forEach(function (a) { a.addEventListener('click', function () { if (toggle) toggle.checked = false; }); });

  var load = function (img) { if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); } };
  var count = function (el) {
    var target = parseFloat(el.dataset.count), dec = (el.dataset.count.split('.')[1] || '').length;
    var pre = el.dataset.pre || '', suf = el.dataset.suf || '', t0 = null;
    var step = function (ts) {
      if (!t0) t0 = ts; var p = Math.min((ts - t0) / 1400, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + (target * e).toLocaleString(document.documentElement.lang, { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal,.reveal-scale').forEach(function (el) { el.classList.add('in'); });
    document.querySelectorAll('img[data-src]').forEach(load);
    return;
  }
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
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  document.querySelectorAll('.reveal,.reveal-scale,img[data-src]').forEach(function (el) { io.observe(el); });

  // Contact form: opens the visitor's email client with the request (replace with your form endpoint if you have one)
  var form = document.querySelector('form.form');
  if (form) form.addEventListener('submit', function (e) {
    var action = form.getAttribute('action') || '';
    if (action.indexOf('mailto:') !== 0) return;
    e.preventDefault();
    var d = new FormData(form), body = [];
    d.forEach(function (v, k) { body.push(k + ': ' + v); });
    window.location.href = action + '?subject=' + encodeURIComponent(form.dataset.subject || 'POMGT') + '&body=' + encodeURIComponent(body.join('\n'));
    form.classList.add('sent');
  });
})();
