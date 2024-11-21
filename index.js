// Selectors for frequently used elements
const skills = document.querySelectorAll('.skill');
const popup = document.getElementById('popup');
const popupDescription = document.getElementById('popup-description');
const popupClose = document.getElementById('popup-close');

// Function to show the popup
const showPopup = description => {
    popupDescription.textContent = description; // Set the popup description
    popup.style.display = 'flex'; // Make the popup visible
    setTimeout(() => popup.classList.add('show'), 10); // Trigger transition with slight delay
};

// Function to hide the popup
const hidePopup = () => {
    popup.classList.remove('show'); // Start the hide animation
    setTimeout(() => (popup.style.display = 'none'), 300); // Match the delay with animation duration
};

// Add click event listeners to skill items
skills.forEach(skill =>
    skill.addEventListener('click', () => showPopup(skill.getAttribute('data-description')))
);

// Close the popup when clicking on the close button
popupClose.addEventListener('click', hidePopup);

// Close the popup if the user clicks outside the popup content
window.addEventListener('click', event => {
    if (event.target === popup) hidePopup();
});

// Smooth scrolling for internal links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', event => {
        const href = anchor.getAttribute('href');
        if (href.startsWith('#')) {
            event.preventDefault(); // Prevent default navigation
            const targetSection = document.getElementById(href.substring(1)); // Target section by ID
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }
    });
});
