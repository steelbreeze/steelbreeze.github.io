var currentDate = new Date();
var menuToggle = document.getElementById("menuToggle");
var menuMain = document.getElementById("menuMain");

// add menu items
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/">Home</a>');
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/ea/services/">Enterprise architecture</a>');
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/da/services/">Data architecture</a>');
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/dt/services/">Digital transformation</a>');
menuMain.insertAdjacentHTML('beforeend', '<p class="menuItem disabled">Technology leadership</p>');
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/os/">Open source</a>');

// show/hide the main menu
menuToggle.onclick = function () {
	if (menuMain.className === "unselected") {
		menuMain.className = "selected";
		menuToggle.className = "fa fa-chevron-up";
	} else {
		menuMain.className = "unselected";
		menuToggle.className = "fa fa-chevron-down";
	}
};

// add the footer text
document.body.insertAdjacentHTML('beforeend', '<footer><p>Please get in touch by e-mailing us at: <a href="mailto:contact@steelbreeze.net">contact@steelbreeze.net</a></p><p>Copyright &copy; ' + currentDate.getFullYear() + ' Steelbreeze Limited</p></footer>');
