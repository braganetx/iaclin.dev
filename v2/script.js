/* ================================================================
   IACLIN — Landing Page Scripts
   Clean, professional, persuasion-optimized
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Navbar scroll ----------
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // ---------- Mobile menu ----------
  const toggle = document.getElementById('mobileToggle');
  const links = document.getElementById('navLinks');
  if (toggle) {
    toggle.addEventListener('click', () => links.classList.toggle('active'));
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('active'))
    );
  }

  // ---------- Smooth scroll ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---------- Scroll reveal ----------
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('active');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revealObs.observe(el));

  // ---------- Animated counters ----------
  const counters = document.querySelectorAll('.counter');
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      if (isNaN(target)) return;

      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;

      const tick = () => {
        current += step;
        if (current < target) {
          el.textContent = Math.floor(current);
          requestAnimationFrame(tick);
        } else {
          el.textContent = target + suffix;
        }
      };

      tick();
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObs.observe(el));

  // ---------- Chat messages staggered animation ----------
  const chatMsgs = document.querySelectorAll('.chat-msg');
  const chatObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const msgs = entry.target.closest('.chat-messages');
        if (msgs) {
          msgs.querySelectorAll('.chat-msg').forEach((msg, i) => {
            msg.style.animationDelay = `${i * 0.5}s`;
          });
        }
        chatObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  if (chatMsgs.length) chatObs.observe(chatMsgs[0]);

  // ---------- Modals ----------
  const modalBtns = document.querySelectorAll('.btn-modal');
  const closeBtns = document.querySelectorAll('.modal-close');
  const overlays = document.querySelectorAll('.modal-overlay');

  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = (modal) => {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  modalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-modal');
      openModal(modalId);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(btn.closest('.modal'));
    });
  });

  overlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
      closeModal(overlay.closest('.modal'));
    });
  });

  // ESC key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal.active');
      if (activeModal) closeModal(activeModal);
    }
  });

});
