class SBFooter extends HTMLElement {
	connectedCallback() {
		var date = new Date();

		this.innerHTML = this.innerHTML + '<p>Copyright &copy; ' + date.getFullYear() + ' Steelbreeze Limited</p>';
	}
}

window.customElements.define('sb-footer', SBFooter);