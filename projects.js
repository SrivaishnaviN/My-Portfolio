// Projects filtering functionality
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  // Filter projects based on category
  const filterProjects = (category) => {
    projectCards.forEach(card => {
      const cardCategories = card.dataset.category?.split(' ') || [];
      
      if (category === 'all' || cardCategories.includes(category)) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  };
  
  // Set active filter button
  const setActiveBtn = (btn) => {
    filterBtns.forEach(button => {
      button.classList.remove('active');
    });
    btn.classList.add('active');
  };
  
  // Add click event to filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.filter;
      setActiveBtn(btn);
      filterProjects(category);
    });
  });
  
  // Initialize with "all" filter active
  filterProjects('all');
});