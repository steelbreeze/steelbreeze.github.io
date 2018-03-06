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

	// add the cookie notice if need be
	var acceptCookies = getCookie('acceptCookies');

	if (!acceptCookies) {
		// add the cookie notice
		document.body.insertAdjacentHTML('afterbegin', '\
			<footer id="cookieNotice">\
				<a id="cookieAccept" href="#" class="fa fa-times"></a>\
				<h4>Cookies on the steelbreee website</h4>\
				<p>We use cookies to ensure you receive the best experience on our website. This includes cookies from Google Analytics. If you close this notice we will assume that you are happy to receive all cookies.</p>\
			</footer>\
		');

		var cookieNotice = document.getElementById('cookieNotice');
		var cookieAccept = document.getElementById('cookieAccept');

		cookieAccept.onclick = function () {
			cookieNotice.style.display = 'none';

			setCookie('acceptCookies', true, 365);
		};
	}
})();