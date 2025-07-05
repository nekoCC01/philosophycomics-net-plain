export function renderResult(scores) {
    const oldCanvas = document.getElementById('result-canvas');
    if (oldCanvas) oldCanvas.remove();

    const getVal = (obj, key) => Number(obj?.[key]) || 0;
    const p1 = scores.person1 || {};
    const p2 = scores.person2 || {};

    const vals1 = {
        nähe: getVal(p1, 'Nähe'),
        distanz: getVal(p1, 'Distanz'),
        dauer: getVal(p1, 'Dauer'),
        wechsel: getVal(p1, 'Wechsel'),
    };

    const vals2 = {
        nähe: getVal(p2, 'Nähe'),
        distanz: getVal(p2, 'Distanz'),
        dauer: getVal(p2, 'Dauer'),
        wechsel: getVal(p2, 'Wechsel'),
    };

    const container = document.createElement('div');
    container.id = 'result-canvas';
    document.body.appendChild(container);

    new p5((sk) => {
        const scale = 20;
        const maxVal = 12;
        sk.setup = function () {
            sk.createCanvas(600, 600).parent('result-canvas');
            sk.angleMode(sk.DEGREES);
            sk.textAlign(sk.CENTER, sk.CENTER);
        };
        sk.draw = function () {
            sk.background(255);
            sk.translate(sk.width / 2, sk.height / 2);
            drawAxes(sk, scale, maxVal);
            drawLabels(sk, scale, maxVal);
            drawRects(sk, scale, vals1, vals2);
        };

        function drawAxes(sk, scale, maxVal) {
            sk.stroke(0);
            sk.strokeWeight(1);
            sk.line(-maxVal * scale, 0, maxVal * scale, 0);
            for (let i = -maxVal; i <= maxVal; i++) {
                sk.line(i * scale, -5, i * scale, 5);
                if (i !== 0) sk.text(i, i * scale, 15);
            }
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

        function drawRects(sk, scale, v1, v2) {
            sk.noStroke();
            sk.rectMode(sk.CORNERS);

            // Person 1
            if (v1.nähe || v1.distanz || v1.dauer || v1.wechsel) {
                sk.fill(255, 255, 100, 150);
                sk.rect(-v1.nähe * scale, v1.dauer * -scale, v1.distanz * scale, v1.wechsel * scale);
            }

            // Person 2
            if ((v2.nähe || v2.distanz || v2.dauer || v2.wechsel) &&
                (v2.nähe !== v1.nähe || v2.distanz !== v1.distanz || v2.dauer !== v1.dauer || v2.wechsel !== v1.wechsel)) {
                sk.fill(100, 200, 255, 150);
                sk.rect(-v2.nähe * scale, v2.dauer * -scale, v2.distanz * scale, v2.wechsel * scale);
            }
        }
    });
}
