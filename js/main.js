document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const bars = document.querySelectorAll('.menu-toggle .bar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            this.classList.toggle('active');
            
            // Animation pour hamburger
            if (this.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
                
                // Empêcher le défilement du body
                document.body.style.overflow = 'hidden';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
                
                // Réactiver le défilement
                document.body.style.overflow = '';
            }
        });
        
        // Fermer le menu lors du clic sur un lien
        const navItems = document.querySelectorAll('.nav-links li a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navLinks.classList.remove('show');
                menuToggle.classList.remove('active');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
                document.body.style.overflow = '';
            });
        });
    }
    
    // Gestion du bouton CTA mobile
    const mobileCta = document.querySelector('.mobile-cta');
    let lastScrollTop = 0;
    const scrollThreshold = 300;
    
    if (mobileCta && window.innerWidth <= 576) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            // Afficher le CTA lorsqu'on scrolle et qu'on est sous le seuil
            if (currentScroll > scrollThreshold) {
                mobileCta.classList.add('show');
                document.body.classList.add('has-mobile-cta');
            } else {
                mobileCta.classList.remove('show');
                document.body.classList.remove('has-mobile-cta');
            }
            
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        });
    }
    
    // Animation pour les cartes d'hôtel sur le scroll
    const hotelCards = document.querySelectorAll('.hotel-card');
    
    if (hotelCards.length) {
        const fadeInOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const fadeInObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, fadeInOptions);
        
        hotelCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            fadeInObserver.observe(card);
        });
    }
    
    // Amélioration de la recherche sur mobile
    const searchForm = document.querySelector('.search-form');
    
    if (searchForm && window.innerWidth <= 576) {
        const formGroups = searchForm.querySelectorAll('.form-group');
        const searchButton = searchForm.querySelector('.btn');
        
        // Ajouter des animations pour le focus des champs
        formGroups.forEach(group => {
            const input = group.querySelector('input, select');
            const label = group.querySelector('label');
            
            if (input && label) {
                input.addEventListener('focus', function() {
                    label.style.color = 'var(--primary-color)';
                    group.style.transform = 'translateY(-3px)';
                    group.style.transition = 'transform 0.3s ease';
                });
                
                input.addEventListener('blur', function() {
                    label.style.color = '';
                    group.style.transform = '';
                });
            }
        });
        
        // Animation pour le bouton de recherche
        if (searchButton) {
            searchButton.addEventListener('click', function(e) {
                if (!isFormValid(searchForm)) {
                    e.preventDefault();
                    showMobileAlert('Veuillez remplir tous les champs requis');
                }
            });
        }
    }
    
    // Fonctions utilitaires
    function isFormValid(form) {
        const requiredInputs = form.querySelectorAll('[required]');
        return Array.from(requiredInputs).every(input => input.value.trim() !== '');
    }
    
    function showMobileAlert(message) {
        // Créer une alerte mobile personnalisée
        const alertEl = document.createElement('div');
        alertEl.className = 'mobile-alert';
        alertEl.textContent = message;
        
        // Styles
        alertEl.style.position = 'fixed';
        alertEl.style.bottom = '80px';
        alertEl.style.left = '50%';
        alertEl.style.transform = 'translateX(-50%)';
        alertEl.style.backgroundColor = 'rgba(44, 62, 80, 0.9)';
        alertEl.style.color = 'white';
        alertEl.style.padding = '10px 20px';
        alertEl.style.borderRadius = '6px';
        alertEl.style.zIndex = '1000';
        alertEl.style.opacity = '0';
        alertEl.style.transition = 'opacity 0.3s ease';
        
        document.body.appendChild(alertEl);
        
        setTimeout(() => {
            alertEl.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            alertEl.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(alertEl);
            }, 300);
        }, 3000);
    }
    
    // Correction de la gestion du lien d'administration
    const adminLink = document.querySelector('.admin-link');
    if (adminLink) {
        adminLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Version simplifiée sans confirmation pour résoudre le problème immédiat
            window.location.href = 'admin.html';
            
            /* Version avec confirmation - commentée pour diagnostic
            if (confirm('Voulez-vous accéder à la page d\'administration?')) {
                window.location.href = 'admin.html';
            }
            */
        });
    }
}); 