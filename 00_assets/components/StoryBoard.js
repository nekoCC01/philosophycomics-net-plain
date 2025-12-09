
class StoryboardGallery extends HTMLElement {
    connectedCallback() {
        console.log("connected");
        this.innerHTML =
            `<header>
            <h1>Revolution</h1>
            </header>
            <main>
                <section id="stage">
                    <img src="resources/1.jpg" alt="">
                    <img src="resources/2.jpg" alt="">
                    <img src="resources/3.jpg" alt="">
                </section>
                <nav></nav>
                <section id="text">
                </section>
            </main>`;
    }
}

customElements.define('storyboard-gallery', StoryboardGallery);