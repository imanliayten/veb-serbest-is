const scrollElements = document.querySelectorAll('[data-scroll]');

const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= 
        ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
    );
};

const displayScrollElement = (element) => {
    element.classList.add('scrolled');
};

const hideScrollElement = (element) => {
    element.classList.remove('scrolled');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};

const parallaxElements = document.querySelectorAll('[data-parallax]');

const handleParallax = (e) => {
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax');
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        element.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
};

const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const type = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

const smoothScroll = (target) => {
    const element = document.querySelector(target);
    window.scrollTo({
        top: element.offsetTop - 70,
        behavior: 'smooth'
    });
};

const hoverElements = document.querySelectorAll('[data-hover]');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.classList.add('hover-active');
    });
    
    element.addEventListener('mouseleave', () => {
        element.classList.remove('hover-active');
    });
});

document.addEventListener('DOMContentLoaded', () => {

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    document.addEventListener('mousemove', handleParallax);

    const counters = document.querySelectorAll('[data-counter]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter'));
        animateCounter(counter, target);
    });

    const typingElements = document.querySelectorAll('[data-typing]');
    typingElements.forEach(element => {
        const text = element.getAttribute('data-typing');
        const speed = element.getAttribute('data-typing-speed') || 100;
        typeWriter(element, text, speed);
    });
});

export {
    smoothScroll,
    typeWriter,
    animateCounter,
    handleParallax,
    handleScrollAnimation
};
