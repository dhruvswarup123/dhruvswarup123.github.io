var count = 0;

function setup() {
  createCanvas(800,500);

  big = new block (200, 100000000000000000, -5);
  smol = new block (60, 1, 0);
}

function draw() {
  //Draw bg and text
  background(50);
  textSize(50);
  text("Count:", 0, 40);
  text(count, 150, 40);
  push();
  fill(25);
  stroke(25);

  rect(0, height-20, width,20);
  pop();
  //____________________________

  if (big.hit(smol))
  {
    const newVelBig = big.getVel(smol);
    const newVelSmol = smol.getVel(big);
    big.vel = newVelBig;
    smol.vel = newVelSmol;
    count ++;
  }
  if (smol.boom() || big.boom())
  {
    count++;
  }

  big.update();
  smol.update();
}

function block (posx, mass, vel)
{
  this.side = 50; //Side length
  this.offset = -21; // floor offset

  this.x = posx;  //X position -- left
  this.y = height - this.side + this.offset; // y position top left

  this.vel = vel;
  this.m = mass;

  this.p = 0; // momentum

  this.col = 255; // Color
  
  this.show = function () {
    push();
    fill(this.col);
    stroke(this.col);
    rect(this.x, this.y, this.side, this.side);
    pop();
  }

  this.update = function() {
    this.x += this.vel;
    this.show();
  }

  this.getVel = function (that)
  {
    return ((this.m - that.m)/(this.m + that.m)) * this.vel + 2 * that.m * that.vel / (this.m + that.m);
  }

  this.hit = function (that)
  {
    return !(this.x + this.side < that.x || this.x > that.x + that.side);
  }

  this.boom = function ()
  {
    if (this.x<=0)
    {
      this.vel = -this.vel;
      return 1;
    }

    else 
    {
      return 0;
    }
  }
}

