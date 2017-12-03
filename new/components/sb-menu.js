(function () {
	const menuItems = [
		{ label: 'Home', link: '/' },
		{ label: 'Services', link: '/services/' }/*,
	{ label: 'Blog', link: '/blog/' },
	{ label: 'About', link: '/about/' },
	{ label: 'Contact', link: '/contact/' }*/
	];

	class SBMenu extends HTMLElement {
		connectedCallback() {
			const current = this.getAttribute('sb-current');

			this.popup = document.createElement('div');
			this.popup.style.display = 'none';
			this.popup.innerHTML = menuItems.map(menuItem => menuItem.label === current ? `<p>${menuItem.label}</p>` : `<a href="${menuItem.link}">${menuItem.label}</a>`).join('');
			this.appendChild(this.popup);

			this.addEventListener('click', this.toggleMenu);
		}

		disconnectedCallback() {
			this.removeEventListener('click', this.toggleMenu);
		}

		toggleMenu(event) {
			this.popup.style.display = this.popup.style.display === 'block' ? 'none' : 'block';
		}
	}

	window.customElements.define('sb-menu', SBMenu);
})();