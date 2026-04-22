document.addEventListener('DOMContentLoaded', () => {
  
  /* ============ MOBILE NAVIGATION ============ */
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const primaryNav = document.querySelector('.primary-navigation');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isVisible = primaryNav.getAttribute('data-visible') === 'true';
      
      if (!isVisible) {
        primaryNav.setAttribute('data-visible', 'true');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      } else {
        primaryNav.setAttribute('data-visible', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const isVisible = primaryNav.getAttribute('data-visible') === 'true';
        if (isVisible) {
          primaryNav.setAttribute('data-visible', 'false');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      }
    });
  }

  /* ============ SCROLL ANIMATIONS ============ */
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        animationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('[data-animate]');
  animatedElements.forEach(el => {
    animationObserver.observe(el);
  });

  /* ============ HERO ANIMATIONS ON LOAD ============ */
  const heroElements = document.querySelectorAll('.hero-section [data-animate]');
  heroElements.forEach((el, index) => {
    const delay = index * 0.15;
    setTimeout(() => {
      el.classList.add('animated');
    }, delay * 1000);
  });

  /* ============ ACTIVE NAV LINK ON SCROLL ============ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.parentElement.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.parentElement.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  /* ============ SMOOTH SCROLL FOR NAV LINKS ============ */
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        if (primaryNav && primaryNav.getAttribute('data-visible') === 'true') {
          primaryNav.setAttribute('data-visible', 'false');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      }
    });
  });

  /* ============ REVIEW MODAL ============ */
  const reviewModal = document.getElementById('reviewModal');
  const leaveReviewBtn = document.getElementById('leaveReviewBtn');
  const closeModal = document.getElementById('closeModal');

  if (leaveReviewBtn && reviewModal) {
    leaveReviewBtn.addEventListener('click', () => {
      reviewModal.setAttribute('data-visible', 'true');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeModal && reviewModal) {
    closeModal.addEventListener('click', () => {
      reviewModal.setAttribute('data-visible', 'false');
      document.body.style.overflow = '';
    });

    reviewModal.addEventListener('click', (e) => {
      if (e.target === reviewModal) {
        reviewModal.setAttribute('data-visible', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && reviewModal && reviewModal.getAttribute('data-visible') === 'true') {
      reviewModal.setAttribute('data-visible', 'false');
      document.body.style.overflow = '';
    }
  });

  /* ============ RATING STARS ============ */
  const starBtns = document.querySelectorAll('.star-btn');
  const ratingInput = document.getElementById('rating');

  if (starBtns.length > 0 && ratingInput) {
    starBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const rating = parseInt(btn.getAttribute('data-rating'));
        ratingInput.value = rating;

        starBtns.forEach(star => {
          const starRating = parseInt(star.getAttribute('data-rating'));
          if (starRating <= rating) {
            star.classList.add('active');
          } else {
            star.classList.remove('active');
          }
        });
      });

      btn.addEventListener('mouseenter', () => {
        const rating = parseInt(btn.getAttribute('data-rating'));
        starBtns.forEach(star => {
          const starRating = parseInt(star.getAttribute('data-rating'));
          if (starRating <= rating) {
            star.classList.add('active');
          }
        });
      });

      btn.addEventListener('mouseleave', () => {
        const currentRating = parseInt(ratingInput.value);
        starBtns.forEach(star => {
          const starRating = parseInt(star.getAttribute('data-rating'));
          if (starRating > currentRating) {
            star.classList.remove('active');
          }
        });
      });
    });
  }

  /* ============ CONTACT FORM ============ */
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      console.log('Form submitted:', data);
      
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }

  /* ============ REVIEW FORM ============ */
  const reviewForm = document.getElementById('reviewForm');
  
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(reviewForm);
      const data = Object.fromEntries(formData);
      
      console.log('Review submitted:', data);
      
      alert('Thank you for your review!');
      
      if (reviewModal) {
        reviewModal.setAttribute('data-visible', 'false');
        document.body.style.overflow = '';
      }
      
      reviewForm.reset();
    });
  }

  /* ============ PROGRESS BAR ANIMATION ============ */
  const progressBars = document.querySelectorAll('.progress-fill');
  
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = '0';
        setTimeout(() => {
          entry.target.style.width = width;
        }, 100);
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  progressBars.forEach(bar => {
    progressObserver.observe(bar);
  });
});