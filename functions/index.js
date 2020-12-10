const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
	// context is the information about the user who called this function
	// check request is made by admin
	if (!context.auth.token.admin) {
		return { error: "Only admin can add other admins, sucker." };
	}

	// get user and add custom claim (admin)
	return admin.auth().getUserByEmail(data.email).then(user => {
		return admin.auth().setCustomUserClaims(user.uid, {
			admin: true
		});
	}).then(() => {
		return {
			massage: `Success! ${data.email} has been made an admin.`
		}
	}).catch(err => {
		return err;
	});
});
