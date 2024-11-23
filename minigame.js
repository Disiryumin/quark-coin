document.addEventListener("DOMContentLoaded", () => {
    // Ваш код для мини-игры
    console.log("DOM полностью загружен");

    // Убедитесь, что все элементы DOM существуют
    const minigameButton = document.getElementById("minigameButton");
    const farmingButton = document.getElementById("farmingButton");
    const tasksButton = document.getElementById("tasksButton");

    if (!minigameButton || !farmingButton || !tasksButton) {
        console.error("Один из элементов кнопок не найден!");
        return;
    }

    // Добавляем обработчики событий
    minigameButton.addEventListener("click", startGame);
    farmingButton.addEventListener("click", stopGame);
    tasksButton.addEventListener("click", stopGame);

    console.log("Обработчики событий успешно добавлены");

    // Элементы игры
    let canvas, ctx;
    let monsterX = 50; // Положение монстра
    let monsterY = 50;
    let currentFrame = 0; // Текущий кадр анимации
    let monsterFrames = []; // Массив с изображениями для анимации
    let animationInterval; // Интервал для анимации

    // Загрузка спрайтов
    function loadMonsterSprites() {
        const frame1 = new Image();
        frame1.src = "assets/alien_frame1.png";
        const frame2 = new Image();
        frame2.src = "assets/alien_frame2.png";

        monsterFrames = [frame1, frame2];
    }

    // Отрисовка монстра
    function drawMonster() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка холста
        ctx.drawImage(monsterFrames[currentFrame], monsterX, monsterY, 50, 50); // Отрисовка текущего кадра
        currentFrame = (currentFrame + 1) % monsterFrames.length; // Переключение кадров
    }

    // Запуск игры
    function startGame() {
        if (!canvas) {
            canvas = document.createElement("canvas");
            canvas.width = window.innerWidth; // Растягиваем по ширине экрана
            canvas.height = window.innerHeight; // Растягиваем по высоте экрана
            canvas.style.position = "absolute"; // Делаем его абсолютным
            canvas.style.top = 0;
            canvas.style.left = 0;
            canvas.style.border = "none"; // Убираем рамку
            canvas.style.backgroundColor = "transparent"; // Прозрачный фон
            document.getElementById("minigameTab").appendChild(canvas);
            ctx = canvas.getContext("2d");
        }
    
        loadMonsterSprites();
    
        animationInterval = setInterval(() => {
            drawMonster();
        }, 500); // Скорость анимации (500 мс между кадрами)
    }
        // Добавляем обработчик события изменения размера окна
window.addEventListener("resize", () => {
    if (canvas) {
        canvas.width = window.innerWidth; // Автоматически подстраиваем ширину
        canvas.height = window.innerHeight; // Автоматически подстраиваем высоту
    }
});
    // Остановка игры
    function stopGame() {
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
        }
        if (canvas) {
            canvas.remove(); // Удаляем холст при выходе из игры
            canvas = null;
        }
    }
}); // <-- Закрывающая скобка для блока DOMContentLoaded

// Подключение к переключателю вкладок
document.getElementById("minigameButton").addEventListener("click", startGame);
document.getElementById("farmingButton").addEventListener("click", stopGame);
document.getElementById("tasksButton").addEventListener("click", stopGame);