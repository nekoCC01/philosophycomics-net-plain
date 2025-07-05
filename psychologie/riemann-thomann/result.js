export function renderResult(scores) {
    // Entferne ggf. alten Canvas
    const oldCanvas = document.getElementById('result-canvas');
    if (oldCanvas) oldCanvas.remove();

    // Werte für Visualisierung extrahieren
    // Annahme: scores = { person1: {NÄHE, DISTANZ, WECHSEL, DAUER}, person2: ... }
    // Die Achsen: X = Nähe/Distanz, Y = Wechsel/Dauer
    // Nähe = negativ X, Distanz = positiv X, Wechsel = positiv Y, Dauer = negativ Y
    const persons = Object.values(scores);
    const getVal = (obj, key) => obj[key] || 0;
    let p1 = persons[0] || {};
    let p2 = persons[1] || {};
    // X: Distanz minus Nähe, Y: Wechsel minus Dauer
    const x1 = getVal(p1, 'Distanz') - getVal(p1, 'Nähe');
    const y1 = getVal(p1, 'Wechsel') - getVal(p1, 'Dauer');
    const x2 = getVal(p2, 'Distanz') - getVal(p2, 'Nähe');
    const y2 = getVal(p2, 'Wechsel') - getVal(p2, 'Dauer');

    // Erstelle Container für Canvas
    const container = document.createElement('div');
    container.id = 'result-canvas';
    document.body.appendChild(container);

    // p5-Sketch
    new p5((sk) => {
        const scale = 20;
        const maxVal = 12;
        sk.setup = function() {
            sk.createCanvas(600, 600).parent('result-canvas');
            sk.angleMode(sk.DEGREES);
            sk.textAlign(sk.CENTER, sk.CENTER);
        };
        sk.draw = function() {
            sk.background(255);
            sk.translate(sk.width / 2, sk.height / 2);
            drawAxes(sk, scale, maxVal);
            drawLabels(sk, scale, maxVal);
            drawRects(sk, scale, x1, y1, x2, y2);
        };
        function drawAxes(sk, scale, maxVal) {
            sk.stroke(0);
            sk.strokeWeight(1);
            // X-Achse
            sk.line(-maxVal * scale, 0, maxVal * scale, 0);
            for (let i = -maxVal; i <= maxVal; i++) {
                sk.line(i * scale, -5, i * scale, 5);
                if (i !== 0) sk.text(i, i * scale, 15);
            }
            // Y-Achse
            sk.line(0, -maxVal * scale, 0, maxVal * scale);
            for (let i = -maxVal; i <= maxVal; i++) {
                sk.line(-5, -i * scale, 5, -i * scale);
                if (i !== 0) sk.text(i, -15, -i * scale);
            }
            sk.fill(0);
            sk.circle(0, 0, 5);
        }
        function drawLabels(sk, scale, maxVal) {
            sk.noStroke();
            sk.fill(0);
            sk.textSize(16);
            sk.text('NÄHE', -maxVal * scale - 30, 0);
            sk.text('DISTANZ', maxVal * scale + 30, 0);
            sk.text('DAUER', 0, -maxVal * scale - 30);
            sk.text('WECHSEL', 0, maxVal * scale + 30);
        }
        function drawRects(sk, scale, x1, y1, x2, y2) {
            sk.noStroke();
            // Person 1
            if (x1 !== 0 || y1 !== 0) {
                sk.fill(255, 255, 100, 150);
                sk.rectMode(sk.CORNERS);
                sk.rect(Math.min(0, x1) * scale, Math.min(0, y1) * scale, Math.max(0, x1) * scale, Math.max(0, y1) * scale);
            }
            // Person 2
            if (x2 !== 0 || y2 !== 0) {
                sk.fill(100, 200, 255, 150);
                sk.rectMode(sk.CORNERS);
                sk.rect(Math.min(0, x2) * scale, Math.min(0, y2) * scale, Math.max(0, x2) * scale, Math.max(0, y2) * scale);
            }
        }
    });
}
