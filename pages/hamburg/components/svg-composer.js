class SvgComposer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const circleSvg = await this.loadSVG('./assets/circle.svg');
        const rectSvg = await this.loadSVG('./assets/rect.svg');

        // Erstelle ein leeres, eigenes SVG
        const composedSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        composedSvg.setAttribute('width', '400');
        composedSvg.setAttribute('height', '200');
        composedSvg.setAttribute('viewBox', '0 0 400 200');

        // hole das Element aus den geladenen SVGs (nicht das äußere <svg>)
        const circleElement = circleSvg.querySelector('circle');
        const rectElement = rectSvg.querySelector('rect');

        // positioniere sie nebeneinander
        if (circleElement) {
            circleElement.setAttribute('cx', '100');
            circleElement.setAttribute('cy', '100');
        }

        if (rectElement) {
            rectElement.setAttribute('x', '200');
            rectElement.setAttribute('y', '50');
        }

        composedSvg.appendChild(circleElement);
        composedSvg.appendChild(rectElement);
        this.shadowRoot.appendChild(composedSvg);
    }

    async loadSVG(url) {
        const res = await fetch(url);
        const text = await res.text();
        const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
        return doc.documentElement;
    }
}

customElements.define('svg-composer', SvgComposer);