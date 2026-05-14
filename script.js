// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close menu when a link is clicked (mobile)
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Testimonial slider
const slides = document.getElementById('slides');
const slideCount = slides.children.length;
const dotsContainer = document.getElementById('dots');
let currentSlide = 0;

// Build dots
for (let i = 0; i < slideCount; i++) {
  const dot = document.createElement('span');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}

function goToSlide(index) {
  currentSlide = (index + slideCount) % slideCount;
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
}

document.getElementById('prevSlide').addEventListener('click', () => goToSlide(currentSlide - 1));
document.getElementById('nextSlide').addEventListener('click', () => goToSlide(currentSlide + 1));

// Auto-advance
let autoplay = setInterval(() => goToSlide(currentSlide + 1), 5000);
slides.parentElement.addEventListener('mouseenter', () => clearInterval(autoplay));
slides.parentElement.addEventListener('mouseleave', () => {
  autoplay = setInterval(() => goToSlide(currentSlide + 1), 5000);
});

// Email form validation
const form = document.getElementById('signupForm');
const emailInput = document.getElementById('emailInput');
const formMsg = document.getElementById('formMsg');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = emailInput.value.trim();
  formMsg.className = 'form-msg';

  if (!value) {
    showError('Please enter your email address.');
    return;
  }
  if (!emailRegex.test(value)) {
    showError('Please enter a valid email address.');
    return;
  }

  emailInput.classList.remove('error');
  formMsg.classList.add('success');
  formMsg.textContent = `Thanks! We'll notify ${value} at launch.`;
  emailInput.value = '';
});

function showError(msg) {
  emailInput.classList.add('error');
  formMsg.classList.add('error');
  formMsg.textContent = msg;
}

emailInput.addEventListener('input', () => {
  emailInput.classList.remove('error');
  formMsg.textContent = '';
});
