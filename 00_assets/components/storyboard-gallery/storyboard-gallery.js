
class StoryboardGallery extends HTMLElement {
    connectedCallback() {
        // Shadow DOM anlegen
        if (!this.shadowRoot) {
            const shadow = this.attachShadow({ mode: 'open' });
            shadow.innerHTML = `
                <style>
                    :host {
                        display: block;
                    }
                    .gallery {
                        display: flex;
                        flex-direction: row;
                        gap: 2rem;
                        overflow-x: auto;
                        align-items: flex-start;
                    }
                </style>
                <div class="gallery">
                    <slot></slot>
                </div>
            `;
        }
    }
}

customElements.define('storyboard-gallery', StoryboardGallery);