
class StoryboardGallery extends HTMLElement {
    connectedCallback() {
        const resourceFolder = this.getAttribute('resource-folder') || this.getAttribute('folder') || 'resources';
        const imageCount = Number(this.getAttribute('image-count')) || 3;

        // import HTML as JS module
        this.innerHTML = `
            <header>
                <h1>Revolution</h1>
            </header>
            <main>
                <section id="stage"></section>
                <nav></nav>
                <section id="text"></section>
            </main>`;

        this.renderImages(resourceFolder, imageCount);
        this.loadTexts(resourceFolder);
    }

    renderImages(resourceFolder, imageCount) {
        const stage = this.querySelector('#stage');
        if (!stage) {
            return;
        }

        for (let i = 1; i <= imageCount; i += 1) {
            const img = document.createElement('img');
            img.src = `${resourceFolder}/${i}.jpg`;
            img.alt = `Storyboard frame ${i}`;
            stage.appendChild(img);
        }
    }

    async loadTexts(resourceFolder) {
        const textContainer = this.querySelector('#text');
        if (!textContainer) {
            return;
        }

        const url = `${resourceFolder}/texts.json`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const entries = await response.json();

            if (!Array.isArray(entries)) {
                console.warn(`Konnte Texte aus ${url} nicht lesen.`);
                return;
            }

            entries.forEach((entry, index) => {
                if (index > 0) {
                    textContainer.appendChild(document.createElement('hr'));
                }
                const section = document.createElement('section');
                section.innerHTML = entry;
                textContainer.appendChild(section);
            });
        } catch (error) {
            console.error(`Fehler beim Laden der Texte aus ${url}`, error);
        }
    }

    // Prepare: 
        // texts, imgs + nav (total, current)

    // Functions Prev Next
        // addEventListener (<>) - img slide + showText(x)+Title + nav-mark (x of total)

    // Track (State) - current focus (x of total) --> End/Start? (no more next (mute))

}

customElements.define('storyboard-gallery', StoryboardGallery);
