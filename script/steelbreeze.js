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

var currentDate = new Date();
var menuToggle = document.getElementById('menuToggle');
var searchToggle = document.getElementById('searchToggle');
var menuMain = document.getElementById('menuMain');
var searchMain = document.getElementById('searchMain');
var footer = document.getElementsByTagName('footer')[0];

var acceptCookies = getCookie('acceptCookies');

if(!acceptCookies) {
	// add the cookie notice
	document.body.insertAdjacentHTML('afterbegin', '<div id="cookieNotice"><a id="cookieAccept" class="fa fa-lg fa-times"></a><h3>This website uses cookies</h3><p>Cookies on the steelbreeze website: we use cookies to ensure that we give you the best experience on our website. If you continue without changing your settings, we will assume that you are happy to receive all cookies on the steelbreeze website.</p></div>');

	// manage cookie notice
	var cookieNotice = document.getElementById('cookieNotice');
	var cookieAccept = document.getElementById('cookieAccept');

	cookieAccept.onclick = function () {
		cookieNotice.style.display = 'none';

		setCookie('acceptCookies', true, 365);
	};
}

// add the footer text
footer.insertAdjacentHTML('beforeend', '<p>Please get in touch by e-mailing us at: <a href="mailto:contact@steelbreeze.net">contact@steelbreeze.net</a></p>');
footer.insertAdjacentHTML('beforeend', '<p>Copyright &copy; ' + currentDate.getFullYear() + ' Steelbreeze limited</p>');

// add menu items
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/">Home</a>');
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/ea/">Enterprise&nbsp;architecture</a>');
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/da/">Data&nbsp;architecture</a>');
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/dt/">Digital&nbsp;transformation</a>');
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/leadership/">Technology&nbsp;leadership</a>');
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/os/">Open&nbsp;source</a>');

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

document.addEventListener('click', eventHandler);