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