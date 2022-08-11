module.exports = function (app) {

    app.get("/", function (req, res) {
        res.render("Login.html")
    });

    /// Log In Page //////////////////////////////////////

    app.post("/", function (req, res) {

        res.render("Login.html")

        // Retrieves Data on a Specific Device
        let sqlquery = "SELECT user_password FROM Users WHERE userID = ?";

        // Executes SQL Query
        let newrecord = [req.body.userID];

        var username = document.getElementById("username").nodeValue;
        var password = document.getElementById("password").nodeValue;

        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                return console.error(err.message);
            } else {
                res.render("login.html", { loginDetails: result })
            }
        });

        var correctPassword = '';

        get_info(parm, function (result) {
            correctPassword = result;
        });

        if (password == correctPassword) {
            // AUTHORISE ACCESS AND GO TO HOME PAGE
        }

    });

    /// Signed Up Page /////////////////////////////////////
    app.post("/signed-up", function (req, res){
        // Inputs Data into the Database
        let sqlquery = "INSERT INTO Users (user_Username, user_Password, user_email) VALUES (?,?,?)";

        let newrecord = [req.body.username, req.body.password, req.body.email];

    })

}