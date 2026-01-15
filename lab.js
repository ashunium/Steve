const canvas = document.getElementById("lab");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];

function spawnMatter() {
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      energy: Math.random() * 100
    });
  }
}

function mix() {
  particles.forEach(p => {
    p.vx *= 1.5;
    p.vy *= 1.5;
  });
}

function resetLab() {
  particles = [];
}

function update() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const energy = document.getElementById("energy").value;

  particles.forEach(p => {
    p.x += p.vx * energy / 50;
    p.y += p.vy * energy / 50;

    ctx.fillStyle = "#00ffff";
    ctx.fillRect(p.x, p.y, 2, 2);
  });

  requestAnimationFrame(update);
}

update();

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
