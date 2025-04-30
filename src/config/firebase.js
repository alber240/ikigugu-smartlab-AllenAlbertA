import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBmP1kVAzRK_-TY2CWnRw8NCGVOHmLEUvo",
  authDomain: "smartlab-7c631.firebaseapp.com",
  databaseURL: "https://smartlab-7c631-default-rtdb.firebaseio.com",
  projectId: "smartlab-7c631",
  storageBucket: "smartlab-7c631.appspot.com",  // ✅ FIXED: Incorrect URL
  messagingSenderId: "371880256677",
  appId: "1:371880256677:web:bec7960b4533c2e26f994c",
  measurementId: "G-FV409YTKQ3"
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Database
const db = getDatabase(app);

export { db, ref, set, onValue };
