var admin = require("firebase-admin");

var serviceAccount = require("./mate-bets-f533b-firebase-adminsdk-st6kj-678d27b38f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
