import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "YOUR_REAL_API_KEY",
  authDomain: "YOUR_REAL_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_REAL_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_REAL_PROJECT_ID",
  storageBucket: "YOUR_REAL_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_REAL_SENDER_ID",
  appId: "YOUR_REAL_APP_ID"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ✅ TEST WRITE FUNCTION
const testFirebaseWrite = () => {
  set(ref(db, "test/write"), {
    message: "Hello, Firebase!",
    timestamp: Date.now(),
  }).then(() => {
    console.log("✅ Test data successfully written to Firebase!");
  }).catch((error) => {
    console.error("⚠️ Firebase Write Error:", error);
  });
};

// Run this test write when the app starts
testFirebaseWrite();

export { db, ref, set };
