// Переменные для фарминга
let mainPoints = 0;
let farmPoints = 0;
let farmingActive = false;
let farmingTimer;
const farmingDuration = 60 * 1000; // 1 минута
const farmIncrement = 0.0015; // Очки за 0.5 секунды

// Элементы интерфейса фарминга
const mainPointsDisplay = document.getElementById("mainPoints");
const farmPointsDisplay = document.getElementById("farmPoints");
const farmButton = document.getElementById("farmButton");

// Обновление очков фарминга
function updatePoints() {
  farmPoints += farmIncrement;
  farmPointsDisplay.textContent = farmPoints.toFixed(4);
}

// Логика кнопки фарминга
farmButton.addEventListener("click", () => {
  if (!farmingActive && farmButton.textContent === "start farming") {
    farmingActive = true;
    farmButton.textContent = "farming...";
    farmPoints = 0;
    farmPointsDisplay.textContent = farmPoints.toFixed(3);

    farmingTimer = setInterval(updatePoints, 500); // Каждые 0.5 секунды

    setTimeout(() => {
      clearInterval(farmingTimer);
      farmingActive = false;
      farmButton.textContent = "claim";
    }, farmingDuration);
  } else if (farmButton.textContent === "claim") {
    mainPoints += farmPoints;
    farmPoints = 0;

    mainPointsDisplay.textContent = mainPoints.toFixed(3);
    farmPointsDisplay.textContent = farmPoints.toFixed(3);
    farmButton.textContent = "start farming";
  }
});