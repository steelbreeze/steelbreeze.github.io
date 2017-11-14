(function () {
	const menuItems = [
		{ label: 'Home', link: '/' },
		{ label: 'Enterprise architecture', link: '/ea/services/' },
		{ label: 'Data architecture', link: '/da/services/' },
		{ label: 'Digital transformation', link: '/dt/services/' },
		{ label: 'Technology leadership', link: '/leadership/services/' },
		{ label: 'Open source', link: '/os/' }
	];

	class SBLogo extends HTMLElement {
		connectedCallback() {
			this.innerHTML = '<span class="start">steel</span><span class="end">breeze</span>';
		}
	};

	class SBMenu extends HTMLElement {
		get current() {
			return this.getAttribute('current');
		}

		connectedCallback() {
			this.innerHTML = menuItems.map(menuItem => (menuItem.label === this.current ? makeP : makeA)(menuItem)).join('');
		}

		makeP(menuItem) {
			return `<a href="${menuItem.link}">${menuItem.label}</a>`;
		}

		makeA(menuItem) {
			return `<p>${menuItem.label}</p>`;
		}
	};

	class SBFooter extends HTMLElement {
		connectedCallback() {
			const date = new Date();
			this.innerHTML = this.innerHTML + '<p>Copyright &copy; ' + date.getFullYear() + ' Steelbreeze Limited</p>';
		}
	};

	window.customElements.define('sb-logo', SBLogo);
	window.customElements.define('sb-menu', SBMenu);
	window.customElements.define('sb-footer', SBFooter);
})();
