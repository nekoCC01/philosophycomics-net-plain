
class App extends HTMLElement {
    connectedCallback() {
        let template = document.querySelector('template#app')
        this.appendChild(template.content.cloneNode(true));
    }
}

class AppLayout extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav>
            <ul>
                <li><a href="#/">Home</a></li>
                <li><a href="#/about">About</a></li>
                <li><a href="#/dashboard">Dashboard</a></li>
                <li><a href="#/nothing-here">Nothing Here</a></li>
            </ul>
        </nav>
        <hr />
        `;
    }
}

export const registerApp = () => {
    customElements.define('x-app', App);
    customElements.define('x-app-layout', AppLayout);
}