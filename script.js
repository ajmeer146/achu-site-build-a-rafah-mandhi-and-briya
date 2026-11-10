/*! Script.js - Interactive functionality for Abdullah Mandhi & Briyani */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('header');

  // Toggle mobile navigation
  function toggleMenu() {
    navLinks.classList.toggle('open');
    if (navLinks.classList.contains('open')) {
      navLinks.style.pointerEvents = 'auto';
      navLinks.style.visibility = 'visible';
    } else {
      navLinks.style.pointerEvents = 'none';
      navLinks.style.visibility = 'hidden';
    }
  }

  // Add click listener to hamburger (we'll create a hamburger button)
  // For now, close menu on link click
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    link.addEventListener('click', function() {
      if (navLinks.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // Scroll reveal with Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Reveal elements on scroll
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Form submission feedback
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Message Sent!';
      submitBtn.style.background = '#10b981';
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        contactForm.reset();
      }, 2000);
    });
  }

  // Header background change on scroll
  let lastScroll = 0;
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
      // Scrolling down - reduce header height
      header.style.height = '50px';
    } else {
      // Scrolling up - restore header height
      header.style.height = '70px';
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
});