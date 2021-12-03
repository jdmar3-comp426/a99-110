var express = require("express")
var app = express()
// Require database SCRIPT file
var db = require("./database.js")
// Require md5 MODULE
var md5 = require("md5")
// Make Express use its own built-in body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const questions = [
    {
        id: 1,
        question: "What color is the sky?",
        answers: {
            "answerOne": "Blue",
            "answerTwo": "Black",
            "answerThree": "Sky Blue",
            "answerFour": "The sky is the limit.",
            "correctAnswer": "The sky is the limit."
        }
    },
    {
        id: 2,
        question: "What color is the ground",
        answers: {
            "answerOne": "Red",
            "answerTwo": "Brown",
            "answerThree": "Beef?",
            "answerFour": "Green",
            "correctAnswer": "Beef?"
        }
    }

]

// Set server port
var HTTP_PORT = "5000"
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});
// READ (HTTP method GET) at root endpoint /app/
app.get("/app/", (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ "message": "Your API works! (200)" });
    res.status(200);
});

// Define other CRUD API endpoints using express.js and better-sqlite3
// CREATE a new user (HTTP method POST) at endpoint /app/new/
app.post("/app/new/", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const stmt = db.prepare("INSERT INTO userinfo (user, pass) VALUES (?, ?)")
    const info = stmt.run(req.body.user, md5(req.body.pass));
    res.json({
        "message": info.changes + " record created: " + "ID " + info.lastInsertRowid + " (201)",
    })
});
// READ a list of all users (HTTP method GET) at endpoint /app/users/
app.get("/app/users", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const stmt = db.prepare("SELECT * FROM userinfo").all();
    res.status(200).json(stmt);
});

// READ a single user (HTTP method GET) at endpoint /app/user/:id
app.get("/app/user/:id", (req, res) => {	// This appears to have been succesful. 
    res.setHeader('Access-Control-Allow-Origin', '*');
    const stmt = db.prepare("SELECT * FROM userinfo WHERE id = ?").get(req.params.id);
    res.status(200).json(stmt);

});
// UPDATE a single user (HTTP method PATCH) at endpoint /app/update/user/:id
app.patch("/app/update/user/:id", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const stmt = db.prepare("UPDATE userinfo SET user = COALESCE(?,user), pass = COALESCE(?,pass) WHERE id = ?")
    const info = stmt.run(req.body.user, md5(req.body.pass), req.params.id);
    res.json({
        "message": info.changes + " record updated: " + "ID " + req.params.id + " (200)",
    })
});
// DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:id
app.delete("/app/delete/user/:id", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const stmt = db.prepare("DELETE FROM userinfo WHERE id = ?")
    const info = stmt.run(req.params.id);
    res.json({
        "message": info.changes + " record deleted: " + "ID " + req.params.id + " (200)",
    })
});

app.get('/app/questions', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(questions)
});


app.get('/app/questions/:id', function (req, res) {
    // Lets get the question here. 
    res.setHeader('Access-Control-Allow-Origin', '*');
    let fail = true;
    for (let i = 0; i < questions.length; i++) {
        if (questions[i].id == parseInt(req.params.id)) {
            res.send(questions[i].question)
            fail = false;
            break;
        }
    }
    if (fail) {
        res.status(404).send("The question does not exist.")
    }
});

app.get('/app/questions/:id/answers', function (req, res) {
    // Lets get the answers here. 
    res.setHeader('Access-Control-Allow-Origin', '*');
    let fail = true;
    for (let i = 0; i < questions.length; i++) {
        if (questions[i].id == parseInt(req.params.id)) {
            res.send(questions[i].answers)
            fail = false;
            break;
        }
    }
    if (fail) {
        res.status(404).send("The question does not exist.")
    }
});

app.post('/app', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send("Hello World")
})


// Default response for any other request
app.use(function (req, res) {
    res.json("Your API is working!");
    res.status(404);
});

