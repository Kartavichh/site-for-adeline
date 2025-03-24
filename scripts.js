const cardWidth = 320; // ширина карточки + gap
const priceTrack = document.getElementById('priceTrack');
const reviewTrack = document.getElementById('reviewTrack');
const priceButtonPrev = document.querySelector('.price .carousel-button.prev');
const priceButtonNext = document.querySelector('.price .carousel-button.next');
const reviewButtonPrev = document.querySelector('.reviews .carousel-button.prev');
const reviewButtonNext = document.querySelector('.reviews .carousel-button.next');

// Функция прокрутки карусели
function scrollCarousel(track, direction) {
  const currentTransform = getComputedStyle(track).transform;
  let matrix = new WebKitCSSMatrix(currentTransform);
  let currentX = matrix.m41;
  let newX = currentX - direction * cardWidth;

  // Получаем количество элементов в карусели
  const totalItems = track.children.length;

  // Проверка на ограничение прокрутки для каруселей
  if (direction === 1 && newX <= -(totalItems - 1) * cardWidth) {
    newX = -(totalItems - 1) * cardWidth; // Не даем прокрутить дальше
  } else if (direction === -1 && newX >= 0) {
    newX = 0; // Не даем прокрутить в начало
  }

  track.style.transform = `translateX(${newX}px)`;

  // Управление активностью кнопок
  toggleButtons(track, newX, totalItems);
}

// Функция для управления активностью кнопок
function toggleButtons(track, currentX, totalItems) {
  if (currentX === 0) {
    // Блокируем кнопку "Назад" в начале
    priceButtonPrev.disabled = true;
    reviewButtonPrev.disabled = true;
  } else {
    priceButtonPrev.disabled = false;
    reviewButtonPrev.disabled = false;
  }

  if (currentX <= -(totalItems - 1) * cardWidth) {
    // Блокируем кнопку "Вперед" в конце
    priceButtonNext.disabled = true;
    reviewButtonNext.disabled = true;
  } else {
    priceButtonNext.disabled = false;
    reviewButtonNext.disabled = false;
  }
}

// Прокрутка влево
priceButtonPrev.addEventListener('click', () => scrollCarousel(priceTrack, -1));
priceButtonNext.addEventListener('click', () => scrollCarousel(priceTrack, 1));

reviewButtonPrev.addEventListener('click', () => scrollCarousel(reviewTrack, -1));
reviewButtonNext.addEventListener('click', () => scrollCarousel(reviewTrack, 1));