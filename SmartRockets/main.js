var popSize;
var population;
var lifespan = 200;
var target;

function setup() {
  createCanvas(500, 500);
  popSize = 30;
  population = new Population;
  target = new Target;
}

function draw() {
  background(50);
  
  if (frameCount % lifespan == 0)
  {
    population.calcFitness();
    population.nextGen();
    //population = new Population;
  }

  population.update();  
  target.draw();

}

function Population ()
{
  this.rockets = [];

  for (var i = 0; i < popSize; i++)
  {
    this.rockets[i] = new Rocket;
  }

  this.update = function ()
  {
    for (var i = 0; i < popSize; i++)
    {
      this.rockets[i].draw();
      this.rockets[i].update();
    }
  }

  this.calcFitness = function()
  {
    for (var i = 0; i < popSize; i++)
    {
      this.rockets[i].calcFitness();
      console.log(this.rockets[i].fitness);
    }
  }

  this.nextGen = function ()
  {
    this.matingPool = [];
    this.nextRockets = [];

    for (var i = 0; i < popSize; i++)
    {
      for (var j = 0; j < this.rockets[i].fitness; j++)
      {
        this.matingPool.push(this.rockets[i]);
      }
    }

    for (var i = 0; i < popSize; i++)
    {
      var parentA = random(this.matingPool).dna;
      var parentB = random(this.matingPool).dna;
      this.nextRockets[i] = new Rocket;

      for (var j = 0; j <= lifespan / 2; j++)
      {
        this.nextRockets[i].dna.genes[j] = parentA.genes[j];
      }
      
      for (var j = 0; j <= lifespan / 2; j++)
      {
        this.nextRockets[i].dna.genes[lifespan - j] = parentB.genes[j];
      }
    }

    for (var i = 0; i < popSize; i++)
    {
      this.rockets[i] = new Rocket (this.nextRockets[i].dna);
    }

  }
}

function Target ()
{
  this.pos = createVector();
  this.pos.x = width/2;
  this.pos.y = 35;
  this.rad = 20;

  this.draw = function()
  {
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.rad);
  }
}