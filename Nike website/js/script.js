/* Website Interactivity and Validation Script, This file handles all client-side JavaScript features */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Script.js loaded successfully.");

    /* Helper Functions for Validation (Consolidated & Universal) */

    /* Shows an error message below the input field. It expects the error element to be the immediate next sibling of the input. */
    function showError(input, message) {
        // Look for the next element (which should be the error message span/p)
        let errorEl = input.nextElementSibling;
        
        // Ensure it's the right element before setting content
        if (errorEl && errorEl.classList.contains('error-message')) {
            errorEl.textContent = message;
        } else {
            // Fallback for elements without an immediate error sibling (less ideal)
            console.error(`Error element not found next to input: ${input.id}`);
        }
    }

    /* Clears the error message for a specific input field. */
    function clearError(input) {
        let errorEl = input.nextElementSibling;
        if (errorEl && errorEl.classList.contains('error-message')) {
            errorEl.textContent = '';
        }
    }

    /* Utility function for consistent email validation across all forms. */
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    /* ---------------------------------------------------------------------- */
                        /* 1. Mobile Navigation Toggle */
    /* ---------------------------------------------------------------------- */
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

    /* ---------------------------------------------------------------------- */
                   /* 2. Dynamic Search (for Product Page) */
    /* ---------------------------------------------------------------------- */
    const searchInput = document.getElementById('searchInput');
    // Only run this search code if we are on the product page
    if (searchInput && document.body.classList.contains('product-page')) {
        searchInput.addEventListener('keyup', (e) => {
            const filter = searchInput.value.toLowerCase();
            const products = document.querySelectorAll('.product-card');

            products.forEach(product => {
                const title = product.querySelector('h3').textContent.toLowerCase();
                // If the product title includes the filter text show it, Otherwise hide it.
                if (title.includes(filter)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    }

    /* ---------------------------------------------------------------------- */
                    /*  3. Gallery Lightbox (for Product Page) */
    /* ---------------------------------------------------------------------- */
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

    /* ---------------------------------------------------------------------- */
                  /* 4. Interactive Map (for Contact Page) */
    /* ---------------------------------------------------------------------- */
    // The Leaflet library loaded via CDN in contact.html
    if (document.getElementById('map')) {
        // Set coordinates (Nike HQ in Oregon)
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

    /* ---------------------------------------------------------------------- */
                        /* 5. Sign-Up Form Validation */
    /* ---------------------------------------------------------------------- */
    const signUpForm = document.querySelector('main.signup-container form');
    if (signUpForm) {
        const fullName = document.getElementById('full-name');
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        signUpForm.addEventListener('submit', (e) => {
            let isValid = true;
            e.preventDefault(); // Prevent form submission to check validation

            // Validate Full Name
            if (fullName.value.trim() === '') {
                showError(fullName, 'Full Name is required.');
                isValid = false;
            } else {
                clearError(fullName);
            }

            // Validate Email (Using centralized helper)
            if (!isValidEmail(email.value.trim())) {
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
                console.log('Sign up successful! Form can now be submitted.');
                 signUpForm.submit();
            }
        });
    }

    /* ---------------------------------------------------------------------- */
                       /* 6. Contact Form Validation */
    /* ---------------------------------------------------------------------- */
    const contactForm = document.querySelector('.contact-form form[method="post"]');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        contactForm.addEventListener('submit', (e) => {
            let isValid = true;
            
            // Validate Name
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Full Name is required.');
                isValid = false;
            } else {
                clearError(nameInput);
            }

            // Validate Email (Using centralized helper)
            if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            } else {
                clearError(emailInput);
            }

            // Validate Message
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required.');
                isValid = false;
            } else {
                clearError(messageInput);
            }

            if (!isValid) {
                e.preventDefault(); // Stop the form submission
            }
            // If valid, the form will submit to Formspree
        });
    }
    
    /* ---------------------------------------------------------------------- */
                           /* 7. Loading Screen */
    /* ---------------------------------------------------------------------- */
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.opacity = '0';
            // Wait for fade-out transition to finish before setting display to none
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500); // Matchs transition time in CSS
        });
    }

    /* ---------------------------------------------------------------------- */
             /* 8. Enquiry Form Validation (NEW for enquiry.html) */
    /* ---------------------------------------------------------------------- */
    const enquiryForm = document.getElementById('enquiryForm');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default submission initially to run validation
            let isValid = true;

            // Get form field elements
            const nameEl = document.getElementById('name');
            const emailEl = document.getElementById('email');
            const typeEl = document.getElementById('type');
            const subjectEl = document.getElementById('subject');
            const messageEl = document.getElementById('message');

            // 1. Validate Full Name
            if (nameEl.value.trim() === "") {
                showError(nameEl, "Full Name is required.");
                isValid = false;
            } else { clearError(nameEl); }

            // 2. Validate Email Address
            if (emailEl.value.trim() === "") {
                showError(emailEl, "Email is required.");
                isValid = false;
            } else if (!isValidEmail(emailEl.value.trim())) {
                showError(emailEl, "Please enter a valid email address.");
                isValid = false;
            } else { clearError(emailEl); }

            // 3. Validate Enquiry Type selection
            if (typeEl.value === "" || typeEl.value === "Select an option") {
                showError(typeEl, "Please select an Enquiry Type.");
                isValid = false;
            } else { clearError(typeEl); }

            // 4. Validate Subject
            if (subjectEl.value.trim() === "") {
                showError(subjectEl, "Subject is required.");
                isValid = false;
            } else { clearError(subjectEl); }

            // 5. Validate Detailed Message
            if (messageEl.value.trim() === "") {
                showError(messageEl, "A detailed message is required.");
                isValid = false;
            } else { clearError(messageEl); }

            // If validation passes, manually submit the form to Formspree
            if (isValid) {
                console.log("Enquiry Form validated successfully. Submitting to Formspree...");
                this.submit(); // Uses the form's action attribute to submit
            } else {
                console.log("Enquiry Form validation failed. User prompted to correct errors.");
            }
        });
    }
});