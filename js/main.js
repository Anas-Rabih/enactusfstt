// ===============================
// Site Enactus FSTT
// Version simplifiée sans Node.js
// ===============================

console.log('🎯 Chargement du script principal...');

// ===============================
// DONNÉES PAR DÉFAUT
// ===============================
const defaultData = {
    header: {
        title: "Enactus FST Tanger",
        subtitle: "Entrepreneurial Action Paving the Way to a Better World",
        logo: "/images/logo.png"
    },
    about: {
        title: "Notre Mission",
        description: `<p>Enactus est une communauté internationale d'étudiants, de leaders académiques et professionnels engagés pour créer un monde meilleur à travers l'action entrepreneuriale.</p>
        <p>À Enactus FST Tanger, nous mobilisons les talents d'étudiants universitaires pour développer des projets communautaires qui autonomisent les personnes dans le besoin.</p>`,
        image: "/images/about.jpg",
        stats: [
            { number: "50+", label: "Membres Actifs" },
            { number: "10+", label: "Projets Réalisés" },
            { number: "1000+", label: "Vies Impactées" }
        ]
    },
    projects: [],
    team: [],
    events: [],
    gallery: [],
    contact: {
        email: "enactus@fstt.ac.ma",
        phone: "+212 6 00 00 00 00",
        address: "Faculté des Sciences et Techniques de Tanger<br>BP 416, Tanger, Maroc",
        social: [
            { platform: "Facebook", url: "https://facebook.com/enactusfstt", icon: '<i class="fab fa-facebook-f"></i>' },
            { platform: "Instagram", url: "https://instagram.com/enactusfstt", icon: '<i class="fab fa-instagram"></i>' },
            { platform: "LinkedIn", url: "https://linkedin.com/company/enactusfstt", icon: '<i class="fab fa-linkedin-in"></i>' },
            { platform: "Twitter", url: "https://twitter.com/enactusfstt", icon: '<i class="fab fa-x-twitter"></i>' }
        ]
    }
};

let siteData = { ...defaultData };

// ===============================
// CHARGEMENT DES DONNÉES
// ===============================
async function loadData() {
    try {
        console.log('🔄 Chargement des données depuis data.json...');
        
        const response = await fetch('/data.json');
        
        if (!response.ok) {
            throw new Error('Fichier data.json non trouvé');
        }
        
        const data = await response.json();
        
        // Merge avec les données par défaut
        siteData = {
            header: data.header || defaultData.header,
            about: data.about || defaultData.about,
            projects: data.projects || defaultData.projects,
            team: data.team || defaultData.team,
            events: data.events || defaultData.events,
            gallery: data.gallery || defaultData.gallery,
            contact: data.contact || defaultData.contact
        };
        
        console.log('✅ Données chargées avec succès');
        console.log(`   - ${siteData.projects.length} projet(s)`);
        console.log(`   - ${siteData.team.length} membre(s)`);
        console.log(`   - ${siteData.events.length} événement(s)`);
        console.log(`   - ${siteData.gallery.length} photo(s)`);
        
    } catch (error) {
        console.warn('⚠️ Impossible de charger data.json, utilisation des données par défaut');
        console.warn('   Raison:', error.message);
    }
    
    initializeSite();
}

// ===============================
// INITIALISATION DU SITE
// ===============================
function initializeSite() {
    console.log('🚀 Initialisation du site...');
    
    updateHeader();
    updateAbout();
    renderProjects();
    renderTeam();
    renderEvents();
    renderGallery();
    updateContact();
    setupNavigation();
    setupMobileMenu();
    setupScrollEffects();
    setupContactForm();
    
    console.log('✅ Site initialisé avec succès');
}

// ===============================
// MISE À JOUR EN-TÊTE
// ===============================
function updateHeader() {
    const titleEl = document.getElementById('header-title');
    const subtitleEl = document.getElementById('header-subtitle');
    
    if (titleEl && siteData.header?.title) {
        titleEl.textContent = siteData.header.title;
    }
    
    if (subtitleEl && siteData.header?.subtitle) {
        subtitleEl.textContent = siteData.header.subtitle;
    }
}

// ===============================
// MISE À JOUR À PROPOS
// ===============================
function updateAbout() {
    const titleEl = document.getElementById('about-title');
    const descEl = document.getElementById('about-description');
    const imgEl = document.getElementById('about-img');
    
    if (titleEl && siteData.about?.title) {
        titleEl.textContent = siteData.about.title;
    }
    if (descEl && siteData.about?.description) {
        descEl.innerHTML = siteData.about.description;
    }
    
    if (imgEl && siteData.about?.image) {
        imgEl.src = siteData.about.image;
        imgEl.alt = siteData.about.title || "À propos d'Enactus";
    }
    
    // Statistiques
    if (siteData.about?.stats && Array.isArray(siteData.about.stats)) {
        siteData.about.stats.forEach((stat, index) => {
            const numberEl = document.getElementById(`stat${index + 1}-number`);
            const labelEl = document.getElementById(`stat${index + 1}-label`);
            
            if (numberEl) numberEl.textContent = stat.number;
            if (labelEl) labelEl.textContent = stat.label;
        });
    }
}

// ===============================
// RENDU DES PROJETS
// ===============================
function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;
    
    if (!siteData.projects || siteData.projects.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <p style="color: #666; font-size: 1.1rem;">Nos projets seront bientôt présentés ici.</p>
            </div>
        `;
        return;
    }
    
    // Trier par date (plus récent en premier)
    const sortedProjects = [...siteData.projects].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );
    
    container.innerHTML = sortedProjects.map(project => `
        <div class="project-card">
            <img src="${project.image || '/images/placeholder.jpg'}" 
                 alt="${project.title}" 
                 onerror="this.src='/images/placeholder.jpg'">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                ${project.status ? `
                    <span class="project-status">${project.status}</span>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// ===============================
// RENDU DE L'ÉQUIPE
// ===============================
function renderTeam() {
    const container = document.getElementById('team-container');
    if (!container) return;
    
    if (!siteData.team || siteData.team.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <p style="color: #666; font-size: 1.1rem;">Notre équipe sera bientôt présentée.</p>
            </div>
        `;
        return;
    }
    
    // Trier par ordre d'affichage
    const sortedTeam = [...siteData.team].sort((a, b) => 
        (a.order || 999) - (b.order || 999)
    );
    
    container.innerHTML = sortedTeam.map(member => `
        <div class="team-member">
            <img src="${member.image || '/images/placeholder-avatar.jpg'}" 
                 alt="${member.name}" 
                 onerror="this.src='/images/placeholder-avatar.jpg'">
            <h3>${member.name}</h3>
            <p>${member.role}</p>
            ${member.bio ? `<span class="bio">${member.bio}</span>` : ''}
        </div>
    `).join('');
}

// ===============================
// RENDU DES ÉVÉNEMENTS
// ===============================
function renderEvents() {
    const container = document.getElementById('events-container');
    if (!container) return;
    
    if (!siteData.events || siteData.events.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <p style="color: #666; font-size: 1.1rem;">Aucun événement prévu pour le moment. Restez connectés !</p>
            </div>
        `;
        return;
    }
    
    // Trier par date (plus proche en premier)
    const sortedEvents = [...siteData.events].sort((a, b) => 
        new Date(a.date) - new Date(b.date)
    );
    
    container.innerHTML = sortedEvents.map(event => {
        let formattedDate = 'Date à venir';
        
        try {
            const eventDate = new Date(event.date);
            if (!isNaN(eventDate.getTime())) {
                formattedDate = eventDate.toLocaleDateString('fr-FR', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                });
            }
        } catch (e) {
            console.warn('Format de date invalide:', event.date);
        }
        
        return `
            <div class="event-card">
                <div class="event-date">${formattedDate}</div>
                <div class="event-info">
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                    ${event.link && event.link !== '#' && event.link !== '' ? 
                        `<a href="${event.link}" class="event-link" target="_blank" rel="noopener noreferrer">S'inscrire</a>` 
                        : ''}
                </div>
            </div>
        `;
    }).join('');
}

// ===============================
// RENDU DE LA GALERIE
// ===============================
function renderGallery() {
    const container = document.getElementById('gallery-container');
    if (!container) return;
    
    if (!siteData.gallery || siteData.gallery.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <p style="color: #666; font-size: 1.1rem;">La galerie sera bientôt remplie de nos meilleurs moments !</p>
            </div>
        `;
        return;
    }
    
    // Trier par date (plus récent en premier)
    const sortedGallery = [...siteData.gallery].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );
    
    container.innerHTML = sortedGallery.map((item, index) => `
        <div class="gallery-item" data-index="${index}">
            <img src="${item.image}" 
                 alt="${item.caption || 'Photo Enactus'}" 
                 onerror="this.src='/images/placeholder.jpg'">
            <div class="gallery-overlay">
                <span>🔍</span>
            </div>
        </div>
    `).join('');
    
    // Événements de clic pour agrandir les images
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img && img.src && !img.src.includes('placeholder')) {
                window.open(img.src, '_blank');
            }
        });
    });
}

// ===============================
// MISE À JOUR CONTACT
// ===============================
function updateContact() {
    const emailEl = document.getElementById('contact-email');
    const phoneEl = document.getElementById('contact-phone');
    const addressEl = document.getElementById('contact-address');
    const socialContainer = document.getElementById('social-links-container');
    
    if (emailEl && siteData.contact?.email) {
        emailEl.textContent = siteData.contact.email;
        emailEl.href = `mailto:${siteData.contact.email}`;
    }
    
    if (phoneEl && siteData.contact?.phone) {
        phoneEl.textContent = siteData.contact.phone;
        phoneEl.href = `tel:${siteData.contact.phone.replace(/\s/g, '')}`;
    }
    
    if (addressEl && siteData.contact?.address) {
        addressEl.innerHTML = siteData.contact.address;
    }
    
    // Réseaux sociaux
    if (socialContainer && siteData.contact?.social && siteData.contact.social.length > 0) {
        socialContainer.innerHTML = siteData.contact.social.map(social => `
            <a href="${social.url}" 
               class="social-link" 
               target="_blank" 
               rel="noopener noreferrer" 
               title="${social.platform}"
               aria-label="${social.platform}">
                <span>${social.icon || '🔗'}</span>
            </a>
        `).join('');
    }
}

// ===============================
// CONFIGURATION NAVIGATION
// ===============================
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section, header');
    
    // Scroll fluide au clic
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile
                const navLinksContainer = document.querySelector('.nav-links');
                const toggleBtn = document.querySelector('.mobile-menu-toggle');
                if (navLinksContainer) {
                    navLinksContainer.classList.remove('active');
                }
                if (toggleBtn) {
                    toggleBtn.classList.remove('active');
                }
            }
        });
    });
    
    // Lien actif au scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    if (window.pageYOffset >= sectionTop) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ===============================
// MENU MOBILE
// ===============================
function setupMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!toggle || !navLinks) return;
    
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        toggle.classList.toggle('active');
    });
    
    // Fermer en cliquant ailleurs
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            toggle.classList.remove('active');
        }
    });
    
    // Fermer avec Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navLinks.classList.remove('active');
            toggle.classList.remove('active');
        }
    });
}

// ===============================
// EFFETS DE SCROLL
// ===============================
function setupScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    // Navbar change au scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Animation des éléments au scroll
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
    
    // Observer les éléments animés
    const animatedElements = document.querySelectorAll(
        '.project-card, .team-member, .event-card, .stat-item, .gallery-item, .benefit-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===============================
// FORMULAIRE DE CONTACT
// ===============================
function setupContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton?.textContent;
        
        try {
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Envoi en cours...';
            }
            
            const formData = new FormData(form);
            
            // Envoi via Netlify Forms
            const response = await fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            });
            
            if (response.ok) {
                alert('✅ Merci pour votre message ! Nous vous répondrons bientôt.');
                form.reset();
            } else {
                throw new Error('Erreur lors de l\'envoi');
            }
            
        } catch (error) {
            console.error('Erreur:', error);
            alert('❌ Une erreur est survenue. Veuillez réessayer ou nous contacter directement par email.');
        } finally {
            if (submitButton && originalText) {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        }
    });
}

// ===============================
// INITIALISATION AU CHARGEMENT
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    console.log('📱 DOM chargé, démarrage de l\'application...');
    loadData();
});

// Gestion des erreurs globales
window.addEventListener('error', (e) => {
    console.error('❌ Erreur détectée:', e.message, e.filename, e.lineno);
});

console.log('✅ Script main.js chargé avec succès');