
class StoryboardGallery extends HTMLElement {
    connectedCallback() {
        const resourceFolder = this.getAttribute('resource-folder') || this.getAttribute('folder') || 'resources';
        const imageCount = Number(this.getAttribute('image-count')) || 3;

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

            const rawText = await response.text();
            const entries = this.parseTextArray(rawText);

            if (!Array.isArray(entries)) {
                console.warn(`Konnte Texte aus ${url} nicht lesen.`);
                return;
            }

            entries.forEach((entry) => {
                const section = document.createElement('section');
                section.innerHTML = entry;
                textContainer.appendChild(section);
            });
        } catch (error) {
            console.error(`Fehler beim Laden der Texte aus ${url}`, error);
        }
    }

    // Parses valid JSON arrays first; falls back to single-quoted legacy arrays.
    parseTextArray(rawText) {
        if (!rawText) {
            return null;
        }

        const trimmed = rawText.trim();

        try {
            const json = JSON.parse(trimmed);
            return Array.isArray(json) ? json : null;
        } catch (jsonError) {
            // Fallback for non-JSON arrays that use single quotes and line breaks.
            const matches = [];
            const regex = /'([\s\S]*?)'/g;
            let match;

            while ((match = regex.exec(trimmed)) !== null) {
                matches.push(match[1].trim());
            }

            return matches.length ? matches : null;
        }
    }
}

customElements.define('storyboard-gallery', StoryboardGallery);
