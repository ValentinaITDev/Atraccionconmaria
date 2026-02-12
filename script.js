// Intersection Observer para animaciones al hacer scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Lazy loading para imágenes
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // El navegador soporta lazy loading nativo
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback para navegadores antiguos
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
};

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    // Observar elementos con animación
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Inicializar lazy loading
    lazyLoadImages();

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

    // Mostrar/ocultar botón flotante de WhatsApp en móvil
    const whatsappFloat = document.querySelector('.whatsapp-float');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (window.innerWidth <= 768) {
            if (currentScroll > 300) {
                whatsappFloat.style.display = 'flex';
            } else {
                whatsappFloat.style.display = 'none';
            }
        }
        
        lastScroll = currentScroll;
    }, { passive: true });

    // Tracking de clics en botones de WhatsApp (opcional para analytics)
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('WhatsApp button clicked:', this.textContent.trim());
            // Aquí puedes agregar código de analytics si lo necesitas
            // Ejemplo: gtag('event', 'whatsapp_click', { button_location: this.className });
        });
    });

    // Optimización: Reducir calidad de fondo en dispositivos móviles
    if (window.innerWidth <= 768) {
        document.body.style.backgroundSize = 'cover';
    }
});

// Optimización de rendimiento: Throttle para eventos de scroll
function throttle(func, wait) {
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

// Prevenir comportamiento por defecto en algunos navegadores
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Precargar imagen de fondo para mejor rendimiento
    const bgImage = new Image();
    bgImage.src = 'imagenes/fondorojoamor.jpg';
});

// Detectar si el usuario prefiere movimiento reducido
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Desactivar animaciones para usuarios que prefieren menos movimiento
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.animation = 'none';
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}
