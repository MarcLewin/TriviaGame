var questions = [{
    question: "What is Peter Pan's Motto?",
    answers: ["I love pirates", "All children but one grow up", "Please feed me to a crocodile", "I love Captain Hook"],
    answer: 1
},
{
    question: "Who plays Peter Pan in the movie Hook?",
    answers: ["Robin Williams", "Dustin Hoffman", "Chrstian Bale", "Christopher Walken"],
    answer: 0
},
{
    question: "Where does Peter Pan live?",
    answers: ["Chicago", "The Bronx", "Neverland", "The Lost world"],
    answer: 2
},

{
    question: "Who are Peter Pan's friends?",
    answers: ["The Wanderers", "The Lost boys", "The Dangerous Seven", "The Found Boys"],
    answer: 1
},

];

var questionNumber;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;

$('#playBtn').on('click', function () {
    $(this).hide();
    startGame();
});

$('#restartBtn').on('click', function () {
    $(this).hide();
    startGame();
});

function startGame() {
    $('#finishedMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    questionNumber = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

function newQuestion() {
    $('#message').empty();
    $('#rightAnswer').empty();
    answered = true;


    $('#questionNumber').html('Question #' + (questionNumber + 1) + ' of ' + questions.length);
    $('.question').html('<h2>' + questions[questionNumber].question + '</h2>');
    for (var i = 0; i < 4; i++) {
        var userChoices = $('<div>');
        userChoices.text(questions[questionNumber].answers[i]);
        userChoices.attr({ 'data-index': i });
        userChoices.addClass('thisChoice');
        $('.answers').append(userChoices);
    }
    countdown();

    $('.thisChoice').on('click', function () {
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
        $('#time').hide();
        
    });
}

function countdown() {
    $('#time').show();
    seconds = 10;
    $('#time').html('<h3>You have ' + seconds + ' seconds to answer </h3>');
    answered = true;

    time = setInterval(showCountdown, 1000);
}

function showCountdown() {
    $('#time').show();
    seconds--;
    $('#time').html('<h3>You have ' + seconds + ' seconds to answer </h3>');
    if (seconds < 2) {
    $('#time').html('<h3>You have ' + seconds + ' second to answer </h3>');
    }
    if (seconds < 1) {
        $('#time').html('<h3> Time Ran out, next time choose faster! </h3>');
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function answerPage() {
    $('#questionNumber').empty();
    $('.thisChoice').empty();
    $('.question').empty();
  

    var rightAnswerText = questions[questionNumber].answers[questions[questionNumber].answer];
    var rightAnswerIndex = questions[questionNumber].answer;

    

    if ((userSelect == rightAnswerIndex) && (answered == true)) {
        correctAnswer++;
        $('#message').text("You chose Correct!");
    } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
        incorrectAnswer++;
        $('#message').text("Wrong answer!");
        $('#rightAnswer').html('Correct answer was: ' + rightAnswerText);
    } else {
        unanswered++;
        
        $('#rightAnswer').html('Correct answer was: ' + rightAnswerText);
        answered = true;
    }

    if (questionNumber == (questions.length - 1)) {
        setTimeout(scoreboard, 3000)
    } else {
        questionNumber++;
        setTimeout(newQuestion, 3000);
    }
}

function scoreboard() {
    $('#timeLeft').empty();
    $('#message').empty();
    $('#rightAnswer').empty();
    

    $('#finishedMessage').text("Let's see how well you know Pan:");
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#restartBtn').addClass('reset');
    $('#restartBtn').show();
    $('#restartBtn').html('Click me to Play again');

}