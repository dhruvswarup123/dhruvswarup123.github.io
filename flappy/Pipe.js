function Pipe ()
{
  this.x = width;
  this.space = 150;
  this.len = random(50, height - 50 - this.space);
  this.vel = 3;
  this.thick = 30;
  this.col = (255)
  this.scoreStatus = false;

  this.show = function () {
    push();
    fill(this.col);
    stroke(this.col);
    rect(this.x, 0, this.thick, this.len);
    rect(this.x, (height - (height - this.len - this.space)), this.thick, (height - this.len - this.space));
    pop();
  }

  this.update = function() {
    this.x -= this.vel;
    this.show();
  }

  this.offScreen = function () {
    if (this.x < -this.thick) {
      return true;
    }
    else {
      return false;
    }
  }

  this.checkBang = function(bird) {
    if ((bird.x >= this.x) && (bird.x <= (this.x + this.thick))) {
      if(bird.y < this.len || bird.y > (this.len + this.space)) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }

  this.updateScore = function(bird) {
    if(this.scoreStatus == false && (this.x + this.thick) <  bird.x) {
      this.scoreStatus = true;
      return 1;
    }
    else {
      return 0;
    }
  }
}