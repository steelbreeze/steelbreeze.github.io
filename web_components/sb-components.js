(function () {
	class SBLogo extends HTMLElement {
		connectedCallback() {
			this.innerHTML = '<style> .start { font-weight: 600; } .end { font-weight: 300; } </style><span class="start">steel</span><span class="end">breeze</span>';
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