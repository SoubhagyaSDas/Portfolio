// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    // Landing page animation and redirection
    const landingPage = document.getElementById('landing-page');
    const whoAmISection = document.getElementById('who-am-i');
    
    landingPage.addEventListener('click', function() {
        // Create page transition effect
        const transition = document.createElement('div');
        transition.classList.add('page-transition');
        document.body.appendChild(transition);
        
        gsap.to(transition, {
            x: 0,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: function() {
                whoAmISection.scrollIntoView({ behavior: 'smooth' });
                gsap.to(transition, {
                    x: '-100%',
                    duration: 0.5,
                    delay: 0.2,
                    ease: 'power2.inOut',
                    onComplete: function() {
                        transition.remove();
                    }
                });
            }
        });
    });
    
    // Animate elements when they enter viewport
    gsap.utils.toArray('.section-content').forEach(section => {
        gsap.from(section, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate timeline path
    const path = document.querySelector('.path');
    if (path) {
        const pathLength = path.getTotalLength();
        
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;
        
        ScrollTrigger.create({
            trigger: '.timeline',
            start: 'top 80%',
            end: 'bottom 20%',
            onUpdate: (self) => {
                const progress = self.progress;
                const drawLength = pathLength * progress;
                path.style.strokeDashoffset = pathLength - drawLength;
            }
        });
    }
    
    // Animate experience items
    gsap.utils.toArray('.experience-item').forEach((item, i) => {
        gsap.from(item, {
            x: i % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate project items
    gsap.utils.toArray('.project-item').forEach((item, i) => {
        gsap.from(item, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.2,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate blog items
    gsap.utils.toArray('.blog-item').forEach((item, i) => {
        gsap.from(item, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate artwork gallery
    gsap.utils.toArray('.artwork-item').forEach((item, i) => {
        gsap.from(item, {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Contact form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send the data to a server
            // For demonstration, we'll just log it
            console.log('Form submitted:', { name, email, message });
            
            // Show success message (you would implement this)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Navbar highlighting based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-center a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Dynamic border glow effect
    const borderGlowElements = document.querySelectorAll('section');
    
    borderGlowElements.forEach(element => {
        gsap.to(element, {
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
    document.querySelectorAll('.carousel').forEach(carousel => {
        const images = carousel.querySelectorAll('img');
        let index = 0;
    
        images.forEach((img, i) => {
            img.style.opacity = i === 0 ? '1' : '0';
            img.style.zIndex = i === 0 ? '2' : '1';
        });
    
        setInterval(() => {
            images[index].style.opacity = '0';
            images[index].style.zIndex = '1';
            index = (index + 1) % images.length;
            images[index].style.opacity = '1';
            images[index].style.zIndex = '2';
        }, 2500);
    });
    
});

// Email sending functionality for the contact form
// This would typically connect to a backend service
// For GitHub Pages, you'll need to use a service like Formspree or EmailJS
function sendEmail(formData) {
    // Replace with your actual email service integration
    // Example with EmailJS:
    // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
    //     .then(function(response) {
    //         console.log('SUCCESS!', response.status, response.text);
    //     }, function(error) {
    //         console.log('FAILED...', error);
    //     });
    
    // For now, we'll just simulate a successful submission
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 1000);
    });
}

// Add active class to navigation
function setActiveNav() {
    const navLinks = document.querySelectorAll('.nav-center a');
    const sections = document.querySelectorAll('section');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
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

// Call setActiveNav on scroll
window.addEventListener('scroll', setActiveNav);

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});