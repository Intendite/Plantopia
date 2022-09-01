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
window.onload = function getUserUID(){
    // Set an observer on the Auth object to ensure that the Auth object isn't in an intermediate state
    onAuthStateChanged(auth, (user) => {
        // If there is a User logged in, get the UID of the User
        if (user) {
            currentUserUID = user.uid;
            getUserPlants();
        }
    });
}

// Get Plants owned by the user
async function getUserPlants(){
    // Query to get a Specific User's Plants
    const getUserPlantsQuery = query(
        collection(firestore, "Users/" + currentUserUID + "/Plants")
    );

    // Manipulating the Data pulled from Firebase to get IDs of the Specific User"s Plants
    const queryUserPlantsSnapshot = await getDocs(getUserPlantsQuery);
    const allDocs = queryUserPlantsSnapshot.forEach((snap) => {
        // Create an array to input the PlantIDs of the Specific User"s Plants
        var userPlantsList = [];
        // Stringify converts a JavaScript value to a JSON String
        var JSONData = JSON.stringify(snap.data());
        // Parses a string and returns a JavaScript Object
        var JSONObject = JSON.parse(JSONData);
        // Get the PlantIDs from the JavaScript Object
        var userPlantID = parseInt(JSONObject.plantID);

        // Push all User owned PlantIDs into userPlantsList
        userPlantsList.push(userPlantID);
        getUsersTaskID(userPlantsList)
    });
}

// Function to get all taskIDs for the User
// Input for the function is a List of User plantIDs
async function getUsersTaskID(userPlantsList){
    // Query to get a Specific User's Plants
    const getUserTaskIDQuery = query(
        collection(firestore, "Plants"), where("plantID", "==", userPlantsList[i])
    );

    // Manipulating the Data pulled from Firebase to show on the page
    const queryTaskIDSnapshot = await getDocs(getUserTaskIDQuery);
    const allDocs = queryTaskIDSnapshot.forEach((snap) => {
        var plantTaskIDOptions = [];
        // Stringify converts a JavaScript value to a JSON String
        var JSONData = JSON.stringify(snap.data());
        // Parses a string and returns a JavaScript Object
        var JSONObject = JSON.parse(JSONData);
        // Get the TaskID from the JavaScript Object
        var plantTaskID = JSONObject.plantTaskID;
        // Add the plantTasksIDs into the array 
        plantTaskIDOptions.push(plantTaskID);
        getTasks(plantTaskIDOptions);
    });
}

// Function to get all tasks for the User
// Input for the function is a List of PlantTaskIDs 
async function getTasks(userPlantsTaskIDList){
    // Specify which HTML element to use
    var remindersTable = document.getElementById("remindersTable").getElementsByTagName("tbody")[0];
    
    // Pulling Tasks from Firebase
    const getTaskQuery = query(
        collection(firestore, "Tasks"), where("taskID", "==", userPlantsTaskIDList[i])
    );

    // Manipulating the Data pulled from Firebase to show on the page
    const queryTaskSnapshot = await getDocs(getTaskQuery);
    const allDocs = queryTaskSnapshot.forEach((snap) => {
        // Stringify converts a JavaScript value to a JSON String
        var JSONData = JSON.stringify(snap.data());
        // Parses a string and returns a JavaScript Object
        var JSONObject = JSON.parse(JSONData);
        // Array of Days for this task
        var taskDay = JSONObject.taskDay

        // Insert a new row at the end of table
        var newRow = remindersTable.insertRow();
        // Insert cells into the new row
        var mondayCell = newRow.insertCell();
        var tuesdayCell = newRow.insertCell();
        var wednesdayCell = newRow.insertCell();
        var thursdayCell = newRow.insertCell();
        var fridayCell = newRow.insertCell();
        var saturdayCell = newRow.insertCell();
        var sundayCell = newRow.insertCell();

        // Check if the day is in the array taskDay and display the task on the HTML page if it is there
        if (taskDay.find(element => element  == "Monday") == "Monday"){
            mondayCell.appendChild(document.createTextNode(JSONObject.taskName));
        }
        
        if (taskDay.find(element => element  == "Tuesday") == "Tuesday"){
            tuesdayCell.appendChild(document.createTextNode(JSONObject.taskName));
        }

        if (taskDay.find(element => element  == "Wednesday") == "Wednesday"){
            wednesdayCell.appendChild(document.createTextNode(JSONObject.taskName));
        }

        if (taskDay.find(element => element  == "Thursday") == "Thursday"){
            thursdayCell.appendChild(document.createTextNode(JSONObject.taskName));
        }

        if (taskDay.find(element => element  == "Friday") == "Friday"){
            fridayCell.appendChild(document.createTextNode(JSONObject.taskName));
        }

        if (taskDay.find(element => element  == "Saturday") == "Saturday"){
            saturdayCell.appendChild(document.createTextNode(JSONObject.taskName));
        }

        if (taskDay.find(element => element  == "Sunday") == "Sunday"){
            sundayCell.appendChild(document.createTextNode(JSONObject.taskName));
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