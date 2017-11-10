class SBLogo extends HTMLElement {
	connectedCallback() {
		this.innerHTML = '<b>steel</b>breeze';
	}
}

window.customElements.define('sb-logo', SBLogo);