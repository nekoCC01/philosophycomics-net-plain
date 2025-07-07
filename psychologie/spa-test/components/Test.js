class Test extends HTMLElement {
    async connectedCallback() {
        let template = document.querySelector('template#test')
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

export const registerTest = () => {
    customElements.define('x-test', Test);
}