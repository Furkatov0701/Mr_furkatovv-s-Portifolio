// ====== SOZLAMALAR ======
// Kontakt formasi xabarlarni shu emailga yuboradi (mailto orqali).
// O'zingizning emailingizni yozing, masalan: 'example@gmail.com'
const CONTACT_EMAIL = '';

const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');
const header = document.querySelector('.header');
const sections = document.querySelectorAll('section');
const topBtn = document.querySelector('.top-btn');

// ====== Mobil menyu ======
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

navLinks.forEach(link => link.addEventListener('click', () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}));

// ====== Scroll: aktiv link, sticky header, top tugma ======
function onScroll() {
    const y = window.scrollY;

    sections.forEach(sec => {
        const top = sec.offsetTop - 150;
        const id = sec.getAttribute('id');
        if (y >= top && y < top + sec.offsetHeight) {
            navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
        }
    });

    header.classList.toggle('sticky', y > 80);
    topBtn.classList.toggle('show', y > 500);
}
window.addEventListener('scroll', onScroll);
onScroll();

// ====== Typing effekt ======
const words = ['Web Developer', 'Frontend Developer', 'UI Designer'];
const typingEl = document.querySelector('.typing-text');
let wordIndex = 0, charIndex = 0, deleting = false;

function type() {
    const word = words[wordIndex];
    typingEl.textContent = word.slice(0, charIndex);

    if (!deleting && charIndex < word.length) {
        charIndex++;
        setTimeout(type, 100);
    } else if (deleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 50);
    } else {
        deleting = !deleting;
        if (!deleting) wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, deleting ? 1500 : 300);
    }
}
type();

// ====== Scroll paytida chiqish animatsiyasi + skill bar ======
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        const fill = entry.target.querySelector('.skill-fill');
        if (fill) fill.style.width = fill.dataset.width;
        observer.unobserve(entry.target);
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ====== About: Read More ======
const readMoreBtn = document.querySelector('#read-more');
const moreText = document.querySelector('.more-text');
readMoreBtn.addEventListener('click', () => {
    const open = moreText.classList.toggle('open');
    readMoreBtn.textContent = open ? 'Read Less' : 'Read More';
});

// ====== Loyiha rasmi modal ======
const modal = document.querySelector('#modal');
const modalImg = document.querySelector('#modal-img');
const modalTitle = document.querySelector('#modal-title');

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const img = card.querySelector('img');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalTitle.textContent = card.querySelector('h3').textContent;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
}
document.querySelector('#modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ====== Kontakt formasi ======
const form = document.querySelector('#contact-form');
const statusEl = document.querySelector('.form-status');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);

    if (CONTACT_EMAIL) {
        const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\n\n${data.get('message')}`;
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(data.get('subject'))}&body=${encodeURIComponent(body)}`;
    }

    statusEl.textContent = `Thank you, ${data.get('name')}! Your message is ready to be sent.`;
    form.reset();
});

// ====== Footer yili ======
document.querySelector('#year').textContent = new Date().getFullYear();
