/* ============================================================
   Atlas Web Studio — interactions
   Pure vanilla JS · no dependencies
============================================================ */
(function () {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Theme: localStorage + system preference ---------- */
  const root = document.documentElement;
  const themeToggle = $('#themeToggle');
  const stored = localStorage.getItem('atlas-theme');
  const systemLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  root.setAttribute('data-theme', stored || (systemLight ? 'light' : 'dark'));

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('atlas-theme', next);
    });
  }
  // React to system changes only if the user hasn't chosen explicitly
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('atlas-theme')) {
      root.setAttribute('data-theme', e.matches ? 'light' : 'dark');
    }
  });

  /* ---------- Sticky navbar state ---------- */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu (slide-in from right) ---------- */
  const burger = $('#navBurger');
  const menu = $('#navMenu');
  const closeBtn = $('#navClose');
  const backdrop = $('#navBackdrop');

  const openMenu = () => {
    menu.classList.add('open');
    backdrop.hidden = false;
    requestAnimationFrame(() => backdrop.classList.add('show'));
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    menu.classList.remove('open');
    backdrop.classList.remove('show');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    setTimeout(() => { backdrop.hidden = true; }, 300);
  };

  if (burger) burger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);
  $$('.nav__link, .nav__cta', menu).forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu(); });

  /* ---------- Reveal on scroll ---------- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !prefersReduced) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- Animated skill bars ---------- */
  const bars = $$('.bar__fill');
  if ('IntersectionObserver' in window && !prefersReduced) {
    const barIO = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = (entry.target.dataset.level || 0) + '%';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach((b) => barIO.observe(b));
  } else {
    bars.forEach((b) => (b.style.width = (b.dataset.level || 0) + '%'));
  }

  /* ---------- Count-up stats ---------- */
  const counters = $$('[data-count]');
  const countUp = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    if (prefersReduced) { el.textContent = target; return; }
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const cIO = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { countUp(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => cIO.observe(c));
  } else {
    counters.forEach((c) => (c.textContent = c.dataset.count));
  }

  /* ---------- Scroll-spy active link ---------- */
  const sections = $$('main section[id]');
  const linkMap = new Map($$('.nav__link').map((l) => [l.getAttribute('href').slice(1), l]));
  if (sections.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          linkMap.forEach((l) => l.classList.remove('active'));
          const active = linkMap.get(entry.target.id);
          if (active) active.classList.add('active');
        }
      });
    }, { threshold: 0.5, rootMargin: '-10% 0px -40% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Service card spotlight (pointer) ---------- */
  if (!prefersReduced && window.matchMedia('(hover: hover)').matches) {
    $$('.service').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }

  /* ---------- Contact form validation ---------- */
  const form = $('#contactForm');
  const status = $('#formStatus');
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const setError = (name, msg) => {
    const input = $(`#${name}`);
    const errEl = $(`.field__error[data-for="${name}"]`);
    if (input) input.classList.toggle('invalid', Boolean(msg));
    if (errEl) errEl.textContent = msg || '';
  };

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#name').value.trim();
      const email = $('#email').value.trim();
      const message = $('#message').value.trim();
      let ok = true;

      if (!name) { setError('name', 'Please enter your name.'); ok = false; } else setError('name', '');
      if (!email) { setError('email', 'Please enter your email.'); ok = false; }
      else if (!isEmail(email)) { setError('email', 'Please enter a valid email address.'); ok = false; }
      else setError('email', '');
      if (!message) { setError('message', 'Please tell us about your project.'); ok = false; }
      else if (message.length < 10) { setError('message', 'A little more detail, please.'); ok = false; }
      else setError('message', '');

      if (!ok) { status.textContent = ''; status.className = 'form__status'; return; }

      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = 'Sending…';

      // Demo: front-end only. Wire this to your email service / backend.
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = original;
        form.reset();
        status.textContent = `Thank you, ${name}! Your message has been received. We'll reply within 24 hours.`;
        status.className = 'form__status success';
      }, 1000);
    });

    ['name', 'email', 'message'].forEach((n) => {
      const el = $(`#${n}`);
      if (el) el.addEventListener('input', () => setError(n, ''));
    });
  }
})();
