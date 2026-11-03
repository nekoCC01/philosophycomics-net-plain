export function gerichtetSketch(p) {
  let position;
  let ziel;
  let start;
  let startFarbe;
  let zielFarbe;
  const tempo = 45; // Pixel pro Sekunde

  p.setup = () => {
    const canvas = p.createCanvas(1000, 380);
    canvas.style('width', '100%');
    canvas.style('height', 'auto');
    canvas.style('display', 'block');
    p.background('#faf4ef');

    start = p.createVector(60, p.height - 60);
    position = start.copy();
    ziel = p.createVector(p.width - 60, 60);
    startFarbe = p.color('#cc5050');
    zielFarbe = p.color('#762e48');

    // Dezente Markierungen für Start und Ziel.
    p.noFill();
    p.stroke('#d6c3bd');
    p.circle(start.x, start.y, 14);
    p.circle(ziel.x, ziel.y, 14);
  };

  p.draw = () => {
    const vorher = position.copy();
    const richtung = p5.Vector.sub(ziel, position);

    if (richtung.mag() < 0.01) {
      p.noLoop();
      return;
    }

    // Kleine Schritte auch nach einem pausierten Browser-Tab.
    richtung.limit(tempo * p.min(p.deltaTime, 50) / 1000);
    position.add(richtung);

    const fortschritt = start.dist(position) / start.dist(ziel);
    p.stroke(p.lerpColor(startFarbe, zielFarbe, fortschritt));
    p.strokeWeight(3);
    p.line(vorher.x, vorher.y, position.x, position.y);
  };
}
