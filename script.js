/* ============================================
   Portfolio — JavaScript
   Smooth scroll, IntersectionObserver animations,
   Mobile nav, Active link tracking, Form validation
   ============================================ */

(function () {
    'use strict';

    // ============================
    // Scroll Reveal — IntersectionObserver
    // ============================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px',
        }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // ============================
    // Navbar — Scroll shadow
    // ============================
    const navbar = document.getElementById('navbar');

    function handleNavScroll() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ============================
    // Mobile Navigation Toggle
    // ============================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    // Close mobile menu when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });

    // ============================
    // Active Navigation Link Tracking
    // ============================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        const scrollPos = window.scrollY + 120;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // ============================
    // Smooth Scroll for Anchor Links
    // ============================
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        });
    });

    // ============================
    // Contact Form — Frontend Validation
    // ============================
    const contactForm = document.getElementById('contactForm');
    const formNote = document.getElementById('formNote');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Clear previous state
            formNote.textContent = '';
            formNote.className = 'form-note';

            // Validation
            if (!name || !email || !message) {
                formNote.textContent = 'Please fill in all fields.';
                formNote.classList.add('error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formNote.textContent = 'Please enter a valid email address.';
                formNote.classList.add('error');
                return;
            }

            // Success state (frontend only)
            formNote.textContent = 'Thanks for reaching out! I\'ll get back to you soon.';
            formNote.classList.add('success');
            contactForm.reset();

            // Clear message after 5 seconds
            setTimeout(() => {
                formNote.textContent = '';
                formNote.className = 'form-note';
            }, 5000);
        });
    }

    // ============================
    // Hero entrance animation
    // ============================
    window.addEventListener('load', () => {
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');

        if (heroContent) {
            heroContent.classList.add('visible');
        }
        if (heroVisual) {
            setTimeout(() => heroVisual.classList.add('visible'), 200);
        }
    });
})();
