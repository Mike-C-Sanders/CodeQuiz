//TODO: Build View Highscore Function

//Global Variables
var mainHeader = document.querySelector('.main-header');
var timerEl = document.querySelector('.timer-count');
var mainText = document.querySelector('.main-text');
var startButton = document.querySelector('.start-game');
var buttonEl = document.querySelector('.buttons');
var answerBox = document.querySelector('.answer-box');

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
    removeElements(mainText);
    //timer starts
    startTimer();
    //display question and render button
    displayQuestions();
    // endGame();

};


var startTimer = function(){
    //check if the questions have been answered
    timer = setInterval(function(){
        timerCount--;
        timerEl.textContent = timerCount;
        if(timerCount === 0){
            clearInterval(timer);
            endGame();
        }

    }, 1000);

};

//displays questions and answers
var displayQuestions = function(){
    //if the qIndex has exceeded the number of questions leave the function.
    mainText.textContent = "Your Score: " + totalScore + "/5"
    if((qIndex >= questionsLength) || (timerCount === 0)){
        removeElements(buttonEl);
        clearInterval(timer);
        endGame();
        return;
    }
    //Remove all buttons
    removeElements(buttonEl);
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
var removeElements = function(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

//Game comes to an end
var endGame = function(){
    mainHeader.textContent = "Thank You! Quiz Completed!";
    removeElements(buttonEl);
    removeElements(answerBox);
    logScore();
}

//Logging the score for the quiz 
var logScore = function(){
    createForm();
    var submit = document.querySelector('.submit-button');
    
    submit.addEventListener('click', function(event){
        var initials = document.querySelector('#initial-capture').value;
        console.log(initials.value);
        event.preventDefault();
        localStorage.setItem("Initials", initials);
        localStorage.setItem("totalScore", totalScore);

    })

}

//Create Form Submission Box
var createForm = function(){
    answerBox.textContent = "Enter Your Intials:";
    
    var submissionForm = document.createElement('form');
    submissionForm.setAttribute("method", "post");
    submissionForm.setAttribute("action", "submit.php");
    
    var initials = document.createElement("input");
    initials.setAttribute("type", "text");
    initials.setAttribute("name", "initial-capture");
    initials.setAttribute("placeholder", "Your Intials Here");
    initials.setAttribute("id", "initial-capture");
    
    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.classList.add('submit-button');
    
    submissionForm.classList.add('submission-form');
    submissionForm.appendChild(initials);
    submissionForm.appendChild(submitButton);
    answerBox.appendChild(submissionForm);

}
//Function called to start the game. Attached to the start quiz button.
startButton.addEventListener('click', startGame);