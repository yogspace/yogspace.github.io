//"IT" - Stephen King

function setup() {
  var canvas = createCanvas(600, 580);
  canvas.parent("sketch-holder-halloween");
}

var x = 250;
var y = 250;
var s = 1;

function halloween() {
  background(160);

  //Neck
  noStroke();
  fill(250, 100, 100);
  ellipse(x + s * 50, y + s * 200, s * 270, s * 350);
  fill(255, 60, 60);
  ellipse(x + s * 50, y + s * 200, s * 250, s * 340);
  fill(250, 100, 100);
  rect(x + s * 43, y + s * 270, s * 10, s * 70);

  //Face
  noStroke();
  fill(255, 255, 255);
  ellipse(x + s * 50, y, s * 350, s * 400);
  ellipse(x + s * 50, y + s * 1, s * 400, s * 300);
  ellipse(x + s * 50, y - s * 50, s * 420, s * 300);
  ellipse(x + s * 50, y + s * 130, s * 250, s * 200);
  ellipse(x + s * 50, y + s * 140, s * 200, s * 300);
  quad(
    x - s * 50,
    y + s * 100,
    x - s * 101,
    y + s * 100,
    x - s * 18,
    y + s * 250,
    x,
    y + s * 250
  );
  quad(
    x + s * 150,
    y + s * 100,
    x + s * 201,
    y + s * 100,
    x + s * 118,
    y + s * 250,
    x + 100,
    y + s * 250
  );
  fill(210);
  ellipse(x + s * 50, y - s * 250, s * 400, s * 300);

  //Mouth
  noStroke();
  fill(150, 0, 0);
  ellipse(x + s * 50, y + s * 190, s * 110, s * 140);
  ellipse(x + s * 5, y + s * 190, s * 50, s * 90);
  ellipse(x + s * 95, y + s * 190, s * 50, s * 90);
  push();
  translate(x + s * 2, y + s * 230);
  fill(255, 255, 255);
  rotate(2.4);
  ellipse(s * 0, s * 0, s * 20, s * 90);
  pop();
  push();
  translate(x + 103, y + s * 230);
  fill(255, 255, 255);
  rotate(0.8);
  ellipse(s * 0, s * 0, s * 30, s * 90);
  pop();
  fill(100, 0, 0);
  ellipse(x + s * 50, y + s * 167, s * 160, s * 110);
  fill(80, 0, 0);
  ellipse(x + s * 50, y + s * 245, s * 40, s * 50);
  push();
  translate(x + s * 2, y + s * 230);
  fill(255, 255, 255);
  rotate(2.4);
  ellipse(s * 0, s * 0, s * 20, s * 90);
  pop();
  push();
  translate(x + 103, y + s * 230);
  fill(255, 255, 255);
  rotate(0.8);
  ellipse(s * 0, s * 0, s * 30, s * 90);
  pop();
  fill(150, 0, 0);
  ellipse(x + s * 50, y + s * 245, s * 40, s * 50);

  //Details

  /*
HIER IST IRGENDWO EIN FEHLER IM SCALE
*/
  push();
  translate(x - s * 14, y + s * 204);
  fill(255, 255, 255);
  rotate(2.4);
  ellipse(s * 0, s * 0, s * 20, s * 100);
  pop();
  push();
  translate(x + s * 115, y + s * 204);
  fill(255, 255, 255);
  rotate(0.8);
  ellipse(s * 0, s * 0, s * 20, s * 100);
  pop();
}

//Teeth
function teeth1(x, y) {
  fill(0);
  rect(x + s * 20, y + s * 181, s * 23, s * 30, s * 10);
  fill(255);
  rect(x + s * 25, y + s * 181, s * 18, s * 28, s * 3);
}

function teeth2(x, y) {
  fill(0);
  rect(x + s * 20, y + s * 181, s * 23, s * 30, s * 10);
  fill(255);
  quad(
    x + s * 42,
    y + s * 211,
    x + s * 24,
    y + s * 201,
    x + s * 24,
    y + s * 181,
    x + s * 42,
    y + s * 181
  );
}

function stuff1() {
  fill(255);
  ellipse(x + s * 50, y + s * 110, s * 250, s * 150);
  fill(200);
  quad(
    x - s * 30,
    y + s * 165,
    x,
    y + s * 135,
    x + s * 100,
    y + s * 135,
    x + s * 130,
    y + s * 165
  );
  fill(255);
  quad(
    x - s * 25,
    y + s * 165,
    x + s * 8,
    y + s * 135,
    x + s * 92,
    y + s * 135,
    x + s * 125,
    y + s * 165
  );
  fill(200);
  ellipse(x + s * 50, y + s * 170, s * 140, s * 30);
  fill(255);
  ellipse(x + s * 50, y + s * 164, s * 140, s * 30);

  //Nose
  noStroke();
  fill(100, 0, 0);
  ellipse(x + s * 25, y + s * 120, s * 40, s * 40);
  ellipse(x + s * 75, y + s * 120, s * 40, s * 40);
  ellipse(x + s * 50, y + s * 130, s * 60, s * 50);
  ellipse(x + s * 50, y + s * 115, s * 70, s * 50);
  fill(0);
  ellipse(x + s * 20, y + s * 125, s * 20, s * 20);
  ellipse(x + s * 80, y + s * 125, s * 20, s * 20);
  fill(150, 0, 0);
  ellipse(x + s * 25, y + s * 115, s * 35, s * 30);
  ellipse(x + s * 75, y + s * 115, s * 35, s * 30);
  ellipse(x + s * 50, y + s * 135, s * 50, s * 30);
  ellipse(x + s * 50, y + s * 115, s * 70, s * 50);
}
//Eyes
function eye(x, y) {
  fill(100, 0, 0);
  ellipse(x, y, s * 85, s * 70);
  fill(255);
  ellipse(x, y - s * 20, s * 85, s * 35);
  ellipse(x, y - s * 5, s * 60, s * 60);
  fill(0);
  ellipse(x, y + s * 5, s * 40, s * 40);
  fill(255, 215, 0);
  ellipse(x, y + s * 5, s * 32, s * 32);
  fill(0);
  ellipse(x, y + s * 10, s * 20, s * 30);
  fill(200);
  ellipse(x, y - s * 17, s * 140, s * 40);
  fill(255);
  ellipse(x, y - s * 22, s * 140, s * 40);
}
eye(x - s * 25, y + s * 55);
eye(x + s * 125, y + s * 55);

function stuff2() {
  //Wangen
  push();
  fill(200);
  translate(x - s * 50, y);
  rotate(0.5);
  ellipse(0, 0, s * 30, s * 100);
  pop();

  push();
  fill(255);
  translate(x - s * 71, y + s * 22);
  rotate(0.26);
  ellipse(0, 0, s * 10, s * 40);
  pop();

  push();
  fill(200);
  translate(x - s * 10, y + s * 227);
  rotate(2.5);
  ellipse(0, 0, s * 30, s * 100);
  pop();
  push();
  fill(255);
  translate(x - s * 5, y + s * 227);
  rotate(2.5);
  ellipse(0, 0, s * 30, s * 100);
  pop();

  push();
  fill(200);
  translate(x + s * 110, y + s * 227);
  rotate(0.5);
  ellipse(0, 0, s * 30, s * 100);
  pop();
  push();
  fill(255);
  translate(x + s * 105, y + s * 227);
  rotate(0.5);
  ellipse(0, 0, s * 30, s * 100);
  pop();

  //Rote Striche
  fill(200, 0, 0);
  quad(
    x - s * 33,
    y,
    x - s * 37,
    y,
    x - s * 50,
    y + s * 53,
    x - s * 40,
    y + s * 53
  );
  quad(
    x + s * 133,
    y,
    x + s * 137,
    y,
    x + s * 150,
    y + s * 53,
    x + s * 140,
    y + s * 53
  );
  stroke(200, 0, 0);
  strokeWeight(9);
  noFill();
  curve(
    x - s * 200,
    y + s * 100,
    x - s * 48,
    y + s * 80,
    x - s * 30,
    y + s * 173,
    x + s * 40,
    y + s * 180
  );
  curve(
    x + s * 250,
    y + s * 100,
    x + s * 148,
    y + s * 80,
    x + s * 130,
    y + s * 173,
    x + s * 0,
    y + s * 180
  );

  //Hair
  noStroke();
  fill(170, 70, 0);
  quad(
    x + 35,
    y - s * 80,
    x + s * 75,
    y - s * 80,
    x + s * 240,
    y - s * 250,
    x - s * 130,
    y - s * 250
  );
  ellipse(x - s * 100, y - s * 240, s * 200, s * 150);
  ellipse(x + s * 200, y - s * 240, s * 200, s * 150);
  ellipse(x + s * 50, y - s * 240, s * 200, s * 150);
  ellipse(x - s * 120, y - s * 180, s * 200, s * 150);
  ellipse(x + s * 220, y - s * 180, s * 200, s * 150);
  ellipse(x - s * 50, y - s * 220, s * 200, s * 150);
  ellipse(x + s * 150, y - s * 220, s * 200, s * 150);
  ellipse(x - s * 250, y - s * 240, s * 200, s * 150);
  ellipse(x + s * 350, y - s * 240, s * 200, s * 150);
  ellipse(x - s * 150, y - s * 100, s * 100, s * 130);
  ellipse(x + s * 250, y - s * 100, s * 100, s * 130);
  ellipse(x - s * 180, y - s * 150, s * 100, s * 130);
  ellipse(x + s * 270, y - s * 150, s * 100, s * 130);
  fill(250, 70, 0);
  quad(
    x + 30,
    y - s * 94,
    x + s * 65,
    y - s * 90,
    x + s * 240,
    y - s * 250,
    x - s * 130,
    y - s * 250
  );
  ellipse(x - s * 120, y - s * 190, s * 200, s * 150);
  ellipse(x + s * 220, y - s * 190, s * 200, s * 150);
  ellipse(x - s * 250, y - s * 250, s * 200, s * 150);
  ellipse(x + s * 350, y - s * 250, s * 200, s * 150);
  ellipse(x - s * 156, y - s * 110, s * 90, s * 130);
  ellipse(x + s * 246, y - s * 110, s * 90, s * 130);
  ellipse(x - s * 180, y - s * 150, s * 100, s * 130);
  ellipse(x + s * 260, y - s * 150, s * 90, s * 130);
  fill(255);
  quad(x - s * 50, y, x, y, x, y - s * 170, x - s * 30, y - s * 50);
  quad(
    x + s * 100,
    y - s * 30,
    x + s * 130,
    y - s * 30,
    x + s * 90,
    y - s * 190
  );

  //Background2

  fill(105, 105, 105);
  rect(x - s * 250, y + s * 330, s * 800, s * 25);
  rect(x - s * 250, y - s * 250, s * 800, s * 25);

  //Speechbubble
  fill(200);
  ellipse(x - s * 140, y + s * 250, s * 200, s * 130);
  quad(
    x - s * 55,
    y + s * 285,
    x - s * 80,
    y + s * 205,
    x + s * 10,
    y + s * 210
  );
  fill(255);
  ellipse(x - s * 137, y + s * 245, s * 190, s * 120);
  quad(
    x - s * 55,
    y + s * 276,
    x - s * 80,
    y + s * 205,
    x + s * 0,
    y + s * 212
  );

  textSize(32);
  textFont("typewriter");
  fill(0);
  strokeWeight(200);
  text("HELLO,", x - 200, y + 230);
  text("Georgie!", x - 200, y + 270);

  strokeWeight(200);
}

function draw() {
  halloween();
  teeth1(x + s * 46, y - s * 10);
  teeth1(x + s * 25, y + s * 1);
  teeth1(x + s * 4, y + s * 1);
  teeth2(x - s * 17, y - s * 10);
  stuff1();
  eye(x - s * 25, y + s * 55);
  eye(x + s * 125, y + s * 55);
  stuff2();
}
