import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCA7Q0gy0QXIX2i4i9nJkE0ajQV-U67bLE",
  authDomain: "tasklist-aa022.firebaseapp.com",
  projectId: "tasklist-aa022",
  storageBucket: "tasklist-aa022.appspot.com",
  messagingSenderId: "1097761586390",
  appId: "1:1097761586390:web:dac28480a7ee7ef2181d77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth};