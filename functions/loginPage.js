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
        window.location = "views/Home.html";
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
    // Signs the User out
    signOut(auth)
    .then(() => {
        alert("Good Bye!");
        window.location = "../index.html";
    })
    
    .catch((error) => {
    // Send a Message if the User fails to Log Out
        document.getElementById("result").innerHTML = "Sorry! <br>" + errorMessage;
    });
});