// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const contactForm = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    

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

            const formData = new FormData(contactForm);
            fetch(contactForm.action, {
                method: contactForm.method,
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    console.log('Form submitted successfully!');  // Debugging log
                    // Hide form and show thank-you message
                    contactForm.style.display = 'none';
                    thankYouMessage.style.display = 'block';
                    contactForm.reset(); // Reset the form after submission
                } else {
                    console.error('Form submission failed:', response.statusText);  // Log detailed error
                    alert('There was an issue with your submission. Please try again.');
                }
            })
            .catch(error => {
                console.error(error); // Log any network or other issues
                alert('There was an issue with your submission. Please try again.');
            });
        } else {
            alert('Please fill in all required fields marked with a star.');
        }
    });
});
