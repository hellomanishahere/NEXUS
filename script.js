document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const messageInput = form.querySelector('textarea');
    const submitBtn = form.querySelector('.contact-btn');

    function createErrorElement(message) {
        const error = document.createElement('span');
        error.className = 'error-message';
        error.style.color = '#ff4655';
        error.style.fontSize = '0.85rem';
        error.style.marginTop = '-10px';
        error.style.display = 'block';
        error.textContent = message;
        return error;
    }

    function clearErrors() {
        const errors = form.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());
        
        [nameInput, emailInput, messageInput].forEach(input => {
            input.style.borderColor = '#2A2C36';
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(input, message) {
        input.style.borderColor = '#ff4655';
        const errorElement = createErrorElement(message);
        input.parentElement.insertBefore(errorElement, input.nextSibling);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();

        let isValid = true;
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name) {
            showError(nameInput, 'Please enter your name');
            isValid = false;
        }

        if (!email) {
            showError(emailInput, 'Please provide an email address');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError(emailInput, 'Please provide a valid email address');
            isValid = false;
        }

        if (!message) {
            showError(messageInput, 'Please write a message');
            isValid = false;
        }

        if (isValid) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you! Your message has been sent successfully.');
                form.reset();
                submitBtn.textContent = 'Submit';
                submitBtn.disabled = false;
            }, 1500);
        }
    });

    emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        const existingError = this.nextElementSibling;
        
        if (existingError && existingError.classList.contains('error-message')) {
            existingError.remove();
            this.style.borderColor = '#2A2C36';
        }

        if (email && !isValidEmail(email)) {
            showError(this, 'Please provide a valid email address');
        }
    });

    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', function() {
            const nextElement = this.nextElementSibling;
            if (nextElement && nextElement.classList.contains('error-message')) {
                nextElement.remove();
                this.style.borderColor = '#2A2C36';
            }
        });
    });
});
