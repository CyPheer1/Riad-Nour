document.addEventListener('DOMContentLoaded', function() {
    // Configuration adaptative des images selon la taille de l'écran
    function setupAdaptiveImages() {
        const isMobile = window.innerWidth <= 576;
        const hotelImages = document.querySelectorAll('.hotel-image img, .offer-image img');
        
        hotelImages.forEach(img => {
            // Ajouter la classe loading
            const parentEl = img.parentElement;
            parentEl.classList.add('loading');
            
            // Définir l'attribut src comme data-src pour lazy loading
            if (!img.dataset.src && img.src) {
                img.dataset.src = img.src;
                
                // Sur mobile, charger une version plus petite si disponible
                if (isMobile && img.dataset.mobileSrc) {
                    img.dataset.src = img.dataset.mobileSrc;
                }
                
                // Enlever src pour éviter le chargement immédiat
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
            }
        });
    }
    
    // Initialiser les options d'observation
    const lazyLoadOptions = {
        root: null, // viewport
        rootMargin: '0px 0px 200px 0px', // charge les images 200px avant qu'elles soient visibles
        threshold: 0.1 // 10% de l'élément doit être visible
    };
    
    // Créer l'observateur d'intersection
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Si une source est définie dans data-src
                if (img.dataset.src) {
                    // Simuler un temps de chargement pour l'effet de squelette (uniquement pour la démo)
                    setTimeout(() => {
                        img.src = img.dataset.src;
                        
                        // Lorsque l'image est chargée, enlever la classe loading
                        img.onload = function() {
                            const parentEl = img.parentElement;
                            parentEl.classList.remove('loading');
                            
                            // Ajouter une classe loaded avec une transition
                            img.classList.add('loaded');
                        };
                    }, Math.random() * 1000 + 500); // Entre 500ms et 1500ms pour la démo
                }
                
                // Arrêter d'observer cet élément
                observer.unobserve(img);
            }
        });
    }, lazyLoadOptions);
    
    // Appliquer le lazy loading
    function applyLazyLoading() {
        const lazyImages = document.querySelectorAll('.hotel-image img, .offer-image img');
        lazyImages.forEach(img => {
            lazyLoadObserver.observe(img);
        });
    }
    
    // Initialiser le scroll horizontal pour les grilles sur mobile
    function setupHorizontalScroll() {
        if (window.innerWidth <= 576) {
            const hotelGrid = document.querySelector('.hotel-grid');
            
            if (hotelGrid && !hotelGrid.closest('.scroll-container')) {
                // Créer les conteneurs pour le scroll horizontal
                const scrollContainer = document.createElement('div');
                scrollContainer.className = 'scroll-container';
                
                const scrollContent = document.createElement('div');
                scrollContent.className = 'scroll-content';
                
                // Déplacer les cartes d'hôtel dans le conteneur de scroll
                const hotelCards = Array.from(hotelGrid.querySelectorAll('.hotel-card'));
                hotelCards.forEach(card => {
                    const scrollItem = document.createElement('div');
                    scrollItem.className = 'scroll-item';
                    scrollItem.appendChild(card.cloneNode(true));
                    scrollContent.appendChild(scrollItem);
                });
                
                scrollContainer.appendChild(scrollContent);
                hotelGrid.parentNode.insertBefore(scrollContainer, hotelGrid);
                hotelGrid.style.display = 'none';
                
                // Réappliquer le lazy loading pour les nouvelles images
                applyLazyLoading();
            }
        }
    }
    
    // Initialisation
    setupAdaptiveImages();
    applyLazyLoading();
    setupHorizontalScroll();
    
    // Mise à jour lors du redimensionnement de la fenêtre
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            setupAdaptiveImages();
            setupHorizontalScroll();
        }, 200);
    });
}); 