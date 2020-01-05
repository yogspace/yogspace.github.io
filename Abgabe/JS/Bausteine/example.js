var mtiles = [];
rectMode(CENTER);

var x = 0;

for (m = 0; m < 10; m = m + 1) {
  mtiles[m] = {
    x: random(40, 500),
    y: random(10, 500),
    sizeX: 80,
    sizeY: 10,
    change: false,
    movingR: true,
    speed: 5
  };
}
//Hier ist die Bewegung auf der x-Achse.
//Die "neuen" Tiles, die bei einem Mausklick
//erscheinen sollten, sind allerdings schneller..
function movingtiles() {
  for (m = 0; m < mtiles.length; m = m + 1) {
    fill(255);
    rect(mtiles[m].x, mtiles[m].y, mtiles[m].sizeX, mtiles[m].sizeY, 20);
    if (mtiles[m].movingR === true) {
      //hier müsste der Fehler sein:
      mtiles[m].x = mtiles[m].x + mtiles[m].speed;
      //das hier funktioniert auch.
      if (mtiles[m].x >= width) {
        mtiles[m].movingR = false;
      }
    }
    if (mtiles[m].movingR === false) {
      //Hier nochmal das gleiche in die andere Richtung
      mtiles[m].x = mtiles[m].x - mtiles[m].speed;
      if (mtiles[m].x <= 0) {
        mtiles[m].movingR = true;
      }
    }
  }
}
//hier ist nur die Bewegung auf der y-Achse
function movement() {
  if (keyIsPressed === true) {
    for (m = 0; m < mtiles.length; m = m + 1) {
      mtiles[m].y = mtiles[m].y + 1;
    }
  }
}

//Das hier ist der Code, den ich nicht verstehe
// und der auch noch nicht richtig funktioniert...
function mouseClicked() {
  console.log(mtiles.length);
  console.log(mtiles.length);
  mtiles.push({
    x: random(40, 500),
    y: random(10, 500),
    sizeX: 80,
    sizeY: 10,
    change: false,
    movingR: true,
    speed: 5
  });
  console.log(mtiles[mtiles.length - 1]);

  mtiles[mtiles.length].x = random(0, width);
  mtiles[mtiles.length].y = random(0, height);
  mtiles[mtiles.length].speed = 5;
}

function draw() {
  clear();
  movingtiles();
  movement();
}
