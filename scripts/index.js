const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
	if (user) {
		if (user.admin) {
			// show admin items
			adminItems.forEach(item => item.style.display = 'block');
		}

		// account info
		db.collection('users').doc(user.uid).get()
		.then(doc => {
			const html = `
				<div>Lgged in as ${user.email}</div>
				<div>${doc.data().bio}</div>
				<div class="pink-text">${user.admin ? 'Admin' : ''}</div>
			`;
			accountDetails.innerHTML = html;
		});

		// toggle UI elements
		loggedInLinks.forEach(item => item.style.display = 'block');
		loggedOutLinks.forEach(item => item.style.display = 'none');
		return;
	}
	// hide admin items
	adminItems.forEach(item => item.style.display = 'none');
	// hide account info
	accountDetails.innerHTML = '';

	// toggle UI elements
	loggedInLinks.forEach(item => item.style.display = 'none');
	loggedOutLinks.forEach(item => item.style.display = 'block');
}

const setupGuides = (docs) => {
	if (!docs) {
		guideList.innerHTML = '<h5>Login to view guides</h5>';
		return;
	}
	let html = '';
	docs.forEach(doc => {
		const { title, content } = doc.data();
		const li = `
			<li>
				<div class='collapsible-header grey lighten-4'>${title}</div>
				<div class='collapsible-body white'>${content}</div>
			</li>
		`
		html += li;
	});
	guideList.innerHTML = html;
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});