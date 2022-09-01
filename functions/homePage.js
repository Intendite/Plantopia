import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { firebaseConfig } from "../index.js";
import { 
    getAuth, 
    signOut
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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