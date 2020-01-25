var imageSiteA;
function preload() {
  imageSiteA = loadImage("Test.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight, WEBGL);
  rectMode(CENTER);
  angleMode(DEGREES);
}

window.addEventListener("resize", function() {
  resizeCanvas(windowWidth, windowHeight);
  clear();
});

new p5();
var width = windowWidth;
var height = windowHeight;

function draw() {
  background(100);

  fill(170);
  rotateX(-mouseY / 3);
  rotateY(-mouseX / 3);
  rotateZ(0);
  texture(imageSiteA);
  box(window.innerWidth / 3, window.innerWidth / 3, window.innerWidth / 3);
  // texture(CSAtext);
  // plane(window.innerWidth - 4, window.innerHeight - 4);
}
