var pipes = [];
var bird;
var myBird;
var endStatus;
var totalScore;
var prevScores;
var button;

function setup ()
{
  createCanvas(800,500);
  pipes.push(new Pipe);
  myBird = new Bird;
  endStatus = false;
  totalScore = 0;
  prevScores = JSON.parse(sessionStorage.getItem("prevScores"));
  button = new restartButton;
}

function draw()
{
  background(50);
  if (!prevScores){
    prevScores = [0,0];
  }
  if (!endStatus) {
    myBird.update();
    for (var i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
    }    

    printScore(totalScore);

    if ((frameCount % 100) == 0) {
      pipes.push(new Pipe); 
    }  
    
    for (var i = pipes.length - 1; i >= 0; i--) {
      if (pipes[i].checkBang(myBird)) {
        pipes[i].col = [255,0,0];

        prevScores.push(totalScore);
     
        endStatus = true;   
      }

      if (pipes[i].offScreen()) {
        pipes.splice(i, 1);
      }

      totalScore += pipes[i].updateScore(myBird);
    }
  }
  else {
    myBird.show();
    for (var i = pipes.length - 1; i >= 0; i--) {
      pipes[i].show();
    
      if (pipes[i].offScreen())
      {
        pipes.splice(i, 1);
      }
    }
    button.show();
    printEndMessage(totalScore, prevScores);
  }
  //console.log(prevScores);

  //Send prev score array to storage
  sessionStorage.setItem("prevScores", JSON.stringify(prevScores));
}

keyPressed = function() {
  if (key == ' ') {
    myBird.smack();
  }
}

mousePressed = function() {
  if (endStatus){
    if (button.checkClick()){
      resetGame(myBird);
    }
  }
  else if (!endStatus){
    myBird.smack();
  }
}

resetGame = function(bird){
  endStatus = false;
  pipes = [];
  totalScore = 0;
  bird.y = height/2;
}

printEndMessage = function(score, scores) {
  var textColour = 'white';
  var trans = 200;
  var bgRectCol = 10;
  var txtSize = 100;
  var txtSizeScore = 40;
  var rectWidth = 800;
  var rectHeight = 300;
  var sep = 8;

  push();
  fill(bgRectCol, trans);
  stroke(bgRectCol, trans);
  rectMode(CENTER);
  rect(width/2,height/2, rectWidth, rectHeight);
  pop();

  push();
  fill(textColour);
  textAlign(CENTER,CENTER);
  textSize(txtSize);
  text('YOU SUCK XD', width/2, height/2 - sep * rectHeight/txtSize);
  pop();

  push();
  fill(textColour);
  textAlign(CENTER,CENTER);
  textSize(txtSizeScore);
  text('Final Score: ' + score, width/2, height/2 + 1.1* sep * rectHeight/txtSizeScore);
  
  text('High Score: ' + getHighScore(scores), width/2, height/2 + 1.8 * sep * rectHeight/txtSizeScore);
  pop();
}

printScore = function(score) {
  var textColour = 'white';
  var trans = 200;
  var bgRectCol = 10;
  var txtSize = 28;
  var rectWidth = 150;
  var rectHeight = 50;
  var offX = 10;
  var offY = 10;
  var rectX = (width - rectWidth/2) - offX;
  var rectY = rectHeight/2 + offY;

  push();
  fill(bgRectCol, trans);
  stroke(bgRectCol, trans);
  rectMode(CENTER);
  rect(rectX, rectY, rectWidth, rectHeight);
  pop();

  push();
  fill(textColour);
  textAlign(CENTER,CENTER);
  textSize(txtSize);
  text('Score: '+ score, (width - rectWidth/2) - offX, rectHeight/2 + offY);
  pop();
}

getHighScore = function (scores){
  var high = -1;

  for (var i = 0; i < scores.length; i++){
    if (scores[i] > high){
      high = scores[i];
    }
  }
  
  return high;
}