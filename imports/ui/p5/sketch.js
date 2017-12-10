// pass in p5.js as function argument p5
export default function sketch (p5) {

let yvalues=[];


//waves
let localProps = {};
let xspacing = 16;    // Distance between each horizontal location
let w;                // Width of entire wave
let theta = 0.0;      // Start angle at 0
let amplitude = 50.0; // Height of wave
let period = 500.0;   // How many pixels before the wave repeats
let dx;               // Value for incrementing x
//let yvalues;  // Using an array to store height values for the wave

//bubbles
let f=[];
let numberFish= 67;
let b=[];
let numberBubbles=400;




p5.setup = function() {
 p5.createCanvas(p5.displayWidth, p5.displayHeight);
  w = p5.width+16;
  dx = (p5.TWO_PI / period) * xspacing;
  yvalues = new Array(p5.floor(w/xspacing));
	
	  //adds 50 fish to the array
  for (var i=0; i<numberFish; i++) {
      f.push(new Fish());
  }
  
  //adds 20 bubbles to the array
  for(var g=0; g<numberBubbles; g++){
       b.push(new Bubble()); 
    
  }
}

p5.draw = function() {
  
  p5.background(0,215,225);
	
	     for (var g=0; g<b.length; g++){
       b[g].move();
       b[g].draw();
   
} 
 
   //it goes through every fish in the array and calls its draw function and swim function
   for (var i=0; i<f.length; i++){
       f[i].swim();
       f[i].draw();
  }
	
calcWave();
renderWave(); 
sun();


}

function calcWave() {
  // Increment theta (try different values for 
  // 'angular velocity' here)
  theta += 0.02;

  // For every x value, calculate a y value with sine function
  var x = theta;
  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = p5.sin(x)*amplitude;
    x+=dx;
  }
}

function renderWave() {
  p5.noStroke();
  p5.fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (var x = 0; x < yvalues.length; x++) {
    p5.ellipse(x*xspacing, p5.height/2+yvalues[x], 16, 16);
  }
}

function sun(){
  p5.fill(255,255,0);
  p5.ellipse(150,150,100,100);
}

function Fish(){
  this.x= p5.random (0,p5.width);
  this.y=p5.random (0,p5.height);
  this.speed=p5.random(0.5,2);
  //determines whether it moves right or left
  if (p5.random (-1,1) <0) { 
  //if it moves left speed will be a negative number  
  this.speed *= -1;}
  this.size=p5.random (10,20);
  this.r=p5.random (0,255);
  this.g=p5.random (0,255);
  this.b=p5.random (0,255);
}
    
Fish.prototype.constructor=Fish;
Fish.prototype.draw=function(){
  p5.fill (this.r, this.g, this.b);
  
  //push says i am going to move the grid remember where it is right now
  p5.push();
  
  //translate moves 0,0 point to where we want it to be
  p5.translate(this.x,this.y);
  if(this.speed<0){
     //moving left
    
    //turns the grib upside down if the fish is moving left
    p5.rotate(p5.PI);
  
  }
  p5.triangle (0, 0, 0, -this.size, this.size,
            -this.size/2);
  p5.ellipse (this.size*2.5, -this.size/2, this.size*2.7, 
           this.size);
  
    //pop says i am done to moving the grid go back to where it was before 
     p5.pop();
  
};

Fish.prototype.swim = function(){
  this.x += this.speed;
  if (this.x<=-this.size*4 || this.x >=p5.width+this.size*4) {
       this.speed *= -1;
    
  }
};


function Bubble(){
   this.x=p5.random (0,p5.width);
   this.size=p5.random (3,15);
   this.y=p5.height+p5.random(this.size*2,this.size*20);
   this.speed= 2;
  
}

Bubble.prototype.constructor=Bubble;
Bubble.prototype.move= function (){
       this.y-=this.speed;
  if (this.y<-this.size*2){
   this.y=p5.height+p5.random(this.size*2,this.size*20);
  } 
};

Bubble.prototype.draw=function(){
       p5.fill(255,255,255,75);
       p5.ellipse(this.x,this.y,this.size,this.size);
        
};

  // this special function receives data from App.jsx withTracker
  p5.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    console.log("myCustomRedrawAccordingToNewPropsHandler", props, localProps);
    

  };
};