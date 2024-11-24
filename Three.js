// Подключаем Three.js
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

// Переменные для сцены, камеры и рендера
let scene, camera, renderer, stars, isDragging, rotationX, rotationY, targetRotationX, targetRotationY, autoRotation;

// Инициализация сцены
function initThreeJS() {
  // Создаем сцену
  scene = new THREE.Scene();

  // Создаем камеру
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 50;

  // Создаем рендерер
  renderer = new THREE.WebGLRenderer({ alpha: true }); // Прозрачный фон
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Звездный материал и геометрия
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1.5 });
  const starGeometry = new THREE.BufferGeometry();

  // Генерация звезд
  const starCount = 1000;
  const starPositions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = 500 * Math.sin(phi) * Math.cos(theta);
    const y = 500 * Math.sin(phi) * Math.sin(theta);
    const z = 500 * Math.cos(phi);

    starPositions[i * 3] = x;
    starPositions[i * 3 + 1] = y;
    starPositions[i * 3 + 2] = z;
  }

  // Добавляем звезды в сцену
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  // Настройка переменных для вращения
  isDragging = false;
  rotationX = 0;
  rotationY = 0;
  targetRotationX = 0;
  targetRotationY = 0;
  autoRotation = 0;

  // Добавляем обработчики событий
  addEventListeners();

  // Запуск анимации
  animate();
}

// Обработчики для ввода
function addEventListeners() {
  // Ввод мышью
  document.addEventListener('mousedown', (event) => startInput(event.clientX, event.clientY));
  document.addEventListener('mousemove', (event) => moveInput(event.clientX, event.clientY));
  document.addEventListener('mouseup', () => endInput());

  // Ввод сенсором
  document.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    startInput(touch.clientX, touch.clientY);
  });
  document.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    moveInput(touch.clientX, touch.clientY);
  });
  document.addEventListener('touchend', () => endInput());

  // Обновление размеров окна
  window.addEventListener('resize', onWindowResize);
}

// Обработка начала ввода
function startInput(clientX, clientY) {
  isDragging = true;
  previousPosition = { x: clientX, y: clientY };
}

// Обработка движения ввода
function moveInput(clientX, clientY) {
  if (!isDragging) return;

  const deltaMove = {
    x: clientX - previousPosition.x,
    y: clientY - previousPosition.y,
  };

  const rotationSpeed = 0.005;

  targetRotationY += deltaMove.x * rotationSpeed;
  targetRotationX += deltaMove.y * rotationSpeed;

  previousPosition = { x: clientX, y: clientY };
}

// Обработка окончания ввода
function endInput() {
  isDragging = false;
}

// Обновление размеров окна
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

// Анимация
function animate() {
  autoRotation += 0.0005;

  rotationX += (targetRotationX - rotationX) * 0.1;
  rotationY += (targetRotationY - rotationY) * 0.1;

  // Вращение звёзд
  stars.rotation.x = rotationX;
  stars.rotation.y = autoRotation + rotationY;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

// Экспорт функции для инициализации
export { initThreeJS };