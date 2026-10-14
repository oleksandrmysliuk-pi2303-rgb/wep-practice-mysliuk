const supabaseUrl = 'https://wbetohxzimjeajxbdcyg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZXRvaHh6aW1qZWFqeGJkY3lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzOTg1NDgsImV4cCI6MjEwNjk3NDU0OH0.Qr0a5ER0wYoj1-IyvEsKyaUW0oKeni5lVHcC-ZEucwo';
supabase = window.supabase.createClient(supabaseUrl, SUPABASE_KEY);
// ===== BURGER MENU =====
const menuIcon = document.getElementById('menuIcon');
const menuIconOpen = document.getElementById('menuIconOpen');
const menuIconClose = document.getElementById('menuIconClose');
const mainMenu = document.getElementById('mainMenu');

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