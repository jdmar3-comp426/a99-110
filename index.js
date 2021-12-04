let points = 0;
let currentQuestion = 0;
let current_user = "";
let workWithThis;
function startQuestions() {
    getQuestion();
    buttonStuff()
};

function increaseScore() {
    points += 1;
    document.getElementById("score").innerHTML = "Score: " + points;
   
}

function submitScore(score) {
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/newHighscore";
    call.open("POST", url, true);
    call.setRequestHeader("Content-Type", "application/json", "Access-Control-Allow-Origin", "*");
    
    score = score.toString();
    let toSend = JSON.stringify({user: localStorage.currentperson, score: score});
    console.log(toSend)
    
    // call.setRequestHeader("Content-type", "application/json", "Access-Control-Allow-Origin", "*" );
    call.send(toSend);
    call.onload = () => {
        //console.log((call.response));
    }
}
function getQuestion() {
    // increaseScore if button selected with correct: 1
    getID();
    currentQuestion += 1;
    if (currentQuestion > 15) {
        document.location = 'leaderboard.html';
        submitScore(points);
        trackUserHistory();
        getID();
        return;
    }
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/questions/" + currentQuestion
    console.log(url)
    call.open("GET", url)
    call.send();
    call.onload = () => {
        document.getElementById("question").innerHTML = call.response
        // console.log(JSON.parse(call.response))
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
        document.getElementById("answer1").innerHTML = workWithThis["answerOne"];
        document.getElementById("answer2").innerHTML = workWithThis["answerTwo"];
        document.getElementById("answer3").innerHTML = workWithThis["answerThree"];
        document.getElementById("answer4").innerHTML = workWithThis["answerFour"];

        // console.log(JSON.parse(call.response))
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

function buttonStuff() { // The necessity of this will probably change when changed to radio buttons 
     document.getElementById("starting_Button").style.display = "none"
     document.getElementById("answer1").style.visibility = "visible"
     document.getElementById("answer2").style.visibility = "visible"
     document.getElementById("answer3").style.visibility = "visible"
     document.getElementById("answer4").style.visibility = "visible"
 }


function postUser() {
    const user = document.getElementById("login_form").user.value;
    const pass = document.getElementById("login_form").pass.value;
    let testing = document.getElementById("login_form").user.value;
    console.log(testing);
    current_user = testing;
    console.log(current_user);
    localStorage.currentperson = testing;
    document.location = 'quiz.html';
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/new/";
    console.log(url);
    call.open("POST", url, true);
    
    // call.setRequestHeader("Access-Control-Allow-Origin", "*");
    call.setRequestHeader("Content-Type", "application/json", "Access-Control-Allow-Origin", "*");
    // call.send("user=test&pass=supersecurepassword");
    let toSend = JSON.stringify({user: user, pass: pass});
    //console.log(toSend)
    
    // call.setRequestHeader("Content-type", "application/json", "Access-Control-Allow-Origin", "*" );
    call.send(toSend);
    call.onload = () => {
        current_user = ((call.response));
        console.log(current_user)
    }
}


function trackUserHistory() {
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/new/lastPlayer/";
    console.log(url);
    call.open("POST", url, true);
    
    // call.setRequestHeader("Access-Control-Allow-Origin", "*");
    call.setRequestHeader("Content-Type", "application/json", "Access-Control-Allow-Origin", "*");
    // call.send("user=test&pass=supersecurepassword");
    let toSend = JSON.stringify({user: localStorage.currentperson});
    
    call.send(toSend);
    call.onload = () => {
        console.log((call.response));
    }
}

function getUserHistory() {
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/lastPlayers/"
    console.log(url)
    call.open("GET", url)
    call.send();
    call.onload = () => {
        document.getElementById("Element to put response into (multiple elements may be necessary)").innerHTML = call.response
        console.log(JSON.parse(call.response))
    }
}

function checkIfRight(buttonNumber) {
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/answer/" + currentQuestion + "/" + buttonNumber;
    console.log(url)
    console.log("URL ^")
    call.open("GET", url)
    call.send();
    call.onload = () => {
        //document.getElementById("Element to put response into (multiple elements may be necessary)").innerHTML = call.response
        console.log(call.response)
        if (call.response != "False") {
            increaseScore();
        }
    }
}

function buttonOneAction() {
    let buttonNumber = 1;
    //console.log("Before Check")
    checkIfRight(buttonNumber);
    //console.log("After Check")
    getQuestion();
}
function buttonTwoAction() {
    let buttonNumber = 2;
    //console.log("Before Check")
    checkIfRight(buttonNumber);
    //console.log("After Check")
    getQuestion();
}
function buttonThreeAction() {
    let buttonNumber = 3;
    //console.log("Before Check")
    checkIfRight(buttonNumber);
    //console.log("After Check")
    getQuestion();
}
function buttonFourAction() {
    let buttonNumber = 4;
    //console.log("Before Check")
    checkIfRight(buttonNumber);
    //console.log("After Check")
    getQuestion();
}

function deleteFunction() {
    let id = localStorage.lastID;
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/delete/user/" + id;
    call.open("GET", url)
    call.send();
    call.onload = () => {
        //document.getElementById("Element to put response into (multiple elements may be necessary)").innerHTML = call.response
    }
}
function getID() {
    let call = new XMLHttpRequest();
    let url = "http://localhost:5000/app/user/last";
    
    call.open("GET", url)
    call.send();
    call.onload = () => {
        //document.getElementById("Element to put response into (multiple elements may be necessary)").innerHTML = call.response
        console.log(call.response)
    }
}

function createLeaders() {
    var my_list = document.getElementById("leaders");
    var call = new XMLHttpRequest();
    var url = "http://localhost:5000/app/highscores/";

    call.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            myFunction(myArr);
        }
    };
    call.open("GET", url, true);
    call.send();

    function myFunction(arr) {
        var i;
        for(i = 0; i < arr.length; i++) {
            my_list.innerHTML += "<li> User: "+ arr[i].user + " --- Score: "+ arr[i].score+ "</li>";
        }
        localStorage.lastID = i;
    }
}