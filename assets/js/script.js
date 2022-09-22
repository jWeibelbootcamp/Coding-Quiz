var startButton = document.getElementById("start-button");
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

//Called on 'Start Quiz' button click - hides quiz instructions and calls buildQuestions() to start the question portion: 
function startGame() {
    document.getElementById("instruction-box").setAttribute("class", "hide");
    document.getElementById("question-box").removeAttribute("class");
    buildQuestions();
}

//Populates the #question id with questions array index[i]. Clears any pre-existing answer buttons in #button-box. 
function buildQuestions() {
    document.getElementById("question").textContent = questions[i].text;
    document.getElementById("button-box").innerHTML = "";
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

//checks if the clicked answer button matches the correct answer then increments i.
function checkAnswer() {
    console.log(this.value);
    if (this.value !== questions[i].correct) {
        console.log("wrong");
    } else {
        console.log("correct");
    } 
    i++;
//Checks if the current question [i] was the last and either builds the next question or ends the game.
    if (i === questions.length) {
        console.log("end game");
    } else {
        buildQuestions();
    }
}


startButton.addEventListener("click", startGame);