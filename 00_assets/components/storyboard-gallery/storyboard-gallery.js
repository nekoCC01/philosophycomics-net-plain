
class StoryboardGallery extends HTMLElement {
    connectedCallback() {
        this.textContent = 'hello world!';
    }
}
customElements.define('storyboard-gallery', StoryboardGallery);