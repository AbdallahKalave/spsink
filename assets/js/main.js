document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Simple toggle between hamburger event
            if (navMenu.classList.contains('active')) {
                mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
            } else {
                mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
            }
        });
    }

    // Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 50;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // Scroll to Top Button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Interactive 3D Tilt Effect on Cards & Titles
    const tiltElements = document.querySelectorAll('.card, .flip-card, .heading-xl');
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Adjust tilt intensity based on element type
            const intensity = el.classList.contains('heading-xl') ? 1.5 : 6;
            const rotateX = ((y - centerY) / centerY) * -intensity;
            const rotateY = ((x - centerX) / centerX) * intensity;

            // Use a very fast transition for instant follow feel
            el.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease, border-color 0.3s ease';

            // Different base transforms
            const baseTranslate = el.classList.contains('heading-xl') ? '' : 'translateY(-8px)';
            const baseRotateX = el.classList.contains('heading-xl') ? 4 : 0; // heading-xl has base rotateX(4deg) in CSS

            el.style.transform = `perspective(1000px) rotateX(${rotateX + baseRotateX}deg) rotateY(${rotateY}deg) ${baseTranslate}`;
        });

        el.addEventListener('mouseleave', () => {
            // Reset transition for smooth return to original state
            el.style.transition = 'all 0.5s ease';
            el.style.transform = '';
        });
    });

    // Custom Select Dropdown Logic
    const customSelect = document.querySelector('.custom-select');
    if (customSelect) {
        const trigger = customSelect.querySelector('.custom-select-trigger');
        const options = customSelect.querySelectorAll('.custom-option');
        const hiddenSelect = document.getElementById('inquiry-select');

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            customSelect.classList.toggle('open');
        });

        options.forEach(option => {
            option.addEventListener('click', () => {
                // Update specific styles
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');

                // Update Trigger Text
                trigger.textContent = option.textContent;

                // Update Hidden Select Value if it exists
                if (hiddenSelect) {
                    hiddenSelect.value = option.getAttribute('data-value');
                }

                // Close Dropdown
                customSelect.classList.remove('open');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!customSelect.contains(e.target)) {
                customSelect.classList.remove('open');
            }
        });
    }

    // Form Submission & Animation Logic
    const contactForm = document.getElementById('contact-form');
    const waFormBtn = document.getElementById('whatsapp-form-btn');
    const flipContainer = document.querySelector('.contact-flip-container');
    const sendNewMsgBtn = document.getElementById('send-new-msg-btn');

    const showSuccess = () => {
        if (flipContainer) {
            flipContainer.classList.add('flipped');
            if (contactForm) contactForm.reset();

            // Reset custom select text
            const customSelectText = document.getElementById('form-inquiry');
            if (customSelectText) customSelectText.textContent = 'General Inquiry';

            // Reset hidden select value
            const hiddenSelect = document.getElementById('inquiry-select');
            if (hiddenSelect) hiddenSelect.value = 'General Inquiry';

            // Reset custom options styling
            const options = document.querySelectorAll('.custom-option');
            options.forEach(opt => {
                opt.classList.remove('selected');
                if (opt.getAttribute('data-value') === 'General Inquiry') {
                    opt.classList.add('selected');
                }
            });
        }
    };

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate form submission
            showSuccess();
        });
    }

    if (waFormBtn) {
        waFormBtn.addEventListener('click', () => {
            const name = document.getElementById('form-name').value;
            // Email is optional for WhatsApp but good to have
            const inquiry = document.getElementById('form-inquiry').textContent;
            const message = document.getElementById('form-message').value;

            if (!name || !message) {
                alert('Please fill in your name and message first.');
                return;
            }

            const whatsappNumber = "971564924967";
            const fullMessage = `Hello, I'm ${name}, I would like to inquire about ${inquiry}.%0A%0A${message}`;

            window.open(`https://wa.me/${whatsappNumber}?text=${fullMessage}`, '_blank');
            showSuccess();
        });
    }

    if (sendNewMsgBtn) {
        sendNewMsgBtn.addEventListener('click', () => {
            if (flipContainer) {
                flipContainer.classList.remove('flipped');
            }
        });
    }
});
