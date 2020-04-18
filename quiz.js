//--  WHEN I click the start button
//-- THEN a timer starts
// I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score

var startButton = document.getElementById('startButton');
var time = document.getElementById('time');
var questionNum = 0;
var quizDiv = document.getElementById('quiz');
var correct = 0;
var incorrect = 0;


var secondsLeft = 60;


var questions = [{
    question: 'Where did nachos originate?',
    options: ['Mexico', 'Texas', 'Russia', 'California'],
    answer: 'Mexico'
}, {
    question: 'Which country consumes the most Pizza per year?',
    options: ['United States', 'Norway', 'Italy', 'France'],
    answer: 'Norway'

}, {
    question: 'What country consumes the most beer per capita?',
    options: ['Finland', 'China', 'Russia', 'Czech Republic'],
    answer: 'Czech Republic'

}, {
    question: 'What is South Korea\'s national dish',
    options: ['bulgogi', 'kimchi', 'fried chicken', 'boiled corn'],
    answer: 'kimchi'

}];


function setQuestion() {
    var questionH3 = document.getElementById('questions');
    questionH3.textContent = questions[questionNum].question;
    var optionButtons = document.querySelectorAll('.option');
    for (var i = 0; i < optionButtons.length; i++) {
        optionButtons[i].textContent = questions[questionNum].options[i];
    };
};

function quizTimer() {

    var timerInterval = setInterval(function () {
        secondsLeft--;
        time.textContent = secondsLeft + " seconds";

        if (secondsLeft === 0 || questionNum === questions.length) {
            clearInterval(timerInterval);
            time.textContent = "Game OVER";
        }

    }, 1000);


}




function checkAnswer(event) {
    if (event.target.tagName.toLowerCase() === 'button') {
        if (event.target.textContent === questions[questionNum].answer) {
            //this goes off if it is the correct answer
            correct++
        } else {
            //this goes off if it is the wrong answer
            incorrect++
            secondsLeft = secondsLeft - 5
        }
        questionNum++
        if (questionNum < questions.length) {
            setQuestion();
        } else {
            showResults();
        }
        // call a function to show results and allows user to enter initials and save score...
        // navigate to your high score html page which will show all of the high scores you have saved to your local storage...
    }
}

function showResults() {
    quizDiv.style.display = "none";
    var submit = document.getElementById('submit');
    submit.textContent = correct + " right and " + incorrect + " wrong";

    var userInfo = document.getElementById('userInfo');
    var initialsBox = document.createElement('input');
    initialsBox.setAttribute('type', 'text');
    initialsBox.setAttribute('placeholder', 'user initials')
    userInfo.appendChild(initialsBox);

    var submitBox = document.getElementById('submitBox');
    var submitBoxEl = document.createElement('BUTTON');
    submitBoxEl.textContent = "Save Score!";
    submitBoxEl.addEventListener('click', function () {
        saveResults({ correct, incorrect, initials: initialsBox.value })

    })
    submitBox.appendChild(submitBoxEl);
}


function saveResults(obj) {

    var highScores = localStorage.getItem('highScores');
    if (highScores) {
        highScores = JSON.parse(highScores)
        highScores.push(obj)
    } else {
        highScores = [obj]
    }

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location = '/highscores.html';
}



startButton.addEventListener('click', function () {
    var instructions = document.getElementById('instructions');
    instructions.style.display = 'none';
    document.getElementById('quiz').style.display = 'inherit';
    quizTimer();
    setQuestion();
})

quizDiv.addEventListener('click', checkAnswer);







