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

function tokenisePlants(JSONString){
    var obj = JSON.parse(JSONString);
    var Accel_A = obj.plantName.replace(",", "");
    var Accel_B = obj.plantID.replace(",", "");
    var Accel_C = obj.plantType.replace(",", "");
    var Accel_D = obj.plantTaskID.replace(",", "");
    var Accel_E = obj.plantDos.replace(",", "");
    var Accel_F = obj.plantDonts.replace(",", "");
    var Accel_G = obj.plantDescription.replace(",", "");

    return (Accel_A, Accel_B, Accel_C, Accel_D, Accel_E, Accel_F, Accel_G);
}

window.onload = async function getPlants(){
    const getPlantsQuery = query(
        collection(firestore, 'Plants')
    );

    const querySnapshot = await getDocs(getPlantsQuery);
    const allDocs = querySnapshot.forEach((snap) => {
        console.log(tokenisePlants(JSON.stringify(snap.data())));
        //console.log(`Document ${snap.id} contains ${JSON.stringify(snap.data())}`);
    });
}