// Admin Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Animation d'entrée pour les statistiques
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length) {
        statCards.forEach((card, index) => {
            // Animation staggered (décalée)
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }

    // Toggle pour le sidebar sur mobile
    const toggleSidebar = document.querySelector('.toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (toggleSidebar) {
        toggleSidebar.addEventListener('click', function() {
            sidebar.classList.toggle('show');
            
            // Ajuster la marge du contenu principal si le sidebar est visible
            if (sidebar.classList.contains('show')) {
                mainContent.style.marginLeft = '250px';
            } else {
                mainContent.style.marginLeft = '0';
            }
        });
    }
    
    // Filtres de date pour le tableau de bord
    const dateButtons = document.querySelectorAll('.date-filter button');
    
    if (dateButtons.length) {
        dateButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Supprimer la classe active de tous les boutons
                dateButtons.forEach(btn => btn.classList.remove('active'));
                
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                
                // Ici, vous pourriez ajouter du code pour mettre à jour les données affichées
                updateCalendarData(this.textContent.trim());
                
                // Animation pour indiquer un rafraîchissement
                const statsGrid = document.querySelector('.stats-grid');
                if (statsGrid) {
                    statsGrid.classList.add('refreshing');
                    setTimeout(() => {
                        statsGrid.classList.remove('refreshing');
                    }, 500);
                }
            });
        });
    }
    
    // Fonction pour simuler la mise à jour des données du calendrier
    function updateCalendarData(timeFrame) {
        console.log(`Mise à jour des données pour: ${timeFrame}`);
        
        // Simuler un changement sur le calendrier
        const calendarCells = document.querySelectorAll('.calendar-table td:not(:first-child):not(:nth-child(2))');
        
        if (calendarCells.length) {
            calendarCells.forEach(cell => {
                // Attribuer aléatoirement une classe aux cellules pour simuler des changements
                const randomClass = Math.random();
                
                if (randomClass < 0.4) {
                    cell.className = 'available';
                    cell.textContent = 'D';
                } else if (randomClass < 0.8) {
                    cell.className = 'booked';
                    cell.textContent = 'R';
                } else {
                    cell.className = 'maintenance';
                    cell.textContent = 'M';
                }
            });
        }
    }
    
    // Boutons d'action pour les promotions avec feedback visuel
    const promotionButtons = document.querySelectorAll('.promotion-actions button');
    
    if (promotionButtons.length) {
        promotionButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Feedback visuel
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 300);
                
                // S'il s'agit d'un bouton de modification
                if (this.title === 'Modifier') {
                    showToast('Fonctionnalité de modification en cours de développement', 'info');
                }
                
                // S'il s'agit d'un bouton d'activation/désactivation
                if (this.title === 'Activer' || this.title === 'Désactiver') {
                    // Basculer l'état
                    if (this.title === 'Activer') {
                        this.innerHTML = '<i class="fas fa-toggle-on"></i>';
                        this.title = 'Désactiver';
                        this.classList.add('active');
                        showToast('Promotion activée avec succès', 'success');
                    } else {
                        this.innerHTML = '<i class="fas fa-toggle-off"></i>';
                        this.title = 'Activer';
                        this.classList.remove('active');
                        showToast('Promotion désactivée', 'info');
                    }
                }
            });
        });
    }
    
    // Fonctionnalité de recherche améliorée
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    if (searchInput && searchButton) {
        const performSearch = function() {
            const searchValue = searchInput.value.trim();
            if (searchValue) {
                showToast(`Recherche en cours pour: "${searchValue}"`, 'info');
                // Ici vous pourriez ajouter une vraie fonctionnalité de recherche
            }
        };
        
        searchInput.addEventListener('keyup', function(e) {
            // Si l'utilisateur appuie sur Entrée
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        searchButton.addEventListener('click', performSearch);
    }
    
    // Notifications et messages avec animations
    const notificationsButton = document.querySelector('.notifications button');
    const messagesButton = document.querySelector('.messages button');
    
    if (notificationsButton) {
        notificationsButton.addEventListener('click', function() {
            const dropdown = this.nextElementSibling;
            
            // Fermer tous les autres dropdowns ouverts
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdown) {
                    menu.style.display = 'none';
                }
            });
            
            // Basculer l'affichage du dropdown avec animation
            if (dropdown.style.display === 'block') {
                dropdown.classList.remove('showing');
                setTimeout(() => {
                    dropdown.style.display = 'none';
                }, 300);
            } else {
                dropdown.style.display = 'block';
                setTimeout(() => {
                    dropdown.classList.add('showing');
                }, 10);
            }
        });
    }
    
    if (messagesButton) {
        messagesButton.addEventListener('click', function() {
            const dropdown = this.nextElementSibling;
            
            // Fermer tous les autres dropdowns ouverts
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdown) {
                    menu.style.display = 'none';
                }
            });
            
            // Basculer l'affichage du dropdown avec animation
            if (dropdown.style.display === 'block') {
                dropdown.classList.remove('showing');
                setTimeout(() => {
                    dropdown.style.display = 'none';
                }, 300);
            } else {
                dropdown.style.display = 'block';
                setTimeout(() => {
                    dropdown.classList.add('showing');
                }, 10);
            }
        });
    }
    
    // Fermer les dropdowns lorsqu'on clique en dehors
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.notifications') && !e.target.closest('.messages')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu.style.display === 'block') {
                    menu.classList.remove('showing');
                    setTimeout(() => {
                        menu.style.display = 'none';
                    }, 300);
                }
            });
        }
    });
    
    // Gestion des liens de navigation
    const navLinks = document.querySelectorAll('.sidebar-menu ul li a');
    const pageHeader = document.querySelector('.page-header h1');
    
    if (navLinks.length && pageHeader) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Supprimer la classe active de tous les liens
                navLinks.forEach(navLink => {
                    navLink.parentElement.classList.remove('active');
                });
                
                // Ajouter la classe active au lien cliqué
                this.parentElement.classList.add('active');
                
                // Mettre à jour le titre de la page avec animation
                const linkText = this.querySelector('span').textContent;
                pageHeader.style.opacity = '0';
                
                setTimeout(() => {
                    pageHeader.textContent = linkText;
                    pageHeader.style.opacity = '1';
                }, 300);
                
                // Si on est sur mobile, fermer le sidebar
                if (window.innerWidth < 992) {
                    sidebar.classList.remove('show');
                    mainContent.style.marginLeft = '0';
                }
            });
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
}); 