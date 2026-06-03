const menuIcon = document.getElementById('menuIcon');
const menuIconOpen = document.getElementById('menuIconOpen');
const menuIconClose = document.getElementById('menuIconClose');
const mainMenu = document.getElementById('mainMenu');
menuIcon.addEventListener('click', () => {
    menuIconOpen.classList.toggle('d_none');
    menuIconClose.classList.toggle('d_none');
    mainMenu.classList.toggle('menu-open');
    document.body.style.overflow = mainMenu.classList.contains('menu-open') ? 'hidden' : '';
})
const menuLinks = document.querySelectorAll('.main_menu a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mainMenu.classList.remove('menu-open');
        menuIconOpen.classList.remove('d_none');
        menuIconClose.classList.add('d_none');
        document.body.style.overflow = '';
    });
});

// SPECS SLIDER
const slider = document.getElementById('specsSlider');
const prevBtn = document.getElementById('specsPrev');
const nextBtn = document.getElementById('specsNext');
const cols = document.querySelectorAll('.specs_col');
let current = 0;

function goToSlide(index) {
    if (window.innerWidth >= 1280) return;

    const colWidth = slider.offsetWidth;
    slider.style.transform = `translateX(-${index * colWidth}px)`;
    slider.style.transition = 'transform 0.4s ease';

    cols.forEach(col => col.classList.remove('specs_col_active'));
    cols[index].classList.add('specs_col_active');
    current = index;
}

nextBtn.addEventListener('click', () => {
    if (current < cols.length - 1) goToSlide(current + 1);
});

prevBtn.addEventListener('click', () => {
    if (current > 0) goToSlide(current - 1);
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1280) {
        slider.style.transform = 'none';
    } else {
        goToSlide(current);
    }
});
// HOWTO SLIDER
const howtoSlider = document.getElementById('howtoSlider');
const howtoPrev = document.getElementById('howtoPrev');
const howtoNext = document.getElementById('howtoNext');
const howtoCols = document.querySelectorAll('.howto_col');
let howtoCurrent = 0;

function howtoGoToSlide(index) {
    if (window.innerWidth >= 1280) return;
    const colWidth = howtoSlider.parentElement.offsetWidth; /* ← 100% */
    howtoSlider.style.transform = `translateX(-${index * colWidth}px)`;
    howtoCurrent = index;
}

howtoNext.addEventListener('click', () => {
    if (howtoCurrent < howtoCols.length - 1) howtoGoToSlide(howtoCurrent + 1); // ← було -2, стало -1
});

howtoPrev.addEventListener('click', () => {
    if (howtoCurrent > 0) howtoGoToSlide(howtoCurrent - 1);
});
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
});
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 700,
        once: true,
        offset: 60,
        easing: 'ease-out-cubic',
    });
});
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.innerWidth >= 800) { // ← тільки від планшета
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});