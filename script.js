/* ================================================
   PANVI CHRONICLES — script.js
================================================ */

'use strict';

/* ---- Navbar Scroll Effect ---- */
const mainNav = document.getElementById('mainNav');

function handleNavScroll() {
  if (window.scrollY > 60) {
    mainNav.classList.add('scrolled');
  } else {
    mainNav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

/* ---- Active nav link on scroll ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active-link');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightActiveNav, { passive: true });

/* ---- Smooth close mobile menu on link click ---- */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const toggler = document.querySelector('.navbar-toggler');
    const navCollapse = document.getElementById('navbarNav');
    if (navCollapse.classList.contains('show')) {
      toggler.click();
    }
  });
});

/* ---- Scroll Animation (Intersection Observer) ---- */
const animatedEls = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseInt(el.getAttribute('data-delay') || '0');
      setTimeout(() => {
        el.classList.add('animated');
      }, delay);
      observer.unobserve(el);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

animatedEls.forEach(el => observer.observe(el));

/* ---- Back to Top ---- */
const backBtn = document.getElementById('backToTop');

function toggleBackToTop() {
  if (window.scrollY > 400) {
    backBtn.classList.add('visible');
  } else {
    backBtn.classList.remove('visible');
  }
}

window.addEventListener('scroll', toggleBackToTop, { passive: true });

backBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- Contact Form Handler ---- */
const contactBtn = document.querySelector('.contact-section .btn-primary-gold');

if (contactBtn) {
  contactBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll('.contact-input');
    let valid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        valid = false;
        input.style.borderColor = '#e74c3c';
        setTimeout(() => { input.style.borderColor = ''; }, 2500);
      }
    });

    if (valid) {
      contactBtn.textContent = 'Message Sent! ✓';
      contactBtn.style.background = '#27ae60';
      contactBtn.style.borderColor = '#27ae60';
      contactBtn.style.color = '#fff';
      inputs.forEach(input => { input.value = ''; });
      setTimeout(() => {
        contactBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane ms-2"></i>';
        contactBtn.style.background = '';
        contactBtn.style.borderColor = '';
        contactBtn.style.color = '';
      }, 3000);
    }
  });
}

/* ---- Polaroid tilt on mouse move ---- */
const polaroids = document.querySelectorAll('.polaroid');

polaroids.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotate(0deg) perspective(600px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.06)`;
  });
  card.addEventListener('mouseleave', (e) => {
    // Restore original rotation
    const idx = [...polaroids].indexOf(card);
    const rotations = ['-6deg', '3deg', '-2deg'];
    card.style.transform = `rotate(${rotations[idx] || '0deg'})`;
  });
});

/* ---- Destination cards hover cursor ---- */
document.querySelectorAll('.dest-card').forEach(card => {
  card.style.cursor = 'pointer';
});

/* ---- Video card play animation ---- */
document.querySelectorAll('.play-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const card = this.closest('.video-card');
    const overlay = card.querySelector('.video-overlay');
    overlay.innerHTML = '<div style="color:#fff;font-size:0.9rem;letter-spacing:0.08em;text-transform:uppercase;font-weight:600;">▶ Playing...</div>';
    setTimeout(() => {
      overlay.innerHTML = '<button class="play-btn" aria-label="Play video"><i class="fas fa-play"></i></button>';
      // Rebind event
      overlay.querySelector('.play-btn').addEventListener('click', arguments.callee.bind(this));
    }, 2000);
  });
});

/* ---- Masonry gallery lightbox (simple) ---- */
document.querySelectorAll('.masonry-item').forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('img').src;
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,0.92);
      display:flex;align-items:center;justify-content:center;
      z-index:9999;cursor:pointer;backdrop-filter:blur(6px);
      animation: fadeIn 0.3s ease;
    `;
    lightbox.innerHTML = `
      <img src="${src}" style="max-width:90vw;max-height:90vh;object-fit:contain;box-shadow:0 20px 60px rgba(0,0,0,0.6);" alt="Gallery image" />
      <button style="
        position:absolute;top:24px;right:28px;
        background:rgba(216,154,67,0.9);border:none;
        width:44px;height:44px;font-size:1.3rem;cursor:pointer;
        display:flex;align-items:center;justify-content:center;color:#0F0F0F;
      ">✕</button>
    `;
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    const close = () => {
      lightbox.remove();
      document.body.style.overflow = '';
    };
    lightbox.addEventListener('click', close);
  });
});

/* ---- Parallax on hero background (subtle) ---- */
const heroBg = document.querySelector('.hero-img');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrolled * 0.25}px)`;
    }
  }, { passive: true });
}

/* ---- Add active nav link style ---- */
const style = document.createElement('style');
style.textContent = `
  .nav-link.active-link {
    color: var(--gold, #D89A43) !important;
  }
  .nav-link.active-link::after {
    width: calc(100% - 28px) !important;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;
document.head.appendChild(style);

/* ---- Preloader (optional) ---- */
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
