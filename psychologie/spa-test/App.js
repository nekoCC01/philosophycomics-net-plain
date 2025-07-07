
class App extends HTMLElement {
    async connectedCallback() {
        let template = document.querySelector('template#home')
        this.appendChild(template.content.cloneNode(true));

        // Jetzt ist das Template im DOM des Elements!
        // Beispiel: Daten laden
        const res = await fetch('daten.json');
        const daten = await res.json();

        // Ziel-Container im Template finden
        const listContainer = this.querySelector('#meine-liste');
        daten.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name;
            listContainer.appendChild(li);
        });
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