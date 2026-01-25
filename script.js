/**
 * CCA - Career Counselling Advisor
 * CLEAN + USED JavaScript (SEO & Performance Optimized)
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
     HERO SLIDER (USED)
  ========================================= */
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevArrow = document.querySelector('.slider-arrow.prev');
  const nextArrow = document.querySelector('.slider-arrow.next');
  let currentSlide = 0;
  let sliderInterval;

  if (slides.length > 0) {
    showSlide(0);
    startAutoPlay();

    prevArrow?.addEventListener('click', () => {
      prevSlide();
      resetAutoPlay();
    });

    nextArrow?.addEventListener('click', () => {
      nextSlide();
      resetAutoPlay();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        resetAutoPlay();
      });
    });
  }

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    slides[index]?.classList.add('active');
    dots[index]?.classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  function startAutoPlay() {
    sliderInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoPlay() {
    clearInterval(sliderInterval);
    startAutoPlay();
  }

  /* =========================================
     SMOOTH SCROLL (USED)
  ========================================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    });
  });

  /* =========================================
     NAVBAR SHADOW ON SCROLL (USED)
  ========================================= */
  const navbar = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('shadow-lg', window.scrollY > 50);
  });

  /* =========================================
     COURSE CARD HOVER (USED)
  ========================================= */
  document.querySelectorAll('.group').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-6px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  /* =========================================
     MOBILE MENU TOGGLE (USED)
  ========================================= */
  const mobileBtn = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      menuIcon?.classList.toggle('hidden');
      closeIcon?.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon?.classList.remove('hidden');
        closeIcon?.classList.add('hidden');
      });
    });
  }

  /* =========================================
     CONTACT FORM BASIC VALIDATION (USED)
  ========================================= */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Thank you! We will contact you soon.');
      contactForm.reset();
    });
  }

  /* =========================================
     SCROLL TO TOP (OPTIONAL – USED IF EXISTS)
  ========================================= */
  const scrollTopBtn = document.querySelector('[data-scroll-top]');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('hidden', window.scrollY < 300);
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =========================================
     CONSOLE BRANDING
  ========================================= */
  console.log('%c🎓 CCA - Career Counselling Advisor', 'color:#C9A961;font-size:18px;font-weight:bold');
});
