function restartButton (){
  this.textColour = 'white';
  this.trans = 200;
  this.bgRectCol = 10;
  this.txtSize = 28;
  this.rectWidth = 200;
  this.rectHeight = 50;
  this.offY = 10;
  this.rectX = width/2;
  this.rectY = this.rectHeight/2 + this.offY;


  this.show = function(){
    push();
    fill(this.bgRectCol, this.trans);
    stroke(this.bgRectCol, this.trans);
    rectMode(CENTER);
    rect(this.rectX, this.rectY, this.rectWidth, this.rectHeight);
    pop();
  
    push();
    fill(this.textColour);
    textAlign(CENTER,CENTER);
    textSize(this.txtSize);
    text('Play Again?', width/2, this.rectHeight/2 + this.offY);
    pop();
  }

  this.checkClick = function(){
    if ((mouseX <= (this.rectX + this.rectWidth/2)) && (mouseX >= (this.rectX - this.rectWidth/2))) {
      if ((mouseY <= (this.rectY + this.rectHeight/2)) && (mouseY >= (this.rectY - this.rectHeight/2))) {
        return true;
      }
    }
  }
}