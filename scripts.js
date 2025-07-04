// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
  // Theme functionality
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  const getCurrentTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || (prefersDarkScheme.matches ? 'dark' : 'light');
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  applyTheme(getCurrentTheme());

  themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  });

  // Navigation and Mobile Menu
  const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('.nav-links a');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinksContainer = document.querySelector('.nav-links');
  
  const handleScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };

  const updateActiveLink = () => {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
      const sectionId = section.getAttribute('id');
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
      }
    });
  };

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetSection = document.querySelector(this.getAttribute('href'));
      
      if (targetSection) {
        navLinksContainer.classList.remove('mobile-active');
        mobileMenuBtn.classList.remove('active');
        
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinksContainer.classList.toggle('mobile-active');
  });

  // Back to top functionality
  const backToTopBtn = document.querySelector('.back-to-top');
  
  const handleBackToTopVisibility = () => {
    backToTopBtn.classList.toggle('visible', window.scrollY > 500);
  };

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Animations
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85;
  };

  const animateOnScroll = () => {
    animateElements.forEach(element => {
      if (isElementInViewport(element)) {
        const animationType = element.dataset.animation || 'fadeInUp';
        const animationDelay = element.dataset.delay || '0';
        
        element.style.transitionDelay = `${animationDelay}ms`;
        element.classList.add(animationType, 'animated');
      }
    });
  };

  // Projects filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  const filterProjects = (category) => {
    projectCards.forEach(card => {
      const cardCategories = card.dataset.category?.split(' ') || [];
      const shouldShow = category === 'all' || cardCategories.includes(category);
      
      card.style.display = shouldShow ? 'block' : 'none';
      setTimeout(() => {
        card.style.opacity = shouldShow ? '1' : '0';
        card.style.transform = shouldShow ? 'translateY(0)' : 'translateY(20px)';
      }, 10);
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(button => button.classList.remove('active'));
      btn.classList.add('active');
      filterProjects(btn.dataset.filter);
    });
  });

  // Contact form validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    const nameError = nameInput.nextElementSibling;
    const emailError = emailInput.nextElementSibling;
    const messageError = messageInput.nextElementSibling;
    
    const validateName = (name) => {
      if (!name.trim()) {
        nameError.textContent = 'Name is required';
        return false;
      }
      if (name.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        return false;
      }
      nameError.textContent = '';
      return true;
    };
    
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim()) {
        emailError.textContent = 'Email is required';
        return false;
      }
      if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        return false;
      }
      emailError.textContent = '';
      return true;
    };
    
    const validateMessage = (message) => {
      if (!message.trim()) {
        messageError.textContent = 'Message is required';
        return false;
      }
      if (message.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        return false;
      }
      messageError.textContent = '';
      return true;
    };
    
    nameInput.addEventListener('input', () => validateName(nameInput.value));
    emailInput.addEventListener('input', () => validateEmail(emailInput.value));
    messageInput.addEventListener('input', () => validateMessage(messageInput.value));
    
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const isValid = validateName(nameInput.value) && 
                     validateEmail(emailInput.value) && 
                     validateMessage(messageInput.value);
      
      if (isValid) {
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.textContent = 'Thank you! Your message has been sent.';
        successMessage.style.cssText = `
          color: var(--color-success);
          padding: var(--space-4);
          margin-top: var(--space-4);
          background-color: rgba(16, 185, 129, 0.1);
          border-radius: var(--radius-md);
        `;
        
        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);
      }
    });
  }

  // Event listeners
  window.addEventListener('scroll', () => {
    handleScroll();
    updateActiveLink();
    handleBackToTopVisibility();
    animateOnScroll();
  });

  // Initialize
  handleScroll();
  updateActiveLink();
  handleBackToTopVisibility();
  animateOnScroll();
  filterProjects('all');

  // Hide preloader when content is loaded
  window.addEventListener('load', () => {
    document.getElementById('preloader').style.display = 'none';
  });

  // Certificate scroll indicator
  const certificatesGrid = document.querySelector('.certificates-grid');
  const scrollIndicator = document.querySelector('.scroll-indicator-horizontal');

  if (certificatesGrid && scrollIndicator) {
    const checkScroll = () => {
      if (certificatesGrid.scrollWidth > certificatesGrid.clientWidth) {
        scrollIndicator.classList.add('visible');
      } else {
        scrollIndicator.classList.remove('visible');
      }
    };

    certificatesGrid.addEventListener('scroll', () => {
      scrollIndicator.classList.remove('visible');
    });

    // Check on load and resize
    window.addEventListener('load', checkScroll);
    window.addEventListener('resize', checkScroll);
  }

  // Auto-scroll for gallery
  const gallery = document.querySelector('.gallery-grid');
  const wrappers = document.querySelectorAll('.gallery-img-wrapper');
  if (!gallery || wrappers.length === 0) return;

  let scrollAmount = 1.5; // px per frame
  let interval = null;
  let activeIndex = 0;

  function startAutoScroll() {
    if (interval) return;
    interval = setInterval(() => {
      gallery.scrollLeft += scrollAmount;
      // Find the image closest to the left edge
      let minDiff = Infinity;
      let newActive = 0;
      wrappers.forEach((w, i) => {
        const diff = Math.abs(w.offsetLeft - gallery.scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          newActive = i;
        }
      });
      wrappers.forEach(w => w.classList.remove('active'));
      wrappers[newActive].classList.add('active');
      activeIndex = newActive;
      // Loop
      if (gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 2) {
        gallery.scrollLeft = 0;
      }
    }, 16); // ~60fps
  }
  function stopAutoScroll() {
    clearInterval(interval);
    interval = null;
    wrappers.forEach(w => w.classList.remove('active'));
  }
  gallery.addEventListener('mouseenter', stopAutoScroll);
  gallery.addEventListener('mouseleave', startAutoScroll);
  startAutoScroll();

  // Gallery lightbox functionality
  gallery.addEventListener('click', function(e) {
    const img = e.target.closest('.gallery-img');
    if (!img) return;
    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'gallery-lightbox';
    const bigImg = document.createElement('img');
    bigImg.className = 'gallery-lightbox-img';
    bigImg.src = img.src;
    bigImg.alt = img.alt;
    lightbox.appendChild(bigImg);
    document.body.appendChild(lightbox);
    // Close on click
    lightbox.addEventListener('click', function() {
      document.body.removeChild(lightbox);
    });
  });
});