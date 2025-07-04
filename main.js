// Main JavaScript functionality to initialize and coordinate all features
document.addEventListener('DOMContentLoaded', () => {
  // Page loading animation
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    const preloader = document.getElementById('preloader');
    
    // Wait a minimum amount of time to ensure animation is visible
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }, 500); // Minimum time in milliseconds
  });

  // Create and show the assets folder and placeholder for profile image
  const createAssets = () => {
    // This is just a placeholder function to acknowledge the assets folder
    // In a real project, you would upload actual images to the assets folder
    console.log('Assets loaded: profile.jpg and resume.pdf should be in assets/ folder');
  };

  // Initialize the profile picture with a cage image
  const initProfilePicture = () => {
    const profileImg = document.querySelector('.about-image img');
    
    if (profileImg) {
      // Set the cage image from Pexels
      profileImg.src = 'https://images.pexels.com/photos/2883510/pexels-photo-2883510.jpeg?auto=compress&cs=tinysrgb&w=600';
      profileImg.alt = 'Decorative metal cage';
      
      profileImg.onerror = function() {
        // Fallback if the cage image fails to load
        this.src = 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600';
        console.warn('Cage image failed to load. Using placeholder image.');
      };
    }
  };

  // Initialize resume download
  const initResumeDownload = () => {
    const resumeLinks = document.querySelectorAll('a[href="assets/resume.pdf"]');
    
    resumeLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // In a real project, this would download the actual resume
        // For this example, we'll prevent the default action and show a message
        if (!link.getAttribute('data-initialized')) {
          e.preventDefault();
          alert('Note: In a real project, this would download your actual resume.pdf file.');
          link.setAttribute('data-initialized', 'true');
        }
      });
    });
  };

  // Initialize all components
  const init = () => {
    createAssets();
    initProfilePicture();
    initResumeDownload();
  };

  // Run initialization
  init();
});