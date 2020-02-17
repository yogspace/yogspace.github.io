function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);

  textAlign(LEFT);
  angleMode(DEGREES);
  noStroke();
}

window.addEventListener("resize", function() {
  resizeCanvas(windowWidth, windowHeight);
  clear();
});

new p5();
var width = windowWidth;
var height = windowHeight;
