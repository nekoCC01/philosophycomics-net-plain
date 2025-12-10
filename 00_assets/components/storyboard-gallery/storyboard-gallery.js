
import Template from './template.js';

class StoryboardGallery extends HTMLElement {
    constructor() {
        super();
        this.state = {
            resourceFolder: '',
            imageCount: 0,
            currentIndex: 0,
            texts: [],
        };
        this._initialized = false;
    }

    async connectedCallback() {
        if (this._initialized) return;
        this._initialized = true;
        this.state.resourceFolder = this.getAttribute('resource-folder') || 'resources';
        this.state.imageCount = Number(this.getAttribute('image-count')) || 3;

        // Texte laden und im State speichern
        try {
            this.state.texts = await this.fetchTexts(this.state.resourceFolder);
            
        } catch (error) {
            console.error(error);
        }

        this.innerHTML = Template.render(this.state);
        this.dom = Template.mapDOM(this);
        this.registerListeners(); // nur einmal
    }

    renderImages(resourceFolder, imageCount) {
        for (let i = 1; i <= imageCount; i += 1) {
            const img = document.createElement('img');
            img.src = `${resourceFolder}/${i}.jpg`;
            img.alt = `Storyboard frame ${i}`;
            this.dom.stage.appendChild(img);
        }
    }

    async fetchTexts(folder) {
        const res = await fetch(`${folder}/texts.json`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json(); // Dies gibt direkt das JSON-Array zurück
    }

    registerListeners() {
        // Hier kannst du EventListener registrieren,
        // die auf this.state.texts zugreifen oder das aktuelle Element aktualisieren.
    }

    // Prepare: 
    // texts, imgs + nav (total, current)

    // Functions Prev Next
    // addEventListener (<>) - img slide + showText(x)+Title + nav-mark (x of total)

    // Track (State) - current focus (x of total) --> End/Start? (no more next (mute))

}

customElements.define('storyboard-gallery', StoryboardGallery);
