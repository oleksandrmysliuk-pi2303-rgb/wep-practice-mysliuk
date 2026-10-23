// ===== SUPABASE =====
const supabaseUrl = 'https://wbetohxzimjeajxbdcyg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZXRvaHh6aW1qZWFqeGJkY3lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzOTg1NDgsImV4cCI6MjEwNjk3NDU0OH0.Qr0a5ER0wYoj1-IyvEsKyaUW0oKeni5lVHcC-ZEucwo';

// Клієнт зберігаємо під іншим іменем, щоб не перезаписувати бібліотеку window.supabase.
// Якщо CDN не завантажився, сайт все одно працює (меню, слайдери, модалка).
const supabaseClient = window.supabase
    ? window.supabase.createClient(supabaseUrl, SUPABASE_KEY)
    : null;

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
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.innerWidth >= 800) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// ===== SPECS SLIDER =====
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

// ===== HOWTO SLIDER =====
const howtoSlider = document.getElementById('howtoSlider');
const howtoPrev = document.getElementById('howtoPrev');
const howtoNext = document.getElementById('howtoNext');
const howtoCols = document.querySelectorAll('.howto_col');
let howtoCurrent = 0;

function howtoGoToSlide(index) {
    if (window.innerWidth >= 1280) return;
    const colWidth = howtoSlider.parentElement.offsetWidth;
    howtoSlider.style.transform = `translateX(-${index * colWidth}px)`;
    howtoCurrent = index;
}

howtoNext.addEventListener('click', () => {
    if (howtoCurrent < howtoCols.length - 1) howtoGoToSlide(howtoCurrent + 1);
});

howtoPrev.addEventListener('click', () => {
    if (howtoCurrent > 0) howtoGoToSlide(howtoCurrent - 1);
});

// ===== RESIZE (обидва слайдери + хедер) =====
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1280) {
        slider.style.transform = 'none';
        howtoSlider.style.transform = 'none';
    } else {
        goToSlide(current);
        howtoGoToSlide(howtoCurrent);
    }

    // На мобільних ефект sticky-хедера не потрібен
    if (window.innerWidth < 800) {
        header.classList.remove('scrolled');
    }
});

// ===== AOS =====
AOS.init({
    duration: 700,
    once: true,
    offset: 60,
    easing: 'ease-out-cubic',
});

// ===== MODAL =====
const modalOverlay = document.getElementById('modalOverlay');
const modalOpenBtns = document.querySelectorAll('.modal_open_btn');
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

modalOpenBtns.forEach(btn => btn.addEventListener('click', openModal));
modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

// Закриття модалки клавішею Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('is_open')) closeModal();
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

// ===== REVIEWS =====
let allReviews = [];

// Екранування HTML: захист від XSS, бо відгуки вводять сторонні користувачі
function escapeHTML(str = '') {
    return String(str).replace(/[&<>"']/g, c => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[c]));
}

function renderStars(rating) {
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
        starsHtml += `<i class="fa-${i < rating ? 'solid' : 'regular'} fa-star"></i>`;
    }
    return starsHtml;
}

function renderReviews(reviews) {
    const grid = document.getElementById('reviewsGrid');
    const empty = document.getElementById('reviewsEmpty');
    if (!grid) return;

    if (reviews.length === 0) {
        grid.innerHTML = '';
        grid.style.display = 'none';
        if (empty) empty.style.display = 'flex';
        return;
    }

    grid.style.display = 'grid';
    if (empty) empty.style.display = 'none';

    grid.innerHTML = reviews.map(review => `
        <div class="review_card" data-aos="fade-up">
            <div class="review_stars">${renderStars(Number(review.rating) || 0)}</div>
            <p class="review_text">"${escapeHTML(review.text)}"</p>
            <div class="review_author">
                <div class="review_avatar">${escapeHTML(review.avatar || '?')}</div>
                <div>
                    <p class="review_name">${escapeHTML(review.name)}</p>
                    <p class="review_role">${escapeHTML(review.role)}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function showReviewsError() {
    const grid = document.getElementById('reviewsGrid');
    if (!grid) return;
    grid.style.display = 'grid';
    grid.innerHTML = `
        <div class="reviews_error">
            <i class="fa-solid fa-circle-exclamation"></i>
            <p>Failed to load reviews. Please try again later.</p>
        </div>
    `;
}

function filterAndSort() {
    const searchEl = document.getElementById('reviewsSearch');
    const ratingEl = document.getElementById('reviewsRating');
    const sortEl = document.getElementById('reviewsSort');

    const search = searchEl ? searchEl.value.trim().toLowerCase() : '';
    const rating = ratingEl ? ratingEl.value : '';
    const sort = sortEl ? sortEl.value : 'newest';

    let filtered = [...allReviews];

    // Пошук
    if (search) {
        filtered = filtered.filter(r =>
            (r.text || '').toLowerCase().includes(search) ||
            (r.name || '').toLowerCase().includes(search) ||
            (r.role || '').toLowerCase().includes(search)
        );
    }

    // Фільтрація по рейтингу
    if (rating) {
        filtered = filtered.filter(r => r.rating === parseInt(rating));
    }

    // Сортування
    if (sort === 'newest') {
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sort === 'oldest') {
        filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } else if (sort === 'rating_high') {
        filtered.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'rating_low') {
        filtered.sort((a, b) => a.rating - b.rating);
    }

    renderReviews(filtered);
    if (typeof AOS !== 'undefined') AOS.refresh();
}

async function fetchReviews() {
    const grid = document.getElementById('reviewsGrid');
    if (!grid) return;

    if (!supabaseClient) {
        showReviewsError();
        return;
    }

    grid.style.display = 'grid';
    grid.innerHTML = `<div class="reviews_loading">Loading reviews...</div>`;

    try {
        const { data, error } = await supabaseClient
            .from('reviews')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        allReviews = data || [];
        // Враховуємо поточні пошук, фільтр і сортування
        filterAndSort();

    } catch (err) {
        console.error('Failed to load reviews:', err);
        showReviewsError();
    }
}

fetchReviews();

// Events для пошуку, фільтрації, сортування
const reviewsSearch = document.getElementById('reviewsSearch');
const reviewsRating = document.getElementById('reviewsRating');
const reviewsSort = document.getElementById('reviewsSort');
const reviewsReset = document.getElementById('reviewsReset');

if (reviewsSearch) reviewsSearch.addEventListener('input', filterAndSort);
if (reviewsRating) reviewsRating.addEventListener('change', filterAndSort);
if (reviewsSort) reviewsSort.addEventListener('change', filterAndSort);

// Кнопка скидання фільтрів
if (reviewsReset) {
    reviewsReset.addEventListener('click', () => {
        if (reviewsSearch) reviewsSearch.value = '';
        if (reviewsRating) reviewsRating.value = '';
        if (reviewsSort) reviewsSort.value = 'newest';
        filterAndSort();
    });
}

// ===== ADD REVIEW =====
let selectedRating = 0;

const ratingStars = document.querySelectorAll('.reviews_rating_picker i');

function paintStars(count, withActive) {
    ratingStars.forEach((s, i) => {
        s.className = i < count
            ? `fa-solid fa-star${withActive ? ' active' : ''}`
            : 'fa-regular fa-star';
    });
}

ratingStars.forEach(star => {
    star.addEventListener('mouseover', () => {
        paintStars(parseInt(star.dataset.value), false);
    });

    star.addEventListener('mouseout', () => {
        paintStars(selectedRating, true);
    });

    star.addEventListener('click', () => {
        selectedRating = parseInt(star.dataset.value);
        paintStars(selectedRating, true);
    });
});

const addReviewForm = document.getElementById('addReviewForm');
const addReviewSuccess = document.getElementById('addReviewSuccess');

// Якщо форми немає в HTML, решта сайту працює як завжди
if (addReviewForm) {
    addReviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        let isValid = true;

        // Скидаємо помилки
        addReviewForm.querySelectorAll('.reviews_add_field').forEach(f => {
            f.classList.remove('has_error');
        });
        const ratingError = document.getElementById('ratingError');
        if (ratingError) ratingError.style.display = 'none';

        const name = document.getElementById('review_name');
        const role = document.getElementById('review_role');
        const text = document.getElementById('review_text');

        if (name.value.trim().length < 2) {
            name.parentElement.classList.add('has_error');
            isValid = false;
        }

        if (role.value.trim().length < 2) {
            role.parentElement.classList.add('has_error');
            isValid = false;
        }

        if (text.value.trim().length < 20) {
            text.parentElement.classList.add('has_error');
            isValid = false;
        }

        if (selectedRating === 0) {
            if (ratingError) ratingError.style.display = 'block';
            isValid = false;
        }

        if (!isValid) return;

        if (!supabaseClient) {
            alert('Failed to submit review. Please try again later.');
            return;
        }

        const submitBtn = addReviewForm.querySelector('.reviews_add_btn');
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // Аватар з ініціалів (безпечно для подвійних пробілів)
        const avatar = name.value.trim()
            .split(/\s+/)
            .map(p => p[0].toUpperCase())
            .join('')
            .slice(0, 2);

        try {
            const { error } = await supabaseClient
                .from('reviews')
                .insert([{
                    name: name.value.trim(),
                    role: role.value.trim(),
                    text: text.value.trim(),
                    rating: selectedRating,
                    avatar: avatar
                }]);

            if (error) throw error;

            // Показуємо успіх
            addReviewForm.style.display = 'none';
            if (addReviewSuccess) addReviewSuccess.style.display = 'flex';

            // Повністю скидаємо форму, щоб можна було додати ще один відгук
            addReviewForm.reset();
            selectedRating = 0;
            paintStars(0, false);
            submitBtn.textContent = 'Submit Review';
            submitBtn.disabled = false;

            setTimeout(() => {
                if (addReviewSuccess) addReviewSuccess.style.display = 'none';
                addReviewForm.style.display = '';
            }, 3000);

            // Оновлюємо список відгуків
            await fetchReviews();

        } catch (err) {
            console.error('Failed to add review:', err);
            alert('Failed to submit review. Please try again.');
            submitBtn.textContent = 'Submit Review';
            submitBtn.disabled = false;
        }
    });
}