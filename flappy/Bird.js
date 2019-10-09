function Bird ()
{
  this.x = 100;
  this.y = height/2;
  this.vel = -15;
  this.acc = 0.4;
  this.force = -10;
  this.r = 20;
 
  this.show = function() {
    push();
    stroke(255);
    ellipse(this.x, this.y, this.r, this.r);
    pop();
  }

  this.smack = function() {   
    this.vel = this.force;
  }

  this.update = function() {
    this.y += this.vel;
    this.vel += this.acc;
    
    if (this.y >= height) {
      this.y = -5;
      this.vel = 0;
    }
    else if (this.y < -5) {
      this.y = -5;
      this.vel = 0;
    }
    
    this.show();
  } 
}
