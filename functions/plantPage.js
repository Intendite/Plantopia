import { firestore, firebaseConfig } from "../index.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import {
    doc,
    collection,
    addDoc,
    query,
    where,
    getDocs,
    updateDoc
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
            plantAchievementChecker();
        }
    });
}

// Get plants from Firebase
window.onload = async function getPlants(){
    getUserUID();

    // Pulling Plants from Firebase
    const getPlantsQuery = query(
        collection(firestore, "Plants")
    );

    // Manipulating the Data pulled from Firebase to show on the page
    const queryPlantSnapshot = await getDocs(getPlantsQuery);
    const allDocs = queryPlantSnapshot.forEach((snap) => {
        // Specify which HTML div to use
        var selectPlants = document.getElementById("plantID");
        // Create an array to input Plants available
        var plantOptions = [];
        // Stringify converts a JavaScript value to a JSON String
        var JSONData = JSON.stringify(snap.data());
        // Parses a string and returns a JavaScript Object
        var JSONObject = JSON.parse(JSONData);
        // Get the Plant's name from the JavaScript Object
        var plantName = JSONObject.plantName;

        // Add the Plant's name into the array 
        plantOptions.push(plantName);

        for (var i = 0; i < plantOptions.length; ++i){
            // Create a variable to store the Plant's name
            var opt = plantOptions[i];
            // Create an option element in HTML
            var ele = document.createElement("option");
            // Assign the Plant's name into the HTML element
            ele.textContent = opt;
            ele.value = opt;
            // Assign plantID as HTML Value of the Plant
            ele.setAttribute("value", JSONObject.plantID);
            // Insert the Plants available into the existing node
            selectPlants.appendChild(ele);
        }
    });

    getUserPlants();
}

// Get Plants owned by the User
async function getUserPlants(){
    // Query to get a Specific User's Plants
    const getUserPlantsQuery = query(
        collection(firestore, "Users/" + currentUserUID + "/Plants")
    );

    // Manipulating the Data pulled from Firebase to get IDs of the Specific User's Plants
    const queryUserPlantsSnapshot = await getDocs(getUserPlantsQuery);
    const allDocs = queryUserPlantsSnapshot.forEach((snap) => {
        // Create an array to input the PlantIDs of the Specific User's Plants
        var userPlantsList = [];
        // Stringify converts a JavaScript value to a JSON String
        var JSONData = JSON.stringify(snap.data());
        // Parses a string and returns a JavaScript Object
        var JSONObject = JSON.parse(JSONData);
        // Get the PlantIDs from the JavaScript Object
        var userPlantID = parseInt(JSONObject.plantID);

        // Push all User owned PlantIDs into userPlantsList
        userPlantsList.push(userPlantID);
        getPlantsWithCondition(userPlantsList);
    });
}

// Query Firebase for User's plant
async function getPlantsWithCondition(userPlantsList){
    // Specify which HTML element to use
    var plantsTable = document.getElementById("plantsTable");

    // Loop to go through the list of PlantIDs
    for (var i = 0; i < userPlantsList.length; ++i){
        // Query to get the Plant names of the Specific User's Plants
        const getActualPlants = query(
            collection(firestore, "Plants"), where("plantID", "==", userPlantsList[i])
        );

        const plantSnapshot = await getDocs(getActualPlants);
        const allDocs = plantSnapshot.forEach((snap) => {
            // Stringify converts a JavaScript value to a JSON String
            var JSONData = JSON.stringify(snap.data());
            // Parses a string and returns a JavaScript Object
            var JSONObject = JSON.parse(JSONData);

            // Insert a new row at the end of table
            var newRow = plantsTable.insertRow();
            // Insert cells into the new row
            var plantCell = newRow.insertCell();
            var typeCell = newRow.insertCell();
            var descriptionCell = newRow.insertCell();
            var dosCell = newRow.insertCell();
            var dontsCell = newRow.insertCell();

            plantCell.appendChild(document.createTextNode(JSONObject.plantName));
            typeCell.appendChild(document.createTextNode(JSONObject.plantType));
            descriptionCell.appendChild(document.createTextNode(JSONObject.plantDescription));
            dosCell.appendChild(document.createTextNode(JSONObject.plantDos));
            dontsCell.appendChild(document.createTextNode(JSONObject.plantDonts));
        })
    }
}

// Specify which HTML element to use
var addPlantButton = document.getElementById("addPlantButton");

addPlantButton.onclick = async function addPlant(){
    // Pull the plantID from the Drop Down List in HTML
    var selectPlants = parseInt(document.getElementById("plantID").value);

    // Put the plantID as an Object to pass it to Firestore
    const data = {
        plantID: selectPlants
    };

    // Get reference to the collection that we are adding Data to
    const userPlants = collection(firestore, "Users/" + currentUserUID + "/Plants");
    // Add the new Plant into User"s Plants
    const newDoc = await addDoc(userPlants, data);
    // Reload the page
    window.location.reload();
}

async function plantAchievementChecker(){
    // Query to get a Specific User's Plants
    const getUserPlantsQuery = query(
        collection(firestore, "Users/" + currentUserUID + "/Plants")
    );

    // Create an array to input the PlantIDs of the Specific User's Plants
    var userPlantsList = [];

    // Manipulating the Data pulled from Firebase to get IDs of the Specific User's Plants
    const queryUserPlantsSnapshot = await getDocs(getUserPlantsQuery);
    const allDocs = queryUserPlantsSnapshot.forEach((snap) => {
        // Stringify converts a JavaScript value to a JSON String
        var JSONData = JSON.stringify(snap.data());
        // Parses a string and returns a JavaScript Object
        var JSONObject = JSON.parse(JSONData);
        // Get the PlantIDs from the JavaScript Object
        var userPlantID = parseInt(JSONObject.plantID);
        // Push all User owned PlantIDs into userPlantsList
        userPlantsList.push(userPlantID);
    });

    // Create a variable to store User's total Plants
    var totalPlants = userPlantsList.length;

    // Check if User has completed the Achievements
    if (totalPlants >= 1 && totalPlants <= 3){
        // Query to get a Specific User's Achievements
        const getUserAchievementsQuery = query(
            collection(firestore, "Users/" + currentUserUID + "/Achievements"), where("achievementID", "==", 1)
        );

        // Create a variable to store the document's Path
        var documentPath;

        // Manipulating the Data pulled from Firebase to get IDs of the Specific User's Plants
        const queryUserPlantsSnapshot = await getDocs(getUserAchievementsQuery);
        const allDocs = queryUserPlantsSnapshot.forEach((snap) => {
            // Stringify converts a JavaScript value to a JSON String
            documentPath = snap.ref.path;
            // Stores the new path as a Document Reference
            const docRef = doc(firestore, documentPath);
            // Updates the Document to show that the Achievement is done
            updateDoc(docRef, {
                achievementDone: true
            });
        });
    }

    if (totalPlants >= 3 && totalPlants <= 5){
        // Query to get a Specific User's Achievements
        const getUserAchievementsQuery = query(
            collection(firestore, "Users/" + currentUserUID + "/Achievements"), where("achievementID", "==", 2)
        );

        // Create a variable to store the document's Path
        var documentPath;

        // Manipulating the Data pulled from Firebase to get IDs of the Specific User's Plants
        const queryUserPlantsSnapshot = await getDocs(getUserAchievementsQuery);
        const allDocs = queryUserPlantsSnapshot.forEach((snap) => {
            // Stringify converts a JavaScript value to a JSON String
            documentPath = snap.ref.path;
            // Stores the new path as a Document Reference
            const docRef = doc(firestore, documentPath);
            // Updates the Document to show that the Achievement is done
            updateDoc(docRef, {
                achievementDone: true
            });
        });
    }

    if (totalPlants >= 5 && totalPlants <= 10){
        // Query to get a Specific User's Achievements
        const getUserAchievementsQuery = query(
            collection(firestore, "Users/" + currentUserUID + "/Achievements"), where("achievementID", "==", 3)
        );

        // Create a variable to store the document's Path
        var documentPath;

        // Manipulating the Data pulled from Firebase to get IDs of the Specific User's Plants
        const queryUserPlantsSnapshot = await getDocs(getUserAchievementsQuery);
        const allDocs = queryUserPlantsSnapshot.forEach((snap) => {
            // Stringify converts a JavaScript value to a JSON String
            documentPath = snap.ref.path;
            // Stores the new path as a Document Reference
            const docRef = doc(firestore, documentPath);
            // Updates the Document to show that the Achievement is done
            updateDoc(docRef, {
                achievementDone: true
            });
        });
    }

    if (totalPlants >= 10){
        // Query to get a Specific User's Achievements
        const getUserAchievementsQuery = query(
            collection(firestore, "Users/" + currentUserUID + "/Achievements"), where("achievementID", "==", 4)
        );

        // Create a variable to store the document's Path
        var documentPath;

        // Manipulating the Data pulled from Firebase to get IDs of the Specific User's Plants
        const queryUserPlantsSnapshot = await getDocs(getUserAchievementsQuery);
        const allDocs = queryUserPlantsSnapshot.forEach((snap) => {
            // Stringify converts a JavaScript value to a JSON String
            documentPath = snap.ref.path;
            // Stores the new path as a Document Reference
            const docRef = doc(firestore, documentPath);
            // Updates the Document to show that the Achievement is done
            updateDoc(docRef, {
                achievementDone: true
            });
        });
    }
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