document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Mobile Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Typing Effect for Hero Section ---
    const typingTextElement = document.querySelector('.typing-text');
    const texts = ["Web Developer", "Front-end Enthusiast", "UI/UX Lover", "Problem Solver"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let deletingSpeed = 60;
    let delayBetweenTexts = 1500; // milliseconds

    function type() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            typingTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end of text
            setTimeout(() => isDeleting = true, delayBetweenTexts);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length; // Loop back to start
        }

        const currentSpeed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(type, currentSpeed);
    }
    if (typingTextElement) {
        type(); // Start the typing effect
    }

    // --- Fade-in on Scroll Animation ---
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.3, // Percentage of element visible to trigger
        rootMargin: "0px 0px -100px 0px" // Adjust to trigger earlier/later
    };

    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- Active Navbar Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) { // Adjust offset as needed
                current = section.getAttribute('id');
            }
        });

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});