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
app.use(express.static(__dirname + "/stylesheet"));
app.use(express.static(__dirname + "/images"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

////// APIs for CRUD Operations ///////////////////////////////////////

// const snapshot = db.collection('Users').get().then(data => {
//     data.forEach(item => console.log(item.get("userName")));
//  });

 // Example API/function //////////////////////////////////////////////////////////

 function addPlant() {
    const snapshot = db.collection('Users').get().then(data => {
        data.forEach(item => console.log(item.get("userName")));
     });
 }

////////////////////////////////////////////////////////////

 ///// LAST LINE ////////////////////////////////////////////

 const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`);
});
