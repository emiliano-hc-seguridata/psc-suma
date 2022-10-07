import { getFirestore } from "firebase/firestore";
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");


const firebaseConfig = {
  apiKey: "AIzaSyDOjcGukvalZOTmJzPzYkCEJPjf8VefzMQ",
  authDomain: "psc-console.firebaseapp.com",
  projectId: "psc-console",
  storageBucket: "psc-console.appspot.com",
  messagingSenderId: "902234640699",
  appId: "1:902234640699:web:b634a204a83a524736a71e",
  measurementId: "G-G5L7TL3PCY"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };