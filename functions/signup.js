import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { firestore, firebaseConfig } from "../index.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
import {
  doc,
  setDoc,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

submitData.addEventListener('click', (e) => {
    e.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('psw').value;

    // user sign up function
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        alert('user created successfully!');
        createNewUser(user.uid, user.email);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    });
});

// Function to add the New User into Firebase
function createNewUser(userUID, email){
  // Reference to New User Achievement Sub Collection
  const userRef = doc(firestore, "Users/" + userUID);

  // Reference to New User Achievement Sub Collection
  const userAchievementRef = collection(firestore, "Users/" + userUID + "/Achievements");

  const userEmail = {
    userEmail: email
  };

  setDoc(userRef, userEmail);

  // Add Fields for the Achievement Sub Collection
  const docData1 = {
    achievementID: 1,
    achievementDone: false
  };

  const docData2 = {
    achievementID: 2,
    achievementDone: false
  };
  
  const docData3 = {
    achievementID: 3,
    achievementDone: false
  };

  const docData4 = {
    achievementID: 4,
    achievementDone: false
  };

  const docData5 = {
    achievementID: 5,
    achievementDone: false
  };

  const docData6 = {
    achievementID: 6,
    achievementDone: false
  };

  const docData7 = {
    achievementID: 7,
    achievementDone: false
  };

  const docData8 = {
    achievementID: 8,
    achievementDone: false
  };

  const docData9 = {
    achievementID: 9,
    achievementDone: false
  };

  const docData10 = {
    achievementID: 10,
    achievementDone: false
  };

  const docData11 = {
    achievementID: 11,
    achievementDone: false
  };

  const docData12 = {
    achievementID: 12,
    achievementDone: false
  };

  const docData13 = {
    achievementID: 13,
    achievementDone: false
  };

  const docData14 = {
    achievementID: 14,
    achievementDone: false
  };

  const docData15 = {
    achievementID: 15,
    achievementDone: false
  };
    
  // Add Achievements to User
  addDoc(userAchievementRef, docData1);
  addDoc(userAchievementRef, docData2);
  addDoc(userAchievementRef, docData3);
  addDoc(userAchievementRef, docData4);
  addDoc(userAchievementRef, docData5);
  addDoc(userAchievementRef, docData6);
  addDoc(userAchievementRef, docData7);
  addDoc(userAchievementRef, docData8);
  addDoc(userAchievementRef, docData9);
  addDoc(userAchievementRef, docData10);
  addDoc(userAchievementRef, docData11);
  addDoc(userAchievementRef, docData12);
  addDoc(userAchievementRef, docData13);
  addDoc(userAchievementRef, docData14);
  addDoc(userAchievementRef, docData15);
}