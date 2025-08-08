// Button click sound effect
const clickSound = new Audio('sound/click.mp3');
clickSound.volume = 0.18;

// Utility: play click sound with error handling
function playClickSound() {
    try {
        clickSound.currentTime = 0;
        clickSound.play();
    } catch (e) {}
}

// Background music for home and popup pages
const pageBgmMap = {
    "index.html": 'sound/music-homepage.mp3',
    "popup1.html": 'sound/music-popup1.mp3',
    "popup2.html": 'sound/music-popup2.mp3',
    "popup3.html": 'sound/music-popup3.mp3',
    "popup4.html": 'sound/music-popup4.mp3',
    "popup5.html": 'sound/music-popup5.mp3'
};

const currentPage = window.location.pathname.split('/').pop();

const isIndex = (currentPage === '' || currentPage === 'index.html');

// Enable background music only for specific pages
if (pageBgmMap[currentPage] || isIndex) {
    const bgmFile = pageBgmMap[currentPage] || pageBgmMap["index.html"];
    const bgm = new Audio(bgmFile);
    bgm.loop = true;
    bgm.volume = 1;

    // Play music only after first user gesture
    function enableBgm() {
        bgm.play();
        window.removeEventListener('click', enableBgm);
        window.removeEventListener('keydown', enableBgm);
    }
    window.addEventListener('click', enableBgm);
    window.addEventListener('keydown', enableBgm);
}

// Smooth scroll and highlight active navigation link
document.querySelectorAll('.nav-link, .footer-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
        const hash = link.getAttribute('href');
        if (hash && hash[0] === '#') {
            e.preventDefault();
            document.querySelector(hash).scrollIntoView({ behavior: "smooth" });
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            if (link.classList.contains('nav-link')) link.classList.add('active');
        }
    });
});

// Button visual effect on hover (archive card action button)
document.querySelectorAll('.action-btn').forEach(function (btn) {
    btn.addEventListener('mouseenter', function () {
        btn.style.boxShadow = "0 0 24px #48f0e3, 0 0 10px #fa64a3";
    });
    btn.addEventListener('mouseleave', function () {
        btn.style.boxShadow = "";
    });
});

// Card title hover highlight
document.querySelectorAll('.hover-text, h3.hover-text').forEach(function (h) {
    h.addEventListener('mouseenter', function () {
        h.style.color = "#fa64a3";
        h.style.textShadow = "0 0 16px #48f0e3";
    });
    h.addEventListener('mouseleave', function () {
        h.style.color = "";
        h.style.textShadow = "";
    });
});

// "Back to Home Page" button (in popup pages)
document.querySelectorAll('.back-link').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = "index.html";
    });
});

// Fade-in animation for detail pages
window.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('page-loaded');
    let detail = document.querySelector('.detail-container');
});

// Carousel logic for images/videos in popup pages
document.querySelectorAll('.detail-carousel').forEach(function (carousel) {
    let slides = carousel.querySelectorAll('.carousel-item');
    let idx = 0;

    // Show the current slide by index
    function showSlide(i) {
        slides.forEach((s, n) => {
            if (n === i) {
                s.classList.add('active');
                s.style.opacity = "1";
                s.style.transition = "opacity 0.5s";
            } else {
                s.classList.remove('active');
                s.style.opacity = "0";
            }
        });
        carousel.setAttribute('data-idx', i);
    }

    let prevBtn = carousel.querySelector('.carousel-prev');
    let nextBtn = carousel.querySelector('.carousel-next');

    // Add click events for prev/next
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            idx = (idx - 1 + slides.length) % slides.length;
            showSlide(idx);
        });
        nextBtn.addEventListener('click', () => {
            idx = (idx + 1) % slides.length;
            showSlide(idx);
        });
        showSlide(idx);
    }
});

// Typewriter animation for fade-paragraphs, supporting <br> tags for empty lines
document.addEventListener('DOMContentLoaded', function () {
    const paragraphs = document.querySelectorAll('.fade-paragraph');
    const charDelay = 22;    // Delay (ms) for each character to appear
    const paraDelay = 350;   // Delay (ms) between paragraphs

    // Helper function: wrap each character in a <span class="typed-char">
    // This version preserves <br> tags for paragraph line breaks
    function wrapChars(node) {
        // Use innerHTML so we can preserve <br> tags
        const html = node.innerHTML;
        node.innerHTML = '';

        // Parse the original HTML content as DOM nodes
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Walk through all child nodes (text, <br>, etc.)
        tempDiv.childNodes.forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                // For each character in a text node, wrap in a span
                for (let i = 0; i < child.textContent.length; i++) {
                    const span = document.createElement('span');
                    span.textContent = child.textContent[i];
                    span.className = 'typed-char';
                    node.appendChild(span);
                }
            } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName === 'BR') {
                // For <br>, append directly to the node (preserves empty lines)
                node.appendChild(document.createElement('br'));
            }
            // You can add more tag handling here if needed in the future
        });
    }

    // Apply wrapChars to each target paragraph
    paragraphs.forEach(wrapChars);

    // Intersection Observer: triggers animation when paragraphs enter viewport
    let observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                // Sequentially "type" each paragraph and its characters
                (async function typeAll() {
                    for (let pi = 0; pi < paragraphs.length; pi++) {
                        const chars = paragraphs[pi].querySelectorAll('.typed-char');
                        for (let ci = 0; ci < chars.length; ci++) {
                            chars[ci].classList.add('visible');
                            await new Promise(res => setTimeout(res, charDelay));
                        }
                        await new Promise(res => setTimeout(res, paraDelay));
                    }
                })();
                observer.disconnect(); // Only trigger once per popup page
            }
        });
    }, { threshold: 0.17 });

    // Observe the first fade-paragraph (triggers all at once)
    if (paragraphs.length) observer.observe(paragraphs[0]);
});


// Play click sound on all key button-like elements
document.querySelectorAll('button, .carousel-prev, .carousel-next, .nav-link').forEach(function (btn) {
    btn.addEventListener('click', function () {
        playClickSound();
    });
});

// Action-btn: delayed navigation for click sound effect
document.querySelectorAll('a.action-btn').forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        playClickSound();
        const href = link.getAttribute('href');
        setTimeout(function () {
            window.location.href = href;
        }, 600); // Delay allows click sound to play
    });
});
