document.addEventListener("DOMContentLoaded", () => {
  const mainPointsEl = document.getElementById("mainPoints");
  const farmPointsEl = document.getElementById("farmPoints");
  const farmButton = document.getElementById("farmButton");

  let mainPoints = 0;
  let farmPoints = 0;
  let farmingActive = false;
  let farmingInterval;

  farmButton.addEventListener("click", () => {
    if (!farmingActive) {
      farmingActive = true;
      farmButton.textContent = "Farming...";
      farmingInterval = setInterval(() => {
        farmPoints += 0.01;
        farmPointsEl.textContent = farmPoints.toFixed(2);
      }, 100);
    } else {
      clearInterval(farmingInterval);
      farmingActive = false;
      mainPoints += farmPoints;
      farmPoints = 0;
      mainPointsEl.textContent = mainPoints.toFixed(2);
      farmPointsEl.textContent = farmPoints.toFixed(2);
      farmButton.textContent = "Start Farming";
    }
  });
});