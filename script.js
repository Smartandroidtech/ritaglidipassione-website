document.addEventListener('DOMContentLoaded', function() {
    // Base URL per lo shop
    //const baseUrl = 'https://shop.ritaglidipassione.com';
    const baseUrl = 'https://gn0k8a-7v.myshopify.com';

    // Aggiorna i link del menu Shop
    document.querySelectorAll('a[href="#shop-piatti"]').forEach(el => {
        el.href = `${baseUrl}/collections/piatti-e-piattini`;
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
    });
    document.querySelectorAll('a[href="#shop-tazze"]').forEach(el => {
        el.href = `${baseUrl}/collections/tazze-e-bicchieri`;
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
    });
    document.querySelectorAll('a[href="#shop-accessori"]').forEach(el => {
        el.href = `${baseUrl}/collections/accessori`;
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
    });
    document.querySelectorAll('a[href="#shop-casa"]').forEach(el => {
        el.href = `${baseUrl}/collections/articoli-per-la-casa`;
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
    });
    // Gestione Anno Corrente Footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Gestione Hamburger Menu
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const mobileNavPanel = document.getElementById('mobileNavPanel');
    const iconHamburger = hamburgerToggle.querySelector('.icon-hamburger');
    const iconClose = hamburgerToggle.querySelector('.icon-close');
    const body = document.body;

    hamburgerToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !isExpanded);
        mobileNavPanel.classList.toggle('open');
        mobileNavPanel.setAttribute('aria-hidden', isExpanded);
        
        if (!isExpanded) {
            iconHamburger.style.display = 'none';
            iconClose.style.display = 'block';
            body.style.overflow = 'hidden'; // Blocca scroll del body
        } else {
            iconHamburger.style.display = 'block';
            iconClose.style.display = 'none';
            body.style.overflow = ''; // Ripristina scroll
        }
    });
    
    // Chiudi il menu mobile quando si clicca su un link (escludendo dropdown)
    const mobileNavLinks = mobileNavPanel.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Chiudi solo se il pannello è aperto e non è un toggle di dropdown
            if (mobileNavPanel.classList.contains('open') && !link.classList.contains('mobile-dropdown-toggle')) {
                hamburgerToggle.click(); // Simula click per chiudere
            }
        });
    });

    // Gestione Dropdown Mobile
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(event) {
            event.preventDefault(); // Previene il comportamento di default del link se è #
            const parentLi = this.parentElement;
            parentLi.classList.toggle('open');
            const isExpanded = parentLi.classList.contains('open');
            this.setAttribute('aria-expanded', isExpanded);
        });
    });
    
    // Animazioni allo Scroll (Intersection Observer)
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observerInstance.unobserve(entry.target); // Opzionale: animare solo una volta
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback per browser senza Intersection Observer (semplicemente mostra gli elementi)
        animatedElements.forEach(el => el.classList.add('is-visible'));
    }

    // Navbar sticky con cambio stile (opzionale)
    const navbar = document.getElementById('main-navbar');
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 50) { // Aggiunge classe dopo 50px di scroll
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        // Nascondi/mostra navbar on scroll up/down (opzionale)
        // if (scrollTop > lastScrollTop && scrollTop > navbar.offsetHeight){
        //     navbar.style.top = `-${navbar.offsetHeight}px`; // Nascondi
        // } else {
        //     navbar.style.top = "0"; // Mostra
        // }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
    }, false);
    // Nuovo parallax per floating icons
    function floatingIconParallax() {
        const wrappers = document.querySelectorAll('.floating-icon-parallax-wrapper');
        const heroSection = document.querySelector('.hero');
        const heroRect = heroSection.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        const heroTop = heroSection.offsetTop;
        const heroHeight = heroSection.offsetHeight;
        wrappers.forEach(wrapper => {
            // Solo asse Y + rotazione
            const speedY = parseFloat(wrapper.getAttribute('data-speed-y')) || 0;
            const rotSpeed = parseFloat(wrapper.getAttribute('data-rotation-speed')) || 0;
            // Parallax solo sulla fascia hero: calcola posizione relativa
            let relativeScrollY = Math.max(0, Math.min(scrollY - heroTop, heroHeight));
            if (scrollY < heroTop) relativeScrollY = 0;
            if (scrollY > heroTop + heroHeight) relativeScrollY = heroHeight;
            const y = relativeScrollY * speedY;
            const rotation = relativeScrollY * rotSpeed;
            wrapper.style.transform = `translateY(${y}px) rotate(${rotation}deg)`;
        });
    }
    window.addEventListener('scroll', floatingIconParallax);
    window.addEventListener('resize', floatingIconParallax);
    document.addEventListener('DOMContentLoaded', floatingIconParallax);
    // Aggiungere CSS per .navbar.scrolled se si vuole un effetto visivo diverso
    // Esempio: .navbar.scrolled { background-color: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }

    // Smooth scroll per link interni (già gestito da html scroll-behavior: smooth)
    // Ma per assicurare la chiusura del menu mobile:
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Chiudi il menu mobile se aperto e se il link è interno
            if (mobileNavPanel.classList.contains('open') && this.hash !== "" && !this.classList.contains('mobile-dropdown-toggle')) {
                 hamburgerToggle.click();
            }
        });
    });

});