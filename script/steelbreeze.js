var currentDate = new Date();
var menuToggle = document.getElementById("menuToggle");
var menuMain = document.getElementById("menuMain");
var footer = document.getElementsByTagName("footer")[0];

// add menu items
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/">Home</a>');
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/ea/">Enterprise&nbsp;architecture</a>');
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/da/">Data&nbsp;architecture</a>');
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/dt/">Digital&nbsp;transformation</a>');
menuMain.insertAdjacentHTML('beforeend', '<p class="menuItem disabled">Technology&nbsp;leadership</p>');
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/os/">Open&nbsp;source</a>');

// show/hide the main menu
menuToggle.onclick = function () {
	if (menuMain.style.display !== "block") {
		menuMain.style.display = "block";
	} else {
		menuMain.style.display = "none";
	}
};

// add the footer text
footer.insertAdjacentHTML('beforeend', '<p>Please get in touch by e-mailing us at: <a href="mailto:contact@steelbreeze.net">contact@steelbreeze.net</a></p>');
footer.insertAdjacentHTML('beforeend', '<p>Copyright &copy; ' + currentDate.getFullYear() + ' Steelbreeze Limited</p>');
