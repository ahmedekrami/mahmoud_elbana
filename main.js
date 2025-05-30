// WhatsApp booking functionality
document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp number (replace with actual number)
    const whatsappNumber = '201013539553';
    
    // Get all book buttons
    const bookButtons = document.querySelectorAll('.book-btn');
    
    // Add click event listeners to all book buttons
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the service name from data attribute
            const serviceName = this.getAttribute('data-service');
            
            // Create the WhatsApp message
            const message = `Hello Dr. Mahmoud Elbana, I want to book a ${serviceName}.`;
            
            // Encode the message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Add loading state to button
            const originalText = this.textContent;
            this.textContent = 'Opening WhatsApp...';
            this.disabled = true;
            
            // Open WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Reset button after a short delay
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
            
            // Analytics tracking (optional)
            console.log(`Booking initiated for: ${serviceName}`);
        });
    });
    
    // Smooth scrolling for better user experience
    function smoothScroll() {
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'all 0.6s ease';
            observer.observe(section);
        });
    }
    
    // Initialize smooth scrolling
    smoothScroll();
    
    // Add hover effects for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click animation to buttons
    bookButtons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // VIP card special effects
    const vipCard = document.querySelector('.vip-card');
    if (vipCard) {
        // Add pulsing effect to VIP badge
        const vipBadge = vipCard.querySelector('.vip-badge');
        if (vipBadge) {
            setInterval(() => {
                vipBadge.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    vipBadge.style.transform = 'scale(1)';
                }, 300);
            }, 3000);
        }
    }
    
    // Form validation and error handling
    function handleBookingError() {
        console.error('Booking error occurred');
        // You could add user-friendly error messages here
    }
    
    // Loading indicator for better UX
    function showLoadingState(button) {
        const spinner = document.createElement('span');
        spinner.innerHTML = '⏳';
        spinner.style.marginRight = '8px';
        button.insertBefore(spinner, button.firstChild);
    }
    
    // Mobile optimization
    function optimizeForMobile() {
        if (window.innerWidth <= 768) {
            // Add mobile-specific optimizations
            const cards = document.querySelectorAll('.service-card');
            cards.forEach(card => {
                card.style.margin = '0 0 20px 0';
            });
        }
    }
    
    // Call mobile optimization on load and resize
    optimizeForMobile();
    window.addEventListener('resize', optimizeForMobile);
    
    // Console log for debugging
    console.log('Dr. Mahmoud Elbana\'s website loaded successfully!');
    console.log(`Found ${bookButtons.length} booking buttons`);
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active nav link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section, header');
        const navLinks = document.querySelectorAll('.nav-link');
        const navHeight = document.querySelector('.navbar').offsetHeight;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 50;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
});

// Utility function to format WhatsApp number
function formatWhatsAppNumber(number) {
    // Remove any non-digit characters
    return number.replace(/\D/g, '');
}

// Function to validate service selection
function validateServiceSelection(serviceName) {
    const validServices = [
        'Audio Consultation - 30 minutes',
        'Audio Consultation - 1 hour', 
        'Audio Consultation - 3 hours',
        'Audio Consultation - 4 hours',
        'Chat Consultation - One-time',
        'Chat Consultation - 7 days',
        'VIP Package - Unlimited Audio & Chat for 1 Month'
    ];
    
    return validServices.includes(serviceName);
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error handling for WhatsApp opening
function handleWhatsAppError(error) {
    console.error('Error opening WhatsApp:', error);
    alert('Unable to open WhatsApp. Please contact Dr. Mahmoud Elbana directly at +20 123 456 7890');
}