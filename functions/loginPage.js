import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { firebaseConfig } from "../index.js";
import { 
   getAuth, 
   signInWithEmailAndPassword,
   signOut
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/////// user log in ///////
document.getElementById("login-btn").addEventListener("click", function(){
   const loginEmail = document.getElementById("login-email").value;
   const loginPassword = document.getElementById("login-password").value;

   signInWithEmailAndPassword(auth, loginEmail, loginPassword)
   .then((userCredential) => {
      const user = userCredential.user;
      document.getElementById("sign-out").style.display = "inline";
      document.getElementById("login-div").style.display = "none";
      document.getElementById("result").innerHTML = "Welcome Back<br>" + loginEmail + " was Login Successfully";
   })
   .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById("sign-out").style.display = "inline";
      document.getElementById("login-div").style.display = "none";
      document.getElementById("result").innerHTML = "Sorry! <br>" + errorMessage;
   });
});

////// user log out ///////
document.getElementById("log-out-btn").addEventListener("click", function(){
   signOut(auth).then(() => {
      document.getElementById("sign-out").style.display = "none";
      document.getElementById("login-div").style.display = "inline";
   }).catch((error) => {
      document.getElementById("result").innerHTML = "Sorry! <br>" + errorMessage;
   });
});