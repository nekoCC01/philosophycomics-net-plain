import { animate } from '../../lib/anime.esm.min.js'; // Oder passe deinen Pfad korrekt an, wenn du lokal arbeitest!

document.querySelector('button#tlanim').addEventListener('click', () => {
    const svgTL = document.getElementById('timelineSvg');

    animate(svg, {
        // Wir benutzen KEIN freies Objekt mehr, sondern das echte SVG als Target
        // Eigenschaft: translateX oder eine eigene Animation selbst bauen
        // Wir nutzen stattdessen ein Dummy-Property über CSS-Variablen!

        // Da wir viewBox nicht direkt animieren können, brauchen wir einen Workaround
        // Wir erstellen eine CSS-Variable am SVG
        '--x': [0, 6300],
        duration: 10000,
        easing: 'linear',
        onUpdate: (anim) => {
            // Holen uns den aktuellen Wert der CSS-Variable
            const x = parseFloat(getComputedStyle(svgTL).getPropertyValue('--x'));
            svgTL.setAttribute('viewBox', `${x} 0 1496 270`);
        }
    });
});