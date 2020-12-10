// add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', function(e) {
	e.preventDefault();
	const adminEmail = adminForm['admin-email'].value;
	const addAdminRole = functions.httpsCallable('addAdminRole');
	addAdminRole({ email: adminEmail }).then(result => {
		console.log(result);
	});
});

// listen for auth status changes
auth.onAuthStateChanged((user) => {
	// when user signed out the user is NULL
	if (user) {
		user.getIdTokenResult().then(idTokenResult => {
			user.admin = idTokenResult.claims.admin;
			// conditional menu links
			setupUI(user);
		});
		// get data
		db.collection('guides').onSnapshot(snapshot => {
			setupGuides(snapshot);
		}, err => console.error(err));
	} else {
		setupUI(user);
		setupGuides(null);
	}
});

// create new guides (write data to a database)
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', function(e) {
	e.preventDefault();
	db.collection('guides').add({
		title: createForm['title'].value,
		content: createForm['content'].value
	})
	.then(() => {
		// close the modal and reset form
		const modal = document.querySelector("#modal-create");
		M.Modal.getInstance(modal).close();
		createForm.reset();
	})
	.catch(err => console.error(err));
});

// signup 
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener('submit', function(e) {
	e.preventDefault();
	// get user info
	const email = signupForm['signup-email'].value;
	const password = signupForm['signup-password'].value;

	// sign up the user
	auth.createUserWithEmailAndPassword(email, password)
	.then((cred) => {
		return db.collection('users').doc(cred.user.uid).set({
			bio: signupForm['signup-bio'].value
		});
	})
	.then(() => {
		const modal = document.querySelector("#modal-signup");
		M.Modal.getInstance(modal).close();
		signupForm.reset();
		signupForm.querySelector('.error').innerHTML = '';
	})
	.catch((err) => {
		signupForm.querySelector('.error').innerHTML = err.message;
	});
});

// logout
const logout = document.querySelector("#logout");
logout.addEventListener('click', function(e) {
	e.preventDefault();
	auth.signOut();
});

// login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener('submit', function(e) {
	e.preventDefault();
	// get user info
	const email = loginForm['login-email'].value;
	const password = loginForm['login-password'].value;
	auth.signInWithEmailAndPassword(email, password)
	.then((user) => {
		// close the login modal and reset the form
		const modal = document.querySelector("#modal-login");
		M.Modal.getInstance(modal).close();
		loginForm.reset();
		loginForm.querySelector('.error').innerHTML = '';
	})
	.catch((err) => {
		loginForm.querySelector('.error').innerHTML = err.message;
	})
});