import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBwge4QQU_fNxMSj-J8OOEF3xcjVGKa_QE",
    authDomain: "medapp-45cab.firebaseapp.com",
    projectId: "medapp-45cab",
    storageBucket: "medapp-45cab.firebasestorage.app",
    messagingSenderId: "215816940940",
    appId: "1:215816940940:web:030c355a76db915ed97aa9",
    measurementId: "G-QN9BMBRYXC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);