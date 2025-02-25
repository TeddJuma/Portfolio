document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-links a');
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const mainContent = document.querySelector('.main-content');
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    // Function to set the theme
    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
    }

    // Set the default theme to dark
    setTheme('dark');

    // Event listener for the theme toggle button
    themeToggle.addEventListener('click', function() {
        if (body.getAttribute('data-theme') === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });

    // Handle navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                // Handle internal scrolling
                event.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 50,
                        behavior: 'smooth'
                    });
                }
            } else {
                // Handle external navigation
                // Do nothing here; the link will navigate normally
            }
        });
    });

    // Sidebar toggle functionality
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        mainContent.classList.toggle('shifted');
    });

    // Automatically generate IDs for project items and link sidebar links
    document.querySelectorAll('.project-item').forEach((item) => {
        const title = item.querySelector('h3').textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        item.id = title;
    });

    document.querySelectorAll('.project-list-sidebar a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
            // Close sidebar after clicking (for mobile view)
            if (window.innerWidth < 768) {
                sidebar.classList.remove('open');
                mainContent.classList.remove('shifted');
            }
        });
    });
});