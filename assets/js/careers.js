const jobs = [
    {
        title: "Senior Data Engineer",
        type: "Full-time",
        location: "Remote",
        department: "Engineering",
        desc: "Build and maintain our data pipeline infrastructure. Work with large-scale regional datasets and help shape our analytics platform."
    },
    {
        title: "Product Designer",
        type: "Full-time",
        location: "Hybrid",
        department: "Design",
        desc: "Create intuitive and beautiful data visualization interfaces. Turn complex analytics into clear, actionable dashboards."
    },
    {
        title: "Growth Marketing Manager",
        type: "Full-time",
        location: "Remote",
        department: "Marketing",
        desc: "Drive user acquisition and retention strategies. Work closely with our product and sales teams to expand Area's reach."
    },
    {
        title: "Customer Success Manager",
        type: "Full-time",
        location: "Remote",
        department: "Support",
        desc: "Help our clients get the most out of Area. Build long-term relationships and ensure customer satisfaction."
    }
];

function renderJobs() {
    const grid = document.getElementById('careersGrid');
    if (!grid) return;

    grid.innerHTML = jobs.map(job => `
        <div class="careers_card" data-aos="fade-up">
            <div class="careers_card_top">
                <h3 class="careers_card_title">${job.title}</h3>
                <span class="careers_card_type">${job.type}</span>
            </div>
            <p class="careers_card_desc">${job.desc}</p>
            <div class="careers_card_meta">
                <span><i class="fa-solid fa-location-dot"></i> ${job.location}</span>
                <span><i class="fa-solid fa-briefcase"></i> ${job.department}</span>
            </div>
            <a href="#careers_apply" class="careers_card_btn">
                Apply Now <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
    `).join('');
}

renderJobs();

// ===== ФОРМА =====
const careersForm = document.getElementById('careersForm');
const careersSuccess = document.getElementById('careersSuccess');

careersForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const fields = careersForm.querySelectorAll('.careers_field');
    fields.forEach(field => field.classList.remove('has_error'));

    const name = document.getElementById('careers_name');
    const email = document.getElementById('careers_email');
    const role = document.getElementById('careers_role');
    const message = document.getElementById('careers_message');

    if (name.value.trim().length < 2) {
        name.parentElement.classList.add('has_error');
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        email.parentElement.classList.add('has_error');
        isValid = false;
    }

    if (role.value.trim().length < 2) {
        role.parentElement.classList.add('has_error');
        isValid = false;
    }

    if (message.value.trim().length < 20) {
        message.parentElement.classList.add('has_error');
        isValid = false;
    }

    if (isValid) {
        careersForm.style.display = 'none';
        careersSuccess.style.display = 'flex';
    }
});