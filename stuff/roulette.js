function setup() {
  var canvas = createCanvas(622, 600);
  canvas.parent("sketch-holder-roulette");
}

//Variablen

var x;
var y;
var h = 10;

//Score
var score = 5;
var bet = 1;

var betarray = [1, 2, 5, 10, 100, 1];
var betcount = 0;

//Starter
var xPosStart = 200;
var yPosStart = 430;

var xPosArrow;
var yPosArrow;

var xPosRedButton = 30;
var yPosRedButton = 150;

var xPosBlackButton = 30;
var yPosBlackButton = 200;

var xPosWhiteButton = 30;
var yPosWhiteButton = 250;

var finishTimer = 1;

var whileroulette = false;

var rouletteStart = false;
var rouletteFinish = false;

//Farbe, wenn du einen Button drueckst
var colourClick = 0;

var choosered = false;
var chooseblack = false;
var choosewhite = false;

//Dreher
var rouletteRotate = 70;

function Roulette(x, y) {
  if (rouletteFinish === true) {
    finishTimer = finishTimer + 1;
    if (finishTimer >= 50) {
      finishTimer = 1;
      if (
        (rouletteRotate >= 31 && rouletteRotate <= 70) ||
        (rouletteRotate >= 111 && rouletteRotate <= 150) ||
        (rouletteRotate >= 191 && rouletteRotate <= 230) ||
        (rouletteRotate >= 271 && rouletteRotate <= 310) ||
        (rouletteRotate >= 351 && rouletteRotate <= 390) ||
        (rouletteRotate >= 431 && rouletteRotate <= 470) ||
        (rouletteRotate >= 511 && rouletteRotate <= 550) ||
        (rouletteRotate >= 591 && rouletteRotate <= 630) ||
        (rouletteRotate >= 751 && rouletteRotate <= 790) ||
        (rouletteRotate >= 831 && rouletteRotate <= 870) ||
        (rouletteRotate >= 911 && rouletteRotate <= 950) ||
        (rouletteRotate >= 991 && rouletteRotate <= 1030) ||
        (rouletteRotate >= 1071 && rouletteRotate <= 1110) ||
        (rouletteRotate >= 1151 && rouletteRotate <= 1190) ||
        (rouletteRotate >= 1231 && rouletteRotate <= 1270) ||
        (rouletteRotate >= 1311 && rouletteRotate <= 1350) ||
        (rouletteRotate >= 1431 && rouletteRotate <= 1470)
      ) {
        if (chooseblack === true) {
          score = score + 2 * bet;
          choosered = false;
          chooseblack = false;
          choosewhite = false;
          console.log("you won! (black) Score: " + score);
          rouletteRotate = 10;
          rouletteFinish = false;
        }
        if (
          (choosewhite === true && chooseblack === false) ||
          (chooseblack === false && choosered === true)
        ) {
          choosered = false;
          chooseblack = false;
          choosewhite = false;
          console.log("you loose! (black) Score: " + score);
          rouletteRotate = 10;
          rouletteFinish = false;
        }
      }

      if (
        (rouletteRotate >= 71 && rouletteRotate <= 110) ||
        (rouletteRotate >= 151 && rouletteRotate <= 290) ||
        (rouletteRotate >= 231 && rouletteRotate <= 270) ||
        (rouletteRotate >= 391 && rouletteRotate <= 430) ||
        (rouletteRotate >= 471 && rouletteRotate <= 510) ||
        (rouletteRotate >= 551 && rouletteRotate <= 590) ||
        (rouletteRotate >= 631 && rouletteRotate <= 670) ||
        (rouletteRotate >= 711 && rouletteRotate <= 750) ||
        (rouletteRotate >= 791 && rouletteRotate <= 830) ||
        (rouletteRotate >= 871 && rouletteRotate <= 910) ||
        (rouletteRotate >= 951 && rouletteRotate <= 990) ||
        (rouletteRotate >= 1111 && rouletteRotate <= 1150) ||
        (rouletteRotate >= 1191 && rouletteRotate <= 1230) ||
        (rouletteRotate >= 1271 && rouletteRotate <= 1310) ||
        (rouletteRotate >= 1351 && rouletteRotate <= 1390) ||
        (rouletteRotate >= 1471 && rouletteRotate <= 1510)
      ) {
        if (choosered === true) {
          score = score + 2 * bet;
          choosered = false;
          chooseblack = false;
          choosewhite = false;
          console.log("you won! (red) Score: " + score);
          rouletteRotate = 10;
          rouletteFinish = false;
        }
        if (
          (choosewhite === true && choosered === false) ||
          (chooseblack === true && choosered === false)
        ) {
          choosered = false;
          chooseblack = false;
          choosewhite = false;
          console.log("you loose! (red) Score: " + score);
          rouletteRotate = 10;
          rouletteFinish = false;
        }
      }

      if (
        (rouletteRotate >= 311 && rouletteRotate <= 350) ||
        (rouletteRotate >= 671 && rouletteRotate <= 710) ||
        (rouletteRotate >= 1031 && rouletteRotate <= 1070) ||
        (rouletteRotate >= 1391 && rouletteRotate <= 1430) ||
        (rouletteRotate >= 1751 && rouletteRotate <= 1790)
      ) {
        if (choosewhite === true) {
          score = score + 5 * bet;
          choosered = false;
          chooseblack = false;
          choosewhite = false;
          console.log("you won! (white) Score: " + score);
          rouletteRotate = 10;
          rouletteFinish = false;
        }
        if (
          (choosered === true && choosewhite === false) ||
          (chooseblack === true && choosewhite === false)
        ) {
          choosered = false;
          chooseblack = false;
          choosewhite = false;
          console.log("you loose! (white) Score: " + score);
          rouletteRotate = 10;
          rouletteFinish = false;
        }
      }
    }
  }

  //Felder
  push();
  translate(300, 250);
  angleMode(DEGREES);
  rotate(rouletteRotate);
  noStroke();
  fill(0);
  arc(x, y, 300, 300, 0, 40);
  fill(255, 0, 0);
  arc(x, y, 300, 300, 40, 80);
  fill(0);
  arc(x, y, 300, 300, 80, 120);
  fill(255, 0, 0);
  arc(x, y, 300, 300, 120, 160);
  fill(0);
  arc(x, y, 300, 300, 160, 200);
  fill(255, 0, 0);
  arc(x, y, 300, 300, 200, 240);
  fill(0);
  arc(x, y, 300, 300, 240, 280);
  fill(255);
  arc(x, y, 300, 300, 280, 320);
  fill(255, 0, 0);
  arc(x, y, 300, 300, 320, 360);

  //Zahlen

  fill(0);
  textSize(32);
  push();
  translate(x, y);
  rotate(45 + 160);
  fill(0);
  text("0", -15, 110);
  pop();

  fill(255);
  textSize(32);
  push();
  translate(x, y);
  rotate(85 + 160);
  text("1", -15, 110);
  pop();

  fill(255);
  textSize(32);
  push();
  translate(x, y);
  rotate(125 + 160);
  text("2", -15, 110);
  pop();

  fill(255);
  textSize(32);
  push();
  translate(85);
  rotate(165 + 160);
  text("3", -15, 110);
  pop();

  fill(255);
  textSize(32);
  push();
  translate(x, y);
  rotate(205 + 160);
  text("4", -15, 110);
  pop();

  fill(255);
  textSize(32);
  push();
  translate(x, y);
  rotate(245 + 160);
  text("5", -15, 110);
  pop();

  fill(255);
  textSize(32);
  push();
  translate(x, y);
  rotate(285 + 160);
  text("6", -15, 110);
  pop();

  fill(255);
  textSize(32);
  push();
  translate(x, y);
  rotate(325 + 160);
  text("7", -15, 110);
  pop();

  fill(255);
  textSize(32);
  push();
  translate(x, y);
  rotate(365 + 160);
  text("8", -15, 110);
  pop();
  pop();
}

//Starttaste
function startGameButton(xPosStart, yPosStart) {
  noStroke();
  fill(colourClick);
  rect(xPosStart, yPosStart, 200, 60);
  fill(255);
  rect(xPosStart + 5, yPosStart + 5, 190, 50);
  fill(0);
  textSize(50);
  text("start", xPosStart + 49, yPosStart + 45);
}

function startGame() {
  if (
    (rouletteStart === true && choosered === true) ||
    (rouletteStart === true && chooseblack === true) ||
    (rouletteStart === true && choosewhite === true)
  ) {
    rouletteRotate = rouletteRotate + 8;
  }
  if (rouletteRotate >= random(1080, 3240)) {
    rouletteStart = false;
    rouletteFinish = true;
  }

  if (score <= 0) {
    score = 0;
  }
}

//Rote Farbe wählen
function redColourButton(xPosRedButton, yPosRedButton) {
  noStroke();
  fill(255, 0, 0);
  rect(xPosRedButton, yPosRedButton, 100, 40);
  fill(255, 0, 0);
  rect(xPosRedButton + 5, yPosRedButton + 5, 90, 30);
  fill(255);
  textSize(32);
  text("red", xPosRedButton + 17, yPosRedButton + 30);
}

//Schwarze Farbe Wählen
function blackColourButton(xPosBlackButton, yPosBlackButton) {
  noStroke();
  fill(0);
  rect(xPosBlackButton, yPosBlackButton, 100, 40);
  fill(0, 0, 0);
  rect(xPosBlackButton + 5, yPosBlackButton + 5, 90, 30);
  fill(255);
  textSize(32);
  text("black", xPosBlackButton + 13, yPosBlackButton + 30);
}

//Schwarze Farbe Wählen
function whiteColourButton(xPosWhiteButton, yPosWhiteButton) {
  noStroke();
  fill(255);
  rect(xPosWhiteButton, yPosWhiteButton, 100, 40);
  fill(255);
  rect(xPosWhiteButton + 5, yPosWhiteButton + 5, 90, 30);
  fill(0);
  textSize(32);
  text("white", xPosWhiteButton + 13, yPosWhiteButton + 30);
}

function rouletteArrow(xPosArrow, yPosArrow) {
  fill(0, 0, 255);
  rect(xPosArrow - 10, yPosArrow - 20, 20, 30);
  triangle(
    xPosArrow - 15,
    yPosArrow + 5,
    xPosArrow + 15,
    yPosArrow + 5,
    xPosArrow,
    yPosArrow + 25
  );
}

function scoreBar(xPosScore, yPosScore) {
  fill(0);
  rect(xPosScore - 90, yPosScore - 65, 210, 60);
  fill(255);
  rect(xPosScore - 85, yPosScore - 60, 200, 50);
  fill(0);
  text("bank: " + score + "P", xPosScore - 80, yPosScore - 25);

  fill(0);
  rect(xPosScore - 425, yPosScore - 65, 190, 60);
  fill(255);
  rect(xPosScore - 420, yPosScore - 60, 180, 50);
  fill(0);
  text("bet: " + bet + "P", xPosScore + -415, yPosScore - 25);
}

function helpbutton() {
  fill(0);
  rect(460, 500, 100, 100);
  fill(255);
  rect(455, 495, 95, 95);
  fill(0);
  text("HELP", 460, 555);
}

function mousePressed() {
  if (
    mouseX >= xPosStart &&
    mouseX <= xPosStart + 200 &&
    mouseY >= yPosStart &&
    mouseY <= yPosStart + 60 &&
    rouletteStart === true
  ) {
    //Das Spiel gestartet werden
    console.log("please be patient");
  }

  //Wenn der "Start Button" gedrückt wird (ohne Auswahl)
  if (
    mouseX >= xPosStart &&
    mouseX <= xPosStart + 200 &&
    mouseY >= yPosStart &&
    mouseY <= yPosStart + 60 &&
    choosered === false &&
    chooseblack === false &&
    choosewhite === false
  ) {
    console.log("choose colour first");
  }
  //Wenn der Score = 0 ist
  if (
    (mouseX >= xPosStart &&
      mouseX <= xPosStart + 200 &&
      mouseY >= yPosStart &&
      mouseY <= yPosStart + 60 &&
      score <= 0) ||
    (mouseX >= xPosStart &&
      mouseX <= xPosStart + 200 &&
      mouseY >= yPosStart &&
      mouseY <= yPosStart + 60 &&
      bet > score)
  ) {
    console.log("you have not enough points... try again later or change bet");
  }

  if (
    (mouseX >= xPosStart &&
      mouseX <= xPosStart + 200 &&
      mouseY >= yPosStart &&
      mouseY <= yPosStart + 60 &&
      choosered === true &&
      score > 0 &&
      bet <= score &&
      rouletteStart === false) ||
    (mouseX >= xPosStart &&
      mouseX <= xPosStart + 200 &&
      mouseY >= yPosStart &&
      mouseY <= yPosStart + 60 &&
      chooseblack === true &&
      score > 0 &&
      bet <= score &&
      rouletteStart === false) ||
    (mouseX >= xPosStart &&
      mouseX <= xPosStart + 200 &&
      mouseY >= yPosStart &&
      mouseY <= yPosStart + 60 &&
      choosewhite === true &&
      score > 0 &&
      bet <= score &&
      rouletteStart === false)
  ) {
    //Das Spiel gestartet werden
    whileroulette = true;
    if (whileroulette === true) {
      score = score - bet;
    }
    whileroulette = false;
    console.log("started game...");
    rouletteStart = true;
  } else {
    rouletteStart = false;
  }

  if (
    mouseX >= xPosRedButton &&
    mouseX <= xPosRedButton + 100 &&
    mouseY >= yPosRedButton &&
    mouseY <= yPosRedButton + 40
  ) {
    console.log("choosed red (bet x 2)");
    choosered = true;
    chooseblack = false;
    choosewhite = false;
  }

  if (
    mouseX >= xPosBlackButton &&
    mouseX <= xPosBlackButton + 100 &&
    mouseY >= yPosBlackButton &&
    mouseY <= yPosBlackButton + 40
  ) {
    console.log("choosed black (bet x 2)");
    chooseblack = true;
    choosered = false;
    choosewhite = false;
  }

  if (
    mouseX >= xPosWhiteButton &&
    mouseX <= xPosWhiteButton + 100 &&
    mouseY >= yPosWhiteButton &&
    mouseY <= yPosWhiteButton + 40
  ) {
    console.log("choosed white (bet x 5)");
    choosewhite = true;
    chooseblack = false;
    choosered = false;
  }

  if (mouseX >= 45 && mouseX <= 45 + 190 && mouseY >= 15 && mouseY <= 75) {
    betcount++;
    bet = betarray[betcount];
    if (betcount > 4) {
      betcount = 0;
    }
  }

  // if (mouseX >= 455 && mouseX <= 555 && mouseY >= 495 && mouseY <= 595) {
  //   console.log("1.  choose a colour first");
  //   console.log("2. than press the 'start' button.");
  //   console.log("");
  //   console.log(
  //     "when u press the 'bet' button, you can change your bet between 1,2, 5, 10 and 100."
  //   );
  //   console.log(
  //     "you bet will be multiplied with 2 (when you choose red or black)"
  //   );
  //   console.log("and 5 (when you choose the white button)");
  //   console.log("");
  //   console.log("the bet has to be bigger than the credits in your bank.");
  //   console.log("please do not press any buttons while the rotation.");
  //   console.log("");
  //   console.log("good luck!");
  // }
}
frameRate(30);
function draw() {
  background(46, 139, 87);
  //Scheibe
  Roulette(0, 0);
  scoreBar(470, 80);
  //Button
  startGameButton(xPosStart, yPosStart);
  redColourButton(xPosRedButton, yPosRedButton);
  blackColourButton(xPosBlackButton, yPosBlackButton);
  whiteColourButton(xPosWhiteButton, yPosWhiteButton);
  // helpbutton();
  rouletteArrow(300, 80);
  startGame();
}
