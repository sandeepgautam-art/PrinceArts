// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Create WhatsApp message
        const whatsappMessage = `Hi Prince Arts! 

I'm interested in your services:

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Service: ${service || 'Not specified'}

Message: ${message}

Please contact me for more details.`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Open WhatsApp with pre-filled message
        const whatsappUrl = `https://wa.me/918850036371?text=${encodedMessage}`;
        
        // Show options to user
        const userChoice = confirm('Would you like to send this message via WhatsApp? Click OK to open WhatsApp, or Cancel to send via email.');
        
        if (userChoice) {
            window.open(whatsappUrl, '_blank');
            alert('WhatsApp opened! Your message has been prepared for you.');
        } else {
            // Create email with pre-filled subject and body
            const emailSubject = encodeURIComponent(`Inquiry from ${name} - Prince Arts Services`);
            const emailBody = encodeURIComponent(`Hi Prince Arts,

I'm interested in your services:

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Service: ${service || 'Not specified'}

Message: ${message}

Please contact me for more details.

Best regards,
${name}`);
            
            const emailUrl = `mailto:princearts2000@gmail.com?subject=${emailSubject}&body=${emailBody}`;
            window.location.href = emailUrl;
            alert('Email client opened! Your message has been prepared for you.');
        }
        
        contactForm.reset();
    });
}

// Newsletter Form Handling
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('newsletterEmail').value;
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate subscription
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .feature-card, .team-member, .value-card, .faq-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('.stat-number');
            if (counter && !counter.classList.contains('animated')) {
                counter.classList.add('animated');
                const target = parseInt(counter.textContent);
                animateCounter(counter, target);
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => counterObserver.observe(item));
});

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Add loading states to forms
function addLoadingState(form, button) {
    button.disabled = true;
    button.textContent = 'Sending...';
    button.style.opacity = '0.7';
}

function removeLoadingState(form, button, originalText) {
    button.disabled = false;
    button.textContent = originalText;
    button.style.opacity = '1';
}

// Enhanced form submission with loading states
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            addLoadingState(form, submitButton);
            
            // Simulate API call
            setTimeout(() => {
                removeLoadingState(form, submitButton, originalText);
                alert('Thank you! Your message has been sent successfully.');
                form.reset();
            }, 2000);
        });
    });
});

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.service-card, .team-member, .value-card, .mv-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
});

// Add click-to-call functionality
document.addEventListener('DOMContentLoaded', () => {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            if (confirm(`Call ${phoneNumber}?`)) {
                window.location.href = this.getAttribute('href');
            }
        });
    });
});

// Add email click functionality
document.addEventListener('DOMContentLoaded', () => {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('href').replace('mailto:', '');
            if (confirm(`Send email to ${email}?`)) {
                window.location.href = this.getAttribute('href');
            }
        });
    });
});

// Add smooth reveal animation for sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(section);
    });
});

// Add CSS class for revealed sections
const style = document.createElement('style');
style.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Slideshow functionality for Previous Work section
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

// Initialize slideshow
document.addEventListener('DOMContentLoaded', () => {
    if (slides.length > 0) {
        showSlide(0);
        startAutoSlide();
    }
});

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    currentSlideIndex = index;
    
    // Update navigation buttons
    updateNavigationButtons();
}

function changeSlide(direction) {
    let newIndex = currentSlideIndex + direction;
    
    if (newIndex >= totalSlides) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = totalSlides - 1;
    }
    
    showSlide(newIndex);
}

function currentSlide(index) {
    showSlide(index - 1);
}

function updateNavigationButtons() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn && nextBtn) {
        // Enable/disable buttons based on current slide
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }
}

// Auto-slide functionality
let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

// Pause auto-slide on hover
document.addEventListener('DOMContentLoaded', () => {
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', stopAutoSlide);
        slideshowContainer.addEventListener('mouseleave', startAutoSlide);
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (slides.length > 0) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('DOMContentLoaded', () => {
    const slideshowWrapper = document.querySelector('.slideshow-wrapper');
    if (slideshowWrapper) {
        slideshowWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slideshowWrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            changeSlide(1);
        } else {
            // Swipe right - previous slide
            changeSlide(-1);
        }
    }
}