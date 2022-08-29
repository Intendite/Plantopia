import { firestore } from "../index.js";
import {
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const currentUserUID = "s6wnGQY3pH3oBGEyNJmZ/"

// Get Plants owned by the user
window.onload = async function getUserPlants(){
    // Query to get a Specific User's Plants
    const getUserPlantsQuery = query(
        collection(firestore, "Users/" + currentUserUID + "Plants")
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
    var remindersTable = document.getElementById("remindersTable").getElementsByTagName('tbody')[0];
    
    // Pulling Tasks from Firebase
    const getTaskQuery = query(
        collection(firestore, 'Tasks'), where("taskID", "==", userPlantsTaskIDList[i])
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
