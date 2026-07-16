/* NREL Lab — progressive enhancement. Page is fully readable without JS. */
(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Mobile nav toggle (hamburger) ---- */
  const navInner = document.querySelector('.nav-inner');
  const navLinks = document.querySelector('.nav-links');
  if (navInner && navLinks) {
    const btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '&#9776;';
    navInner.insertBefore(btn, navLinks);
    const setOpen = (open) => {
      navLinks.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.innerHTML = open ? '&#10005;' : '&#9776;';
    };
    btn.addEventListener('click', () => setOpen(!navLinks.classList.contains('open')));
    navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  }

  /* ---- Stagger spectrum bars ---- */
  document.querySelectorAll('#spectrum-bars .bar').forEach((bar, i) => bar.style.setProperty('--i', String(i)));

  /* ---- Count-up for hero metrics ---- */
  const countUp = (el) => {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target) || reduceMotion) return;
    const fmt = (n) => n.toLocaleString('en-US');
    const dur = 1100; let start = null;
    const step = (ts) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      el.textContent = fmt(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step); else el.textContent = fmt(target);
    };
    requestAnimationFrame(step);
  };
  document.querySelectorAll('.metric-value[data-count]').forEach(countUp);

  /* ---- Scroll reveal ---- */
  const targets = ['.about-body', '.pi-cols', '.card', '.pub', '.mcard', '.news-item']
    .flatMap((sel) => Array.from(document.querySelectorAll(sel)));
  targets.forEach((el, i) => { el.setAttribute('data-reveal', ''); el.style.transitionDelay = `${Math.min(i % 6, 5) * 50}ms`; });

  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach((el) => io.observe(el));
  } else {
    targets.forEach((el) => el.classList.add('in'));
  }
})();
