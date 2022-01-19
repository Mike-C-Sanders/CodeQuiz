//Global Variables
var mainHeader = document.querySelector('.main-header');
var timerEl = document.querySelector('.timer-count');
var mainText = document.querySelector('.main-text');
var startButton = document.querySelector('.start-game');
var buttonEl = document.querySelector('.buttons');
var answerBox = document.querySelector('.answer-box');
var highScoreEl = document.querySelector('.view-high-scores')

//getting the high scores
var highScores = localStorage.getItem('highScores');

var questionsLength = questions.length;
var totalScore;
var timer;
var timerCount;
var qIndex;
var answerButtons = [];
var storedObj = [];

var startGame = function(){
    timerCount = 75;
    qIndex = 0;
    totalScore = 0;
    //Hide the start button from the screen
    removeElements(mainText);
    //timer starts
    startTimer();
    //display question and render button
    displayQuestions();
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
    createChoiceButtons();
    //Add event listener and check answer
    answerEvent();
};

//Create Choice Buttons Function
var createChoiceButtons = function(){
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
            //Check if the answer is correct
            checkAnswer(i);
            //increment the qIndex and display questions
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

//Logging the score for the quiz to local storage when button is clicked
var logScore = function(){
    createForm();
    var submit = document.querySelector('.submit-button');
    
    //event listener for when the user to submit initials and score
    submit.addEventListener('click', function(event){
        //capture text field from form
        var initials = document.querySelector('#initial-capture').value;
        //prevent the page from being reset when submitted
        event.preventDefault();

        //store initials and total score in local variable before adding to local storage
        var obj = initials + " - "+ totalScore;
        
        //if the highscores get returns null we don't need to parse the string
        if(highScores === null){
            storedObj.push(obj);
            //push the new scores into stored array and save in local storage over writing highscores
            localStorage.setItem('highScores', JSON.stringify(storedObj));
            
        }
        //if the highscores variable returns something other than null we need to parse the string because there's local scores already stored
        else{
            //return highscores variable to an object with parse method
            storedObj = JSON.parse(highScores);
            //add new high score to the array
            storedObj.push(obj);
            //put the array into local storage
            localStorage.setItem('highScores', JSON.stringify(storedObj));
        }

        //After posting the info to local storage we want to view the scores
        viewHighScores();
    });

}

//Create Form Submission Box
var createForm = function(){
    answerBox.textContent = "Enter Your Intials:";
    
    //Create the form element
    var submissionForm = document.createElement('form');
    submissionForm.setAttribute("method", "post");
    submissionForm.setAttribute("action", "submit.php");

    //Create the input element for the form
    var initials = document.createElement("input");
    initials.setAttribute("type", "text");
    initials.setAttribute("name", "initial-capture");
    initials.setAttribute("placeholder", "Your Intials Here");
    initials.setAttribute("id", "initial-capture");
    
    //Create the submission button
    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.classList.add('submit-button');
    
    //append the newly created nodes to the existing answer box div
    submissionForm.classList.add('submission-form');
    submissionForm.appendChild(initials);
    submissionForm.appendChild(submitButton);
    answerBox.appendChild(submissionForm);

}

//Function used to view the highscore as well as display at the end of the game
var viewHighScores = function(){
    mainHeader.textContent = "High Scores";

    //Clear out the screen by removing children nodes
    removeElements(answerBox);
    removeElements(buttonEl);
    removeElements(mainText);

    highScores = localStorage.getItem('highScores');

    //Ensure we don't run into other errors because of null
    if(highScores !== null){
        storedObj = JSON.parse(highScores);
        //Add in new page elements
        for(var i = 0; i < storedObj.length; i++){
            displayScores(i, storedObj);
        }
    }
    else{
        mainText.textContent = "No Scores!";
    }

    viewHighScoresButtons();

}
//Create Initials and Score fields
var displayScores = function(index, storedArray){
    var newEntry = document.createElement('p');
    var num = index + 1; 

    newEntry.textContent = num + ". " + storedArray[index];
    newEntry.classList.add("display-scores");
    mainText.appendChild(newEntry);

}

//Creat Go Back Button & clear Scores Button
var viewHighScoresButtons = function(){
    var goBackButton = document.createElement('button');
    var clearScoresButton = document.createElement('button');

    goBackButton.textContent = "Go Back";
    clearScoresButton.textContent = "Clear Scores";

    goBackButton.classList.add('btn');
    clearScoresButton.classList.add('btn');

    buttonEl.appendChild(goBackButton);
    buttonEl.appendChild(clearScoresButton);

    goBackButton.addEventListener('click', function(){
        //Go Back Function (also play again)
        goBack();
    });

    clearScoresButton.addEventListener('click', function(){
        localStorage.clear();
        removeElements(mainText);
        mainText.textContent = "No Scores!"
    });

}

//Go back and play again or return to the main screen
var goBack = function(){
    mainHeader.textContent = "Javascript Quiz";

    //Remove elements from a previous screen
    removeElements(mainText);
    removeElements(buttonEl);

    //create starting text from questions.js file
    var createStartingText = document.createElement('p');
    createStartingText.textContent = startingText;
    createStartingText.classList.add('starting-text');

    mainText.appendChild(createStartingText);

    var newStartButton = document.createElement('button');
    newStartButton.textContent = 'Start Quiz';
    newStartButton.classList.add('start-game');

    buttonEl.appendChild(newStartButton);

    timerCount = 75;
    timerEl.textContent = 75;

    newStartButton.addEventListener('click', startGame);

    
}

//Function called to start the game. Attached to the start quiz button.
startButton.addEventListener('click', startGame);

highScoreEl.addEventListener('click', viewHighScores);