"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
exports.addMessage = functions.https.onRequest((request, response) => {
    const original = request.query.text;
    admin.database().ref('/messages').push({ original: original }).then(snapshot => {
        response.redirect(303, snapshot.ref);
    });
});
// export const makeUppercase = functions.database.ref('/messages/{pushId}/original')
//     .onWrite(event => {
//         const original = event.data.val();
//         console.log('Uppercasing', event.params.pushId, original);
//         const uppercase = original.toUpperCase();
//         return event.data.ref.parent.child('uppercase').set(uppercase);
//     })
//# sourceMappingURL=index.js.map