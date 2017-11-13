(function () {
	class SBLogo extends HTMLElement {
		connectedCallback() {
			this.innerHTML = '<span class="start">steel</span><span class="end">breeze</span>';
		}
	};

	class SBFooter extends HTMLElement {
		connectedCallback() {
			var date = new Date();

			this.innerHTML = this.innerHTML + '<p>Copyright &copy; ' + date.getFullYear() + ' Steelbreeze Limited</p>';
		}
	};

	window.customElements.define('sb-logo', SBLogo);
	window.customElements.define('sb-footer', SBFooter);
})();