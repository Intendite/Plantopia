import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBvjz8rUCZe93G7ajUTTNkkNqKwCI5gcZk",
    authDomain: "plantopia-90b99.firebaseapp.com",
    projectId: "plantopia-90b99",
    storageBucket: "plantopia-90b99.appspot.com",
    messagingSenderId: "753505805986",
    appId: "1:753505805986:web:e6ab978db3dc08221919fb",
    measurementId: "G-QT0KZYEJFX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const firestore = getFirestore();