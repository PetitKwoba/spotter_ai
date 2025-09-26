// Highlight active top-level menu based on current page
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    const navProducts = document.querySelector('.nav-top-products');
    const navPricing = document.querySelector('.nav-top-pricing');
    const navResources = document.querySelector('.nav-top-resources');
    const navCompany = document.querySelector('.nav-top-company');

    if (navProducts && /lens|crm|driversapp|tms|sentinel|extension/.test(path)) {
        navProducts.classList.add('active');
    } else if (navPricing && /pricing/.test(path)) {
        navPricing.classList.add('active');
    } else if (navResources && /blog|support/.test(path)) {
        navResources.classList.add('active');
    } else if (navCompany && /about|careers|contact/.test(path)) {
        navCompany.classList.add('active');
    }
});
// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = navLinks.classList.contains('mobile-open');
            
            if (isOpen) {
                navLinks.classList.remove('mobile-open');
                navCta.classList.remove('mobile-open');
                mobileMenuBtn.classList.remove('open');
                document.body.style.overflow = '';
            } else {
                navLinks.classList.add('mobile-open');
                navCta.classList.add('mobile-open');
                mobileMenuBtn.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navLinks && navLinks.classList.contains('mobile-open')) {
            navLinks.classList.remove('mobile-open');
            if (navCta) navCta.classList.remove('mobile-open');
            if (mobileMenuBtn) mobileMenuBtn.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('mobile-open')) {
            navLinks.classList.remove('mobile-open');
            if (navCta) navCta.classList.remove('mobile-open');
            if (mobileMenuBtn) mobileMenuBtn.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Navbar scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
});

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.capability-card, .result-card, .hero-content, .hero-visual');
    animateElements.forEach(el => observer.observe(el));
});

// Dropdown menu accessibility
document.addEventListener('DOMContentLoaded', function() {
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    
    dropdownItems.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (link && menu) {
            // Handle keyboard navigation
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
                
                if (e.key === 'Escape') {
                    dropdown.classList.remove('active');
                    link.focus();
                }
            });
            
            // Handle mouse events
            dropdown.addEventListener('mouseenter', function() {
                dropdown.classList.add('active');
            });
            
            dropdown.addEventListener('mouseleave', function() {
                dropdown.classList.remove('active');
            });
            
            // Handle focus events for accessibility
            const menuItems = menu.querySelectorAll('.dropdown-item');
            menuItems.forEach((item, index) => {
                // Handle dropdown item selection
                item.addEventListener('click', function(e) {
                    // Remove selected class from all items in the same dropdown
                    menuItems.forEach(sibling => {
                        sibling.classList.remove('selected');
                    });
                    
                    // Add selected class to clicked item
                    this.classList.add('selected');
                    
                    // Store selection in sessionStorage for current session
                    const productName = this.querySelector('h4')?.textContent;
                    if (productName) {
                        sessionStorage.setItem('selectedProduct', productName);
                        sessionStorage.setItem('selectedDropdown', dropdown.querySelector('.nav-link').textContent.trim());
                    }
                });

                item.addEventListener('keydown', function(e) {
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        const next = menuItems[index + 1] || menuItems[0];
                        next.focus();
                    }
                    
                    if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        const prev = menuItems[index - 1] || menuItems[menuItems.length - 1];
                        prev.focus();
                    }
                    
                    if (e.key === 'Escape') {
                        dropdown.classList.remove('active');
                        link.focus();
                    }
                    
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            });
        }
    });

    // Restore selected state from sessionStorage
    const selectedProduct = sessionStorage.getItem('selectedProduct');
    const selectedDropdown = sessionStorage.getItem('selectedDropdown');
    
    if (selectedProduct && selectedDropdown) {
        dropdownItems.forEach(dropdown => {
            const dropdownTitle = dropdown.querySelector('.nav-link').textContent.trim();
            if (dropdownTitle === selectedDropdown) {
                const menuItems = dropdown.querySelectorAll('.dropdown-item');
                menuItems.forEach(item => {
                    const productName = item.querySelector('h4')?.textContent;
                    if (productName === selectedProduct) {
                        item.classList.add('selected');
                    }
                });
            }
        });
    }
});

// Ensure Products nav is underlined when a dropdown item is selected
// (works for click, keyboard, and persisted selection)
document.addEventListener('DOMContentLoaded', function() {
    const navProducts = document.querySelector('.nav-top-products');
    const dropdownMenu = navProducts?.querySelector('.dropdown-menu');
    if (!navProducts || !dropdownMenu) return;
    
    // Helper to check if any dropdown item is selected
    function checkDropdownSelected() {
        const selected = dropdownMenu.querySelector('.dropdown-item.selected');
        if (selected) {
            navProducts.classList.add('active');
        }
    }
    // Listen for click on dropdown items
    dropdownMenu.addEventListener('click', function(e) {
        if (e.target.closest('.dropdown-item')) {
            setTimeout(checkDropdownSelected, 10);
        }
    });
    // Listen for keyboard selection
    dropdownMenu.addEventListener('keydown', function(e) {
        if ((e.key === 'Enter' || e.key === ' ') && document.activeElement.classList.contains('dropdown-item')) {
            setTimeout(checkDropdownSelected, 10);
        }
    });
    // On page load, check if any dropdown item is already selected (persisted)
    checkDropdownSelected();
});

// Form validation and submission (if needed later)
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Add form validation logic here if needed
            console.log('Form submitted:', form);
        });
    });
});

// Add loading states for buttons
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.btn-primary[href*="demo"], .btn-primary[href*="quote"]');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.href && (this.href.includes('demo') || this.href.includes('quote'))) {
                // Add loading state
                const originalText = this.textContent;
                this.style.pointerEvents = 'none';
                this.style.opacity = '0.7';
                this.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite; margin-right: 8px;">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Loading...
                `;
                
                // Reset after 2 seconds (in real app, this would be after API call)
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.pointerEvents = '';
                    this.style.opacity = '';
                }, 2000);
            }
        });
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        border-bottom-color: var(--border-hover);
    }
    
    .mobile-menu-btn.open span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.open span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.open span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-links.mobile-open,
        .nav-cta.mobile-open {
            display: flex !important;
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            bottom: 0;
            background: white;
            flex-direction: column;
            padding: 32px 24px;
            gap: 24px;
            overflow-y: auto;
            z-index: 999;
        }
        
        .nav-links.mobile-open .dropdown-menu {
            position: static;
            opacity: 1;
            visibility: visible;
            transform: none;
            box-shadow: none;
            border: none;
            margin-top: 16px;
            margin-left: 16px;
        }
        
        .nav-links.mobile-open .nav-item.dropdown:hover .dropdown-menu {
            display: block;
        }
    }
`;
document.head.appendChild(style);