class SBHeader extends HTMLElement {
	connectedCallback() {
		this.innerHTML = '<sb-logo></sb-logo><h1>' + this.getAttribute('subject') + '</h1><h2>' + this.innerText + '</h2>';
	}
}

window.customElements.define('sb-header', SBHeader);
