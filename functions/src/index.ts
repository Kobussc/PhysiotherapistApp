import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

export const addMessage = functions.https.onRequest((request, response) => {
    const original = request.query.text;
    admin.database().ref('/messages').push({original: original}).then(snapshot => {
        response.redirect(303, snapshot.ref);
    });
});

// const nodemailer = require('nodemailer');
// const gmailEmail = encodeURIComponent(functions.config().gmail.email);
// const gmailPassword = encodeURIComponent(functions.config().gmail.password);
// const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

// exports.sendContactMessage = functions.database.ref('/messages/{pushKey}').onWrite(event => {
//     const snapshot = event.data;
//   // Only send email for new messages.
//     if (snapshot.previous.val() || !snapshot.val().name) {
//       return;
//     }
    
//     const val = snapshot.val();
    
//     const mailOptions = {
//       to: 'r4ven3ever@gmail.com',
//       subject: `Information Request from ${val.name}`,
//       html: val.html
//     };
//     return mailTransport.sendMail(mailOptions).then(() => {
//       return console.log('Mail sent to: test@example.com')
//     }
//   );
// }
// )
