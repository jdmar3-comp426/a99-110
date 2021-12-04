var express = require("express");
var app = express();
// Require database SCRIPT file
var db = require("./database.js");
// Require md5 MODULE
var md5 = require("md5");
var cors = require("cors")
const { Router } = require("express");
// Make Express use its own built-in body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const questions = [
	{
		id: 1,
		question: "What color is the sky?",
		answers: {
			answerOne: {answer: "Blue", correct: 0},
			answerTwo: {answer: "Black", correct: 0},
			answerThree: {answer: "Sky Blue",correct: 0},
			answerFour: {answer: "The sky is the limit.", correct: 1},
		},
	},
	{
		id: 2,
		question: "What color is the ground",
		answers: {
			answerOne: {answer: "Red", correct: 0},
			answerTwo: {answer: "Brown", correct: 0},
			answerThree: {answer: "Beef?", correct: 1},
			answerFour: {answer: "Green", correct: 0},
		},
	},
	{
		id: 3,
		question: "How fast sonic go?",
		answers: {
			answerOne: {answer: "too fast", correct: 0},
			answerTwo: {answer: "way slow", correct: 0},
			answerThree: {answer: "Slowbro", correct: 1},
			answerFour: {answer: "he no move", correct: 0},
		},
	},
	{
		id: 4,
		question: "Can I use the bathroom?",
		answers: {
			answerOne: {answer: "Can you?", correct: 0},
			answerTwo: {answer: "Yes", correct: 1},
			answerThree: {answer: "No", correct: 0},
			answerFour: {answer: "May I", correct: 0},
		},
	},
	{
		id: 5,
		question: "Ooga Ooga Ooga?",
		answers: {
			answerOne: {answer: "Oog?", correct: 0},
			answerTwo: {answer: "Ooga", correct: 1},
			answerThree: {answer: "Eeg", correct: 0},
			answerFour: {answer: "What are you doing?", correct: 0},
		},
	},
	{
		id: 6,
		question: "Where are we going?",
		answers: {
			answerOne: {answer: "Under water", correct: 0},
			answerTwo: {answer: "To the airport", correct: 0},
			answerThree: {answer: "No where", correct: 1},
			answerFour: {answer: "Home", correct: 0},
		},
	},
	{
		id: 7,
		question: "What did the Cell say to its sister Cell, when it bumped into it?",
		answers: {
			answerOne: {answer: "Hello, my fellow Cell", correct: 0},
			answerTwo: {answer: "Ow, mi-to-sis", correct: 1},
			answerThree: {answer: "Cell’s do not speak", correct: 0},
			answerFour: {answer: "I have no knowledge of cells.", correct: 0},
		},
	},
	{
		id: 8,
		question: "Who is calling?",
		answers: {
			answerOne: {answer: "Your mom, pick up!", correct: 0},
			answerTwo: {answer: "Ghosts!", correct: 0},
			answerThree: {answer: "The Hash-Slinging Slasher", correct: 1},
			answerFour: {answer: "Your delivery driver", correct: 0},
		},
	},
	{
		id: 9,
		question: "What smells like blue paint, tastes like blue paint, and is red?",
		answers: {
			answerOne: {answer: "Red Paint", correct: 0},
			answerTwo: {answer: "Paint?", correct: 0},
			answerThree: {answer: "Paint is not for consumption. Why did you taste it?", correct: 0},
			answerFour: {answer: "I can’t come up with another answer to this question.", correct: 1},
		},
	},
	{
		id: 10,
		question: "Why am I crying?",
		answers: {
			answerOne: {answer: "My roommate is cutting onions.", correct: 0},
			answerTwo: {answer: "I broke my great-aunt’s favorite vase.", correct: 0},
			answerThree: {answer: "I got this question wrong", correct: 1},
			answerFour: {answer: "the world is dark and sad", correct: 0},
		},
	},
	{
		id: 11,
		question: "What’s that smell?",
		answers: {
			answerOne: {answer: "Despair", correct: 0},
			answerTwo: {answer: "Double chocolate chip cookies!", correct: 0},
			answerThree: {answer: "My gym teacher’s socks", correct: 0},
			answerFour: {answer: "A completed Lego set.", correct: 1},
		},
	},
	{
		id: 12,
		question: "Who is the best Avenger?",
		answers: {
			answerOne: {answer: "Thor", correct: 0},
			answerTwo: {answer: "Anyone, literally anyone", correct: 1},
			answerThree: {answer: "Aunt May", correct: 0},
			answerFour: {answer: "The Infinity Stones.", correct: 0},
		},
	},
	{
		id: 13,
		question: "What is the best class?",
		answers: {
			answerOne: {answer: "COMP 426", correct: 1},
			answerTwo: {answer: "BIOL 101", correct: 0},
			answerThree: {answer: "CHEM 101", correct: 0},
			answerFour: {answer: "ENGL 105", correct: 0},
		},
	},
	{
		id: 14,
		question: "What is thy fav'rite food?",
		answers: {
			answerOne: {answer: "Zza", correct: 1},
			answerTwo: {answer: "Hamburg'r", correct: 1},
			answerThree: {answer: "Pasta", correct: 1},
			answerFour: {answer: "gudgeon", correct: 1},
		},
	},
	{
		id: 15,
		question: "How did I get here?",
		answers: {
			answerOne: {answer: "The bus.", correct:0},
			answerTwo: {answer: "Planes, trains, and automobiles.", correct: 0},
			answerThree: {answer: "BIRTH", correct: 1},
			answerFour: {answer: "I fell out of the sky", correct: 0},
		},
	},
];

// Set server port
var HTTP_PORT = "5000";
app.options('*', cors())
// Start server
app.listen(HTTP_PORT, () => {
	console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});
// READ (HTTP method GET) at root endpoint /app/
app.get("/app/", (req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json({ message: "Your API works! (200)" });
	res.status(200);
});

// Define other CRUD API endpoints using express.js and better-sqlite3
// CREATE a new user (HTTP method POST) at endpoint /app/new/
app.post("/app/new/", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*")//, "Content-Type", "application/json");
	const stmt = db.prepare("INSERT INTO userinfo (user, pass) VALUES (?, ?)");
	const info = stmt.run(req.body.user, req.body.pass);
	res.json(req)
});
// READ a list of all users (HTTP method GET) at endpoint /app/users/
app.get("/app/users", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	const stmt = db.prepare("SELECT * FROM userinfo").all();
	res.status(200).json(stmt);
});

// READ a single user (HTTP method GET) at endpoint /app/user/:id
app.get("/app/user/:id", (req, res) => {
	// This appears to have been succesful.
	res.setHeader("Access-Control-Allow-Origin", "*");
	const stmt = db
		.prepare("SELECT * FROM userinfo WHERE id = ?")
		.get(req.params.id);
	res.status(200).json(stmt);
});

// UPDATE a single user (HTTP method PATCH) at endpoint /app/update/user/:id
app.patch("/app/update/user/:id", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*", "Content-type", "application/json");
	const stmt = db.prepare(
		"UPDATE userinfo SET user = COALESCE(?,user), pass = COALESCE(?,pass) WHERE id = ?"
	);
	const info = stmt.run(req.body.user, md5(req.body.pass), req.params.id);
	res.json({
		message:
			info.changes +
			" record updated: " +
			"ID " +
			req.params.id +
			" (200)",
	});
});

// DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:id
app.delete("/app/delete/user/:id", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	const stmt = db.prepare("DELETE FROM userinfo WHERE id = ?");
	const info = stmt.run(req.params.id);
	res.json({
		message:
			info.changes +
			" record deleted: " +
			"ID " +
			req.params.id +
			" (200)",
	});
});

// GET ALL QUESTIONS
app.get("/app/questions", function (req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.send(questions);
});

// GET A QUESTION USING ID
app.get("/app/questions/:id", function (req, res) {
	// Lets get the question here.
	res.setHeader("Access-Control-Allow-Origin", "*");
	let fail = true;
	for (let i = 0; i < questions.length; i++) {
		if (questions[i].id == parseInt(req.params.id)) {
			res.send(questions[i].question);
			fail = false;
			break;
		}
	}
	if (fail) {
		res.status(404).send("The question does not exist.");
	}
});

// GET ANSWER LIST
app.get("/app/questions/:id/answers", function (req, res) {
	// Lets get the answers here.
	res.setHeader("Access-Control-Allow-Origin", "*");
	let fail = true;
	for (let i = 0; i < questions.length; i++) {
		if (questions[i].id == parseInt(req.params.id)) {
			res.send(questions[i].answers);
			fail = false;
			break;
		}
	}
	if (fail) {
		res.status(404).send("The question does not exist.");
	}
});

// CHECK CORRECT ANSWER
app.get("/app/answer/:id", function (req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	console.log(req);
	if (
		questions[parseInt(req.params.id) - 1].answers.correctAnswer ==
		req.body.answer
	) {
		res.send("True");
	} else {
		res.send("False");
	}
	res.status(200);
});

app.post("/app", function (req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.send("Hello World");
});


/////////////////////////////////////////////////////////////////////////////////////////////////////
// We are ultimately only going to post and get from the table. 
// CREATE a new user (HTTP method POST) at endpoint /app/new/lastPlayer
app.post("/app/new/lastPlayer/", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*")//, "Content-Type", "application/json");
	const stmt = db.prepare("INSERT INTO lastplayers (user) VALUES (?)");
	const info = stmt.run(req.body.user);
	res.json(req)
});
// READ a list of all users (HTTP method GET) at endpoint /app/lastPlayers/
app.get("/app/lastPlayers/", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	const stmt = db.prepare("SELECT * FROM lastplayers").all();
	res.status(200).json(stmt);
});
///////////////////////////////////////////////////////////////////////////////////////////////////////

// Default response for any other request
app.use(function (req, res) {
	res.json("Your API is working!");
	res.status(404);
});
