import { firestore } from "../index.js";
import {
    getFirestore,
    doc,
    setDoc,
    collection,
    addDoc,
    getDoc,
    onSnapshot,
    query,
    where,
    getDocs,
    orderBy,
    limit,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

// Get Plants owned by the user
window.onload = async function getUserPlants(){
    // Query to get a Specific User's Plants
    const getUserPlantsQuery = query(
        collection(firestore, "Users/" + "s6wnGQY3pH3oBGEyNJmZ/" + "Plants")
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
        getTasks(userPlantsList);
    });
}

async function getTasks(userPlantsTaskIDList){
    // Specify which HTML element to use
    var userPlants = document.getElementById("remindersTable").getElementsByTagName('tbody')[0];
    // Insert a row at the end of table
    var newRow = userPlants.insertRow();

    // Pulling Tasks from Firebase
    const getTaskQuery = query(
        collection(firestore, 'Tasks'), where("taskID", "==", userPlantsTaskIDList[i])
    );

    // Manipulating the Data pulled from Firebase to show on the page
    const queryTaskSnapshot = await getDocs(getTaskQuery);
    const allDocs = queryTaskSnapshot.forEach((snap) => {
        // Create an array to input Plants available
        var taskOptions = [];
        // Stringify converts a JavaScript value to a JSON String
        var JSONData = JSON.stringify(snap.data());
        // Parses a string and returns a JavaScript Object
        var JSONObject = JSON.parse(JSONData);
        // Get the TaskID from the JavaScript Object
        var plantTaskID = JSONObject.taskID;
        // Add the TasksIDs into the array 
        taskOptions.push(plantTaskID);
        for (var i = 0; taskOptions.length; ++i){
            // Create a variable to store the Plant's name
            var opt = taskOptions[i];

            // Array of Days for this task
            var taskDay = JSONObject.taskDay

            for (var i = 0; taskDay.length; ++i){
                if (taskDay[i] == "Monday"){
                    // create it on monday
                    // Insert a cell at the end of the row
                    var newCell = newRow.insertCell();
                    // Append a text node to the cell
                    var newText = document.createTextNode(opt);
                    newCell.appendChild(newText);
                }
                
                else if (taskDay[i] == "Tuesday"){
                    // create it on tuesday
                }

                else if (taskDay[i] == "Wednesday"){
                    // create it on wednesday
                }

                else if (taskDay[i] == "Thursday"){
                    // create it on thursday
                }

                else if (taskDay[i] == "Friday"){
                    // create it on thursday
                }

                else if (taskDay[i] == "Saturday"){
                    // create it on thursday
                }

                else if (taskDay[i] == "Sunday"){
                    // create it on thursday
                }
            }

            //console.log(opt)
            // for (var i = 0; userPlants.rows[0].cells.length; ++i){
            //     if () 
            // }
        }
    });
}
