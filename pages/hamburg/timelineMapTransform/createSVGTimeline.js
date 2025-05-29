const svg = document.getElementById('timelineSvg');

const startYear = 1200;
const endYear = 2000;
const centuryWidth = 1000;
const decadeWidth = centuryWidth / 10;
const startX = 200;

const largeHeight = 90;
const smallHeight = 70;
const barWidth = 7;

const colorDark = '#B69131';
const colorLight = '#DDC37E';

for (let year = startYear; year <= endYear; year += 10) {
    const position = startX + ((year - startYear) / 10) * decadeWidth;
    const isCentury = year % 100 === 0;
    const isHalfCentury = year % 100 === 50;

    const height = isCentury ? largeHeight : smallHeight;
    const fill = (isCentury || isHalfCentury) ? colorDark : colorLight;
    const yPos = isCentury ? 100 : 110;

    // Balken zeichnen
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', position - barWidth / 2);
    rect.setAttribute('y', yPos);
    rect.setAttribute('width', barWidth);
    rect.setAttribute('height', height);
    rect.setAttribute('fill', fill);
    svg.appendChild(rect);

    // Text nur bei vollen Jahrhunderten
    if (isCentury) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', position);
        text.setAttribute('y', 80);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#5E564B');
        text.setAttribute('font-size', '40');
        text.setAttribute('font-family', 'Montserrat Thin');
        text.textContent = year;
        svg.appendChild(text);
    }
}