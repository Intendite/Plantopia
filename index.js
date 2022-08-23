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

    const querySnapshot = await getDocs(getPlantsQuery);
    const allDocs = querySnapshot.forEach((snap) => {
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
    // const getAchievementsQuery = query(
    //     collection(firestore, 'Users/Achievement/achievementID')
    // );

    const achievementRef = db.collection("Achievements");
    const snapshot = await achievementRef.get();
    snapshot.forEach((doc) => {
        console.log(doc);
    })

    // const querySnapshot = await getDocs(getAchievementsQuery);

    // const allDocs = querySnapshot.forEach((snap) => {
    //     console.log(`Document ${snap.id} contains ${JSON.stringify(snap.data())}`);

    //     var typePlants = document.getElementById("panelPlants");
    //     var typeHydration = document.getElementById("panelHydration");
    //     var typeUpdates = document.getElementById("panelUpdates");

    //     var plantOptions = [];
    //     var hydrationOptions = [];
    //     var updatesOptions = [];

    //     var JSONData = JSON.stringify(snap.data());
    //     var JSONObject = JSON.parse(JSONData);
    //     var achievementType = JSONObject.achievementType;

    //     if (achievementType == "Plants"){
    //         plantOptions.push(JSON.stringify(snap.data()));
    //     }

    //     if (achievementType == "Hydration"){
    //         hydrationOptions.push(JSON.stringify(snap.data()));
    //     }

    //     if (achievementType == "Updates"){
    //         updatesOptions.push(JSON.stringify(snap.data()));
    //     }

    //     for (var i = 0; i < plantOptions.length; ++i){
    //         var opt = plantOptions[i];
    //         var ele = document.createElement("div");
    //         ele.textContent = opt;
    //         ele.value = opt;
    //         typePlants.appendChild(ele);
    //     }

    //     for (var i = 0; i < plantOptions.length; ++i){
    //         var opt = plantOptions[i];
    //         var ele = document.createElement("div");
    //         ele.textContent = opt;
    //         ele.value = opt;
    //         typeHydration.appendChild(ele);
    //     }

    //     for (var i = 0; i < plantOptions.length; ++i){
    //         var opt = plantOptions[i];
    //         var ele = document.createElement("div");
    //         ele.textContent = opt;
    //         ele.value = opt;
    //         typeUpdates.appendChild(ele);
    //     }

    // });
}