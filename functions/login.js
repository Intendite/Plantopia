// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js";
import { getAuth, 
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut} 
        from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
const auth = getAuth(app);

/////// user log in ///////
document.getElementById("login-btn").addEventListener('click', function(){
   const loginEmail= document.getElementById("login-email").value;
   const loginPassword =document.getElementById("login-password").value;

   signInWithEmailAndPassword(auth, loginEmail, loginPassword)
   .then((userCredential) => {
      const user = userCredential.user;
      document.getElementById("sign-out").style.display="inline";
      document.getElementById("login-div").style.display="none";
      document.getElementById("result").innerHTML="Welcome Back<br>"+loginEmail+" was Login Successfully";
   })
   .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById("sign-out").style.display="inline";
      document.getElementById("login-div").style.display="none";
      document.getElementById("result").innerHTML="Sorry ! <br>"+errorMessage;
   });
});

////// user log out ///////
document.getElementById("log-out-btn").addEventListener('click', function(){
   signOut(auth).then(() => {
      document.getElementById("sign-out").style.display="none";
      document.getElementById("login-div").style.display="inline";
   }).catch((error) => {
      document.getElementById("result").innerHTML="Sorry ! <br>"+errorMessage;
   });
});