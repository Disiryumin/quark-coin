document.addEventListener("DOMContentLoaded", () => {
  const farmingScene = document.getElementById("farmingScene");
  const starsCanvas = document.getElementById("starsCanvas");
  const starCtx = starsCanvas.getContext("2d");
  let animationFrameId;

  // Проверяем, активна ли сцена "Автофарминг"
  function isFarmingSceneActive() {
    return farmingScene.classList.contains("active");
  }

  // Изменение размеров канваса под размеры окна
  function resizeCanvas() {
    if (isFarmingSceneActive()) {
      starsCanvas.width = window.innerWidth;
      starsCanvas.height = window.innerHeight;
    }
  }

  // Генерация звёзд
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

  // Анимация звёздного фона
  function animateStars() {
    if (!isFarmingSceneActive()) {
      cancelAnimationFrame(animationFrameId);
      return;
    }

    starCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);

    stars.forEach((star) => {
      starCtx.beginPath();
      starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      starCtx.fillStyle = "white";
      starCtx.fill();

      // Движение звёзд
      star.y += star.speed;
      if (star.y > starsCanvas.height) {
        star.y = 0;
      }
    });

    animationFrameId = requestAnimationFrame(animateStars);
  }

  // Инициализация звёздного фона
  function initStarsCanvas() {
    if (isFarmingSceneActive()) {
      resizeCanvas();
      generateStars();
      animateStars();
    }
  }

  // Слушатель изменения размеров окна
  window.addEventListener("resize", () => {
    if (isFarmingSceneActive()) {
      resizeCanvas();
    }
  });

  // Инициализация при загрузке
  initStarsCanvas();

  // Логика переключения сцен
  document.querySelectorAll(".nav-item").forEach((navButton) => {
    navButton.addEventListener("click", () => {
      const targetSceneId = navButton.id.replace("Button", "Scene");
      document.querySelectorAll(".scene").forEach((scene) => {
        scene.classList.remove("active");
      });

      const targetScene = document.getElementById(targetSceneId);
      if (targetScene) {
        targetScene.classList.add("active");
      }

      // Если вернулись в сцену "Автофарминг", запускаем фон
      if (targetSceneId === "farmingScene") {
        initStarsCanvas();
      } else {
        // Останавливаем анимацию, если ушли с "Автофарминга"
        cancelAnimationFrame(animationFrameId);
      }
    });
  });
});

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