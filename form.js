// Contact form validation and submission
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  
  // Error messages containers
  const nameError = nameInput.nextElementSibling;
  const emailError = emailInput.nextElementSibling;
  const messageError = messageInput.nextElementSibling;
  
  // Validation functions
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
  
  // Input event listeners for real-time validation
  nameInput.addEventListener('input', () => {
    validateName(nameInput.value);
  });
  
  emailInput.addEventListener('input', () => {
    validateEmail(emailInput.value);
  });
  
  messageInput.addEventListener('input', () => {
    validateMessage(messageInput.value);
  });
  
  // Form submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName(nameInput.value);
    const isEmailValid = validateEmail(emailInput.value);
    const isMessageValid = validateMessage(messageInput.value);
    
    // If all validations pass, submit form
    if (isNameValid && isEmailValid && isMessageValid) {
      // Send data to backend
      fetch('http://localhost:5001/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameInput.value,
          email: emailInput.value,
          message: messageInput.value
        })
      })
      .then(response => response.json())
      .then(data => {
        // Show success or error message based on response
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.textContent = data.message || 'Thank you! Your message has been sent.';
        successMessage.style.color = 'var(--color-success)';
        successMessage.style.padding = 'var(--space-4)';
        successMessage.style.marginTop = 'var(--space-4)';
        successMessage.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
        successMessage.style.borderRadius = 'var(--radius-md)';
        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);
      })
      .catch(error => {
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = 'Failed to send message. Please try again later.';
        errorMessage.style.color = 'var(--color-error)';
        errorMessage.style.padding = 'var(--space-4)';
        errorMessage.style.marginTop = 'var(--space-4)';
        errorMessage.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        errorMessage.style.borderRadius = 'var(--radius-md)';
        contactForm.innerHTML = '';
        contactForm.appendChild(errorMessage);
      });
    }
  });
});