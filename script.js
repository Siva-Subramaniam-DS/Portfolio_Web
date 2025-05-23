// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation and scroll functions
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const scrollTopBtn = document.querySelector('.scroll-to-top');
    
    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Highlight active nav item and change navbar background on scroll
    function handleScroll() {
        // Add background to navbar on scroll
        if (window.scrollY > 80) {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = 'none';
        }
        
        // Show or hide scroll-to-top button
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
        
        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Scroll to top button
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(filterBtn => {
                filterBtn.classList.remove('active');
            });
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-level');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Animate statistic numbers
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let count = 0;
            const time = 2000; // 2 seconds animation
            const interval = Math.floor(time / target);
            
            const counter = setInterval(() => {
                count++;
                stat.textContent = count;
                
                if (count === target) {
                    clearInterval(counter);
                }
            }, interval);
        });
    }
    
    // Intersection Observer for animations
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Trigger specific animations for different sections
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                
                if (entry.target.id === 'summary') {
                    animateStats();
                }
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would normally send the form data to a server
            // For demo purposes, we'll just show a success message
            contactForm.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Thank You!</h3>
                    <p>Your message has been sent successfully.</p>
                </div>
            `;
        });
    }
    
    // Typing effect for hero section
    function typeEffect() {
        const professionElement = document.querySelector('.profession');
        if (professionElement) {
            const professions = ['Python', 'MongoDB', 'TensorFlow', 'scikit-learn', 'Machine Learning', 'Deep Learning', 'Artificial Intelligence', 'Data Science', 'Data Analysis', 'Data Visualization'];
            let professionIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let typingSpeed = 100;
            
            function type() {
                const currentProfession = professions[professionIndex];
                
                if (isDeleting) {
                    charIndex--;
                    typingSpeed = 50;
                } else {
                    charIndex++;
                    typingSpeed = 150;
                }
                
                professionElement.textContent = currentProfession.substring(0, charIndex);
                
                if (!isDeleting && charIndex === currentProfession.length) {
                    isDeleting = true;
                    typingSpeed = 1500; // Pause at the end
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    professionIndex = (professionIndex + 1) % professions.length;
                }
                
                setTimeout(type, typingSpeed);
            }
            
            // Start the typing effect
            setTimeout(type, 1000);
        }
    }
    
    // Initialize typing effect
    typeEffect();
    
    // Apply smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animations to the timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-timeline');
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
        // Add initial styles
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
    });
    
    // Add CSS for the animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-timeline {
            animation: fadeInUp 0.6s forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        section.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .success-message {
            text-align: center;
            padding: 40px 20px;
        }
        
        .success-message i {
            font-size: 4rem;
            color: #4CC77D;
            margin-bottom: 20px;
        }
        
        .success-message h3 {
            font-size: 1.8rem;
            margin-bottom: 15px;
            color: var(--dark-color);
        }
        
        .success-message p {
            font-size: 1.1rem;
            color: var(--text-color);
        }
    `;
    document.head.appendChild(style);
    
    // Theme switcher
    function addThemeSwitcher() {
        // Create theme switcher button
        const themeSwitcher = document.createElement('div');
        themeSwitcher.className = 'theme-switcher';
        themeSwitcher.innerHTML = `
            <button class="theme-btn">
                <i class="fas fa-moon"></i>
            </button>
        `;
        document.body.appendChild(themeSwitcher);
        
        // Add theme switcher styles
        const themeStyle = document.createElement('style');
        themeStyle.textContent = `
            .theme-switcher {
                position: fixed;
                bottom: 30px;
                left: 30px;
                z-index: 999;
            }
            
            .theme-btn {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: var(--primary-color);
                color: var(--light-color);
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                box-shadow: var(--shadow);
                transition: var(--transition);
            }
            
            .theme-btn:hover {
                background: var(--secondary-color);
                transform: translateY(-3px);
            }
            
            .dark-theme {
                --background-color: #121212;
                --dark-color: #f8f9fa;
                --light-color: #1e1e1e;
                --text-color: #e0e0e0;
                --text-light: #adb5bd;
                --shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }
            
            .dark-theme .navbar {
                background: #1e1e1e;
            }
            
            .dark-theme .navbar .logo h2 {
                color: var(--primary-color);
            }
            
            .dark-theme .nav-links a {
                color: var(--text-color);
            }
            
            .dark-theme .hamburger .bar {
                background: var(--text-color);
            }
            
            .dark-theme .hero {
                background: linear-gradient(to right, rgba(30, 30, 30, 0.9), rgba(30, 30, 30, 0.7)), url('https://source.unsplash.com/random/1920x1080/?tech') no-repeat center center/cover;
            }
            
            .dark-theme .timeline-content,
            .dark-theme .education-card,
            .dark-theme .info-card,
            .dark-theme .soft-skill {
                background: #1e1e1e;
            }
            
            .dark-theme .timeline-content::before {
                background: #1e1e1e;
            }
            
            .dark-theme .skill-bar,
            .dark-theme .project-card {
                background: #2d2d2d;
            }

            /* Base text color for dark theme */
            .dark-theme {
                color: var(--text-color);
            }

            /* Override gradient text effects in dark theme */
            .dark-theme .section-title h2,
            .dark-theme .skill-category h3,
            .dark-theme .education-details h4,
            .dark-theme .info-card h3,
            .dark-theme .stat-number,
            .dark-theme .highlight {
                color: #fff !important;
                background: none !important;
                -webkit-background-clip: initial !important;
                background-clip: initial !important;
            }

            /* Specific text elements in dark theme */
            .dark-theme h1,
            .dark-theme h2,
            .dark-theme h3,
            .dark-theme h4,
            .dark-theme p,
            .dark-theme span,
            .dark-theme li,
            .dark-theme .hero-text,
            .dark-theme .profession,
            .dark-theme .project-info p,
            .dark-theme .education-desc,
            .dark-theme .timeline-content p,
            .dark-theme .info-card ul li,
            .dark-theme .contact-text p,
            .dark-theme .detail-title,
            .dark-theme .contact-text h3,
            .dark-theme .education-details h3,
            .dark-theme .soft-skill h4,
            .dark-theme .summary-text p,
            .dark-theme .project-info h3,
            .dark-theme .additional-content h3,
            .dark-theme .stat-label,
            .dark-theme .skill-info p,
            .dark-theme .education-details p,
            .dark-theme .project-tags span,
            .dark-theme .tags span,
            .dark-theme .timeline-content .date,
            .dark-theme .education-details .date,
            /* Additional Information section */
            .dark-theme .info-card ul li,
            .dark-theme .info-card h3,
            .dark-theme .info-card p,
            /* Contact Me section */
            .dark-theme .contact-form input,
            .dark-theme .contact-form textarea,
            .dark-theme .contact-form input::placeholder,
            .dark-theme .contact-form textarea::placeholder,
            .dark-theme .contact-item p,
            .dark-theme .contact-item h3,
            /* Project content boxes */
            .dark-theme .project-card h3,
            .dark-theme .project-card p,
            .dark-theme .project-card .project-tags span,
            .dark-theme .project-card .project-links a,
            /* Footer menu */
            .dark-theme .footer-logo h2,
            .dark-theme .footer-logo p,
            .dark-theme .footer-links a,
            .dark-theme .footer-social a,
            .dark-theme .copyright {
                color: #ffffff !important;
            }

            /* Special cases for dark theme */
            .dark-theme .stat-number {
                color:rgb(0, 17, 255) !important;
            }

            .dark-theme .project-links a,
            .dark-theme .project-tags span,
            .dark-theme .tags span,
            .dark-theme .footer-links a:hover,
            .dark-theme .footer-social a:hover {
                color: var(--primary-color) !important;
            }

            /* Form elements in dark theme */
            .dark-theme .contact-form input,
            .dark-theme .contact-form textarea {
                background: rgba(255, 255, 255, 0.1) !important;
                border-color: rgba(255, 255, 255, 0.2) !important;
            }

            .dark-theme .contact-form input:focus,
            .dark-theme .contact-form textarea:focus {
                background: rgba(255, 255, 255, 0.15) !important;
                border-color: var(--primary-color) !important;
            }

            /* Footer in dark theme */
            .dark-theme .footer {
                background: #1a1a1a !important;
            }

            .dark-theme .footer-social a {
                background: rgba(255, 255, 255, 0.1) !important;
            }

            .dark-theme .footer-social a:hover {
                background: var(--primary-color) !important;
                color: #fff !important;
            }

            /* Light theme text colors */
            :root {
                --text-color: #333333;
            }
        `;
        document.head.appendChild(themeStyle);
        
        // Theme toggle functionality
        const themeBtn = document.querySelector('.theme-btn');
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            // Update icon based on theme
            if (document.body.classList.contains('dark-theme')) {
                themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    // Add the theme switcher
    addThemeSwitcher();
    
    // Preloader
    function addPreloader() {
        // Create preloader
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = `
            <div class="loader">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>
        `;
        document.body.prepend(preloader);
        
        // Add preloader styles
        const preloaderStyle = document.createElement('style');
        preloaderStyle.textContent = `
            .preloader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--background-color);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                transition: opacity 0.6s ease, visibility 0.6s ease;
            }
            
            .loader {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .circle {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: var(--primary-color);
                margin: 0 10px;
                animation: bounce 1.5s ease-in-out infinite;
            }
            
            .circle:nth-child(1) {
                animation-delay: 0s;
            }
            
            .circle:nth-child(2) {
                animation-delay: 0.3s;
            }
            
            .circle:nth-child(3) {
                animation-delay: 0.6s;
            }
            
            @keyframes bounce {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-30px);
                }
            }
        `;
        document.head.appendChild(preloaderStyle);
        
        // Hide preloader after content loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 500);
        });
    }
    
    // Add the preloader
    addPreloader();
    
    // Add scroll reveal animations
    function initScrollReveal() {
        const projectCards = document.querySelectorAll('.project-card');
        const educationCards = document.querySelectorAll('.education-card');
        const infoCards = document.querySelectorAll('.info-card');
        const statCards = document.querySelectorAll('.stat-card');
        
        const scrollElements = [
            ...projectCards, 
            ...educationCards, 
            ...infoCards, 
            ...statCards
        ];
        
        scrollElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        });
        
        const scrollRevealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        scrollElements.forEach(element => {
            scrollRevealObserver.observe(element);
        });
    }
    
    // Initialize scroll reveal animations
    initScrollReveal();
    
    // Contact form validation
    function validateContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        // Create error message element
        function createErrorElement(message) {
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = message;
            error.style.color = '#ff3333';
            error.style.fontSize = '0.9rem';
            error.style.marginTop = '5px';
            return error;
        }
        
        // Validate email format
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        // Event listeners for real-time validation
        nameInput.addEventListener('blur', () => {
            const errorElement = nameInput.parentElement.querySelector('.error-message');
            if (nameInput.value.trim() === '') {
                if (!errorElement) {
                    nameInput.parentElement.appendChild(createErrorElement('Name is required'));
                }
                nameInput.style.borderColor = '#ff3333';
            } else {
                if (errorElement) {
                    errorElement.remove();
                }
                nameInput.style.borderColor = '#e9ecef';
            }
        });
        
        emailInput.addEventListener('blur', () => {
            const errorElement = emailInput.parentElement.querySelector('.error-message');
            if (emailInput.value.trim() === '') {
                if (!errorElement) {
                    emailInput.parentElement.appendChild(createErrorElement('Email is required'));
                }
                emailInput.style.borderColor = '#ff3333';
            } else if (!isValidEmail(emailInput.value)) {
                if (!errorElement) {
                    emailInput.parentElement.appendChild(createErrorElement('Please enter a valid email'));
                } else {
                    errorElement.textContent = 'Please enter a valid email';
                }
                emailInput.style.borderColor = '#ff3333';
            } else {
                if (errorElement) {
                    errorElement.remove();
                }
                emailInput.style.borderColor = '#e9ecef';
            }
        });
        
        subjectInput.addEventListener('blur', () => {
            const errorElement = subjectInput.parentElement.querySelector('.error-message');
            if (subjectInput.value.trim() === '') {
                if (!errorElement) {
                    subjectInput.parentElement.appendChild(createErrorElement('Subject is required'));
                }
                subjectInput.style.borderColor = '#ff3333';
            } else {
                if (errorElement) {
                    errorElement.remove();
                }
                subjectInput.style.borderColor = '#e9ecef';
            }
        });
        
        messageInput.addEventListener('blur', () => {
            const errorElement = messageInput.parentElement.querySelector('.error-message');
            if (messageInput.value.trim() === '') {
                if (!errorElement) {
                    messageInput.parentElement.appendChild(createErrorElement('Message is required'));
                }
                messageInput.style.borderColor = '#ff3333';
            } else {
                if (errorElement) {
                    errorElement.remove();
                }
                messageInput.style.borderColor = '#e9ecef';
            }
        });
    }
    
    // Initialize form validation
    validateContactForm();
});