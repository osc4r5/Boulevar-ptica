let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(n) {
  slides.forEach(slide => slide.classList.remove('active'));
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}

document.querySelector('.prev').addEventListener('click', () => {
  showSlide(currentSlide - 1);
});

document.querySelector('.next').addEventListener('click', () => {
  showSlide(currentSlide + 1);
});

// Cambio automático cada 5 segundos (opcional)
setInterval(() => {
  showSlide(currentSlide + 1);
}, 5000);