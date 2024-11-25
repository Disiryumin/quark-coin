// Сцена, камера и рендерер
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Материал для звёзд
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1.5 });
const starGeometry = new THREE.BufferGeometry();
const starCount = 1000;
const starPositions = new Float32Array(starCount * 3);

// Генерация случайных звёзд
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

starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Камера
camera.position.z = 0;

// Логика вращения звёзд
let isDragging = false;
let previousPosition = { x: 0, y: 0 };
let rotationX = 0;
let rotationY = 0;
let targetRotationX = 0;
let targetRotationY = 0;
let autoRotation = 0;
let isUserInteracting = false; // Флаг активности пользователя
let autoRotationSpeed = 0.0005; // Скорость автоматического вращения

// Начало ввода (мышь или сенсор)
function startInput(clientX, clientY) {
  isDragging = true;
  isUserInteracting = true; // Пользователь начал взаимодействие
  previousPosition = { x: clientX, y: clientY };
}

// Обработка движения (мышь или сенсор)
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

// Завершение ввода (мышь или сенсор)
function endInput() {
  isDragging = false;

  // Через 2 секунды после завершения ввода возвращаемся к автовращению
  setTimeout(() => {
    isUserInteracting = false;
  }, 200);
}

// Обработчики для мыши
document.addEventListener('mousedown', (event) => {
  startInput(event.clientX, event.clientY);
});

document.addEventListener('mousemove', (event) => {
  moveInput(event.clientX, event.clientY);
});

document.addEventListener('mouseup', () => {
  endInput();
});

// Обработчики для сенсора
document.addEventListener('touchstart', (event) => {
  const touch = event.touches[0]; // Первый палец
  startInput(touch.clientX, touch.clientY);
});

document.addEventListener('touchmove', (event) => {
  const touch = event.touches[0]; // Первый палец
  moveInput(touch.clientX, touch.clientY);
});

document.addEventListener('touchend', () => {
  endInput();
});

// Анимация
function animate() {
  if (!isUserInteracting) {
    autoRotation += autoRotationSpeed; // Добавляем автовращение только если пользователь не активен
  }

  rotationX += (targetRotationX - rotationX) * 0.1;
  rotationY += (targetRotationY - rotationY) * 0.1;

  // Применяем вращение звёзд
  stars.rotation.x = rotationX;
  stars.rotation.y = autoRotation + rotationY;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// Обновление размеров сцены при изменении окна
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});