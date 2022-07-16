/**
 * Updates the copyright meta data based on data from a GitHub repo
 * @param {*} url The address of the GitHub url
 */
export function init(url) {
	// get repo metadata from GitHub
	fetch(url).then(response => response.json()).then(repo => {
		// extract the date of the repo creation and last push
		const created_at = new Date(repo.created_at);
		const pushed_at = new Date(repo.pushed_at);

		// update the copyright banner
		document.getElementById('created_at').innerText = created_at.getFullYear();
		document.getElementById('pushed_at').innerText = pushed_at.getFullYear();
		document.getElementById('created_by').innerText = "David Mesquita-Morris";
	});

}