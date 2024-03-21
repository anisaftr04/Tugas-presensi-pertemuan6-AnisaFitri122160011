let judul;
let nama;
let tombol;
let hello;
let objek;
let jalan = false;
let windForce;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  tombol = createButton('Jalankan/Pause')
  tombol.position(180,140)
  
  objekPos = createVector(width/15,height/3);
  objekVel = createVector(0,0);
  objekAcc = createVector(0,0);
  objekMass = 15;
  objek = new Mover(objekPos, objekVel, objekAcc, objekMass);

  windForce = createVector(1, 0.5);
}


function draw() {
  background(220);
  judul = createElement('h1', 'Simulasi Hukum Newton I')
  judul.position(50, 15)
  body = createElement('h3','Nama = Anisa Fitri' )
  body.position(50, 60)
  body = createElement('h3', 'NIM = 122160011')
  body.position(50, 85)
  objek.display();
  
  var Cd = 0.0001;
  var diam1 = (2*objek.mass);
  var A1 = PI*diam1/5;
  var frictionForce = objek.velocity.copy();
  frictionForce.normalize()
  frictionForce.mult(-1* (frictionForce.mag()**15) *A1*Cd)

  
  objek.applyForce(windForce);
  objek.applyForce(frictionForce);
  
  
  tombol.mousePressed(run);
  
  if (jalan){
    objek.update();
  }
  
}


function run(){
  // objek.update();
  if (jalan){
    jalan = false;
  }
  else{
    jalan = true
  }
}

class Mover {
  constructor(loc, vel, acc, m){
    this.location = loc;
    this.mass = m;
    this.velocity = vel;
    this.acceleration = acc;
  }
  update(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
  }
  display(){
    noStroke();
    fill('orange')
    ellipse(this.location.x, this.location.y, 2*this.mass, 4*this.mass);
    
  }  

  
  applyForce(force){
    force.div(this.mass)
    this.acceleration.add(force);
  }

}