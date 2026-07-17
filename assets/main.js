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

  /* ---- Figure galleries: lightbox with prev/next ----
     Plain <a href="image.jpg"> links work with JS off. With JS, clicking any
     .gallery-item opens a modal and groups it with its siblings inside the
     same .gallery container for prev/next navigation. */
  const galleries = document.querySelectorAll('.gallery');
  if (galleries.length) {
    let items = [];
    let index = 0;

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-figure" role="dialog" aria-modal="true" aria-label="Image viewer">
        <button type="button" class="lightbox-close" aria-label="Close">&#10005;</button>
        <button type="button" class="lightbox-prev" aria-label="Previous image">&#8249;</button>
        <img alt="" />
        <p class="lightbox-cap"></p>
        <span class="lightbox-count"></span>
        <button type="button" class="lightbox-next" aria-label="Next image">&#8250;</button>
      </div>`;
    document.body.appendChild(lightbox);
    const imgEl = lightbox.querySelector('img');
    const capEl = lightbox.querySelector('.lightbox-cap');
    const countEl = lightbox.querySelector('.lightbox-count');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    let lastFocus = null;

    const render = () => {
      const it = items[index];
      imgEl.src = it.href;
      imgEl.alt = it.alt || '';
      capEl.textContent = it.caption || '';
      capEl.hidden = !it.caption;
      countEl.textContent = items.length > 1 ? `${index + 1} / ${items.length}` : '';
      const multi = items.length > 1;
      prevBtn.style.display = multi ? 'grid' : 'none';
      nextBtn.style.display = multi ? 'grid' : 'none';
    };

    const open = (group, i) => {
      items = group;
      index = i;
      render();
      lastFocus = document.activeElement;
      lightbox.classList.add('open');
      lightbox.querySelector('.lightbox-close').focus();
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };
    const step = (dir) => { index = (index + dir + items.length) % items.length; render(); };

    galleries.forEach((gallery) => {
      const links = Array.from(gallery.querySelectorAll('.gallery-item'));
      const group = links.map((a) => ({
        href: a.getAttribute('href'),
        alt: a.querySelector('img')?.getAttribute('alt') || '',
        caption: a.dataset.caption || '',
      }));
      links.forEach((a, i) => {
        a.addEventListener('click', (e) => { e.preventDefault(); open(group, i); });
      });
    });

    prevBtn.addEventListener('click', () => step(-1));
    nextBtn.addEventListener('click', () => step(1));
    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    });
  }
})();
