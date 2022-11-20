class HTMLInclude extends HTMLElement {
	constructor() {
		super();

		const url = this.getAttribute('href');

		fetch(url, {}).then(response => response.text()).then(html => {
			this.attachShadow({ mode: 'open' }).innerHTML =  html;
		});
	}
}

customElements.define('html-include', HTMLInclude, { extends: 'div' });