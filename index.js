const express = require("express");
const app = express();

const admin = require("firebase-admin");
const credentials = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const db = admin.firestore();

app.use(express.json());

require("./routes/main")(app);
app.use(express.static(__dirname + "/stylesheet/style.css"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

////// APIs for CRUD Operations ///////////////////////////////////////

// const snapshot = db.collection('Users').get().then(data => {
//     data.forEach(item => console.log(item.get("userName")));
//  });

function addPlant(){
    
    // Add a new user with a generated id.
    const res = await db.collection('Users').collection('Plants').add({
        plantID: document.getElementById('plantID')
    });
    
    console.log('Added User with ID: ', res.id);index.js 
}

 ///// LAST LINE ////////////////////////////////////////////

 const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`);
});
