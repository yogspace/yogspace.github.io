function setup() {
  var canvas = createCanvas(900, 700);
  canvas.parent("sketch-holder");
  // createImg("moped.jpg", "hallo");
}

//Spieler 1
// var xPos1 = width / 2 - 300;
var xPos1 = 100;
var yPos1 = 350;
var showWebsite = false;

//Spieler 2
// var xPos2 = width / 2 + 300;
var xPos2 = 800;
var yPos2 = 350;

//Ball
var xPosBall = 450;
var yPosBall = 350;

var movingBall = false;
var movingBallLeft = true;
var movingBallRight = false;
var BallRandom = 0;
var hitBorder = false;
var hitBorderUp = false;
var hitBorderDown = false;
var score = 0;

function draw() {
  background(0);
  Spieler();
  Ball();
  BallMoving();
  Restart();
}

function Spieler() {
  //Score
  fill(255);
  textSize(13);
  textAlign(LEFT);
  text("SCORE: " + score, 20, 20);

  //Spieler
  fill(255, 255, 255);
  rectMode(CENTER);
  rect(xPos1, yPos1, 10, 40);
  rect(xPos2, yPos2, 10, 40);

  //Spieler 1
  if (keyIsDown(83)) {
    yPos1 = yPos1 + 5;
  }
  if (keyIsDown(87)) {
    yPos1 = yPos1 - 5;
  }

  //Spieler 2
  if (keyIsDown(40)) {
    yPos2 = yPos2 + 5;
  }
  if (keyIsDown(38)) {
    yPos2 = yPos2 - 5;
  }

  if (yPos1 <= 20) {
    yPos1 = 20;
  }

  if (yPos2 <= 20) {
    yPos2 = 20;
  }

  if (yPos1 >= 500 - 20) {
    yPos1 = 500 - 20;
  }

  if (yPos2 >= 500 - 20) {
    yPos2 = 500 - 20;
  }
}

function Ball() {
  fill(255);
  rect(xPosBall, yPosBall, 10, 10);
}

function BallMoving() {
  if (movingBall === true && movingBallLeft === true) {
    xPosBall = xPosBall - 5;
    yPosBall = yPosBall + BallRandom;
  }
  //Weiter gehts
  if (
    movingBall === true &&
    movingBallLeft === true &&
    xPosBall === xPos1 + 10 &&
    yPosBall >= yPos1 - 20 &&
    yPosBall <= yPos1 + 20
  ) {
    movingBallLeft = false;
    movingBallRight = true;
    hitBorder = true;
    score = score + 1;
  }

  //Aus dem Feld
  if (
    (movingBall === true && xPosBall === xPos1 + 10 && yPosBall < yPos1 - 20) ||
    (movingBall === true && xPosBall === xPos1 + 10 && yPosBall > yPos1 + 20)
  ) {
    xPosBall = 450;
    yPosBall = 200;
    movingBall = false;
  }

  if (movingBall === true && movingBallRight === true) {
    xPosBall = xPosBall + 5;
    yPosBall = yPosBall + BallRandom;
  }
  //Weiter gehts
  if (
    movingBall === true &&
    movingBallRight === true &&
    xPosBall === xPos2 - 10 &&
    yPosBall >= yPos2 - 20 &&
    yPosBall <= yPos2 + 20
  ) {
    movingBallLeft = true;
    movingBallRight = false;
    hitBorder = true;
    score = score + 1;
  }

  //Aus dem Feld
  if (
    (movingBall === true && xPosBall === xPos2 - 10 && yPosBall < yPos2 - 20) ||
    (movingBall === true && xPosBall === xPos2 - 10 && yPosBall > yPos2 + 20)
  ) {
    xPosBall = 450;
    yPosBall = 200;
    movingBall = false;
  }

  //Border oben

  if (yPosBall <= 10) {
    hitBorderUp = true;
  }

  if (yPosBall >= 490) {
    hitBorderDown = true;
  }

  if (hitBorder === true) {
    BallRandom = int(random(-5, 5));
    hitBorder = false;
  }

  if (hitBorderUp === true) {
    BallRandom = int(random(1, 5));
    hitBorderUp = false;
  }
  if (hitBorderDown === true) {
    BallRandom = int(random(-5, -1));
    hitBorderDown = false;
  }
}

function Restart() {
  if (movingBall === false) {
    showWebsite = true;
    xPosBall = 450;
    yPosBall = 350;
    BallRandom = 0;
    score = 0;
    xPos1 = 100;
    yPos1 = 350;
    xPos2 = 800;
    yPos2 = 350;

    fill(255);
    rect(width / 2, height / 2, 100, 50);
    fill(0);
    textAlign(CENTER);
    textSize(25);
    textStyle(BOLD);
    text("START", width / 2, height / 2 + 10);
    if (
      (mouseIsPressed === true &&
        mouseX >= width / 2 - 50 &&
        mouseX <= width / 2 + 50 &&
        mouseY >= height / 2 - 25 &&
        mouseY <= height / 2 + 25) ||
      keyIsDown(32)
    ) {
      movingBall = true;
    }
  }
}
