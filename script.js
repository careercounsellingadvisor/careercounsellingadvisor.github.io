/**
 * CCA - Career Counselling Advisor
 * Main JavaScript File
 * Handles interactive functionality
 */

// ============================================
// SMOOTH SCROLLING
// ============================================
document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // HERO SLIDER
    // ============================================
    const heroSlider = {
        currentSlide: 0,
        slides: document.querySelectorAll('.slide'),
        dots: document.querySelectorAll('.slider-dot'),
        autoPlayInterval: null,
        autoPlayDelay: 5000, // 5 seconds

        init: function () {
            if (this.slides.length === 0) return;

            // Show first slide
            this.showSlide(0);

            // Setup navigation
            this.setupNavigation();

            // Start autoplay
            this.startAutoPlay();

            // Pause on hover
            const sliderContainer = document.querySelector('.hero-slider');
            if (sliderContainer) {
                sliderContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
                sliderContainer.addEventListener('mouseleave', () => this.startAutoPlay());
            }
        },

        showSlide: function (index) {
            // Remove active class from all slides and dots
            this.slides.forEach(slide => slide.classList.remove('active'));
            this.dots.forEach(dot => dot.classList.remove('active'));

            // Add active class to current slide and dot
            if (this.slides[index]) {
                this.slides[index].classList.add('active');
            }
            if (this.dots[index]) {
                this.dots[index].classList.add('active');
            }

            this.currentSlide = index;
        },

        nextSlide: function () {
            let next = this.currentSlide + 1;
            if (next >= this.slides.length) {
                next = 0;
            }
            this.showSlide(next);
        },

        prevSlide: function () {
            let prev = this.currentSlide - 1;
            if (prev < 0) {
                prev = this.slides.length - 1;
            }
            this.showSlide(prev);
        },

        setupNavigation: function () {
            // Arrow navigation
            const prevArrow = document.querySelector('.slider-arrow.prev');
            const nextArrow = document.querySelector('.slider-arrow.next');

            if (prevArrow) {
                prevArrow.addEventListener('click', () => {
                    this.prevSlide();
                    this.resetAutoPlay();
                });
            }

            if (nextArrow) {
                nextArrow.addEventListener('click', () => {
                    this.nextSlide();
                    this.resetAutoPlay();
                });
            }

            // Dot navigation
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    this.showSlide(index);
                    this.resetAutoPlay();
                });
            });

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    this.prevSlide();
                    this.resetAutoPlay();
                } else if (e.key === 'ArrowRight') {
                    this.nextSlide();
                    this.resetAutoPlay();
                }
            });
        },

        startAutoPlay: function () {
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoPlayDelay);
        },

        stopAutoPlay: function () {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        },

        resetAutoPlay: function () {
            this.stopAutoPlay();
            this.startAutoPlay();
        }
    };

    // Initialize slider
    heroSlider.init();

    // Smooth scroll for anchor links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Don't prevent default for empty hash
            if (href === '#') return;

            e.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add shadow on scroll
        if (scrollTop > 50) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }

        lastScrollTop = scrollTop;
    });

    // ============================================
    // ANIMATE ON SCROLL
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with data-animate attribute
    const animateElements = document.querySelectorAll('[data-animate]');
    animateElements.forEach(el => observer.observe(el));

    // ============================================
    // COURSE CARDS INTERACTION
    // ============================================
    const courseCards = document.querySelectorAll('.group');

    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // ============================================
    // TESTIMONIAL CARDS HOVER EFFECT
    // ============================================
    const testimonialCards = document.querySelectorAll('.group');

    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            const gradient = this.querySelector('.absolute.top-0');
            if (gradient) {
                gradient.style.transform = 'scaleX(1)';
            }
        });
    });

    // ============================================
    // MOBILE MENU TOGGLE (if needed in future)
    // ============================================
    function initMobileMenu() {
        const mobileMenuButton = document.querySelector('[data-mobile-menu-toggle]');
        const mobileMenu = document.querySelector('[data-mobile-menu]');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', function () {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }

    initMobileMenu();

    // ============================================
    // FORM VALIDATION (if contact form exists)
    // ============================================
    const contactForm = document.querySelector('#contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = this.querySelector('[name="name"]').value;
            const email = this.querySelector('[name="email"]').value;
            const phone = this.querySelector('[name="phone"]').value;
            const message = this.querySelector('[name="message"]').value;

            // Basic validation
            if (!name || !email || !phone) {
                alert('Please fill in all required fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Phone validation (Indian format)
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                alert('Please enter a valid 10-digit phone number');
                return;
            }

            // If validation passes, you can submit the form
            console.log('Form submitted:', { name, email, phone, message });
            alert('Thank you for your enquiry! We will contact you soon.');
            this.reset();
        });
    }

    // ============================================
    // LAZY LOADING IMAGES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================
    const scrollToTopBtn = document.querySelector('[data-scroll-top]');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.remove('hidden');
            } else {
                scrollToTopBtn.classList.add('hidden');
            }
        });

        scrollToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // COUNTER ANIMATION (for stats if added)
    // ============================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // Observe counter elements
    const counters = document.querySelectorAll('[data-counter]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.counter);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ============================================
    // WHATSAPP CLICK TRACKING
    // ============================================
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');

    whatsappLinks.forEach(link => {
        link.addEventListener('click', function () {
            console.log('WhatsApp link clicked');
            // You can add analytics tracking here
        });
    });

    // ============================================
    // PHONE CALL TRACKING
    // ============================================
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

    phoneLinks.forEach(link => {
        link.addEventListener('click', function () {
            console.log('Phone link clicked:', this.href);
            // You can add analytics tracking here
        });
    });

    // ============================================
    // CONSOLE BRANDING
    // ============================================
    console.log('%c🎓 CCA - Career Counselling Advisor', 'color: #C9A961; font-size: 20px; font-weight: bold;');
    console.log('%cWebsite developed with ❤️', 'color: #666; font-size: 12px;');

});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function calls
 */
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// EXPORT FUNCTIONS (if using modules)
// ============================================
// export { debounce, throttle, isInViewport };
