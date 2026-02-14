/* ============================================
   Style by Jesús — Main Script
   ============================================ */

(function () {
  'use strict';

  const TOTAL_IMAGES = 56;

  // ---- Populate masonry grid ----
  const masonry = document.getElementById('masonry');
  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= TOTAL_IMAGES; i++) {
    const num = String(i).padStart(2, '0');
    const item = document.createElement('div');
    item.className = 'masonry__item';
    item.dataset.index = i - 1;

    const img = document.createElement('img');
    img.src = `images/${num}.webp`;
    img.alt = `Visual merchandising work by Jesús Isaac Cervantes — ${i}`;
    img.loading = i <= 6 ? 'eager' : 'lazy';
    img.decoding = 'async';

    item.appendChild(img);
    fragment.appendChild(item);
  }

  masonry.appendChild(fragment);

  // ---- Scroll-triggered reveal for masonry items ----
  const masonryItems = document.querySelectorAll('.masonry__item');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger the animation slightly based on position
          const rect = entry.target.getBoundingClientRect();
          const delay = (rect.left / window.innerWidth) * 150;
          entry.target.style.transitionDelay = `${delay}ms`;
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  masonryItems.forEach((item) => revealObserver.observe(item));

  // ---- Reveal for other sections ----
  document.querySelectorAll('.about__inner, .contact__inner, .portfolio__header').forEach((el) => {
    el.classList.add('reveal');
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          sectionObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach((el) => sectionObserver.observe(el));

  // ---- Nav scroll effect ----
  const nav = document.getElementById('nav');

  function handleNavScroll() {
    nav.classList.toggle('nav--scrolled', window.scrollY > 80);
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ---- Random hero background on each load ----
  const heroBgImg = document.getElementById('hero-bg');
  if (heroBgImg) {
    const randomIndex = Math.floor(Math.random() * TOTAL_IMAGES) + 1;
    const heroNum = String(randomIndex).padStart(2, '0');
    heroBgImg.src = `images/${heroNum}.webp`;

    if (heroBgImg.complete) {
      heroBgImg.classList.add('loaded');
    } else {
      heroBgImg.addEventListener('load', () => heroBgImg.classList.add('loaded'));
    }
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = nav.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Lightbox ----
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCounter = document.getElementById('lightbox-counter');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxImage() {
    const num = String(currentIndex + 1).padStart(2, '0');
    lightboxImg.src = `images/${num}.webp`;
    lightboxImg.alt = `Visual merchandising work ${currentIndex + 1} of ${TOTAL_IMAGES}`;
    lightboxCounter.textContent = `${currentIndex + 1} / ${TOTAL_IMAGES}`;
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % TOTAL_IMAGES;
    updateLightboxImage();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + TOTAL_IMAGES) % TOTAL_IMAGES;
    updateLightboxImage();
  }

  // Click on masonry items
  masonry.addEventListener('click', (e) => {
    const item = e.target.closest('.masonry__item');
    if (item) {
      openLightbox(parseInt(item.dataset.index, 10));
    }
  });

  // Lightbox controls
  document.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
  document.querySelector('.lightbox__prev').addEventListener('click', prevImage);
  document.querySelector('.lightbox__next').addEventListener('click', nextImage);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox__img-wrap')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  // Touch swipe for lightbox
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prevImage();
      else nextImage();
    }
  }, { passive: true });
})();
