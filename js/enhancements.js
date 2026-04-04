// ============================================================
// TAPOVAN RESORT — ENHANCED JAVASCRIPT
// Hero Slider, Video Player, Stats Counter, Reviews & More
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── FORCE SCROLL TO TOP ON LOAD ──
  history.scrollRestoration = 'manual';
  window.scrollTo({ top: 0, behavior: 'instant' });

  // ── PRELOADER ──
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 600);
    }, 1800);
  }

  // ── CUSTOM CURSOR ──
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (dot && ring && window.matchMedia('(hover: hover)').matches) {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    };
    animateRing();
    document.querySelectorAll('a, button, .room-card, .gallery-item, .video-thumb, .hero-arrow').forEach(el => {
      el.addEventListener('mouseenter', () => { dot.classList.add('hovered'); ring.classList.add('hovered'); });
      el.addEventListener('mouseleave', () => { dot.classList.remove('hovered'); ring.classList.remove('hovered'); });
    });
  }

  // ── ANNOUNCEMENT BAR ──
  const annClose = document.querySelector('.announcement-close');
  const annBar = document.querySelector('.announcement-bar');
  annClose?.addEventListener('click', () => {
    annBar.style.maxHeight = annBar.offsetHeight + 'px';
    annBar.style.overflow = 'hidden';
    annBar.style.transition = 'max-height 0.4s ease, padding 0.4s ease, opacity 0.3s ease';
    setTimeout(() => { annBar.style.maxHeight = '0'; annBar.style.padding = '0'; annBar.style.opacity = '0'; }, 10);
    setTimeout(() => annBar.remove(), 500);
  });

  // ── NAVBAR SCROLL ──
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 80);
    });
  }

  // ── MOBILE MENU ──
  document.querySelector('.hamburger')?.addEventListener('click', () => {
    document.querySelector('.mobile-menu')?.classList.add('open');
  });
  document.querySelector('.mobile-menu-close')?.addEventListener('click', () => {
    document.querySelector('.mobile-menu')?.classList.remove('open');
  });
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => document.querySelector('.mobile-menu')?.classList.remove('open'));
  });

  // ── HERO SLIDER ──
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.hero-indicator');
  const counter = document.querySelector('.hero-counter .current');
  const totalEl = document.querySelector('.hero-counter .total');
  let currentSlide = 0;
  let sliderInterval;

  if (slides.length > 0) {
    if (totalEl) totalEl.textContent = String(slides.length).padStart(2, '0');

    const goToSlide = (index) => {
      slides[currentSlide].classList.remove('active');
      indicators[currentSlide]?.classList.remove('active');
      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      indicators[currentSlide]?.classList.add('active');
      if (counter) counter.textContent = String(currentSlide + 1).padStart(2, '0');
    };

    const nextSlide = () => goToSlide(currentSlide + 1);
    const prevSlide = () => goToSlide(currentSlide - 1);

    // Auto-play
    const startSlider = () => { sliderInterval = setInterval(nextSlide, 6000); };
    const resetSlider = () => { clearInterval(sliderInterval); startSlider(); };

    slides[0].classList.add('active');
    indicators[0]?.classList.add('active');
    startSlider();

    document.querySelector('.hero-arrow.next')?.addEventListener('click', () => { nextSlide(); resetSlider(); });
    document.querySelector('.hero-arrow.prev')?.addEventListener('click', () => { prevSlide(); resetSlider(); });

    indicators.forEach((dot, i) => {
      dot.addEventListener('click', () => { goToSlide(i); resetSlider(); });
    });

    // Touch/swipe support
    let touchStartX = 0;
    document.querySelector('.hero')?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    document.querySelector('.hero')?.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { diff > 0 ? nextSlide() : prevSlide(); resetSlider(); }
    });
  }

  // ── VIDEO SECTION ──
  const videoFeature = document.getElementById('videoFeature');
  const featureVideo = document.getElementById('featureVideo');
  const featurePlayOverlay = document.getElementById('featurePlayOverlay');
  const thumbs = document.querySelectorAll('.video-thumb');
  const playPauseBtn = document.getElementById('videoPlayPause');
  const playPauseIcon = document.getElementById('playPauseIcon');
  const muteBtn = document.getElementById('videoMute');
  const muteIcon = document.getElementById('muteIcon');

  // Helper: set UI to playing state
  const setPlayingUI = () => {
    if (playPauseIcon) playPauseIcon.className = 'fa fa-pause';
    if (featurePlayOverlay) {
      featurePlayOverlay.style.opacity = '0';
      featurePlayOverlay.style.pointerEvents = 'none';
    }
  };

  // Helper: set UI to paused state
  const setPausedUI = () => {
    if (playPauseIcon) playPauseIcon.className = 'fa fa-play';
    if (featurePlayOverlay) {
      featurePlayOverlay.style.opacity = '1';
      featurePlayOverlay.style.pointerEvents = 'auto';
    }
  };

  // Big overlay click — only fires if video is NOT playing
  featurePlayOverlay?.addEventListener('click', () => {
    if (!featureVideo) return;
    featureVideo.play();
    setPlayingUI();
  });

  // Play/Pause button — always works
  playPauseBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!featureVideo) return;
    if (featureVideo.paused) {
      featureVideo.play();
      setPlayingUI();
    } else {
      featureVideo.pause();
      setPausedUI();
    }
  });

  // Mute/Unmute button
  muteBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!featureVideo) return;
    featureVideo.muted = !featureVideo.muted;
    if (muteIcon) muteIcon.className = featureVideo.muted ? 'fa fa-volume-mute' : 'fa fa-volume-up';
  });

  // When video ends naturally
  featureVideo?.addEventListener('ended', () => {
    setPausedUI();
  });

  // Switch video when thumbnail is clicked
  const switchVideo = (src, thumbIndex) => {
    if (!featureVideo) return;
    featureVideo.pause();
    featureVideo.src = src;
    featureVideo.load();
    setPausedUI();
    thumbs.forEach((t, i) => t.classList.toggle('active', i === thumbIndex));
  };

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
      const src = thumb.dataset.src;
      if (src) switchVideo(src, i);
      videoFeature?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  // ── STATS COUNTER ──
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const start = performance.now();
        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      });
      statsObserver.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  document.querySelector('.stats') && statsObserver.observe(document.querySelector('.stats'));

  // ── REVIEWS SLIDER ──
  const reviewCards = document.querySelectorAll('.review-card');
  const reviewDots = document.querySelectorAll('.review-dot');
  let currentReview = 0;
  let reviewInterval;

const showReview = (index) => {
    const dots = document.querySelectorAll('.review-dot');
    reviewCards[currentReview]?.classList.remove('active');
    dots[currentReview]?.classList.remove('active');
    currentReview = (index + reviewCards.length) % reviewCards.length;
    reviewCards[currentReview]?.classList.add('active');
    dots[currentReview]?.classList.add('active');
  };

if (reviewCards.length > 0) {
    // Dynamically generate one dot per review card
    const dotsContainer = document.getElementById('reviewDots');
    if (dotsContainer) {
      reviewCards.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'review-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => showReview(i));
        dotsContainer.appendChild(dot);
      });
    }
    reviewCards[0].classList.add('active');
    reviewInterval = setInterval(() => showReview(currentReview + 1), 5000);

    document.querySelector('.review-prev')?.addEventListener('click', () => {
      showReview(currentReview - 1);
      clearInterval(reviewInterval);
      reviewInterval = setInterval(() => showReview(currentReview + 1), 5000);
    });
    document.querySelector('.review-next')?.addEventListener('click', () => {
      showReview(currentReview + 1);
      clearInterval(reviewInterval);
      reviewInterval = setInterval(() => showReview(currentReview + 1), 5000);
    });
    reviewDots.forEach((dot, i) => dot.addEventListener('click', () => showReview(i)));
  }
  const reviewsTrack = document.querySelector('.reviews-track');
  function updateReviewHeight() {
  if (!reviewsTrack) return;

  const activeCard = document.querySelector('.review-card.active');
  if (!activeCard) return;

  reviewsTrack.style.height = activeCard.offsetHeight + 'px';
}

  // ── BOOKING MODAL ──
  const modal = document.getElementById('bookingModal');
  const openModalBtns = document.querySelectorAll('[data-modal="booking"]');
  const closeModalBtn = document.querySelector('.modal-close');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal?.classList.add('open');
      document.body.style.overflow = 'hidden';
      // Pre-select room if specified
      const room = btn.dataset.room;
      if (room) {
        document.querySelectorAll('.room-option').forEach(opt => {
          opt.classList.toggle('selected', opt.dataset.room === room);
        });
      }
    });
  });

  const closeModal = () => {
    modal?.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeModalBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal?.classList.contains('open')) closeModal(); });

  // Room option selection
  document.querySelectorAll('.room-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.room-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  // Modal form submit
  document.getElementById('modalForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedRoom = document.querySelector('.room-option.selected')?.dataset.room || 'Any Room';
    const checkin = document.getElementById('m-checkin')?.value;
    const checkout = document.getElementById('m-checkout')?.value;
    const guests = document.getElementById('m-guests')?.value;
    const name = document.getElementById('m-name')?.value;
    const phone = document.getElementById('m-phone')?.value;

    // EDIT: Replace with your WhatsApp number
    const waPhone = '919956009727';
    const msg = `*Booking Request — Tapovan Resort*\n\nRoom: ${selectedRoom}\nCheck-in: ${checkin}\nCheck-out: ${checkout}\nGuests: ${guests}\nName: ${name}\nPhone: ${phone}`;
    window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(msg)}`, '_blank');
    closeModal();
  });

  // ── AVAILABILITY WIDGET ──
document.getElementById('checkAvailBtn')?.addEventListener('click', () => {
    const checkin = document.getElementById('avail-checkin')?.value;
    const checkout = document.getElementById('avail-checkout')?.value;
    const guests = document.getElementById('avail-guests')?.value;
    const result = document.getElementById('availResult');

    if (!checkin || !checkout) {
      alert('Please select both check-in and check-out dates.');
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);

    if (checkinDate < today) {
      if (result) {
        result.classList.add('show');
        result.innerHTML = `<p style="color:#ff6b6b;">✕ <strong>Invalid date.</strong> Check-in date cannot be in the past. Please select a future date.</p>`;
      }
      return;
    }

    if (checkoutDate <= checkinDate) {
      if (result) {
        result.classList.add('show');
        result.innerHTML = `<p style="color:#ff6b6b;">✕ <strong>Invalid dates.</strong> Check-out must be after check-in.</p>`;
      }
      return;
    }

    // Valid dates — show available message
    if (result) {
      result.classList.add('show');
      result.innerHTML = `
        <p>✦ <strong style="color:var(--gold);">Dates Available!</strong><br>
        We have to confirm the availability for your selected dates.<br>
        <small style="opacity:0.7;">Check-in: ${checkin} &nbsp;|&nbsp; Check-out: ${checkout} &nbsp;|&nbsp; Guests: ${guests || '1-2 Guests'}</small></p>
        <a href="https://wa.me/919956009727?text=I'd like to book from ${checkin} to ${checkout} for ${guests}."
          target="_blank"
          style="display:inline-block;margin-top:1rem;padding:0.7rem 1.5rem;background:var(--gold);color:var(--dark);font-size:0.78rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;">
          CONFIRM VIA WHATSAPP →
        </a>
      `;
    }
  });

  // ── GALLERY LIGHTBOX ──
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');

  document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
    item.addEventListener('click', () => {
      if (lightbox && lightboxImg) {
        lightboxImg.src = item.dataset.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  document.querySelector('.lightbox-close')?.addEventListener('click', () => {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  });
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(el => revealObserver.observe(el));

  // ── SCROLL TO TOP ──
  const scrollTopBtn = document.querySelector('.scroll-top');
  window.addEventListener('scroll', () => {
    scrollTopBtn?.classList.toggle('visible', window.scrollY > 500);
  });
  scrollTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ── DATE DEFAULTS ──
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const fmt = (d) => d.toISOString().split('T')[0];

	document.querySelectorAll('input[type="date"]').forEach(input => {
    input.min = fmt(today);
    input.value = ''; // ← clear any browser-cached value first
    if (input.id.includes('checkin') || input.id.includes('m-checkin') || input.id.includes('avail-checkin')) {
      input.value = fmt(today);
    }
    if (input.id.includes('checkout') || input.id.includes('m-checkout') || input.id.includes('avail-checkout')) {
      input.value = fmt(tomorrow);
      input.min = fmt(tomorrow);
    }
  });

  // ── CONTACT FORM → WHATSAPP ──
  document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name')?.value;
    const phone = document.getElementById('cf-phone')?.value;
    const email = document.getElementById('cf-email')?.value;
    const checkin = document.getElementById('cf-checkin')?.value;
    const checkout = document.getElementById('cf-checkout')?.value;
    const guests = document.getElementById('cf-guests')?.value;
    const message = document.getElementById('cf-message')?.value;

    // EDIT: Replace with your WhatsApp number
    const waPhone = '919956009727';
    const msg = `*New Enquiry — Tapovan Resort*\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email || 'Not given'}\nCheck-in: ${checkin || 'Flexible'}\nCheck-out: ${checkout || 'Flexible'}\nGuests: ${guests || 'Not specified'}\nMessage: ${message || 'None'}`;
    window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(msg)}`, '_blank');

    const success = document.querySelector('.form-success');
    if (success) {
      success.style.display = 'block';
      e.target.reset();
      setTimeout(() => success.style.display = 'none', 5000);
    }
  });

  // ── BOOKING BAR ──
  document.querySelector('.check-now-btn')?.addEventListener('click', () => {
    const checkin = document.getElementById('checkin')?.value;
    const checkout = document.getElementById('checkout')?.value;
    const rooms = document.getElementById('booking-rooms')?.value;
    const adults = document.getElementById('adults')?.value;
    if (!checkin || !checkout) { alert('Please select check-in and check-out dates.'); return; }
    // EDIT: Replace with your WhatsApp number
    const waPhone = '919956009727';
    const msg = `Hello! I'd like to book at Tapovan Resort.\n\nCheck-in: ${checkin}\nCheck-out: ${checkout}\nRooms: ${rooms || 1}\nAdults: ${adults || 2}\n\nPlease confirm availability.`;
    window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  });

  // ── NEWSLETTER ──
  document.querySelector('.subscribe-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    if (input?.value) {
      input.value = '';
      input.placeholder = '✦ Thank you for subscribing!';
      setTimeout(() => input.placeholder = 'Your email address', 4000);
    }
  });

});
