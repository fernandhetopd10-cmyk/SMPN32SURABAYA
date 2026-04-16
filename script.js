document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-window');

    function showSection(id) {
        sections.forEach(section => {
            if (section.id === id) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.currentTarget.getAttribute('data-target');
            showSection(target);

            navLinks.forEach(l => l.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });

    // Menu toggle button functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
    }

    // Sliding background images for sections with two hero images
    const sectionsWithSlidingHero = ['home', 'berita', 'kegiatan', 'ekstrakulikuler'];
    const images = {
        home: [
            'file:///C:/Users/Fernandhrto%20Putra/Documents/akusuka.JPG',
            'file:///C:/Users/Fernandhrto%20Putra/Documents/fotosekolah.jpg'
        ],
        berita: [
            'file:///C:/Users/Fernandhrto%20Putra/Documents/akusuka.jpg',
            'file:///C:/Users/Fernandhrto%20Putra/Documents/fotosekolah.jpg'
        ],
        kegiatan: [
            'file:///C:/Users/Fernandhrto%20Putra/Documents/akusuka.jpg',
            'file:///C:/Users/Fernandhrto%20Putra/Documents/fotosekolah.jpg'
        ],
        ekstrakulikuler: [
            'file:///C:/Users/Fernandhrto%20Putra/Documents/akusuka.jpg',
            'file:///C:/Users/Fernandhrto%20Putra/Documents/fotosekolah.jpg'
        ]
    };

    // Initialize hero images and positions
    const heroElements = {};
    sectionsWithSlidingHero.forEach(sectionId => {
        const heroImage1 = document.querySelector(`#${sectionId} .hero-image-1`);
        const heroImage2 = document.querySelector(`#${sectionId} .hero-image-2`);
        if (heroImage1 && heroImage2) {
            heroImage1.style.left = '0';
            heroImage2.style.left = '100%';
            heroImage1.style.backgroundImage = `url('${images[sectionId][0]}')`;
            heroImage2.style.backgroundImage = `url('${images[sectionId][1]}')`;
            heroElements[sectionId] = { heroImage1, heroImage2 };
        } else {
            // If hero images not found, try to set background for single hero-image div
            const singleHeroImage = document.querySelector(`#${sectionId} .hero-image`);
            if (singleHeroImage && images[sectionId] && images[sectionId].length > 0) {
                singleHeroImage.style.backgroundImage = `url('${images[sectionId][0]}')`;
            }
        }
    });

    function slideBackgroundImage(sectionId) {
        const { heroImage1, heroImage2 } = heroElements[sectionId];
        // Remove transition to disable animation
        heroImage1.style.transition = 'none';
        heroImage2.style.transition = 'none';

        // Keep left positions unchanged to avoid sliding effect
        heroImage1.style.left = '0';
        heroImage2.style.left = '100%';

        // Swap background images instantly without animation
        const temp = heroImage1.style.backgroundImage;
        heroImage1.style.backgroundImage = heroImage2.style.backgroundImage;
        heroImage2.style.backgroundImage = temp;
    }

    setInterval(() => {
        sectionsWithSlidingHero.forEach(sectionId => {
            slideBackgroundImage(sectionId);
        });
    }, 6000);
});
