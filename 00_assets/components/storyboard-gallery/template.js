export default {
    render(props) {
        return `${this.css(props)}
                ${this.html(props)}`;
    },

    html(p) {
        return `<header>
                <h1>Revolution</h1>
                </header>
                <main>
                    <section id="stage"></section>
                    <nav></nav>
                    <section id="text"></section>
                </main>`;
    },
    css(p) { return ``; }
}
