// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile Menu =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
    });
});

// ===== Scroll Animations =====
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .feature, .about-card, .stat-item, .contact-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===== Stats Counter Animation =====
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000;
                const start = performance.now();

                function update(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    counter.textContent = Math.floor(eased * target);
                    if (progress < 1) requestAnimationFrame(update);
                }
                requestAnimationFrame(update);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-grid');
if (statsSection) statsObserver.observe(statsSection);

// ===== Enquiry Form Submission =====
const form = document.getElementById('enquiryForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    // Show loading state
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-flex';
    submitBtn.disabled = true;

    // Gather form data
    const formData = new FormData();
    formData.append('name', form.name.value.trim());
    formData.append('email', form.email.value.trim());
    formData.append('subject', form.subject.value.trim());
    formData.append('message', form.message.value.trim());

    try {
        const response = await fetch('https://hook.eu1.make.com/56k8cr717a1um66mtmb2j2dhfr92sjyh', {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        });

        if (response.ok) {
            showMessage('success', 'Thank you! Your enquiry has been sent successfully. We\'ll get back to you soon.');
            form.reset();
        } else {
            throw new Error('Server error');
        }
    } catch (error) {
        showMessage('error', 'Oops! Something went wrong. Please try again or email us directly.');
    } finally {
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
    }
});

function showMessage(type, text) {
    formMessage.textContent = text;
    formMessage.className = 'form-message ' + type + ' show';
    setTimeout(() => {
        formMessage.classList.remove('show');
    }, 5000);
}

// ===== Smooth Scroll for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
