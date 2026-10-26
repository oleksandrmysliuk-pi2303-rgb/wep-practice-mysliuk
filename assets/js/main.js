
const supabaseUrl = 'https://wbetohxzimjeajxbdcyg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZXRvaHh6aW1qZWFqeGJkY3lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzOTg1NDgsImV4cCI6MjEwNjk3NDU0OH0.Qr0a5ER0wYoj1-IyvEsKyaUW0oKeni5lVHcC-ZEucwo';
supabase = window.supabase.createClient(supabaseUrl, SUPABASE_KEY);
// ===== BURGER MENU =====
const menuIcon = document.getElementById('menuIcon');
const menuIconOpen = document.getElementById('menuIconOpen');
const menuIconClose = document.getElementById('menuIconClose');
const mainMenu = document.getElementById('mainMenu');

// ===== PRELOADER =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => preloader.remove(), 500);
    }, 1200);
});
menuIcon.addEventListener('click', () => {
    menuIconOpen.classList.toggle('d_none');
    menuIconClose.classList.toggle('d_none');
    mainMenu.classList.toggle('menu-open');
    document.body.style.overflow = mainMenu.classList.contains('menu-open') ? 'hidden' : '';
});

const menuLinks = document.querySelectorAll('.main_menu a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mainMenu.classList.remove('menu-open');
        menuIconOpen.classList.remove('d_none');
        menuIconClose.classList.add('d_none');
        document.body.style.overflow = '';
    });
});

// ===== STICKY HEADER =====
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.innerWidth >= 800) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// ===== AOS =====
AOS.init({
    duration: 700,
    once: true,
    offset: 60,
    easing: 'ease-out-cubic',
});
// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'dark' 
        ? '<i class="fa-solid fa-sun"></i>' 
        : '<i class="fa-solid fa-moon"></i>';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });
}

// ===== COUNTERS =====
function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const duration = 4000; // 4 seconds
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

const counters = document.querySelectorAll('.about_stat_num[data-count]');
if (counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}


