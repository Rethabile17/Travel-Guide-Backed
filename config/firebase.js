const { initializeApp} = require("firebase/app");
require("dotenv").config();
const { getFirestore } = require("firebase/firestore");
const { getAuth } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyDt7OTwR07R2g-rzcd3Bj-_7llD-J1Qr0Y",
  authDomain: "travel-guide-3e31d.firebaseapp.com",
  projectId: "travel-guide-3e31d",
  storageBucket: "travel-guide-3e31d.firebasestorage.app",
  messagingSenderId: "644989904794",
  appId: "1:644989904794:web:33c45e6093741a85b53c23",
  measurementId: "G-GKJ0R2M2YR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

module.exports = {
  db,
  auth,
};
