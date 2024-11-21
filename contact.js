// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const contactForm = document.getElementById('contact-form');

    // Auto-fill fields if data exists in localStorage
    nameField.value = localStorage.getItem('name') || '';
    emailField.value = localStorage.getItem('email') || '';

    // Form submission event listener
    contactForm.addEventListener('submit', event => {
        event.preventDefault(); // Prevent default form submission

        // Validate required fields
        let isValid = true;
        document.querySelectorAll('input[required], textarea[required]').forEach(field => {
            const star = field.nextElementSibling; // Locate the star element
            if (field.value.trim() === '') {
                // Highlight empty fields
                field.style.borderColor = '#e74c3c';
                if (star) star.style.color = '#e74c3c';
                isValid = false;
            } else {
                // Reset styles for filled fields
                field.style.borderColor = '#ddd';
                if (star) star.style.color = '';
            }
        });

        if (isValid) {
            // Save name and email to localStorage
            localStorage.setItem('name', nameField.value);
            localStorage.setItem('email', emailField.value);

            // Show success alert and reset form
            alert('Your message has been submitted successfully! Thank you for contacting me.');
            contactForm.reset();
        } else {
            alert('Please fill in all required fields marked with a star.');
        }
    });
});

// Handle thank-you message display
const form = document.getElementById('contactForm');
const thankYouMessage = document.getElementById('thankYouMessage');

form.addEventListener('submit', event => {
    event.preventDefault(); // Prevent default submission

    form.style.display = 'none'; // Hide form
    thankYouMessage.style.display = 'block'; // Show thank-you message
});
