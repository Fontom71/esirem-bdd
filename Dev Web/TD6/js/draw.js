const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

resize();

function resize() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

window.addEventListener("resize", () => {
  resize();
  animate();
});

function drawSquare() {
  context.beginPath();
  context.rect(0, 0, 100, 100);
  context.fillStyle = "red";
  context.fill();
}

console.log(solarSystem);

function drawCelestialBody(celestialBody) {
  context.save();
  context.rotate(celestialBody.orbitalAngle);
  context.translate(celestialBody.distance, 0);
  if (celestialBody.hasShadow) {
    const shadowOffset = 1.5;
    context.beginPath();
    context.arc(0, 0, celestialBody.radius, 0, 2 * Math.PI);
    context.fillStyle = "#000000";
    context.fill();

    context.save();
    context.beginPath();
    context.arc(
      -celestialBody.radius * shadowOffset,
      0,
      celestialBody.radius * 2,
      0,
      2 * Math.PI
    );
    context.clip();
  }
  context.beginPath();
  context.arc(0, 0, celestialBody.radius, 0, 2 * Math.PI);
  const pattern = context.createPattern(celestialBody.texture, "no-repeat");
  const coef = (celestialBody.radius * 2) / celestialBody.texture.width;
  context.save();
  context.rotate(celestialBody.rotationAngle);
  context.translate(-celestialBody.radius, -celestialBody.radius);
  context.scale(coef, coef);
  context.fillStyle = pattern;
  context.fill();
  context.restore();
  if (celestialBody.hasShadow) {
    context.restore();
  }
  celestialBody.satellites.forEach((satellite) => {
    drawOrbit(satellite);
    drawCelestialBody(satellite);
  });
  context.restore();
}

function drawSolarSystem() {
  context.save();
  context.translate(canvas.width / 2, canvas.height / 2);
  drawCelestialBody(solarSystem.sun);
  context.restore();
}

function drawOrbit(celestialBody) {
  context.beginPath();
  context.arc(0, 0, celestialBody.distance, 0, 2 * Math.PI);
  context.strokeStyle = "#333333";
  context.stroke();
}

function animate(lastUpdateTime) {
  const now = performance.now();
  const elapsedTime = lastUpdateTime === 0 ? 0 : now - lastUpdateTime;
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawSolarSystem();
  solarSystem.sun.update(elapsedTime);
  requestAnimationFrame(() => animate(now));
}

window.addEventListener("load", async () => {
  await solarSystem.sun.initTexture();
  resize();
  animate(0);
});

console.log(solarSystem.sun.texture);
