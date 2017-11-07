var currentDate = new Date();
var menuToggle = document.getElementById('menuToggle');
var searchToggle = document.getElementById('searchToggle');
var menuMain = document.getElementById('menuMain');
var searchMain = document.getElementById('searchMain');
var footer = document.getElementsByTagName('footer')[0];

// add the footer text
footer.insertAdjacentHTML('beforeend', '<p>Please get in touch by e-mailing us at: <a href="mailto:contact@steelbreeze.net">contact@steelbreeze.net</a></p>');
footer.insertAdjacentHTML('beforeend', '<p>Copyright &copy; ' + currentDate.getFullYear() + ' Steelbreeze limited</p>');

// add menu items
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/">Home</a>');
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/ea/">Enterprise&nbsp;architecture</a>');
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/da/">Data&nbsp;architecture</a>');
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/dt/">Digital&nbsp;transformation</a>');
menuMain.insertAdjacentHTML('beforeend', '<p class="menuItem disabled">Technology&nbsp;leadership</p>');
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/os/">Open&nbsp;source</a>');

function eventHandler (event) {
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

document.addEventListener('click', eventHandler );
document.addEventListener('touchstart', eventHandler );