// Animation functionality
document.addEventListener('DOMContentLoaded', () => {
  // Initialize animation for elements with animate-on-scroll class
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
    );
  };

  const animateOnScroll = () => {
    animateElements.forEach(element => {
      if (isElementInViewport(element)) {
        const animationType = element.getAttribute('data-animation');
        if (animationType) {
          element.classList.add(animationType);
        }
        element.classList.add('animated');
      }
    });
  };

  // Page transition animation
  const pageTransition = document.createElement('div');
  pageTransition.classList.add('page-transition');
  document.body.appendChild(pageTransition);

  window.addEventListener('load', () => {
    // Trigger initial animations
    setTimeout(() => {
      animateOnScroll();
      pageTransition.classList.add('loaded');
    }, 300);
  });

  window.addEventListener('scroll', animateOnScroll);
  
  // Add scroll wheel animation
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const aboutSection = document.querySelector('#about');
      if (aboutSection) {
        window.scrollTo({
          top: aboutSection.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  }
});