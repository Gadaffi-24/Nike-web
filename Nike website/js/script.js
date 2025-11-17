/* Wait for the DOM to be fully loaded before running any scripts */
document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Mobile Navigation Toggle --- */
    const navToggle = document.querySelector('.nav-toggle');
    const navigation = document.querySelector('.navigation');
    const navList = document.querySelector('.nav-list');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            // Toggle 'active' class on all three elements
            navToggle.classList.toggle('active');
            navigation.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }

    /* --- 2. Dynamic Search (for Product Page) --- */
    const searchInput = document.getElementById('searchInput');
    // Only run this search code if we are on the product page
    if (searchInput && document.body.classList.contains('product-page')) {
        searchInput.addEventListener('keyup', (e) => {
            const filter = searchInput.value.toLowerCase();
            const products = document.querySelectorAll('.product-card');

            products.forEach(product => {
                const title = product.querySelector('h3').textContent.toLowerCase();
                // If the product title includes the filter text, show it. Otherwise, hide it.
                if (title.includes(filter)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    }

    /* --- 3. Gallery Lightbox (for Product Page) --- */
    const productImages = document.querySelectorAll('.product-card img');
    if (productImages.length > 0) {
        // Create the lightbox structure once and append it to the body
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        document.body.appendChild(lightbox);

        const lightboxImg = document.createElement('img');
        lightbox.appendChild(lightboxImg);

        productImages.forEach(image => {
            image.addEventListener('click', () => {
                lightboxImg.src = image.src; // Set the image source
                lightbox.classList.add('active'); // Show the lightbox
            });
        });

        // Close lightbox when it's clicked
        lightbox.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }

    /* --- 4. Interactive Map (for Contact Page) --- */
    // The Leaflet library is loaded via CDN in contact.html
    // This code will only run if it finds an element with id="map"
    if (document.getElementById('map')) {
        // Set coordinates (e.g., Nike HQ in Oregon)
        const map = L.map('map').setView([45.5152, -122.6784], 13); 
        
        // Add the map 'skin'
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add a marker
        L.marker([45.5152, -122.6784]).addTo(map)
            .bindPopup('Nike World Headquarters')
            .openPopup();
    }

    /* --- 5. Sign-Up Form Validation --- */
    const signUpForm = document.querySelector('main.signup-container form');
    if (signUpForm) {
        const fullName = document.getElementById('full-name');
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        signUpForm.addEventListener('submit', (e) => {
            let isValid = true;
            // Prevent form submission to check validation
            e.preventDefault(); 
            
            // Validate Full Name
            if (fullName.value.trim() === '') {
                showError(fullName, 'Full Name is required.');
                isValid = false;
            } else {
                clearError(fullName);
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                showError(email, 'Please enter a valid email address.');
                isValid = false;
            } else {
                clearError(email);
            }

            // Validate Password
            if (password.value.length < 8) {
                showError(password, 'Password must be at least 8 characters long.');
                isValid = false;
            } else {
                clearError(password);
            }

            // If all checks pass, submit the form (or show success)
            if (isValid) {
                alert('Sign up successful!');
                // In a real app, you would now submit the form
                // signUpForm.submit(); 
            }
        });
    }

    /* --- 6. Contact Form Validation --- */
    const contactForm = document.querySelector('.contact-form form[method="post"]');
    if (contactForm) {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        contactForm.addEventListener('submit', (e) => {
            let isValid = true;
            
            // Validate Name
            if (name.value.trim() === '') {
                showError(name, 'Full Name is required.');
                isValid = false;
            } else {
                clearError(name);
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                showError(email, 'Please enter a valid email address.');
                isValid = false;
            } else {
                clearError(email);
            }

            // Validate Message
            if (message.value.trim() === '') {
                showError(message, 'Message is required.');
                isValid = false;
            } else {
                clearError(message);
            }

            if (!isValid) {
                e.preventDefault(); // Stop the form submission
            }
            // If valid, the form will submit to Formspree
        });
    }

    /* --- Helper Functions for Validation --- */
    function showError(input, message) {
        let errorSpan = input.nextElementSibling;
        // Check if the next element is an error span, if not, create one
        if (!errorSpan || !errorSpan.classList.contains('error-message')) {
            errorSpan = document.createElement('span');
            errorSpan.className = 'error-message';
            input.parentNode.insertBefore(errorSpan, input.nextSibling);
        }
        errorSpan.textContent = message;
    }

    function clearError(input) {
        let errorSpan = input.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains('error-message')) {
            errorSpan.textContent = '';
        }
    }

    /* --- 7. Loading Screen --- */
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.opacity = '0';
            // Wait for fade-out transition to finish before setting display to none
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500); // Must match transition time in CSS
        });
    }
});