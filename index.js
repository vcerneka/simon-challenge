// Initialisation
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

// Detecting keyboard press, only for game start
$(document).on("keypress", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Generating random game pattern
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Adding flash animation to the button
  $("#" + randomChosenColor)
    .fadeOut(200)
    .fadeIn(200);

  // Adding sound to the button
  playSound(randomChosenColor);

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
}

// Handling user button clicks
$(".btn").on("click", function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length);
});

// Comparing game pattern and user clicks
function checkAnswer(currentLevel) {
  // Success
  if (gamePattern[currentLevel - 1] === userClickedPattern[currentLevel - 1]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  // Wrong
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// Playing sound corresponding to the button color
function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

// Adding animation to user clicks
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Restarting the game, on wrong user click
function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}
