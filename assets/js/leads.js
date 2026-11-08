/* POMGT · Formulario de solicitud de demo (modal + página de contacto)
   Envía el correo con EmailJS y registra el lead en Supabase (tabla public.contact_leads). */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ Configuración */
  var CONFIG = {
    emailjs: {
      serviceId: 'service_mr6qhfy',
      templateId: 'template_y4y0gl8',
      publicKey: '' // ← EmailJS › Account › General › Public Key
    },
    supabase: {
      url: 'https://ocydhmnlomnibdruinhb.supabase.co',
      key: 'sb_publishable_vb8f13vBEUls6RNI7PjD1Q_dey01-Bs',
      table: 'contact_leads'
    },
    fallbackEmail: 'contacto@pomgt.com'
  };

  var EN = /^en/i.test(document.documentElement.lang);
  var T = EN ? {
    eyebrow: 'Request a demo', title: 'Let’s talk about your production.',
    sub: 'Tell us about your plant and we’ll show you POMGT with examples from your own operation. We reply within one business day.',
    name: 'Full name', company: 'Company', email: 'Work email', phone: 'Phone / WhatsApp',
    industry: 'What do you manufacture?', machines: 'Machines on the floor', plan: 'Plan of interest', start: 'When would you like to start?',
    impact: 'How does your current process affect you today?', message: 'Which process do you want to improve?',
    messagePh: 'E.g. we track orders in spreadsheets and never know which machine each one is on…',
    select: 'Select…', optional: 'optional',
    industries: ['Automotive & auto parts', 'Labels & packaging', 'Plastics', 'Metalworking', 'Furniture', 'Food & beverage', 'Electronics', 'Medical / pharma', 'Other'],
    machineOpts: ['1–15', '16–60', '61–150', '150+'],
    plans: ['Essential', 'Professional', 'Enterprise', 'Not sure yet'],
    starts: ['As soon as possible', 'In 1–3 months', 'In 3–6 months', 'Just exploring'],
    impacts: [['consume_tiempo', 'Takes too much time'], ['genera_errores', 'Causes errors'], ['falta_control', 'Lack of control & visibility'], ['otro', 'Other']],
    privacy: 'We use your information only to answer your request.',
    submit: 'Send request', sending: 'Sending…', close: 'Close',
    errName: 'Please enter your name.', errEmail: 'Please enter a valid email.',
    okTitle: 'Request sent!', okText: function (n, e) { return 'Thank you' + (n ? ', ' + n : '') + '. We’ll reach out to ' + e + ' very soon to schedule your demo.'; },
    fail: 'We couldn’t send your request. Check your connection and try again, or email us at ',
    unit: 'machines'
  } : {
    eyebrow: 'Solicitar demo', title: 'Hablemos de tu producción.',
    sub: 'Cuéntanos sobre tu planta y te mostramos POMGT con ejemplos de tu propia operación. Respondemos en menos de un día hábil.',
    name: 'Nombre completo', company: 'Empresa', email: 'Correo de trabajo', phone: 'Teléfono / WhatsApp',
    industry: '¿Qué fabricas?', machines: 'Máquinas en planta', plan: 'Plan de interés', start: '¿Cuándo quieres empezar?',
    impact: '¿Cómo te afecta hoy tu proceso actual?', message: '¿Qué proceso quieres mejorar?',
    messagePh: 'Ej.: controlamos las órdenes en Excel y no sabemos en qué máquina va cada una…',
    select: 'Selecciona…', optional: 'opcional',
    industries: ['Automotriz y autopartes', 'Etiquetas y empaque', 'Plásticos', 'Metalmecánica', 'Muebles', 'Alimentos y bebidas', 'Electrónica', 'Médica / farmacéutica', 'Otra'],
    machineOpts: ['1–15', '16–60', '61–150', '150+'],
    plans: ['Esencial', 'Profesional', 'Enterprise', 'Aún no lo sé'],
    starts: ['Lo antes posible', 'En 1 a 3 meses', 'En 3 a 6 meses', 'Solo estoy explorando'],
    impacts: [['consume_tiempo', 'Consume mucho tiempo'], ['genera_errores', 'Genera errores'], ['falta_control', 'Falta control y visibilidad'], ['otro', 'Otro']],
    privacy: 'Usamos tus datos solo para responder tu solicitud.',
    submit: 'Enviar solicitud', sending: 'Enviando…', close: 'Cerrar',
    errName: 'Escribe tu nombre.', errEmail: 'Escribe un correo válido.',
    okTitle: '¡Solicitud enviada!', okText: function (n, e) { return 'Gracias' + (n ? ', ' + n : '') + '. Te contactaremos muy pronto a ' + e + ' para agendar tu demo.'; },
    fail: 'No pudimos enviar tu solicitud. Revisa tu conexión e inténtalo de nuevo, o escríbenos a ',
    unit: 'máquinas'
  };

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var ICON = {
    send: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>',
    x: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    cal: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',
    check: '<svg class="lead-ok-icon" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24"/><path d="m15 27 7 7 15-16"/></svg>'
  };

  /* ------------------------------------------------------------------ Markup */
  var uid = 0;
  function options(list, ph) {
    return '<option value="">' + esc(ph) + '</option>' + list.map(function (o) { return '<option>' + esc(o) + '</option>'; }).join('');
  }
  function buildForm() {
    var p = 'lf' + (++uid) + '-';
    var f = document.createElement('form');
    f.className = 'form lead-form';
    f.noValidate = true;
    f.innerHTML =
      '<div class="field"><label for="' + p + 'n">' + T.name + ' <b aria-hidden="true">*</b></label><input id="' + p + 'n" name="full_name" autocomplete="name" required maxlength="120"><span class="err" aria-live="polite"></span></div>' +
      '<div class="field"><label for="' + p + 'c">' + T.company + '</label><input id="' + p + 'c" name="company" autocomplete="organization" maxlength="160"></div>' +
      '<div class="field"><label for="' + p + 'e">' + T.email + ' <b aria-hidden="true">*</b></label><input id="' + p + 'e" type="email" name="email" autocomplete="email" inputmode="email" required maxlength="160"><span class="err" aria-live="polite"></span></div>' +
      '<div class="field"><label for="' + p + 'p">' + T.phone + '</label><input id="' + p + 'p" type="tel" name="phone" autocomplete="tel" inputmode="tel" maxlength="40"></div>' +
      '<div class="field"><label for="' + p + 'i">' + T.industry + '</label><select id="' + p + 'i" name="industry">' + options(T.industries, T.select) + '</select></div>' +
      '<div class="field"><label for="' + p + 'm">' + T.machines + '</label><select id="' + p + 'm" name="machines">' + options(T.machineOpts, T.select) + '</select></div>' +
      '<div class="field"><label for="' + p + 'pl">' + T.plan + '</label><select id="' + p + 'pl" name="plan">' + options(T.plans, T.select) + '</select></div>' +
      '<div class="field"><label for="' + p + 's">' + T.start + '</label><select id="' + p + 's" name="start">' + options(T.starts, T.select) + '</select></div>' +
      '<fieldset class="field full chips"><legend>' + T.impact + '</legend><div>' +
        T.impacts.map(function (o) { return '<label class="chip"><input type="checkbox" name="current_impact" value="' + o[0] + '"><span>' + esc(o[1]) + '</span></label>'; }).join('') +
      '</div></fieldset>' +
      '<div class="field full"><label for="' + p + 't">' + T.message + '</label><textarea id="' + p + 't" name="process_problem" rows="4" maxlength="4000" placeholder="' + esc(T.messagePh) + '"></textarea></div>' +
      '<div class="hp" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div>' +
      '<div class="lead-actions full"><button class="btn btn-primary" type="submit"><span>' + T.submit + '</span>' + ICON.send + '</button><small>' + T.privacy + '</small></div>' +
      '<p class="lead-fail full" role="alert" hidden></p>';
    f.dataset.t0 = Date.now();
    f.addEventListener('submit', onSubmit);
    f.addEventListener('input', function (e) { var fl = e.target.closest('.field'); if (fl && fl.classList.contains('invalid')) validateField(e.target); });
    return f;
  }
  function donePanel(name, email, withClose) {
    var d = document.createElement('div');
    d.className = 'lead-done';
    d.setAttribute('role', 'status');
    d.innerHTML = ICON.check + '<h3>' + T.okTitle + '</h3><p>' + esc(T.okText(name, email)) + '</p>' +
      (withClose ? '<button type="button" class="btn btn-ghost" data-close>' + T.close + '</button>' : '');
    return d;
  }

  /* ------------------------------------------------------------------ Validation */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function validateField(input) {
    var msg = '';
    if (input.name === 'full_name' && input.value.trim().length < 2) msg = T.errName;
    if (input.name === 'email' && !EMAIL_RE.test(input.value.trim())) msg = T.errEmail;
    var fl = input.closest('.field');
    fl.classList.toggle('invalid', !!msg);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    var e = fl.querySelector('.err'); if (e) e.textContent = msg;
    return !msg;
  }

  /* ------------------------------------------------------------------ Sending */
  function read(form) {
    var g = function (n) { var el = form.elements[n]; return el ? String(el.value || '').trim() : ''; };
    return {
      full_name: g('full_name'), company: g('company'), email: g('email'), phone: g('phone'),
      industry: g('industry'), machines: g('machines'), plan: g('plan'), start: g('start'),
      process_problem: g('process_problem'),
      current_impact: [].slice.call(form.querySelectorAll('input[name="current_impact"]:checked')).map(function (c) { return c.value; }),
      impactLabels: [].slice.call(form.querySelectorAll('input[name="current_impact"]:checked')).map(function (c) { return c.nextElementSibling.textContent; })
    };
  }
  var nn = function (v) { return v === '' ? null : v; };

  function saveLead(d, source) {
    var c = CONFIG.supabase;
    var summary = [d.plan && 'Plan: ' + d.plan, d.machines && (EN ? 'Machines: ' : 'Máquinas: ') + d.machines, d.start && (EN ? 'Start: ' : 'Inicio: ') + d.start].filter(Boolean).join(' · ');
    return fetch(c.url + '/rest/v1/' + c.table, {
      method: 'POST',
      headers: { 'apikey': c.key, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
      body: JSON.stringify({
        full_name: d.full_name, company: nn(d.company), email: nn(d.email), phone: nn(d.phone),
        process_problem: nn(d.process_problem), current_impact: d.current_impact,
        source: source, industry: nn(d.industry), quote_summary: nn(summary),
        lang: EN ? 'en' : 'es', page_url: location.href.slice(0, 500)
      })
    }).then(function (r) { if (!r.ok) return r.text().then(function (t) { throw new Error('Supabase ' + r.status + ' ' + t); }); });
  }

  function sendEmail(d, source) {
    var c = CONFIG.emailjs;
    if (!c.publicKey) return Promise.reject(new Error('EmailJS: falta publicKey en assets/js/leads.js'));
    var desc = [d.process_problem || '—',
      '',
      (EN ? 'Current impact: ' : 'Impacto actual: ') + (d.impactLabels.join(', ') || '—'),
      (EN ? 'Plan of interest: ' : 'Plan de interés: ') + (d.plan || '—'),
      (EN ? 'Language: English' : 'Idioma: Español') + ' · ' + (source === 'cotizador' ? (EN ? 'Pricing page' : 'Página de precios') : (EN ? 'Contact' : 'Contacto')),
      (EN ? 'Page: ' : 'Página: ') + location.href].join('\n');
    return fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: c.serviceId, template_id: c.templateId, user_id: c.publicKey,
        template_params: {
          title: 'Nueva solicitud de demo POMGT' + (d.company ? ' · ' + d.company : '') + (EN ? ' (EN)' : ''),
          nombre: d.full_name, empresa: d.company || '—', correo: d.email, telefono: d.phone || '—',
          producto: [d.industry, d.plan && 'Plan ' + d.plan].filter(Boolean).join(' · ') || '—',
          cantidad: d.machines ? d.machines + ' ' + T.unit : '—',
          entrega: d.start || '—',
          descripcion: desc,
          reply_to: d.email
        }
      })
    }).then(function (r) { if (!r.ok) return r.text().then(function (t) { throw new Error('EmailJS ' + r.status + ' ' + t); }); });
  }

  function onSubmit(e) {
    e.preventDefault();
    var form = e.currentTarget, btn = form.querySelector('[type="submit"]'), fail = form.querySelector('.lead-fail');
    if (btn.disabled) return;
    var ok = true, first = null;
    ['full_name', 'email'].forEach(function (n) { var el = form.elements[n]; if (!validateField(el)) { ok = false; first = first || el; } });
    if (!ok) { first.focus(); form.classList.remove('shake'); void form.offsetWidth; form.classList.add('shake'); return; }

    var d = read(form);
    var done = function () {
      var inModal = !!form.closest('dialog');
      var panel = donePanel(d.full_name.split(' ')[0], d.email, inModal);
      form.replaceWith(panel);
      var head = panel.parentNode && panel.parentNode.querySelector('.lead-head'); if (head) head.hidden = true;
      var cb = panel.querySelector('[data-close]'); if (cb) { cb.addEventListener('click', closeModal); cb.focus(); }
      if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { method: form.dataset.source || 'contacto' });
    };
    // Spam: honeypot filled or sent in < 2.5 s → pretend success, send nothing
    if (form.elements.website.value || Date.now() - (+form.dataset.t0) < 2500) { done(); return; }

    btn.disabled = true; form.classList.add('sending'); fail.hidden = true;
    btn.querySelector('span').textContent = T.sending;
    var source = form.dataset.source || 'contacto';
    Promise.allSettled([saveLead(d, source), sendEmail(d, source)]).then(function (r) {
      r.forEach(function (x) { if (x.status === 'rejected') console.warn('[POMGT lead]', x.reason && x.reason.message); });
      if (r.some(function (x) { return x.status === 'fulfilled'; })) { done(); return; }
      btn.disabled = false; form.classList.remove('sending');
      btn.querySelector('span').textContent = T.submit;
      fail.innerHTML = esc(T.fail) + '<a href="mailto:' + CONFIG.fallbackEmail + '">' + CONFIG.fallbackEmail + '</a>.';
      fail.hidden = false;
    });
  }

  /* ------------------------------------------------------------------ Modal */
  var dlg = null, lastFocus = null;
  function ensureModal() {
    if (dlg) return dlg;
    dlg = document.createElement('dialog');
    dlg.className = 'lead';
    dlg.setAttribute('aria-labelledby', 'lead-title');
    dlg.innerHTML = '<div class="lead-box"><button type="button" class="lead-x" aria-label="' + T.close + '">' + ICON.x + '</button>' +
      '<div class="lead-head"><span class="eyebrow">' + ICON.cal + T.eyebrow + '</span><h2 id="lead-title">' + T.title + '</h2><p>' + T.sub + '</p></div></div>';
    dlg.querySelector('.lead-box').appendChild(buildForm());
    document.body.appendChild(dlg);
    dlg.querySelector('.lead-x').addEventListener('click', closeModal);
    dlg.addEventListener('cancel', function (e) { e.preventDefault(); closeModal(); });
    dlg.addEventListener('mousedown', function (e) { dlg._downOnBackdrop = e.target === dlg; });
    dlg.addEventListener('click', function (e) { if (e.target === dlg && dlg._downOnBackdrop) closeModal(); });
    return dlg;
  }
  function openModal(opts) {
    ensureModal();
    // A previous successful send: start a fresh form
    if (!dlg.querySelector('form')) {
      var old = dlg.querySelector('.lead-done'); if (old) old.remove();
      dlg.querySelector('.lead-head').hidden = false;
      dlg.querySelector('.lead-box').appendChild(buildForm());
    }
    var form = dlg.querySelector('form');
    form.dataset.source = opts && opts.plan ? 'cotizador' : 'contacto';
    if (opts && opts.plan != null) form.elements.plan.selectedIndex = opts.plan + 1;
    lastFocus = document.activeElement;
    dlg.classList.remove('closing');
    document.documentElement.classList.add('modal-open');
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    dlg.querySelector('.lead-box').scrollTop = 0;
    setTimeout(function () { var n = form.elements.full_name; if (n && window.matchMedia('(hover:hover)').matches) n.focus({ preventScroll: true }); }, reduce ? 0 : 120);
  }
  function closeModal() {
    if (!dlg || !dlg.open || dlg.classList.contains('closing')) return;
    var finish = function () {
      dlg.classList.remove('closing');
      if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open');
      document.documentElement.classList.remove('modal-open');
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
      if (location.hash === '#demo') history.replaceState(null, '', location.pathname + location.search);
    };
    if (reduce) { finish(); return; }
    dlg.classList.add('closing');
    setTimeout(finish, 260);
  }

  /* ------------------------------------------------------------------ Wiring */
  var isContactPage = /\/(contacto|en\/contact)\.html$/.test(location.pathname);
  // Contact page: replace the basic mailto form with the full lead form
  var inline = document.querySelector('form#form.form');
  if (inline && isContactPage) {
    var nf = buildForm(); nf.id = 'form';
    nf.className += ' ' + inline.className.replace(/\bform\b/, '').trim();
    inline.replaceWith(nf);
    // main.js observed the old element; reveal the new one when it scrolls into view
    if (nf.classList.contains('reveal')) {
      if ('IntersectionObserver' in window) {
        var ro = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { nf.classList.add('in'); ro.disconnect(); } }, { threshold: 0.05 });
        ro.observe(nf);
      } else nf.classList.add('in');
    }
  }

  function isLeadLink(a) {
    if (!a || a.hasAttribute('hreflang') || a.hasAttribute('download')) return false;
    var href = a.getAttribute('href') || '';
    if (!/(^|\/)(contacto|contact)\.html(#.*)?$/.test(href)) return false;
    return a.classList.contains('btn') || /demo/i.test(a.textContent);
  }
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest('a[href]');
    if (!isLeadLink(a)) return;
    e.preventDefault();
    var nt = document.getElementById('nav-toggle'); if (nt && nt.checked) { nt.checked = false; nt.dispatchEvent(new Event('change')); }
    if (isContactPage && document.getElementById('form') && !a.closest('.plan')) {
      var f = document.getElementById('form');
      f.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      setTimeout(function () { var n = f.elements && f.elements.full_name; if (n) n.focus({ preventScroll: true }); }, 500);
      return;
    }
    var plan = a.closest('.plan'), idx = null;
    if (plan && plan.parentNode) idx = [].indexOf.call(plan.parentNode.children, plan);
    openModal({ plan: idx });
  });
  if (location.hash === '#demo') openModal();
  window.POMGT = window.POMGT || {};
  window.POMGT.openDemo = openModal;
})();
