let points = 0;
let currentQuestion = 0;
let current_user;
let workWithThis;
function startQuestions() {
    getQuestion();
    buttonStuff()
};

function increaseScore() {
    points += 1;
    document.getElementById("score").innerHTML = points;
}

function getQuestion() {
    // increaseScore if button selected with correct: 1
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
        console.log('returned response', returnedResponse);
        workWithThis = (JSON.parse(returnedResponse))
        // the last element will have the correct answer.
        // document.getElementById("answer1").innerHTML = workWithThis["answerOne"]["answer"];
        // document.getElementById("answer2").innerHTML = workWithThis["answerTwo"];
        // document.getElementById("answer3").innerHTML = workWithThis["answerThree"];
        // document.getElementById("answer4").innerHTML = workWithThis["answerFour"];

        console.log(JSON.parse(call.response))
    }
}

function populateButtons() {
    document.getElementById("answer1").innerHTML = workWithThis["answerOne"]["answer"];
    document.getElementById("answer2").innerHTML = workWithThis["answerTwo"];
    document.getElementById("answer3").innerHTML = workWithThis["answerThree"];
    document.getElementById("answer4").innerHTML = workWithThis["answerFour"];
}

function checkButton(number) {
    let res;
    if (number == 0) {
        res = workWithThis[0]["correct"];

    } else {
        if (number = 1) {
            res = workWithThis[1]["correct"];
        }
    }

}

// function buttonStuff() { // The necessity of this will probably change when changed to radio buttons 
//     document.getElementById("startingButton").style.display = "none"
//     document.getElementById("answer1").style.visibility = "visible"
//     document.getElementById("answer2").style.visibility = "visible"
//     document.getElementById("answer3").style.visibility = "visible"
//     document.getElementById("answer4").style.visibility = "visible"
// }


function postUser() {
    document.location = 'quiz.html';
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/new/";
    console.log(url);
    call.open("POST", url, true);
    
    // call.setRequestHeader("Access-Control-Allow-Origin", "*");
    call.setRequestHeader("Content-Type", "application/json", "Access-Control-Allow-Origin", "*");
    // call.send("user=test&pass=supersecurepassword");
    let toSend = JSON.stringify({user: "help", pass: "what"});
    //console.log(toSend)
    
    // call.setRequestHeader("Content-type", "application/json", "Access-Control-Allow-Origin", "*" );
    call.send(toSend);
    call.onload = () => {
        console.log((call.response));
    }
}