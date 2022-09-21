// toggle between hiding and showing element

var startButton = document.getElementById("start-button");
var i = 0;
var questions = [
    {
        text: "question 1",
        choices: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correct: "answer 1"
    },
    {
        text: "question 2",
        choices: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correct: "answer 1"
    },
    {
        text: "question 3",
        choices: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correct: "answer 1"
    },
    {
        text: "question 4",
        choices: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correct: "answer 1"
    },
    {
        text: "question 5",
        choices: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correct: "answer 1"
    },
]

function startGame() {
    document.getElementById("instruction-box").setAttribute("class", "hide");

    document.getElementById("question-box").removeAttribute("class");

    buildQuestionContainer();
}

function buildQuestionContainer() {
    // ask 1 question. loop over choices and set values on buttons. append buttons to page. check answer correct or wrong. ask next question. 
    document.getElementById("question").textContent = questions[i].text

    document.getElementById("button-box").innerHTML = "";

    questions[i].choices.forEach(function (choice) {
        var button = document.createElement("button");
        button.setAttribute("class", "answer");
        button.textContent = choice;
        button.setAttribute("value", choice);
        button.onclick = checkAnswer;
        document.getElementById("button-box").append(button);
    })
}

function checkAnswer() {
    console.log(this.value);
    if (this.value !== questions[i].correct) {
        console.log("wrong");
    } else {
        console.log("correct");
    } 
    i++;

    if (i === questions.length) {
        console.log("end game");
    } else {
        buildQuestionContainer();
    }
}







startButton.addEventListener("click", startGame);


// function myFunction() {
//     var x = document.getElementById('myDiv');
//     if (x.style.display === 'none') {
//         x.style.display = 'block';
//     } else {
//         x.style.display = 'none';
//     }
// }



