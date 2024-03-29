import { firestore, firebaseConfig } from "../index.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import {
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { 
    getAuth,
    onAuthStateChanged,
    signOut
 } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";

var currentUserUID;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get the Current User's UID
function getUserUID(){
    // Set an observer on the Auth object to ensure that the Auth object isn't in an intermediate state
    onAuthStateChanged(auth, (user) => {
        // If there is a User logged in, get the UID of the User
        if (user) {
            currentUserUID = user.uid;
        }
    });
}

// Get all Achievements from Firestore and display it on the HTML page
window.onload = async function getAchievements(){
    getUserUID();
    
    // Pulling Achievements that are Plants type from Firebase
    const getPlantAchievementsQuery = query(
        collection(firestore, "Achievements"), where("achievementType", "==", "Plants")
    );

    // Manipulating the Data pulled from Firebase to show on the page
    const queryPlantSnapshot = await getDocs(getPlantAchievementsQuery);
    const allPlantDocs = queryPlantSnapshot.forEach((snap) => {
        // Specify which HTML div to use
        var selectPlantAchievements = document.getElementById("panelPlants");
        // Create an array to input Plants available
        var achievementOptions = [];
         // Stringify converts a JavaScript value to a JSON String
         var JSONData = JSON.stringify(snap.data());
         // Parses a string and returns a JavaScript Object
         var JSONObject = JSON.parse(JSONData);
         // Get the Achievement name from the JavaScript Object
        var achievementName = JSONObject.achievementName;

        // Add the Achievement name into the array 
        achievementOptions.push(achievementName);

        for (var i = 0; i < achievementOptions.length; ++i){
            // Create a variable to store the Achievement name
            var opt = achievementOptions[i];
            // Create an option element in HTML
            var ele = document.createElement("p");
            // Assign the Achievement name into the HTML element
            ele.textContent = opt;
            ele.value = opt;
            // Set the ID of the HTML element as the same ID of the Achievement
            ele.setAttribute("id", JSONObject.achievementID);
            // Insert the Achievements into the existing node
            selectPlantAchievements.appendChild(ele);
        }
    });

    // Pulling Achievments that are Hydartion type from Firebase
    const getHydrationAchievementsQuery = query(
        collection(firestore, "Achievements"), where("achievementType", "==", "Hydration")
    );

    // Manipulating the Data pulled from Firebase to show on the page
    const queryHydrationSnapshot = await getDocs(getHydrationAchievementsQuery);
    const allHydrationDocs = queryHydrationSnapshot.forEach((snap) => {
        // Specify which HTML element to use
        var selectPlantAchievements = document.getElementById("panelHydration");
        // Create an array to input Achievements
        var achievementOptions = [];
        // Stringify converts a JavaScript value to a JSON String
        var JSONData = JSON.stringify(snap.data());
        // Parses a string and returns a JavaScript Object
        var JSONObject = JSON.parse(JSONData);
        // Get the Achievement name from the JavaScript Object
        var achievementName = JSONObject.achievementName;

        // Add the Achievement name into the array
        achievementOptions.push(achievementName);

        for (var i = 0; i < achievementOptions.length; ++i){
            // Create a variable to store the Achievement name
            var opt = achievementOptions[i];
            // Create an option element in HTML
            var ele = document.createElement("p");
            // Assign the Achievement name into the HTML element
            ele.textContent = opt;
            ele.value = opt;
            // Set HTML element's ID as the AchievementID
            ele.setAttribute("id", JSONObject.achievementID);
            // Insert the Achievements available into the existing node
            selectPlantAchievements.appendChild(ele);
        }
    });

    // Pulling Achievments that are Hydartion type from Firebase
    const getUpdatesAchievementsQuery = query(
        collection(firestore, "Achievements"), where("achievementType", "==", "Tasks")
    );

    // Manipulating the Data pulled from Firebase to show on the page
    const queryUpdatesSnapshot = await getDocs(getUpdatesAchievementsQuery);
    const allUpdatesDocs = queryUpdatesSnapshot.forEach((snap) => {
        // Specify which HTML div to use
        var selectPlantAchievements = document.getElementById("panelTasks");
        // Create an array to input Plants available
        var achievementOptions = [];
        // Stringify converts a JavaScript value to a JSON String
        var JSONData = JSON.stringify(snap.data());
        // Parses a string and returns a JavaScript Object
        var JSONObject = JSON.parse(JSONData);
        // Get the Achievement name from the JavaScript Object
        var achievementName = JSONObject.achievementName;

        // Add the Achievements name into the array
        achievementOptions.push(achievementName);

        for (var i = 0; i < achievementOptions.length; ++i){
            // Create a variable to store the Achievement name
            var opt = achievementOptions[i];
            // Create a paragraph element in HTML
            var ele = document.createElement("p");
            // Assign the Plant's name into the HTML element
            ele.textContent = opt;
            ele.value = opt;
            // Assign achievementID as HTML Value of the Plant
            ele.setAttribute("id", JSONObject.achievementID);
            // Insert the Achievements available into the existing node
            selectPlantAchievements.appendChild(ele);
        }
    });

    getUserAchievments();
}

// Get Achievements completed by the User
async function getUserAchievments(){
    // Pulling Specific User's completed Achievements
    const getUserAchievementsQuery = query(
        collection(firestore, "Users/" + currentUserUID + "/Achievements"), where("achievementDone", "==", true)
    );

    // Manipulating the Data pulled from Firebase to show on the page
    const queryUserAchievementsSnapshot = await getDocs(getUserAchievementsQuery);
    const allDocs = queryUserAchievementsSnapshot.forEach((snap) => {
        // Create an array to input User's completed Achievements
        var completedAchievementsList = [];
        // Stringify converts a JavaScript value to a JSON String
        var JSONData = JSON.stringify(snap.data());
        // Parses a string and returns a JavaScript Object
        var JSONObject = JSON.parse(JSONData);
        // Get the AchievementID from the JavaScript Object, parses it and returns an Integer
        var userCompletedAchievements = parseInt(JSONObject.achievementID);

        // Push all completed Achievements into completedAchievementsList
        completedAchievementsList.push(userCompletedAchievements);

        for (var i = 0; i < completedAchievementsList.length; ++i){
            // Specify which HTML element to use
            var selectUserAchievements = document.getElementById(completedAchievementsList[i]);
            // Strikethrough the User"s completed Achievements
            selectUserAchievements.innerHTML = "<strike>" + selectUserAchievements.innerHTML + "</strike>";             
        }
    });
}

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