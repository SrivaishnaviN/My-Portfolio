// Navigation and Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('.nav-links a');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinksContainer = document.querySelector('.nav-links');
  
  // Handle scroll events for header styling
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Update active link based on scroll position
  const updateActiveLink = () => {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
      const sectionId = section.getAttribute('id');
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  // Smooth scroll to section when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Close mobile menu if open
        navLinksContainer.classList.remove('mobile-active');
        mobileMenuBtn.classList.remove('active');
        
        window.scrollTo({
          top: targetSection.offsetTop - 70, // Account for header height
          behavior: 'smooth'
        });
      }
    });
  });

  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinksContainer.classList.toggle('mobile-active');
  });

  // Back to top button functionality
  const backToTopBtn = document.querySelector('.back-to-top');
  
  const handleBackToTopVisibility = () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Event listeners
  window.addEventListener('scroll', () => {
    handleScroll();
    updateActiveLink();
    handleBackToTopVisibility();
  });

  // Initial calls
  handleScroll();
  updateActiveLink();
  handleBackToTopVisibility();
});