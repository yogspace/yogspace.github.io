var fire;

function preload() {
  fire = loadImage("../Bilder/Feuer/Feuer.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);

  //basic settings
  textFont("Calibri");
  textAlign(LEFT);
  textSize(20);
  noStroke();
  imageMode(CENTER);
  rectMode(CENTER);
  textStyle(BOLD);
}

window.addEventListener("resize", function() {
  resizeCanvas(windowWidth, windowHeight);
  clear();
});

new p5();
var width = windowWidth;
var height = windowHeight;
