var buttonColours=["red","blue","green","yellow"];
var randomChosenColour;
var gamePattern=[];
var userClickedPattern=[];

var started = false;
var level = 0;

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(event){
  userChosenColour= $(".btn").attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence()
{ userClickedPattern=[];
  ++level;
 $("#level-title").text("Level " + level);
    var rand=Math.floor(Math.random()*4);
    randomChosenColour=buttonColours[rand];
    gamePattern.push(randomChosenColour);

      $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


    animatePress(randomChosenColour);
    playSound(randomChosenColour);

  }





function playSound(colour)
{
  var audio=new Audio("sounds/"+colour+".mp3");
  audio.play();
}




function animatePress(currentColour)
{
  $("#"+currentColour).click(function(){ $("#"+currentColour).addClass("pressed");
  setTimeout(function(){$("#"+currentColour).removeClass("pressed");},200);
});
}



function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
