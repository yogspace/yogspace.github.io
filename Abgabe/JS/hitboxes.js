var player1 = {
  x: 200,
  y: width / 2,
  sizeX: 50,
  sizeY: 50,
  color: color(255)
};

var player2 = {
  x: 500,
  y: width / 2,
  sizeX: 50,
  sizeY: 50
};

rectMode(CENTER);
noStroke();

function player() {
  fill(player1.color);
  rect(player1.x, player1.y, player1.sizeX, player1.sizeY);
}

function gegner() {
  fill(255, 0, 0);
  rect(player2.x, player2.y, player2.sizeX, player2.sizeY);
}

function keys() {
  if (keyIsDown(37)) {
    player1.x = player1.x - 5;
  }
  if (keyIsDown(39)) {
    player1.x = player1.x + 5;
  }
  if (keyIsDown(40)) {
    player1.y = player1.y + 5;
  }
  if (keyIsDown(38)) {
    player1.y = player1.y - 5;
  }
}

function kollision() {
  if (
    //unten rechts
    (player1.x + player1.sizeX / 2 > player2.x - player2.sizeX / 2 &&
      player1.x + player1.sizeX / 2 < player2.x + player2.sizeX / 2 &&
      player1.y + player1.sizeY / 2 < player2.y + player2.sizeY / 2 &&
      player1.y + player1.sizeY / 2 > player2.y - player2.sizeY / 2) ||
    // //oben rechts
    // (player1.x + player1.sizeX / 2 > player2.x - player2.sizeX / 2 &&
    //   player1.x + player1.sizeX / 2 < player2.x + player2.sizeX / 2 &&
    //   player1.y - player1.sizeY / 2 < player2.y + player2.sizeY / 2 &&
    //   player1.y - player1.sizeY / 2 > player2.y - player2.sizeY / 2) ||
    //unten links
    (player1.x - player1.sizeX / 2 >= player2.x - player2.sizeX / 2 &&
      player1.x - player1.sizeX / 2 <= player2.x + player2.sizeX / 2 &&
      player1.y + player1.sizeY / 2 <= player2.y + player2.sizeY / 2 &&
      player1.y + player1.sizeY / 2 >= player2.y - player2.sizeY / 2)
    // //oben links
    // (player1.x - player1.sizeX / 2 >= player2.x - player2.sizeX / 2 &&
    //   player1.x - player1.sizeX / 2 <= player2.x + player2.sizeX / 2 &&
    //   player1.y - player1.sizeY / 2 <= player2.y + player2.sizeY / 2 &&
    //   player1.y - player1.sizeY / 2 >= player2.y - player2.sizeY / 2)
  ) {
    player1.color = (0, 255, 0);
  } else {
    player1.color = 255;
  }
}

function draw() {
  clear();
  player();
  gegner();
  kollision();
  keys();
}
