
class Result extends HTMLElement {
    connectedCallback() {
        let template = document.querySelector('template#result')
        this.appendChild(template.content.cloneNode(true));
    }
}

export const registerResult = () => {
    customElements.define('x-result', Result);
}