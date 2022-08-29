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

const currentUserUID = "s6wnGQY3pH3oBGEyNJmZ/"

// Get plants from Firebase
window.onload = async function getPlants(){
    // Pulling Plants from Firebase
    const getPlantsQuery = query(
        collection(firestore, 'Plants')
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

// Get Plants owned by the user
async function getUserPlants(){
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
        getPlantsWithCondition(userPlantsList);
    });
}

// Query Firebase for user's plant
async function getPlantsWithCondition(userPlantsList){
    // Specify which HTML element to use
    var userPlants = document.getElementById("userPlants");

    // Loop to go through the list of PlantIDs
    for (var i = 0; i < userPlantsList.length; ++i){
        // Query to get the Plant names of the Specific User's Plants
        const getActualPlants = query(
            collection(firestore, "Plants"), where("plantID", "==", userPlantsList[i])
        );

        const plantSnapshot = await getDocs(getActualPlants);
        const allDocs = plantSnapshot.forEach((snap) => {
            // Create an array to input the Plant Names of the Specific User's Plants
            var userActualPlantsList = [];
            // Stringify converts a JavaScript value to a JSON String
            var JSONData = JSON.stringify(snap.data());
            // Parses a string and returns a JavaScript Object
            var JSONObject = JSON.parse(JSONData);
            // Get the Plant Names from the JavaScript Object
            var userPlantNames = JSONObject.plantName;

            // Push all User owned Plants into userActualPlantsList
            userActualPlantsList.push(userPlantNames);

            for (var i = 0; i < userActualPlantsList.length; ++i){
                // Create a variable to store the Plant's name
                var opt = userActualPlantsList[i];
                // Create an element in HTML to display Plants
                var ele = document.createElement("div");
                // Assign the Plant's name into the HTML element
                ele.textContent = opt;
                ele.value = opt;
                // Insert the User Owned Plants into the existing node
                userPlants.appendChild(ele);
            }
        })
    }
}

window.onsubmit = async function addPlant(){
    // Specify which HTML data to get from
    var selectPlants = parseInt(document.getElementById("plantID").value);

    // Get reference to the collection that we are adding Data to
    const userPlants = collection(firestore, "Users/" + currentUserUID + "Plants");

    const data = {
        plantID: selectPlants
    };
    
    const newDoc = await addDoc(userPlants, data);
}