function setup() {
  var canvas = createCanvas(622, 600);
  canvas.parent("sketch-holder-8ball");
}

console.log("Stelle eine Frage und drücke SPACE um die Antwort zu erhalten. ");

//Variablen

var xss = 400;
var yss = 400;
var zufall = 0;
var counter = 0;
var showPopup = false;
var speech;

var x = 400;
var y = 400;
var s = 1;

//Randomwert
// 10 = JA // 5 = NEIN // 100 = VIELLEICHT
var r = [10, 50, 100];

var rj = [
  "Ja.",
  "Klar.",
  "Immer doch!",
  "Wahrscheinlich schon.",
  "Das ist richtig."
];
var rn = [
  "Nope.",
  "Niemals.",
  "In keinem Universum.",
  "Spinnst du?",
  "Ich denke nicht."
];
var rv = [
  "Eventuell.",
  "Das weiß niemand.",
  "42.",
  "Woher soll ich das wissen?",
  "Keine Ahnung, man!"
];

function hintergrund() {
  background(34, 139, 34);
  //Rahmen
  noStroke();
  fill(139, 69, 19);
  rect(0, 0, 30, 800);
  rect(0, 0, 700, 20);
  rect(500, 0, 300, 800);
  fill(0);
  rect(530, 0, 300, 800);
  fill(0);
  ellipse(34, 24, 30, 30);
  ellipse(496, 24, 30, 30);
  //Rote Kugel
  fill(255, 0, 0);
  ellipse(470, 500, 25, 25);
}

// yellow and black balls
function ball(x, y, r, g, b) {
  fill(r, g, b);
  ellipse(x, y, 25, 25);
}

//Randomizer
function keyPressed() {
  if (keyCode === 32) {
    showPopup = false;
    xss = 400;
    yss = 400;
    zufall = random(r);
    //JA
    if (zufall === 10) {
      speech = random(rj);
    }

    //NEIN
    if (zufall === 50) {
      speech = random(rn);
    }

    //VIELLEICHT
    if (zufall === 100) {
      speech = random(rv);
    }
  }
}

function popup() {
  rect(20, 20, 490, 250, 30);
  fill(0);
  textSize(32);
  textAlign(CENTER);
  text(speech, 260, 150);
}

//Schläger
function ss() {
  fill(205, 133, 63);
  quad(
    xss - s * 90,
    yss - s * 90,
    xss - s * 100,
    yss - s * 85,
    xss + s * 300,
    yss + s * 300,
    xss + s * 340,
    yss + s * 300
  );
  fill(160, 82, 45);
  quad(
    xss - s * 95,
    yss - s * 88,
    xss - s * 100,
    yss - s * 85,
    xss + s * 300,
    yss + s * 300,
    xss + s * 330,
    yss + s * 300
  );
  fill(255, 245, 238);
  quad(
    xss - s * 90,
    yss - s * 90,
    xss - s * 100,
    yss - s * 85,
    xss - s * 110,
    yss - s * 95,
    xss - s * 101,
    yss - s * 101
  );
  if (zufall > 0) {
    counter = counter + 1;
    if (counter < 50) {
      xss = xss + 2;
      yss = yss + 2;
    } else if (counter < 66) {
      xss = xss - 10;
      yss = yss - 10;
    } else {
      counter = 0;
      zufall = 0;
      showPopup = true;
    }
  }
}

//Option 1

function draw() {
  hintergrund();
  //Schläger
  ss();
  //yellow ball
  ball(x - 240, y - 230, 0, 0, 0);
  //black ball
  ball(x - 175, y - 160, 255, 255, 255);
  if (showPopup === true) {
    popup();
  }
}
