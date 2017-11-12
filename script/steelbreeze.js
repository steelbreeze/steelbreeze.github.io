// page initialisation
(function () {
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	function checkCookieNotice() {
		var acceptCookies = getCookie('acceptCookies');

		if (!acceptCookies) {
			// add the cookie notice
			document.body.insertAdjacentHTML('afterbegin', '\
				<div id="cookieNotice">\
					<a id="cookieAccept" class="fa fa-times"></a>\
					<h3>This website uses cookies</h3>\
					<p>We use cookies to ensure you receive the best experience on our website. If you close this notice we will assume that you are happy to receive all cookies on the steelbreeze website.</p>\
				</div>\
			');
			
			var cookieNotice = document.getElementById('cookieNotice');
			var cookieAccept = document.getElementById('cookieAccept');

			cookieAccept.onclick = function () {
				cookieNotice.style.display = 'none';

				setCookie('acceptCookies', true, 365);
			};
		}
	}

	function eventHandler(event) {
		if (menuMain.style.display === 'block') {
			if (!menuMain.contains(event.target)) {
				menuMain.style.display = 'none';

				if (searchToggle.contains(event.target)) {
					searchMain.style.display = 'block';
				}
			}
		} else if (searchMain.style.display === 'block') {
			if (!searchMain.contains(event.target)) {
				searchMain.style.display = 'none';

				if (menuToggle.contains(event.target)) {
					menuMain.style.display = 'block';
				}
			}
		} else if (menuToggle.contains(event.target)) {
			menuMain.style.display = 'block';
		} else if (searchToggle.contains(event.target)) {
			searchMain.style.display = 'block';
		}
	}

	var menuToggle = document.getElementById('menuToggle');
	var searchToggle = document.getElementById('searchToggle');
	var menuMain = document.getElementById('menuMain');
	var searchMain = document.getElementById('searchMain');

	// add the cookie notice if need be
	checkCookieNotice();

	// add menu items
	menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/">Home</a>');
	menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/ea/">Enterprise&nbsp;architecture</a>');
	menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/da/">Data&nbsp;architecture</a>');
	menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/dt/">Digital&nbsp;transformation</a>');
	menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/leadership/">Technology&nbsp;leadership</a>');
	menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/os/">Open&nbsp;source</a>');

	// add the footer text
//	document.body.insertAdjacentHTML('beforeend', '\
//		<footer>\
//			<p>Please get in touch by e-mailing us at: <a href="mailto:contact@steelbreeze.net">contact@steelbreeze.net</a></p>\
//			<p>Copyright &copy; ' + (new Date()).getFullYear() + ' Steelbreeze Limited</p>\
//		</footer>\
//	');

	// add the event listner to control menus
	document.addEventListener('click', eventHandler);
})();