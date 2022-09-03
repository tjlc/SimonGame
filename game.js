
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
var started = false;
let level = 0;

$(".btn").click(function(){
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePres(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});
console.log(userClickedPattern)

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text(`Level ${level}`);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

function playSound(name){
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePres(currentColor){
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function(){
        $(`#${currentColor}`).removeClass("pressed");
    },100);
}

$(document).keypress(function(){
    if(!started){
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else {
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text(`Game Over, Press Any Key to Restart`);
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}



