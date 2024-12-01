var admin = require("firebase-admin");

var serviceAccount = require("./mate-bets-f533b-firebase-adminsdk-st6kj-09067bd31f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
