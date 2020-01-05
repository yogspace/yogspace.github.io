/*
In dieser File habe ich versucht, die Tiles 
random zu spawnen um Code zu sparen.
Ich habe mir dabei Tipps von Coding Train 
auf Youtube angeschaut, habe aber keinen Code uebernommen.
*/

var tiles = [];

var Player = {
  gravity: 1
};

for (i = 0; i < 10; i++) {
  tiles[i] = {
    x: random(0, width),
    y: random(0, height),
    sizeX: 80,
    sizeY: 10,
    color: color(20, 150, 60),
    change: false
  };
}

function normaltile() {
  for (i = 0; i < tiles.length; i++) {
    fill(tiles[i].color);
    rect(tiles[i].x, tiles[i].y, tiles[i].sizeX, tiles[i].sizeY, 20);
    if (tiles[i].change === true) {
      tiles[i].y = tiles[i].y + Player.gravity;
    }
  }
}
function draw() {
  normaltile();
}
