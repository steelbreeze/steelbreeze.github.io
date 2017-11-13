// page initialisation
(function () {
	var menuToggle = document.getElementById('menuToggle');
	var searchToggle = document.getElementById('searchToggle');
	var menuMain = document.getElementsByTagName('sb-menu')[0];
	var searchMain = document.getElementById('searchMain');

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

	// add the cookie notice if need be
	checkCookieNotice();

	// add the event listner to control menus
	document.addEventListener('click', eventHandler);
})();