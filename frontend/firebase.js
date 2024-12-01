
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import getAuth to handle authentication
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration object
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

// Initialize Authentication
const auth = getAuth(app); // Get Firebase Authentication instance

// Optional: Analytics
const analytics = getAnalytics(app);

// Export authentication instance for use in other files
export { auth };
Mihle14