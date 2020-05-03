window.customElements.define('landscape-map', class extends HTMLElement {
    constructor() {
        super();

        this.addEventListener('click', e => {
            console.log(`clicked`);
        });

        console.log(`created instance of landscape-map`);
    }
});