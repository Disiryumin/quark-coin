// Настройка канваса для звездного фона
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
function animateStars() {
  starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  stars.forEach(star => {
    star.y += star.speed;
    if (star.y > starCanvas.height) star.y = 0;
    starCtx.beginPath();
    starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    starCtx.fillStyle = "white";
    starCtx.fill();
  });
  requestAnimationFrame(animateStars);
}
animateStars();
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