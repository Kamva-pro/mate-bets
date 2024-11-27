// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0X2Ao4RL2u7ObOnSQcCN9ftxXnXzDdzc",
  authDomain: "mate-bets-f533b.firebaseapp.com",
  projectId: "mate-bets-f533b",
  storageBucket: "mate-bets-f533b.firebasestorage.app",
  messagingSenderId: "407466890457",
  appId: "1:407466890457:web:72639ecba04f759f4adac8",
  measurementId: "G-NQHN6951D6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);