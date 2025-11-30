/**
 * Phorma Scientific - Minimal JavaScript
 * Zero-bloat, vanilla JavaScript implementation
 * Handles mobile navigation toggle and dark mode theme switching
 */

(function() {
  'use strict';

  // Dark Mode Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const navLogoImg = document.querySelector('.nav-logo img');
  const heroLogoImg = document.querySelector('.hero-logo');

  // Function to update logos based on theme
  function updateLogos(theme) {
    const isSpanish = window.location.pathname.includes('/es/');
    const basePath = isSpanish ? '../assets/' : 'assets/';

    const logoSrc = theme === 'dark' ? basePath + 'logo-invertido.svg' : basePath + 'logo.svg';

    // Update navigation logo
    if (navLogoImg) {
      navLogoImg.src = logoSrc;
    }

    // Update hero logo
    if (heroLogoImg) {
      heroLogoImg.src = logoSrc;
    }
  }

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', currentTheme);
  updateLogos(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const theme = html.getAttribute('data-theme');
      const newTheme = theme === 'dark' ? 'light' : 'dark';

      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateLogos(newTheme);
    });
  }

  // Mobile Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const isOpen = navMenu.classList.contains('is-open');

      if (isOpen) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      } else {
        navMenu.classList.add('is-open');
        navToggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);

      if (!isClickInsideNav && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mobile menu when pressing Escape
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Smooth scroll for anchor links (optional enhancement)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Don't prevent default for #contact if it's just a section marker
      if (href === '#' || href === '') {
        return;
      }

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('is-open')) {
          navMenu.classList.remove('is-open');
          if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
          }
        }

        // Smooth scroll to target
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
})();
