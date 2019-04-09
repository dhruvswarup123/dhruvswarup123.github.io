function Rocket (dnaIn)
{
  this.pos = createVector();
  this.pos.x = width / 2;
  this.pos.y = height - 10;

  this.w = 5;
  this.h = 30;

  if (!dnaIn)
  {
    this.dna = new DNA;
  }
  else
  {
    this.dna = dnaIn;
  }
  
  this.vel = createVector();
  this.count = 0;

  // Physical Characteristics
  this.alpha = 150; //Transparency
  this.curve = 10;  //Rounded edges
  
  this.draw = function() 
  {
    push();

    translate(this.pos.x, this.pos.y);
    rectMode(CENTER);
    rotate(this.vel.heading());

    noStroke();
    fill(255, this.alpha);

    rect(0, 0, this.h, this.w, this.curve);
    
    pop();
  }

  this.update = function()
  {
    if (dist(target.pos.x, target.pos.y, this.pos.x, this.pos.y) > 35)
    {
      this.acc = this.dna.genes[this.count];
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc *= 0;
      this.count++;
    }
    else 
    {
      this.pos = target.pos;
    }
  }

  this.calcFitness = function()
  {
    d = dist(target.pos.x, target.pos.y, this.pos.x, this.pos.y);

    if (this.pos.x == target.pos.x && this.pos.y == target.pos.y)
    {
      this.fitness = 1 / (d + 1);
    }
    else
    {
      this.fitness = 100 / (d + 1);
    }

    this.fitness = map(this.fitness, 0, 1, 0, 100);
  }
}