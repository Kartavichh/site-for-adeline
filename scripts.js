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
  // Получаем ширину видимой области карусели
  const containerWidth = track.parentElement.offsetWidth;
  // Максимально возможный сдвиг (чтобы последний элемент был у правого края)
  const maxScroll = Math.max(0, (totalItems * cardWidth) - containerWidth);

  // Проверка на ограничение прокрутки
  if (direction === 1 && newX < -maxScroll) {
    newX = -maxScroll; // Не даем прокрутить дальше правого края
  } else if (direction === -1 && newX > 0) {
    newX = 0; // Не даем прокрутить в начало
  }

  track.style.transform = `translateX(${newX}px)`;

  // Управление активностью кнопок
  toggleButtons(track, newX, maxScroll);
}

// Функция для управления активностью кнопок
function toggleButtons(track, currentX, maxScroll) {
  if (currentX === 0) {
    // Блокируем кнопку "Назад" в начале
    if (track === priceTrack) priceButtonPrev.disabled = true;
    if (track === reviewTrack) reviewButtonPrev.disabled = true;
  } else {
    if (track === priceTrack) priceButtonPrev.disabled = false;
    if (track === reviewTrack) reviewButtonPrev.disabled = false;
  }

  if (currentX <= -maxScroll) {
    // Блокируем кнопку "Вперед" в конце
    if (track === priceTrack) priceButtonNext.disabled = true;
    if (track === reviewTrack) reviewButtonNext.disabled = true;
  } else {
    if (track === priceTrack) priceButtonNext.disabled = false;
    if (track === reviewTrack) reviewButtonNext.disabled = false;
  }
}

// Инициализация кнопок при загрузке
function initCarousel() {
  toggleButtons(priceTrack, 0, Math.max(0, (priceTrack.children.length * cardWidth) - priceTrack.parentElement.offsetWidth));
  toggleButtons(reviewTrack, 0, Math.max(0, (reviewTrack.children.length * cardWidth) - reviewTrack.parentElement.offsetWidth));
}

// Прокрутка влево
priceButtonPrev.addEventListener('click', () => scrollCarousel(priceTrack, -1));
priceButtonNext.addEventListener('click', () => scrollCarousel(priceTrack, 1));

reviewButtonPrev.addEventListener('click', () => scrollCarousel(reviewTrack, -1));
reviewButtonNext.addEventListener('click', () => scrollCarousel(reviewTrack, 1));

// Инициализация при загрузке
window.addEventListener('load', initCarousel);
window.addEventListener('resize', initCarousel); // Обновляем при изменении размера окна