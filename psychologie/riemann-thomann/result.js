export function renderResult(scores) {
    const container = document.createElement('div');
    const heading = document.createElement('h1');
    heading.textContent = 'Ergebnis';
    container.appendChild(heading);

    for (const [dimension, value] of Object.entries(scores)) {
        const p = document.createElement('p');
        p.textContent = `${dimension}: ${value.toFixed(2)}`;
        container.appendChild(p);
    }

    document.body.appendChild(container);
}
