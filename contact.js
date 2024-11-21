// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const contactForm = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');

    // Auto-fill fields if data exists in localStorage
    nameField.value = localStorage.getItem('name') || '';
    emailField.value = localStorage.getItem('email') || '';

    // Form submission event listener
    contactForm.addEventListener('submit', event => {
        event.preventDefault(); // Prevent default form submission

        let isValid = true;

        // Validate required fields
        document.querySelectorAll('input[required], textarea[required]').forEach(field => {
            const star = field.nextElementSibling;
            if (field.value.trim() === '') {
                field.style.borderColor = '#e74c3c';
                if (star) star.style.color = '#e74c3c';
                isValid = false;
            } else {
                field.style.borderColor = '#ddd';
                if (star) star.style.color = '';
            }
        });

        if (isValid) {
            // Save name and email to localStorage
            localStorage.setItem('name', nameField.value);
            localStorage.setItem('email', emailField.value);

            // Create FormData object to send to Formspree
            const formData = new FormData(contactForm);

            // Send data to Formspree using Fetch API
            fetch(contactForm.action, {
                method: contactForm.method,
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    contactForm.style.display = 'none';
                    thankYouMessage.style.display = 'block';
                    contactForm.reset(); // Reset the form after submission
                } else {
                    console.error('Form submission failed:', response.statusText);
                    alert('There was an issue with your submission. Please try again.');
                }
            })
            .catch(error => {
                console.error(error);
                alert('There was an issue with your submission. Please try again.');
            });
        } else {
            alert('Please fill in all required fields marked with a star.');
        }
    });
});
