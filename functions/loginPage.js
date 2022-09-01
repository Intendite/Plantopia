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

// Create an event listener for Users to Log In
document.getElementById("login-btn").addEventListener("click", function(){
    // Specify which HTML element to use
    const loginEmail = document.getElementById("login-email").value;
    const loginPassword = document.getElementById("login-password").value;

    // User Log In function
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
        // User has Logged In
        const user = userCredential.user;
        document.getElementById("sign-out").style.display = "inline";
        document.getElementById("login-div").style.display = "none";

      // if user log in sucessfully it will go to this page
      document.getElementById("result").innerHTML = "Welcome Back<br>" + loginEmail + " was Login Successfully";
   })
   .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById("sign-out").style.display = "inline";
      document.getElementById("login-div").style.display = "none";

      //if user failed to log in, an error message will be send to user
      document.getElementById("result").innerHTML = "Sorry! <br>" + errorMessage;
   });
});

// Create an event listener for Users to Log Out
document.getElementById("log-out-btn").addEventListener("click", function(){
    //create a sign out function for user to sign out
    signOut(auth).then(() => {
        document.getElementById("sign-out").style.display = "none";
        document.getElementById("login-div").style.display = "inline";
    }).catch((error) => {

        // if user failed to log out, message will be alert to the user
        document.getElementById("result").innerHTML = "Sorry! <br>" + errorMessage;
    });
});