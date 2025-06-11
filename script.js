document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
        updateThemeToggleIcon(savedTheme);
    } else {
        // Default to dark theme if no preference is saved
        body.classList.add('dark-theme');
        updateThemeToggleIcon('dark-theme');
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
            updateThemeToggleIcon('light-theme');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
            updateThemeToggleIcon('dark-theme');
        }
    });

    function updateThemeToggleIcon(currentTheme) {
        if (currentTheme === 'dark-theme') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    // Intersection Observer for animations on scroll
    const sections = document.querySelectorAll('.section');
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate'); // Add a class for animation (defined in CSS)
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Add animation class for sections
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
        .section.animate {
            animation: fadeIn 1s ease-out forwards;
        }
    `, styleSheet.cssRules.length);

    styleSheet.insertRule(`
        .skill-item, .education-item, .language-item, .certificate-item, .interest-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
    `, styleSheet.cssRules.length);

    styleSheet.insertRule(`
        .section.animate .skill-item,
        .section.animate .education-item,
        .section.animate .language-item,
        .section.animate .certificate-item,
        .section.animate .interest-item {
            opacity: 1;
            transform: translateY(0);
        }
    `, styleSheet.cssRules.length);

    // Staggered animation for grid items
    sections.forEach(section => {
        const gridItems = section.querySelectorAll('.skills-grid .skill-item, .education-grid .education-item, .languages-grid .language-item, .certificates-grid .certificate-item, .interests-grid .interest-item');
        gridItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // Staggered animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        item.style.transitionDelay = `${index * 0.2}s`; // Staggered delay
    });

    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, options);

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
});