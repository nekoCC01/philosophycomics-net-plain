export function gerichtetSketch(p) {
  const tempo = 85; // Pixel pro Sekunde
  const startY = 28;
  const zielY = 592;
  let startBild;
  let vorlage;
  let agents;
  let rot;
  let blau;

  p.preload = () => {
    startBild = p.loadImage('img/wasser-ringe.svg');
  };

  p.setup = () => {
    const canvas = p.createCanvas(1000, 620);
    canvas.style('width', '100%');
    canvas.style('height', 'auto');
    canvas.style('display', 'block');
    p.pixelDensity(1);

    // Unveränderte Bildvorlage: Nur ihre blauen Linien lösen Brechungen aus.
    vorlage = p.createGraphics(p.width, p.height);
    vorlage.pixelDensity(1);
    vorlage.background(255);
    vorlage.image(startBild, 0, 0, p.width, p.height);
    vorlage.loadPixels();
    p.image(vorlage, 0, 0);
    rot = p.color('#c52e47');
    blau = p.color('#477ecc');
    agents = [
      createAgent(175, -2),
      createAgent(335, -1),
      createAgent(500, 0),
      createAgent(665, 1),
      createAgent(825, 2)
    ];
  };

  function createAgent(x, seite) {
    const agent = {
      x, y: startY, seite,
      zielX: p.width / 2 + seite * 6,
      aufBlau: false,
      winkel: 0,
      fertig: false
    };
    agent.winkel = Math.atan2(agent.zielX - x, zielY - startY);
    return agent;
  }

  function istBlau(x, y) {
    const index = 4 * (Math.floor(y) * vorlage.width + Math.floor(x));
    const r = vorlage.pixels[index];
    const b = vorlage.pixels[index + 2];
    return b > r + 35;
  }

  function bewegen(agent, strecke) {
    const vorherX = agent.x;
    const vorherY = agent.y;
    // Winkel relativ zur Senkrechten: Beide Agenten laufen stets nach unten.
    const schritt = Math.min(strecke, (zielY - agent.y) / Math.cos(agent.winkel));
    agent.x += Math.sin(agent.winkel) * schritt;
    agent.y += Math.cos(agent.winkel) * schritt;

    const aufBlau = istBlau(agent.x, agent.y);
    if (aufBlau && !agent.aufBlau) {
      const fortschritt = (agent.y - startY) / (zielY - startY);
      // Kleine Zufallsabweichungen nehmen zum unteren Ende hin ab.
      // Der neue Kurs zielt immer in die Nähe des gemeinsamen Zentrums.
      const zielWinkel = Math.atan2(agent.zielX - agent.x, zielY - agent.y);
      const variation = p.random(-0.045, 0.045) * (1 - fortschritt);
      const neuerWinkel = zielWinkel + variation;
      const knick = p.constrain(neuerWinkel - agent.winkel, -0.065, 0.065);
      agent.winkel += knick;
    }
    agent.aufBlau = aufBlau;

    const fortschritt = p.constrain((agent.y - startY) / (zielY - startY), 0, 1);
    const farbe = p.lerpColor(rot, blau, fortschritt);
    // Mit Weiß mischen statt transparente Teilstücke zu überlagern.
    p.stroke(p.lerpColor(farbe, p.color(255), 0.82 * fortschritt ** 1.5));
    p.strokeWeight(2.5);
    p.line(vorherX, vorherY, agent.x, agent.y);
    agent.fertig = agent.y >= zielY - 0.001;
  }

  p.draw = () => {
    // Kurze Teilschritte verhindern, dass dünne blaue Linien übersprungen werden.
    const strecke = tempo * Math.min(p.deltaTime, 50) / 1000;
    const anzahl = Math.max(1, Math.ceil(strecke / 0.5));
    for (let i = 0; i < anzahl; i++) {
      for (const agent of agents) {
        if (!agent.fertig) bewegen(agent, strecke / anzahl);
      }
    }
    if (agents.every(agent => agent.fertig)) p.noLoop();
  };
}
