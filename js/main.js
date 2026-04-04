// ============================================
// TAPOVAN RESORT — MAIN JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── PRELOADER ──
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 600);
    }, 1800);
  }

  // ── NAVBAR SCROLL ──
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 80);
    });
  }

  // ── MOBILE MENU ──
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu-close');

  hamburger?.addEventListener('click', () => mobileMenu?.classList.add('open'));
  mobileClose?.addEventListener('click', () => mobileMenu?.classList.remove('open'));
  mobileMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu?.classList.remove('open'));
  });

  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  reveals.forEach(el => observer.observe(el));

  // ── GALLERY LIGHTBOX ──
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.querySelector('.lightbox-close');

  document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
    item.addEventListener('click', () => {
      if (lightbox && lightboxImg) {
        lightboxImg.src = item.dataset.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  function closeLightbox() {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ── BOOKING FORM (Hero) ──
  const checkNowBtn = document.querySelector('.check-now-btn');
  if (checkNowBtn) {
    checkNowBtn.addEventListener('click', () => {
      const checkin = document.getElementById('checkin')?.value;
      const checkout = document.getElementById('checkout')?.value;
      const rooms = document.getElementById('booking-rooms')?.value;
      const adults = document.getElementById('adults')?.value;

      if (!checkin || !checkout) {
        alert('Please select check-in and check-out dates.');
        return;
      }

      // EDIT: Replace with your actual booking system URL or WhatsApp number
      const phone = '919956009727'; // ← EDIT: Your WhatsApp number (with country code, no +)
      const msg = `Hello! I'd like to book at Tapovan Resort.\n\nCheck-in: ${checkin}\nCheck-out: ${checkout}\nRooms: ${rooms || 1}\nAdults: ${adults || 2}\n\nPlease confirm availability.`;
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }

  // ── CONTACT FORM ──
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('cf-name')?.value;
      const phone = document.getElementById('cf-phone')?.value;
      const email = document.getElementById('cf-email')?.value;
      const checkin = document.getElementById('cf-checkin')?.value;
      const checkout = document.getElementById('cf-checkout')?.value;
      const guests = document.getElementById('cf-guests')?.value;
      const message = document.getElementById('cf-message')?.value;

      // EDIT: Replace with your WhatsApp number
      const waPhone = '919956009727'; // ← EDIT: Your WhatsApp number
      const msg = `*New Booking Enquiry — Tapovan Resort*\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nCheck-in: ${checkin || 'Flexible'}\nCheck-out: ${checkout || 'Flexible'}\nGuests: ${guests || 'Not specified'}\nMessage: ${message || 'None'}`;

      window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(msg)}`, '_blank');

      const successMsg = document.querySelector('.form-success');
      if (successMsg) {
        successMsg.style.display = 'block';
        contactForm.reset();
        setTimeout(() => successMsg.style.display = 'none', 5000);
      }
    });
  }

  // ── NEWSLETTER FORM ──

  const subscribeForm = document.querySelector('.subscribe-form');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = subscribeForm.querySelector('input');
      if (input?.value) {
        input.value = '';
        input.placeholder = 'Thank you for subscribing!';
        setTimeout(() => input.placeholder = 'Your email address', 3000);
      }
    });
  }

  // ── ACTIVE NAV LINK ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  });

  // ── DATE DEFAULTS ──
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (d) => d.toISOString().split('T')[0];

  const checkinInputs = document.querySelectorAll('input[type="date"][id*="checkin"]');
  const checkoutInputs = document.querySelectorAll('input[type="date"][id*="checkout"]');

  checkinInputs.forEach(input => {
    input.min = formatDate(today);
    if (!input.value) input.value = formatDate(today);
  });
  checkoutInputs.forEach(input => {
    input.min = formatDate(tomorrow);
    if (!input.value) input.value = formatDate(tomorrow);
  });

  // Sync checkin → checkout minimum
  checkinInputs.forEach(input => {
    input.addEventListener('change', () => {
      const nextDay = new Date(input.value);
      nextDay.setDate(nextDay.getDate() + 1);
      checkoutInputs.forEach(out => {
        out.min = formatDate(nextDay);
        if (out.value && out.value <= input.value) out.value = formatDate(nextDay);
      });
    });
  });

});
