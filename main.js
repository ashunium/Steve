import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js";

// =======================
// SCENE
// =======================
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.03);

const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// =======================
// PARTICLES
// =======================
const COUNT = 12000;
const positions = new Float32Array(COUNT * 3);
const colors = new Float32Array(COUNT * 3);

const left = new THREE.Vector3(-3, 0, 0);
const right = new THREE.Vector3(3, 0, 0);

for (let i = 0; i < COUNT; i++) {
  const i3 = i * 3;
  const t = Math.random();

  // Interpolated position
  positions[i3] = THREE.MathUtils.lerp(left.x, right.x, t) + (Math.random() - 0.5);
  positions[i3 + 1] = (Math.random() - 0.5) * 2;
  positions[i3 + 2] = (Math.random() - 0.5) * 2;

  // Color blend (green -> red)
  colors[i3]     = t;
  colors[i3 + 1] = 1 - t;
  colors[i3 + 2] = 0.1;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
  size: 0.05,
  vertexColors: true,
  transparent: true,
  opacity: 0.9,
  blending: THREE.AdditiveBlending,
  depthWrite: false
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// =======================
// ATTRACTORS
// =======================
const attractors = [left, right];

// =======================
// ANIMATION
// =======================
function animate(time) {
  requestAnimationFrame(animate);

  const pos = geometry.attributes.position.array;

  for (let i = 0; i < COUNT; i++) {
    const i3 = i * 3;
    const p = new THREE.Vector3(
      pos[i3],
      pos[i3 + 1],
      pos[i3 + 2]
    );

    attractors.forEach((a, index) => {
      const dir = a.clone().sub(p);
      const dist = dir.length() + 0.5;
      dir.normalize();
      p.add(dir.multiplyScalar(0.003 * Math.sin(time * 0.001 + dist)));
    });

    pos[i3] = p.x;
    pos[i3 + 1] = p.y;
    pos[i3 + 2] = p.z;
  }

  geometry.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);
}

animate();

// =======================
// RESIZE
// =======================
addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
