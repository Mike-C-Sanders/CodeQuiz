//TODO: Build View Highscore Function

//TODO: Build Time Function

//TODO: Build Win Condition

//TODO: Build Function to walk through array and create the boxes.

//Global Variables
var mainHeader = document.querySelector('.main-header');
var timerEl = document.querySelector('.timer-count');
var startButton = document.querySelector('.start-game');

var questionsLength = questions.length;
var totalScore = 0;
var timer;
var timerCount;
var questionIndex;

var startGame = function(){
    timerCount = 75;
    //timer starts
    startTimer();
    //display question and render button

};

//TODO: Needs win condition & end of quiz conditions added
var startTimer = function(){
    //check if the questions have been answered
    timer = setInterval(function(){
        timerCount--;
        timerEl.textContent = timerCount;
        if(timerCount === 0){
            clearInterval(timer);
        }

    }, 1000);

};

//Function called to start the game. Attached to the start quiz button.
startButton.addEventListener('click', startGame);