import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js";
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

const firebaseConfig = {
    apiKey: "AIzaSyBvjz8rUCZe93G7ajUTTNkkNqKwCI5gcZk",
    authDomain: "plantopia-90b99.firebaseapp.com",
    projectId: "plantopia-90b99",
    storageBucket: "plantopia-90b99.appspot.com",
    messagingSenderId: "753505805986",
    appId: "1:753505805986:web:e6ab978db3dc08221919fb",
    measurementId: "G-QT0KZYEJFX"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
const firestore = getFirestore();

window.onload = async function getPlants(){
    const getPlantsQuery = query(
        collection(firestore, 'Plants')
    );

    const queryPlantSnapshot = await getDocs(getPlantsQuery);
    const allDocs = queryPlantSnapshot.forEach((snap) => {
        var selectPlants = document.getElementById("plantID");
        var plantOptions = [];
        var JSONData = JSON.stringify(snap.data());
        var JSONObject = JSON.parse(JSONData);
        var plantName = JSONObject.plantName;

        plantOptions.push(plantName);

        for (var i = 0; i < plantOptions.length; ++i){
            var opt = plantOptions[i];
            var ele = document.createElement("option");
            ele.textContent = opt;
            ele.value = opt;
            selectPlants.appendChild(ele);
        }
    });
}

window.onload = async function getAchievements(){
    // Pulling Achievements that are Plants type from Firebase
    const getPlantAchievementsQuery = query(
        collection(firestore, 'Achievements'), where("achievementType", "==", "Plants")
    );

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
            selectPlantAchievements.appendChild(ele);
        }
    });

    // Pulling Achievments that are Hydartion type from Firebase
    const getHydrationAchievementsQuery = query(
        collection(firestore, 'Achievements'), where("achievementType", "==", "Hydration")
    );

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
            selectPlantAchievements.appendChild(ele);
        }
    });

    // Pulling Achievments that are Hydartion type from Firebase
    const getUpdatesAchievementsQuery = query(
        collection(firestore, 'Achievements'), where("achievementType", "==", "Tasks")
    );

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
            selectPlantAchievements.appendChild(ele);
        }
    });
}