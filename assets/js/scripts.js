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

const modalOverlay = document.getElementById('modalOverlay');
const modalOpenBtns = document.querySelectorAll('.modal_open_btn'); // ← з крапкою і підкресленням
const modalClose = document.getElementById('modalClose');
const modalForm = document.getElementById('modalForm');
const modalSuccess = document.getElementById('modalSuccess');

function openModal() {
    modalOverlay.classList.add('is_open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('is_open');
    document.body.style.overflow = '';
}

// forEach бо кнопок декілька
modalOpenBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
});

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById('modal_name');
    const email = document.getElementById('modal_email');
    const message = document.getElementById('modal_message');

    [name, email, message].forEach(field => {
        field.parentElement.classList.remove('has_error');
    });

    if (name.value.trim().length < 2) {
        name.parentElement.classList.add('has_error');
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        email.parentElement.classList.add('has_error');
        isValid = false;
    }

    if (message.value.trim().length < 10) {
        message.parentElement.classList.add('has_error');
        isValid = false;
    }

    if (isValid) {
        modalForm.style.display = 'none';
        modalSuccess.style.display = 'flex';
        setTimeout(() => {
            closeModal();
            modalForm.style.display = 'flex';
            modalSuccess.style.display = 'none';
            modalForm.reset();
        }, 2500);
    }
});
// REVIEWS — DOM рендеринг
// REVIEWS — fetch з JSON
function renderStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += `<i class="fa-${i < rating ? 'solid' : 'regular'} fa-star"></i>`;
    }
    return stars;
}

function renderReviews(reviews) {
    const grid = document.getElementById('reviewsGrid');
    if (!grid) return;

    grid.innerHTML = reviews.map(review => `
        <div class="review_card" data-aos="fade-up">
            <div class="review_stars">
                ${renderStars(review.rating)}
            </div>
            <p class="review_text">"${review.text}"</p>
            <div class="review_author">
                <div class="review_avatar">${review.avatar}</div>
                <div>
                    <p class="review_name">${review.name}</p>
                    <p class="review_role">${review.role}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function showReviewsError() {
    const grid = document.getElementById('reviewsGrid');
    if (!grid) return;
    grid.innerHTML = `
        <div class="reviews_error">
            <i class="fa-solid fa-circle-exclamation"></i>
            <p>Failed to load reviews. Please try again later.</p>
        </div>
    `;
}

async function fetchReviews() {
    const grid = document.getElementById('reviewsGrid');
    if (!grid) return;

    // Показуємо лоадер поки грузиться
    grid.innerHTML = `<div class="reviews_loading">Loading reviews...</div>`;

    try {
        const response = await fetch('assets/data/reviews.json');

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const reviews = await response.json();
        renderReviews(reviews);

        // Оновлюємо AOS після рендерингу
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }

    } catch (error) {
        console.error('Failed to load reviews:', error);
        showReviewsError();
    }
}

fetchReviews();