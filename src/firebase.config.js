import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCHXVueAijubSwht1BUmqzFXJGTbbOM43s",
  authDomain: "read-it-text-to-speech.firebaseapp.com",
  projectId: "read-it-text-to-speech",
  storageBucket: "read-it-text-to-speech.appspot.com",
  messagingSenderId: "776699012719",
  appId: "1:776699012719:web:1e9c6ef9132b03034e8f9a",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export const dbRef = ref(db, "server/saving-data/fireblog");
