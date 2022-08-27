import {firestore} from "../index.js";
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

// Get all Achievements from Firestore and display it on the HTML page
window.onload = async function getAchievements(){
    // Pulling Achievements that are Plants type from Firebase
    const getPlantAchievementsQuery = query(
        collection(firestore, 'Achievements'), where("achievementType", "==", "Plants")
    );

    // Manipulating the Data pulled from Firebase to show on the page
    const queryPlantSnapshot = await getDocs(getPlantAchievementsQuery);
    const allPlantDocs = queryPlantSnapshot.forEach((snap) => {
        var selectPlantAchievements = document.getElementById("panelPlants");
        var achievementOptions = [];
        var JSONData = JSON.stringify(snap.data());
        var JSONObject = JSON.parse(JSONData);
        var achievementName = JSONObject.achievementName;

        achievementOptions.push(achievementName);

        for (var i = 0; i < achievementOptions.length; ++i){
            var opt = achievementOptions[i];
            var ele = document.createElement("p");
            ele.textContent = opt;
            ele.value = opt;
            ele.setAttribute("id", JSONObject.achievementID);
            selectPlantAchievements.appendChild(ele);
        }
    });

    // Pulling Achievments that are Hydartion type from Firebase
    const getHydrationAchievementsQuery = query(
        collection(firestore, 'Achievements'), where("achievementType", "==", "Hydration")
    );

    // Manipulating the Data pulled from Firebase to show on the page
    const queryHydrationSnapshot = await getDocs(getHydrationAchievementsQuery);
    const allHydrationDocs = queryHydrationSnapshot.forEach((snap) => {
        var selectPlantAchievements = document.getElementById("panelHydration");
        var achievementOptions = [];
        var JSONData = JSON.stringify(snap.data());
        var JSONObject = JSON.parse(JSONData);
        var achievementName = JSONObject.achievementName;

        achievementOptions.push(achievementName);

        for (var i = 0; i < achievementOptions.length; ++i){
            var opt = achievementOptions[i];
            var ele = document.createElement("p");
            ele.textContent = opt;
            ele.value = opt;
            ele.setAttribute("id", JSONObject.achievementID);
            selectPlantAchievements.appendChild(ele);
        }
    });

    // Pulling Achievments that are Hydartion type from Firebase
    const getUpdatesAchievementsQuery = query(
        collection(firestore, 'Achievements'), where("achievementType", "==", "Tasks")
    );

    // Manipulating the Data pulled from Firebase to show on the page
    const queryUpdatesSnapshot = await getDocs(getUpdatesAchievementsQuery);
    const allUpdatesDocs = queryUpdatesSnapshot.forEach((snap) => {
        var selectPlantAchievements = document.getElementById("panelTasks");
        var achievementOptions = [];
        var JSONData = JSON.stringify(snap.data());
        var JSONObject = JSON.parse(JSONData);
        var achievementName = JSONObject.achievementName;

        achievementOptions.push(achievementName);

        for (var i = 0; i < achievementOptions.length; ++i){
            var opt = achievementOptions[i];
            var ele = document.createElement("p");
            ele.textContent = opt;
            ele.value = opt;
            ele.setAttribute("id", JSONObject.achievementID);
            selectPlantAchievements.appendChild(ele);
        }
    });

    getUserAchievments();
}

// Get Achievements completed by the user
async function getUserAchievments(){
    const getUserAchievementsQuery = query(
        collection(firestore, "Users/" + "s6wnGQY3pH3oBGEyNJmZ/" + "Achievements"), where("achievementDone", "==", true)
    );

    const queryUserAchievementsSnapshot = await getDocs(getUserAchievementsQuery);
    const allDocs = queryUserAchievementsSnapshot.forEach((snap) => {
        var completedAchievementsList = [];
        var JSONData = JSON.stringify(snap.data());
        var JSONObject = JSON.parse(JSONData);
        var userCompletedAchievements = parseInt(JSONObject.achievementID);

        // # GET achievementID WHERE achievementDone == True INTO ARRAY THEN CANCEL OUT THE ACHIEVEMENT GOING THROUGH A FOR LOOP

        completedAchievementsList.push(userCompletedAchievements);

        for (var i = 0; i < completedAchievementsList.length; ++i){
            var selectUserAchievements = document.getElementById(completedAchievementsList[i]);

            selectUserAchievements.innerHTML = "<strike>" + selectUserAchievements.innerHTML + "</strike>";             
        }
    });
}