// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('show');
            body.classList.toggle('menu-open'); // Pour bloquer le scroll quand le menu est ouvert
        });
        
        // Fermer le menu quand on clique sur un lien
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('show');
                body.classList.remove('menu-open');
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
        }
    });

    // Date validation for check-in and check-out
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    
    if (checkInInput && checkOutInput) {
        // Formatage de la date en YYYY-MM-DD pour l'input date
        const formatDate = function(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        
        checkInInput.min = formatDate(today);
        checkOutInput.min = formatDate(tomorrow);
        
        // Mettre à jour la date minimale de départ quand la date d'arrivée change
        checkInInput.addEventListener('change', function() {
            const newMinDate = new Date(this.value);
            newMinDate.setDate(newMinDate.getDate() + 1);
            checkOutInput.min = formatDate(newMinDate);
            
            // Si la date de départ est avant la nouvelle date d'arrivée, la mettre à jour
            if (new Date(checkOutInput.value) <= new Date(this.value)) {
                checkOutInput.value = formatDate(newMinDate);
            }
        });
    }

    // Hotel Card Animation (additional subtle hover effect)
    const hotelCards = document.querySelectorAll('.hotel-card');
    
    hotelCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    // Lazy loading des images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    } else {
        // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
        lazyImages.forEach(function(img) {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }

    // Système de toast notification
    window.showToast = function(message, type = 'info') {
        // Créer le conteneur s'il n'existe pas
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        
        // Créer le toast
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'error') icon = 'exclamation-circle';
        
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-${icon}"></i>
            </div>
            <div class="toast-content">
                ${message}
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        container.appendChild(toast);
        
        // Animation d'entrée
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Auto-disparition après 4 secondes
        setTimeout(() => {
            toast.classList.remove('show');
            // Supprimer après la fin de l'animation
            setTimeout(() => {
                container.removeChild(toast);
            }, 300);
        }, 4000);
        
        // Fermeture manuelle
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => {
                container.removeChild(toast);
            }, 300);
        });
    };

    // Gestion des formulaires
    const searchForm = document.querySelector('.search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const destination = this.querySelector('#location').value;
            window.showToast(`Recherche en cours pour ${destination}...`, 'info');
            // Ici vous pourriez rediriger vers une page de résultats ou effectuer une recherche AJAX
        });
    }
}); 