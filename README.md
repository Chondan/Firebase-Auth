# Firebase Authentication

## Project
- Tutorial From: [Firebase Authentication Tutorial](https://www.youtube.com/watch?v=aN1LnNq4z54&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=1)
- need to config firebase first
	- get configuration data from firebase console and place on index.html's script tag
- services used
	- firebase authentication -> email
		- firebase admin -> set custom claims
	- firebase cloudstore
		- collections -> guides, users
		- use security rules to restrict to user to access database
	- firebase functions
		- execute app's logic -> i.e. set admin

## Things to learn
- Firebase Cloud Function: https://www.youtube.com/watch?v=udHm7I_OvJs&list=PL4cUxeGkcC9i_aLkr62adUTJi53y7OjOf
- Firebase Firestore: the netninja channel

## Lesson Learned
- Materialize Css: https://materializecss.com/modals.html#!
- HTML DOM
	- get child element, reset form
```JavaScript
const signupForm = document.querySelector("#signup-form");
const email = signupForm['signup-email']; // 'signup-email' is an ID
signupForm.reset();
```
	- append new html node
```JavaScript
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
```
- firebase 
	- security rules: https://firebase.google.com/docs/rules/rules-language?authuser=0#firestore
		- give an access to the things with firebase cloudstore
	- realtime listener (get fresh datas without refresing a page): `db.collection('guides').onSnapshot(snapshot => {}, err => {})`
	- read and write
		- read: `db.collection('collection name').doc('docId').get()`
		- write:
			- `db.collection('collection name').add({...obj})` (automatically generate docID)
			- `db.collection('collection name').doc('docId').set({...obj})` (manually set docID)
	- custom claims (store an additional data via custom claims):
		- `Firebase Auth: { userId, email, { custom claims: { admin: true, premium: true } } }`
	- cloud functions
		- cloud functions run on the server
		- good for code you don't want to expose on the client
		- perform tasks not available to client users
		- callable from the front-end
	- firebase admin: https://firebase.google.com/docs/auth/admin/custom-claims
- Promise

```JavaScript
const x = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(10);
		}, 1000);
	}).then(val => {
		return new Promise((resolve, reject) => {
			resolve(val * 2);
		}, 1000);
	}).then(val => {
		return {
			value: val
		}
	});
}

async function func() {
	const value = await x();
	console.log(value);
}
func();
```