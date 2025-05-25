AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {

    nav.classList.toggle('nav-active');

    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = "navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s";
        }
    });

    burger.classList.toggle('toggle');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Göndərildi!';
        form.reset();
        setTimeout(() => {
            submitBtn.innerHTML = '<span>GÃ¶ndÉr</span><i class="fas fa-paper-plane"></i>';
        }, 2000);
    }, 1500);
});

const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const button = newsletterForm.querySelector('button');
    const originalContent = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i>';
        newsletterForm.reset();
        setTimeout(() => {
            button.innerHTML = originalContent;
        }, 2000);
    }, 1500);
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollTop = document.querySelector('.scroll-top');
    
    if (window.scrollY > 50) {
        navbar.style.background = 'var(--bg-color)';
        navbar.style.boxShadow = 'var(--shadow)';
        scrollTop.classList.add('active');
    } else {
        navbar.style.background = 'var(--bg-color)';
        navbar.style.boxShadow = 'none';
        scrollTop.classList.remove('active');
    }
});

const scrollTop = document.querySelector('.scroll-top');
scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const stats = document.querySelectorAll('.stat h3');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const countTo = parseInt(target.parentElement.getAttribute('data-count'));
            let count = 0;
            const duration = 2000;
            const increment = countTo / (duration / 16);
            
            const counter = setInterval(() => {
                count += increment;
                if (count >= countTo) {
                    target.textContent = countTo + '+';
                    clearInterval(counter);
                } else {
                    target.textContent = Math.floor(count);
                }
            }, 16);
            
            observer.unobserve(target);
        }
    });
}, observerOptions);

stats.forEach(stat => observer.observe(stat));

const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

const blogSlider = new Swiper('.blog-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    }
});

const testimonialsSlider = new Swiper('.testimonials-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        }
    }
});

const themeSwitch = document.querySelector('.theme-switch');
const body = document.body;

themeSwitch.addEventListener('click', () => {
    body.setAttribute('data-theme', body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    themeSwitch.querySelector('i').classList.toggle('fa-moon');
    themeSwitch.querySelector('i').classList.toggle('fa-sun');
});

VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5
});

const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});

const portfolioLinks = document.querySelectorAll('.portfolio-link');
portfolioLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.querySelector('.fa-search')) {
            e.preventDefault();
            const portfolioItem = link.closest('.portfolio-item');
            const imgSrc = portfolioItem.querySelector('img').src;

            const modal = document.createElement('div');
            modal.className = 'portfolio-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${imgSrc}" alt="Portfolio Preview">
                </div>
            `;
            
            document.body.appendChild(modal);

            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.remove();
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        }
    });
});

const style = document.createElement('style');
style.textContent = `
    .portfolio-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    }
    
    .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90vh;
    }
    
    .modal-content img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
    }
    
    .close-modal {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 30px;
        cursor: pointer;
    }
`;
document.head.appendChild(style);
