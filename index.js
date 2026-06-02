/* ============================================================
   ANTI-GRAVITY PORTFOLIO — JavaScript
   Particles · Scroll Reveal · Parallax · Magnetic Hover
   ============================================================ */

(function () {
  'use strict';

  // ──────────────────────────────────
  //  1. PARTICLE STAR FIELD
  // ──────────────────────────────────
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let stars = [];
  const STAR_COUNT = 180;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.6 + 0.2,
        drift: (Math.random() - 0.5) * 0.15,
        twinkleSpeed: Math.random() * 0.008 + 0.003,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
  }

  function drawStars(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((s) => {
      const twinkle = Math.sin(time * s.twinkleSpeed + s.twinklePhase) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 220, 255, ${s.alpha * twinkle})`;
      ctx.fill();

      // slow drift
      s.y += s.drift;
      if (s.y < -5) s.y = canvas.height + 5;
      if (s.y > canvas.height + 5) s.y = -5;
    });
    requestAnimationFrame(drawStars);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    createStars();
  });
  resizeCanvas();
  createStars();
  requestAnimationFrame(drawStars);

  // ──────────────────────────────────
  //  2. SCROLL REVEAL (IntersectionObserver)
  // ──────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  // ──────────────────────────────────
  //  3. PARALLAX ON MOUSE MOVE
  // ──────────────────────────────────
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function updateParallax() {
    currentX += (mouseX - currentX) * 0.06;
    currentY += (mouseY - currentY) * 0.06;
    parallaxEls.forEach((el) => {
      const factor = parseFloat(el.dataset.parallax) || 0.03;
      const x = currentX * factor * 100;
      const y = currentY * factor * 100;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    requestAnimationFrame(updateParallax);
  }
  requestAnimationFrame(updateParallax);

  // ──────────────────────────────────
  //  4. MAGNETIC HOVER EFFECT
  // ──────────────────────────────────
  const magneticEls = document.querySelectorAll('.magnetic');

  magneticEls.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
      el.style.transition = 'transform .45s cubic-bezier(.25,.46,.45,.94)';
      setTimeout(() => (el.style.transition = ''), 450);
    });
  });

  // ──────────────────────────────────
  //  5. SMOOTH SCROLL FOR ANCHOR LINKS
  // ──────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile nav if open
        document.querySelector('.nav-links')?.classList.remove('open');
        document.getElementById('nav-toggle')?.classList.remove('active');
      }
    });
  });

  // ──────────────────────────────────
  //  6. MOBILE NAV TOGGLE
  // ──────────────────────────────────
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // ──────────────────────────────────
  //  7. NAVBAR SHRINK ON SCROLL
  // ──────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.style.padding = '0.6rem 3rem';
      navbar.style.background = 'rgba(6,6,18,.88)';
    } else {
      navbar.style.padding = '1rem 3rem';
      navbar.style.background = 'rgba(6,6,18,.7)';
    }
  });

  // ──────────────────────────────────
  //  8. CONTACT FORM (prevent default)
  // ──────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('contact-submit');
    btn.textContent = '✓ Sent!';
    btn.style.background = 'linear-gradient(135deg, #00ffaa, #00d4ff)';
    setTimeout(() => {
      btn.innerHTML = 'Send Message <span class="btn-arrow">→</span>';
      btn.style.background = '';
      contactForm.reset();
    }, 2500);
  });
})();