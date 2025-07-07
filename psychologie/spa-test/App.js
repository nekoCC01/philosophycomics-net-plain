
class App extends HTMLElement {
    connectedCallback() {
        let template = document.querySelector('template#home')
        this.appendChild(template.content.cloneNode(true));
    }
}

class AppLayout extends HTMLElement {
    connectedCallback() {
        let template = document.querySelector('template#result')
        this.appendChild(template.content.cloneNode(true));
    }
}

export const registerApp = () => {
    customElements.define('x-app', App);
    customElements.define('x-result', AppLayout);
}