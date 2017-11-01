function toggleMenu() {
	var menuToggle = document.getElementById("menuToggle");
	var menuMain = document.getElementById("menuMain");

	if (menuMain.className === "unselected") {
		menuMain.className = "selected";
		menuToggle.className = "fa fa-chevron-up";
	} else {
		menuMain.className = "unselected";
		menuToggle.className = "fa fa-chevron-down";
	}
}