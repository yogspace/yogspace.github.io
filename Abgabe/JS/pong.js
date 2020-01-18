//Spieler 1
// var xPos1 = width / 2 - 300;
heightWhile = height;
widthWhile = width;

var xPos1 = 100;
var yPos1 = heightWhile / 2;

//Spieler 2
// var xPos2 = width / 2 + 300;
var xPos2 = widthWhile - 100;
var yPos2 = heightWhile / 2;

//Ball
var xPosBall = heightWhile / 2;
var yPosBall = heightWhile / 2;

var movingBall = false;
var movingBallLeft = true;
var movingBallRight = false;
var BallRandom = 0;
var hitBorder = false;
var hitBorderUp = false;
var hitBorderDown = false;
var ballspeed = 10;
var yspeed = 0;
var score = 0;

function Spieler() {
  fill(255, 255, 255);
  rectMode(CENTER);
  rect(xPos1, yPos1, 10, 40);
  rect(xPos2, yPos2, 10, 40);

  //Spieler 1
  if (keyIsDown(83)) {
    yPos1 = yPos1 + 10;
  }
  if (keyIsDown(87)) {
    yPos1 = yPos1 - 10;
  }

  //Spieler 2
  if (keyIsDown(40)) {
    yPos2 = yPos2 + 10;
  }
  if (keyIsDown(38)) {
    yPos2 = yPos2 - 10;
  }

  if (yPos1 < 70) {
    yPos1 = 70;
  }

  if (yPos2 < 70) {
    yPos2 = 70;
  }

  if (yPos1 > heightWhile - 70) {
    yPos1 = heightWhile - 70;
  }

  if (yPos2 > heightWhile - 70) {
    yPos2 = heightWhile - 70;
  }
}

function Ball() {
  fill(255);
  rect(xPosBall, yPosBall, 10, 10);

  stroke(255);
  line(xPos1, 50, xPos2, 50);
  line(xPos1, heightWhile - 50, xPos2, heightWhile - 50);
  noStroke();
  // fill(Coin.color);
  // rect(width / 2, 25, Coin.sizeX, Coin.sizeY, 20);
  // fill(255);
  // textAlign(LEFT);
  // text(Coins, width / 2 + 100, 30);
}

function BallMoving() {
  if (movingBall === true && movingBallLeft === true) {
    xPosBall = xPosBall - ballspeed;
    yPosBall = yPosBall + BallRandom;
  }
  //Weiter gehts
  if (
    movingBall === true &&
    movingBallLeft === true &&
    xPosBall <= xPos1 + 10 &&
    yPosBall >= yPos1 - 20 &&
    yPosBall <= yPos1 + 20
  ) {
    soundPongCollusion.play();
    ballspeed = ballspeed + 1;
    yspeed = yspeed + 0.1;
    movingBallLeft = false;
    movingBallRight = true;
    hitBorder = true;
    Coins = Coins + 10;
  }

  //Aus dem Feld
  if (
    (movingBall === true && xPosBall <= xPos1 + 10 && yPosBall < yPos1 - 20) ||
    (movingBall === true && xPosBall <= xPos1 + 10 && yPosBall > yPos1 + 20)
  ) {
    movingBall = false;
    // Pong.slideX = width / 2;
    Pong.slidingR = true;
    xPosBall = widthWhile / 2;
    yPosBall = heightWhile / 2;
    Pong.starting = false;
  }

  if (movingBall === true && movingBallRight === true) {
    xPosBall = xPosBall + ballspeed;
    yPosBall = yPosBall + BallRandom;
  }
  //Weiter gehts
  if (
    movingBall === true &&
    movingBallRight === true &&
    xPosBall >= xPos2 - 10 &&
    yPosBall >= yPos2 - 20 &&
    yPosBall <= yPos2 + 20
  ) {
    soundPongCollusion.play();
    ballspeed = ballspeed + 1;
    yspeed = yspeed + 0.1;
    movingBallLeft = true;
    movingBallRight = false;
    hitBorder = true;
    Coins = Coins + 10;
  }

  //Aus dem Feld
  if (
    (movingBall === true && xPosBall >= xPos2 - 10 && yPosBall < yPos2 - 20) ||
    (movingBall === true && xPosBall >= xPos2 - 10 && yPosBall > yPos2 + 20)
  ) {
    movingBall = false;
    // Pong.slideX = width / 2;
    Pong.slidingR = true;
    xPosBall = widthWhile / 2;
    yPosBall = height / 2;
    Pong.starting = false;
  }

  //Border oben

  if (yPosBall <= 55) {
    hitBorderUp = true;
  }

  if (yPosBall >= heightWhile - 55) {
    hitBorderDown = true;
  }

  if (hitBorder === true) {
    BallRandom = int(random(-(5 - yspeed), 5 + yspeed));
    hitBorder = false;
  }

  if (hitBorderUp === true) {
    BallRandom = int(random(1, 5 + yspeed));
    hitBorderUp = false;
  }
  if (hitBorderDown === true) {
    BallRandom = int(random(-(5 + yspeed), -1));
    hitBorderDown = false;
  }
}

function Restart() {
  if (movingBall === false) {
    xPosBall = widthWhile / 2;
    yPosBall = heightWhile / 2;
    BallRandom = 0;
    ballspeed = 10;
    score = 0;
    xPos1 = 100;
    yPos1 = height / 2;
    xPos2 = widthWhile - 100;
    yPos2 = height / 2;

    fill(255);
    rect(widthWhile / 2, heightWhile / 2, 100, 50);
    fill(0);
    textSize(25);
    textAlign(CENTER);
    text("START", widthWhile / 2, heightWhile / 2 + 10);

    textSize(20);

    fill(255);
    text("Controls:", widthWhile / 2, heightWhile / 2 + 50);
    text("Left: UP / Down: 'W' and 'S'", widthWhile / 2, heightWhile / 2 + 80);
    text(
      "Right: UP / Down: 'Arrow up' and 'Arrow down'",
      widthWhile / 2,
      heightWhile / 2 + 100
    );
    fill(0);
    textAlign(LEFT);
    if (
      (mouseIsPressed === true &&
        mouseX >= widthWhile / 2 - 50 &&
        mouseX <= widthWhile / 2 + 50 &&
        mouseY >= heightWhile / 2 - 25 &&
        mouseY <= heightWhile / 2 + 25) ||
      keyIsDown(32)
    ) {
      movingBall = true;
    }
  }
}
