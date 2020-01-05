//This is Doodle Jump!

/*
Das hier war mein erster Versuch. ich wollte alles
ein bisschen schoener gestalten, 
weshalb ich neu angefangen habe. (Siehe DoodleJump2.js)
*/

//The Player
var Player = {
  //position
  x: 300,
  y: 300,
  //max. jump range
  jstart: 500,
  jend: 250,
  //scale
  s: 1,
  //appearence
  width: 40,
  color: color(255, 255, 255),
  //movement
  jumping: false,
  gravity: 20,
  boost: 50
};

//tiles
var tiles = [];

var tilesanmount = random(20, 30);
for (i = 0; i < tilesanmount; i++) {
  //normal tile
  tiles[i] = {
    x: random(0, width),
    y: random(0, height),
    sizeX: 80,
    sizeY: 10,
    color: color(20, 150, 60),
    change: false
  };
}

//The Background
var Environment = {
  num: 0,
  sizeY: 18,
  sizeY2: 15,
  sizeX: 10,
  change: false
};

rectMode(CENTER);

function PlayerFunction() {
  fill(Player.color);
  rect(Player.x, Player.y, Player.s * Player.width, Player.s * Player.width);
}

function PlayerMovement() {
  //Max Jumpingspeed

  if (Player.y >= Player.jstart) {
    Player.y = Player.jstart;
  }

  //Movement left / right
  if (keyIsDown(37)) {
    Player.x = Player.x - 5;
  }
  if (keyIsDown(39)) {
    Player.x = Player.x + 5;
  }

  //jumping and gravity
  if (Player.jumping === true) {
    Player.boost = Player.boost + 0.2;
    // console.log(Player.boost);
    Player.y = Player.y - Player.boost;

    if (Player.boost >= Player.y) {
      Player.boost = Player.y;
    }

    if (Player.y < Player.jend) {
      Player.jumping = false;
      Player.gravity = 0;
      Player.boost = 8;
    }
  }
  if (Player.jumping === false) {
    Player.gravity = Player.gravity + 0.8;
    Player.y = Player.y + Player.gravity;

    if (Player.gravity >= Player.y) {
      Player.gravity = Player.y;
    }

    if (Player.y > Player.jstart) {
      Player.boost = 8;
      Player.gravity = 0;
      Player.jumping = true;
    }
  }
}

//AFFECT of Tiles and Background
function PlayerAffectTile() {
  for (i = 0; i < tiles.length; i++) {
    if (
      Player.x + Player.width / 2 > tiles[i].x - tiles[i].sizeX / 2 &&
      Player.x - Player.width / 2 < tiles[i].x + tiles[i].sizeX / 2 &&
      Player.y >= tiles[i].y - tiles[i].sizeY * 2 &&
      Player.y <= tiles[i].y + tiles[i].sizeY * 2 &&
      Player.gravity > 0
    ) {
      Environment.change = true;
      tiles[i].change = true;
    }
    if (tiles[i].y >= Player.jstart + tiles[i].sizeY / 2 + Player.width / 2) {
      tiles[i].change = false;
    }

    if (Environment.num >= int(Player.jstart) - int(Player.y)) {
      Environment.change = false;
      Environment.num = 0;
    }
  }
}

function Background() {
  background(220);
  stroke(170);

  if (Environment.change === true) {
    Environment.num = Environment.num + 5;
  }

  if (Environment.num >= Environment.sizeY) {
    Environment.num = 0;
  }

  /*
  Ich habe leider keine schoenere Loesung dafuer gefunden.
  Man koennte das mit einer while-Schleife machen, allerdings
  koennte man dann nicht clear() in der draw verwenden.

  vielleicht beim naechsten Mal...

    Das waren meine Ansätze:

    if (Environment.num <= height) {
      Environment.num = Environment.num + Environment.sizeY;
      line(0, Environment.num, width, Environment.num);
      if (Environment.num > height){
          Environment.num = 0;
      }
    }  

    Update. So geht es. Das fixe ich zum Schluss, wenn ich
    Zeit habe:


    while (Environment.num < height * 2) {
      Environment.num = Environment.num + 15;
      stroke(190);
      line(0, Environment.num+Environment.sizeY, width, Environment.num+Environment.sizeY);
      line(Environment.num, 0, Environment.num, height);
    }
    Environment.num = 0;
  */

  //horizontal lines
  line(0, Environment.num, width, Environment.num);
  line(
    0,
    Environment.num + Environment.sizeY,
    width,
    Environment.num + Environment.sizeY
  );
  line(
    0,
    Environment.num + Environment.sizeY * 2,
    width,
    Environment.num + Environment.sizeY * 2
  );
  line(
    0,
    Environment.num + Environment.sizeY * 3,
    width,
    Environment.num + Environment.sizeY * 3
  );
  line(
    0,
    Environment.num + Environment.sizeY * 4,
    width,
    Environment.num + Environment.sizeY * 4
  );
  line(
    0,
    Environment.num + Environment.sizeY * 5,
    width,
    Environment.num + Environment.sizeY * 5
  );
  line(
    0,
    Environment.num + Environment.sizeY * 6,
    width,
    Environment.num + Environment.sizeY * 6
  );
  line(
    0,
    Environment.num + Environment.sizeY * 7,
    width,
    Environment.num + Environment.sizeY * 7
  );
  line(
    0,
    Environment.num + Environment.sizeY * 8,
    width,
    Environment.num + Environment.sizeY * 8
  );
  line(
    0,
    Environment.num + Environment.sizeY * 9,
    width,
    Environment.num + Environment.sizeY * 9
  );
  line(
    0,
    Environment.num + Environment.sizeY * 10,
    width,
    Environment.num + Environment.sizeY * 10
  );
  line(
    0,
    Environment.num + Environment.sizeY * 11,
    width,
    Environment.num + Environment.sizeY * 11
  );
  line(
    0,
    Environment.num + Environment.sizeY * 12,
    width,
    Environment.num + Environment.sizeY * 12
  );
  line(
    0,
    Environment.num + Environment.sizeY * 13,
    width,
    Environment.num + Environment.sizeY * 13
  );
  line(
    0,
    Environment.num + Environment.sizeY * 14,
    width,
    Environment.num + Environment.sizeY * 14
  );
  line(
    0,
    Environment.num + Environment.sizeY * 15,
    width,
    Environment.num + Environment.sizeY * 15
  );
  line(
    0,
    Environment.num + Environment.sizeY * 16,
    width,
    Environment.num + Environment.sizeY * 16
  );
  line(
    0,
    Environment.num + Environment.sizeY * 17,
    width,
    Environment.num + Environment.sizeY * 17
  );
  line(
    0,
    Environment.num + Environment.sizeY * 18,
    width,
    Environment.num + Environment.sizeY * 18
  );
  line(
    0,
    Environment.num + Environment.sizeY * 19,
    width,
    Environment.num + Environment.sizeY * 19
  );
  line(
    0,
    Environment.num + Environment.sizeY * 20,
    width,
    Environment.num + Environment.sizeY * 20
  );
  line(
    0,
    Environment.num + Environment.sizeY * 21,
    width,
    Environment.num + Environment.sizeY * 21
  );
  line(
    0,
    Environment.num + Environment.sizeY * 22,
    width,
    Environment.num + Environment.sizeY * 22
  );
  line(
    0,
    Environment.num + Environment.sizeY * 23,
    width,
    Environment.num + Environment.sizeY * 23
  );
  line(
    0,
    Environment.num + Environment.sizeY * 24,
    width,
    Environment.num + Environment.sizeY * 24
  );
  line(
    0,
    Environment.num + Environment.sizeY * 25,
    width,
    Environment.num + Environment.sizeY * 25
  );
  line(
    0,
    Environment.num + Environment.sizeY * 26,
    width,
    Environment.num + Environment.sizeY * 26
  );
  line(
    0,
    Environment.num + Environment.sizeY * 27,
    width,
    Environment.num + Environment.sizeY * 27
  );
  line(
    0,
    Environment.num + Environment.sizeY * 28,
    width,
    Environment.num + Environment.sizeY * 28
  );
  line(
    0,
    Environment.num + Environment.sizeY * 29,
    width,
    Environment.num + Environment.sizeY * 29
  );
  line(
    0,
    Environment.num + Environment.sizeY * 30,
    width,
    Environment.num + Environment.sizeY * 30
  );
  line(
    0,
    Environment.num + Environment.sizeY * 31,
    width,
    Environment.num + Environment.sizeY * 31
  );
  line(
    0,
    Environment.num + Environment.sizeY * 32,
    width,
    Environment.num + Environment.sizeY * 32
  );
  line(
    0,
    Environment.num + Environment.sizeY * 33,
    width,
    Environment.num + Environment.sizeY * 33
  );
  line(
    0,
    Environment.num + Environment.sizeY * 34,
    width,
    Environment.num + Environment.sizeY * 34
  );
  line(
    0,
    Environment.num + Environment.sizeY * 35,
    width,
    Environment.num + Environment.sizeY * 35
  );
  line(
    0,
    Environment.num + Environment.sizeY * 36,
    width,
    Environment.num + Environment.sizeY * 36
  );
  line(
    0,
    Environment.num + Environment.sizeY * 37,
    width,
    Environment.num + Environment.sizeY * 37
  );
  line(
    0,
    Environment.num + Environment.sizeY * 38,
    width,
    Environment.num + Environment.sizeY * 38
  );
  line(
    0,
    Environment.num + Environment.sizeY * 39,
    width,
    Environment.num + Environment.sizeY * 39
  );
  line(
    0,
    Environment.num + Environment.sizeY * 40,
    width,
    Environment.num + Environment.sizeY * 40
  );
  line(
    0,
    Environment.num + Environment.sizeY * 41,
    width,
    Environment.num + Environment.sizeY * 41
  );
  line(
    0,
    Environment.num + Environment.sizeY * 42,
    width,
    Environment.num + Environment.sizeY * 42
  );
  line(
    0,
    Environment.num + Environment.sizeY * 43,
    width,
    Environment.num + Environment.sizeY * 43
  );

  //Vertikal lines
  line(Environment.sizeY, 0, Environment.sizeY, height);
  line(Environment.sizeY * 2, 0, Environment.sizeY * 2, height);
  line(Environment.sizeY * 3, 0, Environment.sizeY * 3, height);
  line(Environment.sizeY * 4, 0, Environment.sizeY * 4, height);
  line(Environment.sizeY * 5, 0, Environment.sizeY * 5, height);
  line(Environment.sizeY * 6, 0, Environment.sizeY * 6, height);
  line(Environment.sizeY * 7, 0, Environment.sizeY * 7, height);
  line(Environment.sizeY * 8, 0, Environment.sizeY * 8, height);
  line(Environment.sizeY * 9, 0, Environment.sizeY * 9, height);
  line(Environment.sizeY * 10, 0, Environment.sizeY * 10, height);
  line(Environment.sizeY * 11, 0, Environment.sizeY * 11, height);
  line(Environment.sizeY * 12, 0, Environment.sizeY * 12, height);
  line(Environment.sizeY * 13, 0, Environment.sizeY * 13, height);
  line(Environment.sizeY * 14, 0, Environment.sizeY * 14, height);
  line(Environment.sizeY * 15, 0, Environment.sizeY * 15, height);
  line(Environment.sizeY * 16, 0, Environment.sizeY * 16, height);
  line(Environment.sizeY * 17, 0, Environment.sizeY * 17, height);
  line(Environment.sizeY * 18, 0, Environment.sizeY * 18, height);
  line(Environment.sizeY * 19, 0, Environment.sizeY * 19, height);
  line(Environment.sizeY * 20, 0, Environment.sizeY * 20, height);
  line(Environment.sizeY * 21, 0, Environment.sizeY * 21, height);
  line(Environment.sizeY * 22, 0, Environment.sizeY * 22, height);
  line(Environment.sizeY * 23, 0, Environment.sizeY * 23, height);
  line(Environment.sizeY * 24, 0, Environment.sizeY * 24, height);
  line(Environment.sizeY * 25, 0, Environment.sizeY * 25, height);
  line(Environment.sizeY * 26, 0, Environment.sizeY * 26, height);
  line(Environment.sizeY * 27, 0, Environment.sizeY * 27, height);
  line(Environment.sizeY * 28, 0, Environment.sizeY * 28, height);
  line(Environment.sizeY * 29, 0, Environment.sizeY * 29, height);
  line(Environment.sizeY * 30, 0, Environment.sizeY * 30, height);
  line(Environment.sizeY * 31, 0, Environment.sizeY * 31, height);
  line(Environment.sizeY * 32, 0, Environment.sizeY * 32, height);
  line(Environment.sizeY * 33, 0, Environment.sizeY * 33, height);
  line(Environment.sizeY * 34, 0, Environment.sizeY * 34, height);
  line(Environment.sizeY * 35, 0, Environment.sizeY * 35, height);
  line(Environment.sizeY * 36, 0, Environment.sizeY * 36, height);
  line(Environment.sizeY * 37, 0, Environment.sizeY * 37, height);
  line(Environment.sizeY * 38, 0, Environment.sizeY * 38, height);
  line(Environment.sizeY * 39, 0, Environment.sizeY * 39, height);
  line(Environment.sizeY * 40, 0, Environment.sizeY * 40, height);
  line(Environment.sizeY * 41, 0, Environment.sizeY * 41, height);
  line(Environment.sizeY * 42, 0, Environment.sizeY * 42, height);
  line(Environment.sizeY * 43, 0, Environment.sizeY * 43, height);
  line(Environment.sizeY * 44, 0, Environment.sizeY * 44, height);
  line(Environment.sizeY * 45, 0, Environment.sizeY * 45, height);
  line(Environment.sizeY * 46, 0, Environment.sizeY * 46, height);
  line(Environment.sizeY * 47, 0, Environment.sizeY * 47, height);
  line(Environment.sizeY * 48, 0, Environment.sizeY * 48, height);
}

function normaltile() {
  for (i = 0; i < tiles.length; i++) {
    fill(tiles[i].color);
    rect(tiles[i].x, tiles[i].y, tiles[i].sizeX, tiles[i].sizeY, 20);
    if (tiles[i].change === true) {
      //alle tiles gehen zusammen nach unten
      for (i = 0; i < tiles.length; i++) {
        tiles[i].y = tiles[i].y + Player.gravity;
      }
    }
  }
  // if (tiles[i].y / 2 > height) {
  //   tiles[i].y = 0;
  // }
}

function draw() {
  clear();
  Background();
  PlayerFunction();
  PlayerMovement();
  PlayerAffectTile();
  normaltile();
}
