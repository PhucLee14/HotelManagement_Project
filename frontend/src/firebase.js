// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBKU6YSsJPnUS-ogCE8NAm7LqSm891vFOQ",
    authDomain: "btl-finalterm.firebaseapp.com",
    projectId: "btl-finalterm",
    storageBucket: "btl-finalterm.appspot.com",
    messagingSenderId: "653525205990",
    appId: "1:653525205990:web:fc64da5c38a895ef4e8c27",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);

export default storage;
