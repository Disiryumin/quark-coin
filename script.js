
const starCanvas = document.getElementById("starsCanvas");
const starCtx = starCanvas.getContext("2d");

// Изменение размеров канваса под окно
function resizeCanvas() {
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Генерация звезд
const stars = [];
for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * starCanvas.width,
    y: Math.random() * starCanvas.height,
    radius: Math.random() * 1.5 + 0.5,
    speed: Math.random() * 0.5 + 0.1,
  });
}

// Анимация звезд
// Вращение звездного фона через гироскоп или мышь
let rotationX = 0;
let rotationY = 0;
let targetRotationX = 0;
let targetRotationY = 0;

// Для мыши
document.addEventListener("mousemove", (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const deltaX = (e.clientX - centerX) / centerX;
  const deltaY = (e.clientY - centerY) / centerY;

  targetRotationY = deltaX * 0.5; // Чувствительность вращения
  targetRotationX = deltaY * 0.5;
});

// Для гироскопа (смартфоны)
if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", (event) => {
    const gamma = event.gamma; // Влево-вправо
    const beta = event.beta; // Вверх-вниз

    targetRotationY = gamma / 90; // Нормализуем значение
    targetRotationX = beta / 90;
  });
}

// Анимация вращения звезд
function animateStarsWithRotation() {
  starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);

  rotationX += (targetRotationX - rotationX) * 0.1;
  rotationY += (targetRotationY - rotationY) * 0.1;

  stars.forEach(star => {
    const rotatedX = star.x + rotationY * 100; // Эффект вращения по X
    const rotatedY = star.y + rotationX * 100; // Эффект вращения по Y

    starCtx.beginPath();
    starCtx.arc(rotatedX, rotatedY, star.radius, 0, Math.PI * 2);
    starCtx.fillStyle = "white";
    starCtx.fill();

    star.y += star.speed;
    if (star.y > starCanvas.height) star.y = 0;
  });

  requestAnimationFrame(animateStarsWithRotation);
}

// Заменяем старую анимацию новой
animateStarsWithRotation();
// Переключение вкладок
const farmingButton = document.getElementById("farmingButton");
const minigameButton = document.getElementById("minigameButton");
const tasksButton = document.getElementById("tasksButton");

const farmingTab = document.getElementById("farmingTab");
const minigameTab = document.getElementById("minigameTab");
const tasksTab = document.getElementById("tasksTab");

function switchTab(tabName) {
  farmingTab.classList.remove("active");
  minigameTab.classList.remove("active");
  tasksTab.classList.remove("active");

  if (tabName === "farming") farmingTab.classList.add("active");
  if (tabName === "minigame") minigameTab.classList.add("active");
  if (tabName === "tasks") tasksTab.classList.add("active");
}

farmingButton.addEventListener("click", () => switchTab("farming"));
minigameButton.addEventListener("click", () => switchTab("minigame"));
tasksButton.addEventListener("click", () => switchTab("tasks"));

  // Ваш существующий код в script.js

// Добавьте этот код в самом конце файла:

// Блокировка зума и нежелательных жестов
document.addEventListener("gesturestart", (e) => {
  e.preventDefault();
}, { passive: false });

document.addEventListener("gesturechange", (e) => {
  e.preventDefault();
}, { passive: false });

document.addEventListener("gestureend", (e) => {
  e.preventDefault();
}, { passive: false });

// Отключение скроллинга и свайпов
window.addEventListener("touchmove", (e) => {
  e.preventDefault();
}, { passive: false });

// Полный фикс для Telegram
document.addEventListener("touchstart", (e) => {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });

document.addEventListener("touchmove", (e) => {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });