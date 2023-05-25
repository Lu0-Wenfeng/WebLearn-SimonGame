var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var started = false;
var level = 0;

$(document).on("keydown", function () {
    if (!started) {
        started = true;
        $("#level-title").text("Level 0");
        nextSequence();
    }
});

$(document).on("click", function () {
    if (!started) {
        started = true;
        $("#level-title").text("Level 0");
        nextSequence();
    }
});

$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnwser(userClickPattern.length - 1);
});


function nextSequence() {
    userClickPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnwser(currentLevel) {
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
        console.log("success");
        if (currentLevel === gamePattern.length-1) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
        
    } else {
        console.log("failure");

        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver () {
    level = 0;
    gamePattern = [];
    started = false;
}
