let particles = [];

function setup() {
  createCanvas(640, 360);
}

function mousePressed() {
  let p = new Particle(mouseX, mouseY, random(2,4));
  particles.push(p);
}

function keyPressed() {
  if (key == ' ') {
    particles.splice(0,1);
  }
}

function draw() {
  background(51);
  let wind = createVector(0.1, 0);  
  
  for(let i = 0; i < particles.length; i++){
    let gravity = createVector(0, 0.2*particles[i].mass);
    particles[i].applyForce(gravity);
    
    if(mouseIsPressed) {
    particles[i].applyForce(wind);
    }
  
  particles[i].update();
  particles[i].display();
  particles[i].edges();
  }
}

function Particle(x, y, m) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.mass = m;
  
  this.applyForce = function(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  }
  
  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    this.acc.set(0,0);
  }
  
  this.display = function() {
    fill(255, 150);
    ellipse(this.pos.x, this.pos.y, this.mass*10, this.mass*10);
  }
  
  this.edges = function() {
    if (this.pos.y > height) {
      this.vel.y *= -1;
      this.pos.y = height;
    }
    
    if (this.pos.x > width) {
      this.vel.x *= -1;
      this.pos.x = width;
    }    
  }
}

