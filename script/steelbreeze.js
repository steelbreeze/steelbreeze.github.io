var currentDate = new Date();
var menuToggle = document.getElementById("menuToggle");
var menuMain = document.getElementById("menuMain");

// add menu items
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/">Home</a>');
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/ea/">Enterprise architecture</a>');
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/da/">Data architecture</a>');
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/dt/">Digital transformation</a>');
menuMain.insertAdjacentHTML('beforeend', '<p class="menuItem disabled">Technology leadership</p>');
menuMain.insertAdjacentHTML('beforeend', '<a class="menuItem" href="/os/">Open source</a>');

// show/hide the main menu
menuToggle.onclick = function () {
	if (menuMain.style.display !== "block") {
		menuToggle.className = "fa fa-chevron-up"
		menuMain.style.display = "block";
	} else {
		menuToggle.className = "fa fa-chevron-down"
		menuMain.style.display = "none";
	}
};

// add the footer text
document.body.insertAdjacentHTML('beforeend', '<footer><p>Please get in touch by e-mailing us at: <a href="mailto:contact@steelbreeze.net">contact@steelbreeze.net</a></p><p>Copyright &copy; ' + currentDate.getFullYear() + ' Steelbreeze Limited</p></footer>');
