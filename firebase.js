// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage"; // Uncomment if you use storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPgEsMcYx0C22L_W_CGA709Cf33Ze1mVI",
  authDomain: "foodsaver-28feb.firebaseapp.com",
  projectId: "foodsaver-28feb",
  storageBucket: "foodsaver-28feb.appspot.com", // fixed typo (.appspot.com)
  messagingSenderId: "37311370492",
  appId: "1:37311370492:web:69c50c52baaf2f4446b379",
  measurementId: "G-ZFYK46PKE2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services for use in your app
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const storage = getStorage(app); // Uncomment if you use storage

export default app;