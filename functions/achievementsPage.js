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