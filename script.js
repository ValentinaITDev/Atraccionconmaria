// Intersection Observer para animaciones al hacer scroll
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

// Observar todos los elementos con animación
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Smooth scroll para enlaces internos
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

    // Efecto parallax suave en hero
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                if (hero && scrolled < window.innerHeight) {
                    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Añadir efecto hover a las tarjetas de servicio
    const serviceCards = document.querySelectorAll('.servicio-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderTopColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--color-fuchsia');
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderTopColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--color-secondary');
        });
    });

    // Tracking de clics en botones de WhatsApp (opcional para analytics)
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('WhatsApp button clicked:', this.textContent.trim());
            // Aquí puedes agregar código de analytics si lo necesitas
        });
    });
});

// Prevenir comportamiento por defecto en algunos navegadores
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
