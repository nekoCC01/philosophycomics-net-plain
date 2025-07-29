class SecretIndex extends HTMLElement {
    async connectedCallback() {
        const params = new URLSearchParams(window.location.search);
        if (!params.has('geheim')) return;

        try {
            const res = await fetch('pages.json');
            const entries = await res.json();
            this.innerHTML = `
                <section style="margin-top: 2rem;">
                    <h2>📚 Geheimes Inhaltsverzeichnis</h2>
                    ${this.renderList(entries)}
                </section>
            `;
        } catch (e) {
            this.innerHTML = `<p style="color:red">Fehler beim Laden des Inhaltsverzeichnisses.</p>`;
            console.error(e);
        }
    }

    renderList(items) {
        return `<ul>${items.map(item => `
            <li>
                ${item.path.endsWith('.html')
                    ? `<a href="${item.path}">${item.title || item.path}</a>`
                    : `<strong>${item.title || item.path}</strong>`}
                ${item.children ? this.renderList(item.children) : ''}
            </li>
        `).join('')}</ul>`;
    }
}

customElements.define('x-secret-index', SecretIndex);
