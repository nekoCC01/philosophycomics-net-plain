export function renderResult(scores) {
    const container = document.createElement('div');
    const heading = document.createElement('h1');
    heading.textContent = 'Ergebnis';
    container.appendChild(heading);

    Object.entries(scores).forEach(([personKey, dimScores], idx) => {
        const personHeading = document.createElement('h2');
        personHeading.textContent = idx === 0 ? 'Person 1' : 'Person 2';
        container.appendChild(personHeading);
        for (const [dimension, value] of Object.entries(dimScores)) {
            const p = document.createElement('p');
            p.textContent = `${dimension}: ${value.toFixed(2)}`;
            container.appendChild(p);
        }
    });

    document.body.appendChild(container);
}
