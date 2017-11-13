(function () {
    const menuItems = [
        { label: 'Home', link: '/' },
        { label: 'Enterprise architecture', link: '/ea/' },
        { label: 'Data architecture', link: '/da/' },
		{ label: 'Digital transformation', link: '/dt/' },
        { label: 'Technology leadership', link: '/leadership/' },
        { label: 'Open source', link: '/os/' }
	];
	
    class SBLogo extends HTMLElement {
        connectedCallback() {
            this.innerHTML = '<span class="start">steel</span><span class="end">breeze</span>';
        }
	};
	
    class SBMenu extends HTMLElement {
        connectedCallback() {
			const current = this.getAttribute('data-current');
			
            this.innerHTML = menuItems.map(item => item.label === current ? `<p>${item.label}</p>` : `<a href="${item.link}">${item.label}</a>`).join('');
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
