//Button variables from HTML
var startButton = document.getElementById("start-button");
var viewScoresButton = document.getElementById("view-high-scores");
var submitButton = document.getElementById("score-submit");
var goBackButton = document.getElementById("go-back");
var clearScoresButton = document.getElementById("clear-high-scores");

//Other global variables
var timer = document.getElementById("timer");
var finalScore = document.getElementById("final-score");
var i = 0;

//Array to hold objects for each question and answer choices w/ correct answer identified:
var questions = [
    {
        text: "How do you create a function in JavaScript?",
        answers: ["1) function myFunction()", "2) function = myFunction()", "3) function:myFunction()", "4) myFunction()"],
        correct: "1) function myFunction()"
    },
    {
        text: "How do you write an IF statement in JavaScript?",
        answers: ["1) if i == 5 then", "2) if i = 5", "3) if i = 5 then", "4) if (i == 5)"],
        correct: "4) if (i == 5)"
    },
    {
        text: "How does a FOR loop start?",
        answers: ["1) for (i = 0; i <= 5; i++)", "2) for i = 1 to 5", "3) for (i = 0; i <= 5)", "4) for (i <= 5; i++)"],
        correct: "1) for (i = 0; i <= 5; i++)"
    },
    {
        text: "How can you add a comment in JavaScript?",
        answers: ["1) /*This is a comment.*/", "2) <!--This is a comment.-->", "3) $This is a comment.", "4) //This is a comment."],
        correct: "4) //This is a comment."
    },
    {
        text: "How do you declare a JavaScript variable?",
        answers: ["1) v catName;", "2) variable catName;", "3) var catName;", "4) var = catName;"],
        correct: "3) var catName;"
    },
]

//Creating timer. Timer stops if secondsLeft <= 0 or final question answered.
var secondsLeft = 50;

function setTime() {
    var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "Time: " + secondsLeft;

    if (secondsLeft <= 0 || i === questions.length) {
        clearInterval(timerInterval);
    }}, 1000);
}

//Called on 'Start Quiz' button click - hides quiz instructions and calls buildQuestions() and setTime() to start the question portion: 
function startGame() {
    document.getElementById("instruction-box").setAttribute("class", "hide");
    document.getElementById("question-box").removeAttribute("class");
    buildQuestions();
    setTime();
}

//Populates the #question id with questions array index[i]. Clears any pre-existing answer buttons in #button-box. Checks for previous correct or wrong answer to display #correct-or-wrong.
function buildQuestions() {
    document.getElementById("question").textContent = questions[i].text;
    document.getElementById("button-box").innerHTML = "";
    var correctOrWrong = document.getElementById("correct-or-wrong");
    if (correctOrWrong.textContent === "Correct!" || correctOrWrong.textContent === "Wrong!") {
    correctOrWrong.removeAttribute("class");
    }

    //Creates buttons with text of answerChoice and class .answer for each 'answers' element within index[i]. Adds the buttons to #button-box. Calls checkAnswer() on button click.
    questions[i].answers.forEach(function (answerChoice) {
        var button = document.createElement("button");
        button.setAttribute("class", "answer");
        button.textContent = answerChoice;
        button.setAttribute("value", answerChoice);
        document.getElementById("button-box").append(button);
        button.onclick = checkAnswer;
    })
}

//checks if the clicked answer button matches the correct answer then increments i. Changes the text of #correct-or-wrong to "Correct!" or "Wrong!" Subtracts 10 seconds for wrong answers.
function checkAnswer() {
    if (this.value !== questions[i].correct) {
        document.getElementById("correct-or-wrong").textContent = "Wrong!";
        secondsLeft = secondsLeft-10;
    } else {
        document.getElementById("correct-or-wrong").textContent = "Correct!";
    }
    i++;
    //Checks if the current question [i] was the last and either builds the next question or ends the game. If game ends, hides #question-box, hides #timer, unhides #final-score-box, and calls finalScore().
    if (i === questions.length || secondsLeft <= 0) {
        document.getElementById("question-box").setAttribute("class", "hide");
        document.getElementById("final-score-box").removeAttribute("class");
        timer.setAttribute("class", "hide");
        finalScore.textContent = "Your final score is " + secondsLeft;
    } else {
        buildQuestions();
    }
}

//working on local storage section here
function renderHighScore() {
    var highScores = JSON.parse(localStorage.getItem(highScores)) || [];
    var scoreListEl = document.getElementById("highScores");
    
    for (var i = 0; i < highScores.length; i++) {
        var scoreItem = document.createElement("li");
        scoreItem.textContent = highScores[i].score;
        
        scoreListEl.appendChild(scoreItem);
    }
}

function saveHighScore () {
    var initials = document.getElementById("initials");
    var highScoreList = document.getElementById("highScores");
    var newScoreToAdd = '';
    
    var newScore = {
        score: secondsLeft, 
        initials: initials.value
    }

    newScoreToAdd += '<li>' + newScore + '</li>';
    highScoreList.innerHTML = newScoreToAdd;
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // var highScores = JSON.parse(localStorage.getItem(highScores)) || [];
    // highScores.push(newScore);
    // highScores.sort((a, b) => b.score - a.score);
}

//Submit Button calls saveHighScore(), hides the final score screen and unhides the high scores screen.    
submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("final-score-box").setAttribute("class", "hide");
    document.getElementById("high-score-page").removeAttribute("class");
    
    saveHighScore();
})

//Allows View High Scores Button to display High Score Page at any point.
viewScoresButton.addEventListener("click", function () {
    document.getElementById("instruction-box").setAttribute("class", "hide");
    document.getElementById("question-box").setAttribute("class", "hide");
    document.getElementById("final-score-box").setAttribute("class", "hide");
    document.getElementById("high-score-page").removeAttribute("class");
})

//Resets the game upon Go Back button click.
function restartGame() {
    document.getElementById("instruction-box").removeAttribute("class");
    document.getElementById("high-score-page").setAttribute("class", "hide");
    timer.setAttribute("class", "hide");
    secondsLeft = 50;
    i = 0;
}

startButton.addEventListener("click", startGame);
goBackButton.addEventListener("click", restartGame);



//bugs: 

//timer not hiding on final score page.
//timer not hiding and resetting on Go Back button.
//timer doesn't end game when reaching 0.

//local storage component not finished.
//clear high scores button not finished