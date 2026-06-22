document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle - No toggle button inside
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
                document.body.classList.add('menu-open');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const navbar = document.querySelector('.navbar');
        if (navbar && !navbar.contains(e.target)) {
            const navLinks = document.querySelector('.nav-links');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.replace('fa-times', 'fa-bars');
                }
                document.body.classList.remove('menu-open');
            }
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const navLinks = document.querySelector('.nav-links');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.replace('fa-times', 'fa-bars');
                }
                document.body.classList.remove('menu-open');
            }
        }
    });

    // Close mobile menu when a link is clicked (for better UX)
    const allNavLinks = document.querySelectorAll('.nav-links a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.replace('fa-times', 'fa-bars');
                }
                document.body.classList.remove('menu-open');
            }
        });
    });

    // Mega menu toggle for mobile & arrow clicks
    const aboutLink = document.querySelector('.nav-links a[href="about.html"]');
    if (aboutLink) {
        const arrow = aboutLink.querySelector('.fa-chevron-down');
        if (arrow) {
            aboutLink.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const megaMenu = aboutLink.nextElementSibling;
                    if(megaMenu && megaMenu.classList.contains('mega-menu')) {
                        const isVisible = megaMenu.style.display === 'flex';
                        megaMenu.style.display = isVisible ? 'none' : 'flex';
                    }
                }
            });
        }
    }

    // 2. Dark/Light Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark' && themeToggle) {
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            }
        });
    }

    // 3. Scroll Progress and Sticky Navbar
    const scrollProgress = document.getElementById('scroll-progress');
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        // Scroll Progress
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = progress + '%';
        }

        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. Mouse Follow Spotlight
    document.addEventListener('mousemove', (e) => {
        document.documentElement.style.setProperty('--x', e.clientX + 'px');
        document.documentElement.style.setProperty('--y', e.clientY + 'px');
    });

    // 5. Floating Particles
    const particlesContainer = document.querySelector('.particles-container');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random size, position, and duration
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = posX + 'vw';
            particle.style.top = '100vh';
            particle.style.animationDuration = duration + 's';
            particle.style.animationDelay = delay + 's';
            
            particlesContainer.appendChild(particle);
        }
    }

    // 6. Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // 7. Initialize Swiper if exists
    if (document.querySelector('.swiper') && typeof Swiper !== 'undefined') {
        new Swiper('.swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: '.swiper-pagination',
            },
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                480: {
                    slidesPerView: 1,
                    spaceBetween: 15
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });
    }

    // 8. Animated Counters (Intersection Observer)
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length > 0) {
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const endValue = parseInt(target.getAttribute('data-target'));
                    let startValue = 0;
                    const duration = 2000;
                    const increment = endValue / (duration / 16);

                    const updateCounter = () => {
                        startValue += increment;
                        if (startValue < endValue) {
                            target.innerText = Math.ceil(startValue);
                            requestAnimationFrame(updateCounter);
                        } else {
                            target.innerText = endValue;
                        }
                    };
                    updateCounter();
                    observer.unobserve(target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
});