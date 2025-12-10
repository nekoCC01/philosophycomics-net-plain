export default {
    render(props) {
        return `${this.css(props)}
                ${this.html(props)}`;
    },

    css(p) { return ``; },
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
    mapDOM(scope) {
        return {
            stage: scope.querySelector('#stage'),
            textContainer: scope.querySelector('#text')
        }
    }
}
