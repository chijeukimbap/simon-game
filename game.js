var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var mouseClicks = 0;
var started = false;
var correct = true;

$(".btn").click(function(event) {

  var userChosenColour = event.target.id;

  playSound(userChosenColour);
  animatePress(userChosenColour);

  userClickedPattern.push(userChosenColour);
  mouseClicks++;
  checkAnswer((userClickedPattern.length));
  if (mouseClicks === level) {
    if (correct) {
      setTimeout(function() {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
      level++;
      mouseClicks = 0;
    }
  }
});

$(document).keypress(function(event) {
  if (!started) {
    started = true;
    level++;
    nextSequence();
  }

})


function nextSequence() {

  $("h1").text("Level " + level);
  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name) {

  switch (name) {
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;

    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;

    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;

    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;

    default:

  }
}

function animatePress(currentColor) {

  $('#' + currentColor).addClass("pressed");
  setTimeout(function() {
    $('#' + currentColor).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel) {


  var i = currentLevel - 1;
  correct = true;

  while (i >= 0 && correct == true) {

    if (userClickedPattern[i] == gamePattern[i]) {

      console.log("success");
      correct = true;
      i--;
    } else {
      console.log("wrong");
      correct = false;
      var wrong = new Audio("sounds/wrong.mp3");

      wrong.play();

      $("body").addClass("game-over");

      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);

      $("h1").text("Game Over, Press Any Key to Restart");

      startOver();

    }
  }

}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  mouseClicks = 0;
  started = false;
}


//June 30,2022
