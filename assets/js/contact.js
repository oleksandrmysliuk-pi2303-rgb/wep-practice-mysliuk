
emailjs.init('O4xOacE8p2NSPbINE');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact_name');
    const emailInput = document.getElementById('contact_email');
    const subjectInput = document.getElementById('contact_subject');
    const messageInput = document.getElementById('contact_message');

    const fields = contactForm.querySelectorAll('.contact_field');
    fields.forEach(field => field.classList.remove('has_error'));

    let isValid = true;

    if (nameInput.value.trim().length < 2) {
        nameInput.parentElement.classList.add('has_error');
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.parentElement.classList.add('has_error');
        isValid = false;
    }

    if (subjectInput.value.trim().length < 2) {
        subjectInput.parentElement.classList.add('has_error');
        isValid = false;
    }

    if (messageInput.value.trim().length < 10) {
        messageInput.parentElement.classList.add('has_error');
        isValid = false;
    }

    // 4. Відправка при успішній валідації
    if (isValid) {
        const submitBtn = contactForm.querySelector('.contact_submit');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        emailjs.sendForm('service_72rswzs', 'template_vkuvuq8', contactForm)
            .then(() => {
                contactForm.style.display = 'none';
                contactSuccess.style.display = 'flex';
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            })
            .catch((err) => {
                console.error('EmailJS error:', err);
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
                alert('Failed to send message. Please try again.');
            });
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