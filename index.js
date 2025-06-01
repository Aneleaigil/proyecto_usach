const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const dotsContainer = document.querySelector('.dots-container');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let intervalId;
const slideWidth = slides[0].offsetWidth; // Ancho de cada slide

function goToSlide(index) {
    if (index < 0) {
        currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateDots();
}

function nextSlide() {
    goToSlide(currentIndex + 1);
}

function prevSlide() {
    goToSlide(currentIndex - 1);
}

function goToDot(event) {
    const index = parseInt(event.target.dataset.index);
    goToSlide(index);
    resetInterval();
}

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentIndex) {
            dot.classList.add('active');
        }
    });
}

function startInterval() {
    intervalId = setInterval(nextSlide, 10000); // Cambia de slide cada 3 segundos
}

function resetInterval() {
    clearInterval(intervalId);
    startInterval();
}

// Event listeners
nextButton.addEventListener('click', () => {
    nextSlide();
    resetInterval();
});

prevButton.addEventListener('click', () => {
    prevSlide();
    resetInterval();
});

dotsContainer.addEventListener('click', goToDot);

// Inicialización
updateDots();
startInterval();

// Recalcular el ancho del slide en caso de redimensionamiento de la ventana
window.addEventListener('resize', () => {
    slideWidth = slides[0].offsetWidth;
    goToSlide(currentIndex); // Asegurar que el slide actual se ajuste
});

