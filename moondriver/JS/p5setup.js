function setup() {
  createCanvas(windowWidth, windowHeight);
  if (displayWidth >= displayHeight) {
    frameRate(30);
  } else {
    frameRate(60);
  }

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
