/* ============================================
   NEXAGROWTH DIGITAL - MAIN JAVASCRIPT
   Interactions, validation, animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  
  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      mobileBtn.classList.toggle('active');
      const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
      mobileBtn.setAttribute('aria-expanded', !expanded);
    });
  }

  // Sticky Header Effect
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Scroll Reveal Animation (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after revealing to prevent re-hiding
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate').forEach(el => {
    revealObserver.observe(el);
  });

  // Active Navigation Link Highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Dynamic Copyright Year
  document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Contact Form Validation & Handling
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const message = document.getElementById('message').value.trim();

      // Reset status
      formStatus.className = 'form-status';
      formStatus.style.display = 'none';

      // Validation
      if (!name || !email || !phone || !message) {
        showFormStatus('Please fill in all required fields.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormStatus('Please enter a valid email address.', 'error');
        return;
      }

      const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
      if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        showFormStatus('Please enter a valid phone number.', 'error');
        return;
      }

      // Simulate success (replace with fetch() to backend)
      showFormStatus('Thank you! Your message has been sent successfully. We will contact you soon.', 'success');
      contactForm.reset();
      window.location.href = '404.html';
    });
  }

  function showFormStatus(message, type) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
    
    // Auto-hide after 6 seconds
    setTimeout(() => {
      formStatus.style.display = 'none';
      formStatus.className = 'form-status';
    }, 6000);
  }

  // Blog Search Functionality
  const blogSearch = document.getElementById('blogSearch');
  const blogCards = document.querySelectorAll('.blog-card');

  if (blogSearch) {
    blogSearch.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      
      blogCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const text = card.querySelector('.card-text').textContent.toLowerCase();
        const category = card.dataset.category.toLowerCase();
        
        if (title.includes(term) || text.includes(term) || category.includes(term)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Blog Category Filter
  const categoryBtns = document.querySelectorAll('.category-btn');

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;

      blogCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'flex';
          // Small fade-in effect
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Login Form Basic Validation
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;

      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }

      // Demo only - would normally fetch to auth API
      alert('Login functionality would connect to your authentication backend here.');
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        mobileBtn.classList.remove('active');
        mobileBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

}); // End DOMContentLoaded