//TODO: Build View Highscore Function

//TODO: Build Win Condition

//TODO: Build Function to walk through array and create the boxes.

//Global Variables
var mainHeader = document.querySelector('.main-header');
var timerEl = document.querySelector('.timer-count');
var mainText = document.querySelector('.main-text');
var startButton = document.querySelector('.start-game');
var buttonEl = document.querySelector('.buttons');
var answerBox = document.querySelector('.answer-box')

var questionsLength = questions.length;
var totalScore = 0;
var timer;
var timerCount;
var qIndex;
var answerButtons = [];

var startGame = function(){
    timerCount = 75;
    qIndex = 0;
    //Hide the start button from the screen
    mainText.style.display = "none";
    //timer starts
    startTimer();
    //display question and render button
    displayQuestions();

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

//displays questions and answers
var displayQuestions = function(){
    //if the qIndex has exceeded the number of questions leave the function.
    if((qIndex >= questionsLength) || (timerCount === 0)){
        removeButtons(buttonEl);
        clearInterval(timer);
        return;
    }
    //Remove all buttons
    removeButtons(buttonEl);
    //display the question
    mainHeader.textContent = questions[qIndex].title;
    //create buttons for possible answers
    createButtons();
    //Add event listener and check answer
    answerEvent();

};

//Create Buttons Function
var createButtons = function(){
    var choicesLen = questions[qIndex].choices.length;

    for(var i = 0; i < choicesLen; i++){
        answerButtons[i] = document.createElement('button');
        answerButtons[i].textContent = questions[qIndex].choices[i];
        answerButtons[i].classList.add('btn');
        buttonEl.appendChild(answerButtons[i]);
    }
}

//Event Listener loop before check answer
var answerEvent = function(){
    var btns = document.querySelectorAll('.btn')
    btns.forEach(function(i){
        i.addEventListener('click', function(){
            checkAnswer(i);
            qIndex++;
            displayQuestions();
        });
    });
    
}

//Function to Check Answers
var checkAnswer = function(index){
    if(index.textContent === questions[qIndex].answer){
        console.log(index.textContent);
        answerBox.textContent = "CORRECT!!";
        totalScore++;
    }
    else{
        console.log(index.textContent);
        answerBox.textContent = "Wrong!";
        timerCount-=5;
    }
}


//Function to remove all buttons
var removeButtons = function(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}
//Function called to start the game. Attached to the start quiz button.
startButton.addEventListener('click', startGame);