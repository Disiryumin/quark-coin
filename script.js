document.addEventListener("DOMContentLoaded", () => {
  const farmingScene = document.getElementById("farmingScene");
  const starsCanvas = document.getElementById("starsCanvas");
  const starCtx = starsCanvas.getContext("2d");
  let animationFrameId;

  // Логика переключения вкладок
  function switchTab(tabName) {
    document.querySelectorAll(".scene").forEach((scene) => scene.classList.remove("active"));
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));

    const targetScene = document.getElementById(`${tabName}Scene`);
    const targetButton = document.getElementById(`${tabName}Button`);
    if (targetScene) targetScene.classList.add("active");
    if (targetButton) targetButton.classList.add("active");

    if (tabName === "farming") startStarAnimation();
    else stopStarAnimation();
  }

  // Обработчики для кнопок
  document.getElementById("farmingButton").addEventListener("click", () => switchTab("farming"));
  document.getElementById("minigameButton").addEventListener("click", () => switchTab("minigame"));
  document.getElementById("tasksButton").addEventListener("click", () => switchTab("tasks"));

  // Звёздный фон
  const stars = [];
  function generateStars() {
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * starsCanvas.width,
        y: Math.random() * starsCanvas.height,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
      });
    }
  }

  function resizeCanvas() {
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
  }

  function animateStars() {
    starCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
    stars.forEach((star) => {
      starCtx.beginPath();
      starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      starCtx.fillStyle = "white";
      starCtx.fill();

      star.y += star.speed;
      if (star.y > starsCanvas.height) star.y = 0;
    });
    animationFrameId = requestAnimationFrame(animateStars);
  }

  function startStarAnimation() {
    resizeCanvas();
    animateStars();
  }

  function stopStarAnimation() {
    cancelAnimationFrame(animationFrameId);
  }

  // Инициализация
  resizeCanvas();
  generateStars();
  startStarAnimation();
});