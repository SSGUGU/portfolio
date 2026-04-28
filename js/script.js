// =============================================
// script.js – Gustavo Alves Portfolio
// =============================================
document.addEventListener('DOMContentLoaded', () => {

  // ── Init AOS ──
  AOS.init({ duration: 700, once: true, offset: 80 });

  // ── Infinite Ticker: clone content for seamless loop ──
  function initTicker(trackId) {
    const track = document.getElementById(trackId);
    if (!track) return;
    const items = Array.from(track.children);
    items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  }
  initTicker('companies-track');
  initTicker('stack-track');

  // ── Mind Map: draw SVG connector lines ──
  function drawMindMapLines() {
    const svg = document.getElementById('mindMapSvg');
    const center = document.getElementById('mmCenter');
    if (!svg || !center) return;
    svg.innerHTML = '';

    const map = svg.closest('.mind-map');
    if (!map) return;
    const mapRect = map.getBoundingClientRect();
    const cx = center.getBoundingClientRect();
    const cxMid = cx.left - mapRect.left + cx.width / 2;
    const cyMid = cx.top  - mapRect.top  + cx.height / 2;

    const branches = map.querySelectorAll('.mm-node--branch');
    branches.forEach(node => {
      const nr = node.getBoundingClientRect();
      const nx = nr.left - mapRect.left + nr.width / 2;
      const ny = nr.top  - mapRect.top  + nr.height / 2;

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', cxMid);
      line.setAttribute('y1', cyMid);
      line.setAttribute('x2', nx);
      line.setAttribute('y2', ny);
      line.setAttribute('stroke', 'rgba(88,166,255,0.25)');
      line.setAttribute('stroke-width', '1.5');
      line.setAttribute('stroke-dasharray', '4 3');
      svg.appendChild(line);
    });
  }
  // Draw after layout settles
  setTimeout(drawMindMapLines, 300);
  window.addEventListener('resize', drawMindMapLines);

  // ── Hero Mouse Parallax ──
  const heroSection = document.getElementById('hero');
  const parallaxNodes = document.querySelectorAll('.mm-node'); // Selects both center and branches
  if (heroSection && parallaxNodes.length > 0) {
    heroSection.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 768) return; // Disable on mobile

      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Normalized offset -1 to 1
      const offsetX = (x - centerX) / centerX;
      const offsetY = (y - centerY) / centerY;

      parallaxNodes.forEach(node => {
        const speed = parseFloat(node.dataset.speed) || 1;
        // Translate magnitude (pixels)
        const moveX = offsetX * speed * 20; 
        const moveY = offsetY * speed * 20;
        
        node.style.setProperty('--px', `${moveX}px`);
        node.style.setProperty('--py', `${moveY}px`);
      });

      // Redraw SVG connections so they stick to the moving nodes
      window.requestAnimationFrame(drawMindMapLines);
    });

    heroSection.addEventListener('mouseleave', () => {
      parallaxNodes.forEach(node => {
        node.style.setProperty('--px', `0px`);
        node.style.setProperty('--py', `0px`);
      });
      setTimeout(drawMindMapLines, 50);
    });
  }

  // ── Custom Magnetic Cursor ──
  const cursor = document.getElementById('customCursor');
  if (cursor) {
    // Hide default cursor but only on desktop
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    if (!isMobile) {
      document.addEventListener('mousemove', (e) => {
        // Use requestAnimationFrame for high-performance 60fps movement
        window.requestAnimationFrame(() => {
          cursor.style.left = `${e.clientX}px`;
          cursor.style.top = `${e.clientY}px`;
          cursor.style.opacity = '1';
        });
      });

      // Hide it when the mouse leaves the window
      document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
      });

      // Add a hover effect for interactive elements
      const interactiveEls = document.querySelectorAll('a, button, .card-expand-btn, .mm-node');
      interactiveEls.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
      });
    }
  }

  // ── Swiper: Projects ──
  new Swiper('.projects-carousel', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: {
      640:  { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 28 },
    },
  });

  // ── Modal System ──
  const backdrop = document.getElementById('modalBackdrop');

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal || !backdrop) return;
    backdrop.classList.add('is-open');
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close')?.focus();
  }

  function closeAllModals() {
    backdrop.classList.remove('is-open');
    document.querySelectorAll('.modal.is-open').forEach(m => m.classList.remove('is-open'));
    document.body.style.overflow = '';
  }

  // Open via expand buttons
  document.querySelectorAll('.card-expand-btn, [data-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const modalId = trigger.dataset.modal || trigger.closest('[data-modal]')?.dataset.modal;
      if (modalId) { e.stopPropagation(); openModal(modalId); }
    });
  });

  // Close via backdrop or ✕ button
  backdrop.addEventListener('click', closeAllModals);
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  // Close via Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAllModals();
  });

  // ── Dark / Light Toggle ──
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const isDark = !body.classList.contains('light');
    applyTheme(isDark ? 'light' : 'dark');
  });

  function applyTheme(theme) {
    if (theme === 'light') {
      body.classList.add('light');
      themeToggle.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.remove('light');
      themeToggle.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    }
    // Redraw SVG lines after theme change (colors may shift)
    setTimeout(drawMindMapLines, 50);
  }

  // ── Mobile nav hamburger ──
  const hamburger = document.getElementById('nav-hamburger');
  const navUl = document.querySelector('.nav ul');
  if (hamburger && navUl) {
    hamburger.addEventListener('click', () => {
      const isOpen = navUl.style.display === 'flex';
      if (isOpen) {
        navUl.style.display = '';
      } else {
        Object.assign(navUl.style, {
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '64px',
          right: '0',
          left: '0',
          background: 'var(--c-surface)',
          borderBottom: '1px solid var(--c-border)',
          padding: '1rem 1.5rem',
          zIndex: '200',
        });
      }
    });
    navUl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => { navUl.style.display = ''; });
    });
  }

  // ── Active nav on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.35 }).observe.bind(null);

  // Correct observer usage
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const a = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => io.observe(s));
});
