import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js";

// =======================
// CORE SETUP
// =======================
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.02);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: "high-performance"
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// =======================
// DEEP SPACE LIGHT
// =======================
scene.add(new THREE.AmbientLight(0x404040, 0.4));

const pointLight = new THREE.PointLight(0x00ffff, 2, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// =======================
// STARFIELD (REAL SPACE)
// =======================
const starsGeometry = new THREE.BufferGeometry();
const starCount = 5000;
const positions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 300;
}

starsGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const starsMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.15,
  transparent: true,
  opacity: 0.8
});

const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// =======================
// WORMHOLE (CORE RESEARCH)
// =======================
const wormholeGeometry = new THREE.TorusGeometry(2.5, 0.6, 64, 200);
const wormholeMaterial = new THREE.MeshStandardMaterial({
  color: 0x000000,
  emissive: 0x00ffff,
  emissiveIntensity: 1.5,
  metalness: 1,
  roughness: 0.05
});

const wormhole = new THREE.Mesh(wormholeGeometry, wormholeMaterial);
scene.add(wormhole);

// =======================
// ANIMATION LOOP
// =======================
function animate() {
  requestAnimationFrame(animate);

  wormhole.rotation.x += 0.003;
  wormhole.rotation.y += 0.006;

  stars.rotation.y += 0.0005;

  renderer.render(scene, camera);
}
animate();

// =======================
// RESIZE
// =======================
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
