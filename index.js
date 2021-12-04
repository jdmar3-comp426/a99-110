let points = 0;
let currentQuestion = 0;
function startQuestions() {
    getQuestion();
    buttonStuff()
};

function increaseScore() {
    points += 1;
    document.getElementById("score").innerHTML = points;
}

function getQuestion() {
    currentQuestion += 1;
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/questions/" + currentQuestion
    console.log(url)
    call.open("GET", url)
    call.send();
    call.onload = () => {
        document.getElementById("question").innerHTML = call.response
        console.log(JSON.parse(call.response))
    }
    getAnswers();
}

function getAnswers() {
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/questions/" + currentQuestion + "/answers"
    console.log(url)
    call.open("GET", url)
    call.send();
    call.onload = () => {
        let returnedResponse = call.response // will be a dictionary.
        let workWithThis = (JSON.parse(returnedResponse))
        // the last element will have the correct answer.
        document.getElementById("answer1").innerHTML = workWithThis["answerOne"];
        document.getElementById("answer2").innerHTML = workWithThis["answerTwo"];
        document.getElementById("answer3").innerHTML = workWithThis["answerThree"];
        document.getElementById("answer4").innerHTML = workWithThis["answerFour"];
        console.log(JSON.parse(call.response))
    }
}

function buttonStuff() { // The necessity of this will probably change when changed to radio buttons 
    document.getElementById("startingButton").style.display = "none"
    document.getElementById("answer1").style.visibility = "visible"
    document.getElementById("answer2").style.visibility = "visible"
    document.getElementById("answer3").style.visibility = "visible"
    document.getElementById("answer4").style.visibility = "visible"
}


function postUser() {
    document.location = 'quiz.html';
    let password = document.getElementByName('password').value;
    let username = document.getElementByName('username').value;
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/new/" + username+ "/" + password + "/";
    console.log(url);
    call.open("POST", url);
    call.send();
    call.onload = () => {
        console.log(JSON.parse(call.response));
    }
}

// function clicker() {
//     document.location = 'quiz.html';
//     postUser()
// }