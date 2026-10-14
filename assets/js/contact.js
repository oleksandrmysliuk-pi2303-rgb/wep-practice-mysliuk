// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const fields = contactForm.querySelectorAll('.contact_field');
    fields.forEach(field => field.classList.remove('has_error'));

    const name = document.getElementById('contact_name');
    const email = document.getElementById('contact_email');
    const subject = document.getElementById('contact_subject');
    const message = document.getElementById('contact_message');

    if (name.value.trim().length < 2) {
        name.parentElement.classList.add('has_error');
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        email.parentElement.classList.add('has_error');
        isValid = false;
    }

    if (subject.value.trim().length < 2) {
        subject.parentElement.classList.add('has_error');
        isValid = false;
    }

    if (message.value.trim().length < 10) {
        message.parentElement.classList.add('has_error');
        isValid = false;
    }

    if (isValid) {
        contactForm.style.display = 'none';
        contactSuccess.style.display = 'flex';
    }
});

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq_item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq_question');
    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('is_open');
        faqItems.forEach(i => i.classList.remove('is_open'));
        if (!isOpen) item.classList.add('is_open');
    });
});