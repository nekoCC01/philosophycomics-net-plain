const template = document.createElement('template');
template.innerHTML = `
    <footer >
    <style>
    footer section { font-size: small; }
    footer { margin: 30px; }
    </style>
        <section class="center">
        <hr>
            ©Copyright Daniel Kasai / All Rights Reserved <br><br>
            <a href="https://philosophycomics.net/impressum.html">Impressum</a>
        </section>
    </footer>
`;

class FooterComponent extends HTMLElement {
    connectedCallback() {
         this.innerHTML = template.innerHTML;
    }
}

export const registerFooterComponent = () => {
    customElements.define('x-footer', FooterComponent);
}