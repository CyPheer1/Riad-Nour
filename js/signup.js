// Sign Up Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Password toggle functionality
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });
    
    // Password strength checker
    const passwordInput = document.getElementById('password');
    const strengthBar = document.querySelector('.strength-level');
    const strengthText = document.querySelector('.strength-text');
    
    if (passwordInput && strengthBar && strengthText) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = checkPasswordStrength(password);
            
            // Update strength bar and text
            updatePasswordStrengthUI(strength);
        });
    }
    
    // Password strength calculator
    function checkPasswordStrength(password) {
        // Return 0 for empty password
        if (!password) return 0;
        
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        
        // Complexity checks
        if (/[a-z]/.test(password)) strength += 1; // Lowercase letters
        if (/[A-Z]/.test(password)) strength += 1; // Uppercase letters
        if (/[0-9]/.test(password)) strength += 1; // Numbers
        if (/[^a-zA-Z0-9]/.test(password)) strength += 1; // Special characters
        
        return Math.min(strength, 4); // Cap at 4
    }
    
    // Update password strength UI
    function updatePasswordStrengthUI(strength) {
        // Define the width of the strength bar
        const percentage = (strength / 4) * 100;
        strengthBar.style.width = percentage + '%';
        
        // Define color and text based on strength
        let color, text;
        
        switch (strength) {
            case 0:
                color = '#e74c3c';
                text = 'Très faible';
                break;
            case 1:
                color = '#e74c3c';
                text = 'Faible';
                break;
            case 2:
                color = '#f39c12';
                text = 'Moyen';
                break;
            case 3:
                color = '#3498db';
                text = 'Fort';
                break;
            case 4:
                color = '#27ae60';
                text = 'Très fort';
                break;
        }
        
        strengthBar.style.backgroundColor = color;
        strengthText.textContent = text;
    }
    
    // Form validation
    const signupForm = document.querySelector('.signup-form');
    const confirmPasswordInput = document.getElementById('confirm-password');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Password matching validation
            if (passwordInput && confirmPasswordInput) {
                if (passwordInput.value !== confirmPasswordInput.value) {
                    isValid = false;
                    showValidationError(confirmPasswordInput, 'Les mots de passe ne correspondent pas');
                } else {
                    clearValidationError(confirmPasswordInput);
                }
            }
            
            // Password strength validation
            if (passwordInput && passwordInput.value) {
                const strength = checkPasswordStrength(passwordInput.value);
                if (strength < 2) { // At least 'Fair' strength required
                    isValid = false;
                    showValidationError(passwordInput, 'Le mot de passe est trop faible');
                } else {
                    clearValidationError(passwordInput);
                }
            }
            
            // Email validation
            const emailInput = document.getElementById('email');
            if (emailInput && emailInput.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    isValid = false;
                    showValidationError(emailInput, 'Veuillez entrer une adresse email valide');
                } else {
                    clearValidationError(emailInput);
                }
            }
            
            // Phone validation
            const phoneInput = document.getElementById('phone');
            if (phoneInput && phoneInput.value) {
                const phonePattern = /^\+?[0-9\s\-\(\)]{8,}$/;
                if (!phonePattern.test(phoneInput.value)) {
                    isValid = false;
                    showValidationError(phoneInput, 'Veuillez entrer un numéro de téléphone valide');
                } else {
                    clearValidationError(phoneInput);
                }
            }
            
            if (!isValid) {
                event.preventDefault();
            } else {
                // For demo purposes, prevent actual form submission and show success message
                event.preventDefault();
                showSuccessMessage();
            }
        });
    }
    
    // Show validation error
    function showValidationError(inputElement, message) {
        // Clear any existing error
        clearValidationError(inputElement);
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'validation-error';
        errorElement.textContent = message;
        
        // Add error class to input
        inputElement.classList.add('error');
        
        // Insert error message after input or its parent for password field
        const parentElement = inputElement.closest('.form-group');
        parentElement.appendChild(errorElement);
    }
    
    // Clear validation error
    function clearValidationError(inputElement) {
        // Remove error class
        inputElement.classList.remove('error');
        
        // Find and remove any existing error message
        const parentElement = inputElement.closest('.form-group');
        const errorElement = parentElement.querySelector('.validation-error');
        if (errorElement) {
            parentElement.removeChild(errorElement);
        }
    }
    
    // Show success message
    function showSuccessMessage() {
        const signupContent = document.querySelector('.signup-content');
        const formElement = signupContent.querySelector('.signup-form');
        const socialSignup = signupContent.querySelector('.social-signup');
        const loginLink = signupContent.querySelector('.login-link');
        const successMessage = signupContent.querySelector('.success-message');
        
        // Hide form and other elements
        formElement.style.display = 'none';
        if (socialSignup) socialSignup.style.display = 'none';
        if (loginLink) loginLink.style.display = 'none';
        
        // Show success message
        successMessage.style.display = 'block';
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }
}); 