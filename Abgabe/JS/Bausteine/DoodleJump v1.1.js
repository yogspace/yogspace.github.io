/*
This is DoodleJump!
programmed by: Max Weber
*/

//Changable values:
//Start value: anmount of platforms
//normal tiles
var ntilesanmount = random(25, 35);
//moving tiles
var mtilesanmount = random(0, 2);
//transparent tiles
var ttilesanmount = random(5, 20);
//the value for the height when tiles will despawn
var heightdeleted = 25;
var heightadded = 75;

//value for the speed of the tiles
var speed = 3;

var prescreen = {
  show: true,
  buttoncolor: color(20, 150, 60),
  buttonsemicolor: color(20, 120, 60)
};

//Player
player = {
  x: width / 2,
  y: height - height / 5,
  sizeX: 40,
  sizeY: 40,
  color: color(255, 255, 255),
  moving: true,
  jump: true,
  jumpEnd: height - height / 5 - 280,
  jumpStart: height,
  gravity: 3,
  boost: 30,
  //if losing
  loose: false,
  //if affect platform
  affectTile: false,
  leftTiles: false
};

//Background
environment = {
  color: color(220, 200, 200)
};

//Array for normal platforms
var ntiles = [];
//random positions of normal platforms
for (i = 0; i < ntilesanmount; i++) {
  ntiles[i] = {
    x: int(random(40, width - 80)),
    y: int(random(-600, height - 10)),
    sizeX: 80,
    sizeY: 10,
    change: false
  };
}
//this is the first tile the player will interact with..
var ntilesFIRST = {
  x: player.x,
  y: player.y + height * 0.1,
  sizeX: 80,
  sizeY: 10,
  show: true
};

//Array for moving platforms
var mtiles = [];
//random position of moving platforms
for (m = 0; m < mtilesanmount; m = m + 1) {
  mtiles[m] = {
    x: int(random(40, width - 80)),
    y: int(random(-600, height - 10)),
    sizeX: 80,
    sizeY: 10,
    change: false,
    movingR: true
  };
}

//New Moving Platforms
var mtilesNEW = {
  x: int(random(40, width - 80)),
  y: int(random(-600, -10)),
  sizeX: 80,
  sizeY: 10,
  change: false,
  movingR: true
};

//highscore stuff
var highscore = {
  x: 10,
  y: 30,
  score: 0
};

/*
item stuff
*/

//Jumpshoe
var JumpshoeArray = [];
var jumpshoe = {
  x: int(random(40, width - 80)),
  y: int(random(-600, -10)),
  sizeX: 50,
  sizeY: 50,
  color: color(20, 100, 200),
  show: true
};

//Doubblejump
var DoubblejumpArray = [];
var doubblejump = {
  x: int(random(40, width - 80)),
  y: int(random(-600, -10)),
  sizeX: 50,
  sizeY: 50,
  color: color(200, 80, 100),
  show: true
};

//Pong
var PongArray = [];
var Pong = {
  x: int(random(40, width - 80)),
  y: int(random(-20000, -10000)),
  sizeX: 50,
  sizeY: 50,
  color: color(0, 100, 100),
  show: true
};

//Coins
var Coins = 100;
var CoinTimer = 0;
var Coin = {
  x: int(random(40, width - 80)),
  y: int(random(-600, -10)),
  sizeX: 20,
  sizeY: 20,
  color: color(250, 250, 0),
  show: true,
  weight: 5
};

//basic settings
rectMode(CENTER);
textFont("Calibri");
textAlign(LEFT);
textSize(20);
stroke(0, 0, 0, 50);
//factors for deltion/adding of platforms
var factordel = [];
var delntile = 0;
var deletetile = false;

var factoradd = [];
var addmtile = 0;
var addtile = false;

//The Prescreen
function PrescreenFunction() {
  if (prescreen.show === true) {
    player.moving = false;
    fill(environment.color);
    rect(0, 0, width * 2, height * 2);

    fill(prescreen.buttonsemicolor);
    rect(width / 2, height - 100, 300, 100, 20);
    fill(prescreen.buttoncolor);
    rect(width / 2, height - 103, 297, 95, 20);
    fill(255, 255, 255);
    textSize(50);
    text("play", width / 2 - 35, height - 90);
    textSize(20);

    if (mouseX >= 160 && mouseX <= 460 && mouseY >= 512 && mouseY <= 613) {
      prescreen.buttoncolor = color(20, 180, 60);
      prescreen.buttonsemicolor = color(20, 150, 60);
      if (mouseIsPressed === true) {
        prescreen.show = false;
        player.x = width / 2;
        player.y = height - height / 5;
        player.jump = true;
        player.jumpEnd = height - height / 5 - 280;
        player.jumpStart = height;
        player.moving = true;
        Coins = 100;
        highscore.score = 0;
      }
    } else {
      prescreen.buttoncolor = color(20, 150, 60);
      prescreen.buttonsemicolor = color(20, 120, 60);
    }
  }
}

//The Player and first tile
function PlayerFunction() {
  fill(player.color);
  rect(player.x, player.y, player.sizeX, player.sizeY);

  //first tile
  if (ntilesFIRST.show === true) {
    fill(20, 150, 60);
    rect(
      ntilesFIRST.x,
      ntilesFIRST.y,
      ntilesFIRST.sizeX,
      ntilesFIRST.sizeY,
      20
    );
    if (player.affectTile === true) {
      ntilesFIRST.y = ntilesFIRST.y + player.gravity;
      if (ntilesFIRST.y >= height + ntilesFIRST.sizeY) {
        ntilesFIRST.show = false;
      }
    }
  }
  //Gravitation and boost of player
  if (player.jump === true && player.moving === true) {
    player.gravity = 3;
    player.boost = player.boost - 1.5;
    if (player.boost <= 0) {
      player.jump = false;
    }
  }
  if (player.jump === false && player.moving === true) {
    player.boost = 30;
    player.gravity = player.gravity + 0.75;
    if (player.gravity >= 25) {
      player.jump = true;
    }
  }
  //Jump animation
  if (player.jump === true && player.moving === true) {
    player.y = player.y - player.boost;
    if (player.y <= player.jumpEnd) {
      player.jump = false;
    }
  }
  if (player.jump === false && player.moving === true) {
    player.y = player.y + player.gravity;
    if (player.y >= player.jumpStart) {
      player.jump = true;
    }
  }

  //Movement of player
  if (keyIsPressed === true) {
    if (keyIsDown(37)) {
      if (player.moving === true) {
        player.x = player.x - 7;
      } else {
        player.x = player.x - 1;
      }
    }
    if (keyIsDown(39)) {
      if (player.moving === true) {
        player.x = player.x + 7;
      } else {
        player.x = player.x + 1;
      }
    }
  }

  //Border left / right
  if (
    player.x - player.sizeX / 2 <= 0 &&
    keyIsDown(37) &&
    player.moving === true
  ) {
    player.x = width - player.sizeX / 2;
  }
  if (
    player.x + player.sizeX / 2 >= width &&
    keyIsDown(39) &&
    player.moving === true
  ) {
    player.x = player.sizeX / 2;
  }

  //if loosing:
  if (
    (player.moving === true && player.y - player.sizeY / 2 >= height - 40) ||
    Coins <= 0
  ) {
    player.moving = false;
    CoinTimer = 0;
    prescreen.show = true;
  }
}

//Player affect tiles
function PlayerAffectPlatform() {
  //weiterkommen
  for (m = 0; m < mtiles.length; m = m + 1) {
    for (i = 0; i < ntiles.length; i = i + 1) {
      if (
        (ntiles[i].y + ntiles[i].sizeY / 2 < player.jumpStart &&
          ntiles[i].y - ntiles[i].sizeY / 2 > height - 40) ||
        (mtiles[m].y + mtiles[m].sizeY / 2 < player.jumpStart &&
          mtiles[m].y - mtiles[m].sizeY / 2 > height - 40)
      ) {
        player.leftTiles = true;
        console.log("Hi");
      } else {
        player.leftTiles = false;
        console.log("no");
      }

      if (
        int(player.x) + player.sizeX / 2 > ntiles[i].x - ntiles[i].sizeX / 2 &&
        int(player.x) - player.sizeX / 2 < ntiles[i].x + ntiles[i].sizeX / 2 &&
        int(player.y) + player.sizeY / 2 > ntiles[i].y - ntiles[i].sizeY * 2 &&
        int(player.y) + player.sizeY / 2 < ntiles[i].y - ntiles[i].sizeY / 2
      ) {
        if (
          player.jump === false &&
          player.y <= player.jumpStart &&
          player.moving === true
        ) {
          player.affectTile = true;
          player.y = ntiles[i].y - ntiles[i].sizeY / 2 - player.sizeY / 2;
        }
      }

      if (
        int(player.x) + player.sizeX / 2 > mtiles[m].x - mtiles[m].sizeX / 2 &&
        int(player.x) - player.sizeX / 2 < mtiles[m].x + mtiles[m].sizeX / 2 &&
        int(player.y) + player.sizeY / 2 > mtiles[m].y - mtiles[m].sizeY * 2 &&
        int(player.y) + player.sizeY / 2 < mtiles[m].y - mtiles[m].sizeY / 2
      ) {
        if (
          player.jump === false &&
          player.y <= player.jumpStart &&
          player.moving === true
        ) {
          player.affectTile = true;
          player.y = mtiles[m].y - mtiles[m].sizeY / 2 - player.sizeY / 2;
        }
      }

      if (player.y >= player.jumpStart) {
        player.affectTile = false;
      }
    }

    if (player.affectTile === true || player.leftTiles === true) {
      player.jumpStart = height - height / 5 + 30;
    } else {
      player.jumpStart = height;
    }
  }
}

//Itembar
function itembar() {
  fill(255);
  rectMode(CORNER);
  rect(0, height - 40, width, 70, 50);
  rectMode(CENTER);

  //Jumpshoe
  fill(jumpshoe.color);
  rect(100, height - 20, jumpshoe.sizeX / 2, jumpshoe.sizeY / 2, 5);
  fill(0);
  text(JumpshoeArray.length, 120, height - 13);

  //Doubblejump
  fill(doubblejump.color);
  rect(200, height - 20, jumpshoe.sizeX / 2, jumpshoe.sizeY / 2, 5);
  fill(0);
  text(DoubblejumpArray.length, 220, height - 13);

  //Coin
  fill(Coin.color);
  rect(300, height - 20, Coin.sizeX / 2, Coin.sizeY / 2, 5);
  fill(0);
  text(Coins, 310, height - 13);
}

//Items on the map
function items() {
  //Jumpshoe
  fill(jumpshoe.color);
  if (jumpshoe.show === true) {
    rect(jumpshoe.x, jumpshoe.y, jumpshoe.sizeX, jumpshoe.sizeY, 20);

    if (player.affectTile === true) {
      jumpshoe.y = jumpshoe.y + player.gravity;
    }
    if (jumpshoe.y >= height + jumpshoe.sizeY) {
      jumpshoe.x = int(random(40, width - 80));
      jumpshoe.y = int(random(-10000, -2000));
    }

    if (
      player.y <= jumpshoe.y + jumpshoe.sizeY &&
      player.y >= jumpshoe.y - jumpshoe.sizeY &&
      player.x <= jumpshoe.x + jumpshoe.sizeX &&
      player.x >= jumpshoe.x - jumpshoe.sizeX
    ) {
      jumpshoe.show = false;
      JumpshoeArray.push(1);
      jumpshoe.x = int(random(40, width - 80));
      jumpshoe.y = int(random(-10000, -2000));
      jumpshoe.show = true;
    }
  }

  //Doubblejump
  fill(doubblejump.color);
  if (doubblejump.show === true) {
    rect(
      doubblejump.x,
      doubblejump.y,
      doubblejump.sizeX,
      doubblejump.sizeY,
      20
    );

    if (player.affectTile === true) {
      doubblejump.y = doubblejump.y + player.gravity;
    }
    if (doubblejump.y >= height + doubblejump.sizeY) {
      doubblejump.x = int(random(40, width - 80));
      doubblejump.y = int(random(-10000, -2000));
    }

    if (
      player.y <= doubblejump.y + doubblejump.sizeY &&
      player.y >= doubblejump.y - doubblejump.sizeY &&
      player.x <= doubblejump.x + doubblejump.sizeX &&
      player.x >= doubblejump.x - doubblejump.sizeX
    ) {
      doubblejump.show = false;
      DoubblejumpArray.push(1);
      doubblejump.x = int(random(40, width - 80));
      doubblejump.y = int(random(-10000, -2000));
      doubblejump.show = true;
    }
  }

  //Pong
  fill(Pong.color);
  if (Pong.show === true) {
    rect(Pong.x, Pong.y, Pong.sizeX, Pong.sizeY, 20);

    if (player.affectTile === true) {
      Pong.y = Pong.y + player.gravity;
    }
    if (Pong.y >= height + Pong.sizeY) {
      Pong.x = int(random(40, width - 80));
      Pong.y = int(random(-20000, -1000));
    }

    if (
      player.y <= Pong.y + Pong.sizeY &&
      player.y >= Pong.y - Pong.sizeY &&
      player.x <= Pong.x + Pong.sizeX &&
      player.x >= Pong.x - Pong.sizeX
    ) {
      Pong.show = false;
    }
  }

  //Coin
  fill(Coin.color);
  if (Coin.show === true) {
    rect(Coin.x, Coin.y, Coin.sizeX, Coin.sizeY, 20);

    if (player.affectTile === true) {
      Coin.y = Coin.y + player.gravity;
    }
    if (Coin.y >= height + Coin.sizeY) {
      Coin.x = int(random(40, width - 80));
      Coin.y = int(random(-600, -100));
    }

    if (
      player.y <= Coin.y + Coin.sizeY &&
      player.y >= Coin.y - Coin.sizeY &&
      player.x <= Coin.x + Coin.sizeX &&
      player.x >= Coin.x - Coin.sizeX
    ) {
      Coin.show = false;
      Coins = Coins + Coin.weight;
      Coin.x = int(random(40, width - 80));
      Coin.y = int(random(-6000, -1000));
      Coin.show = true;
    }
  }

  CoinTimer = CoinTimer + 1;
  if (CoinTimer >= 30 && player.y - player.sizeY / 2 < height - 40) {
    Coins = Coins - 1;
    CoinTimer = 0;
  }
}

//Different functions of the items
function itemfunction() {
  if (Pong.show === false) {
    player.moving = false;
    Pong.x = int(random(40, width - 80));
    Pong.y = int(random(-10000, -2000));
    // Pong.show = true;
  }
}

//Characteristics of platforms
//basic Platform
function normaltile() {
  for (i = 0; i < ntiles.length; i++) {
    fill(20, 150, 60);
    rect(ntiles[i].x, ntiles[i].y, ntiles[i].sizeX, ntiles[i].sizeY, 20);
  }
}

//moving Platform X-Direction
function movingtile() {
  for (m = 0; m < mtiles.length; m++) {
    fill(20, 150, 150);
    rect(mtiles[m].x, mtiles[m].y, mtiles[m].sizeX, mtiles[m].sizeY, 20);

    if (player.moving === true) {
      if (mtiles[m].movingR === true) {
        mtiles[m].x = mtiles[m].x + 2;
      } else {
        mtiles[m].x = mtiles[m].x - 2;
      }
      if (mtiles[m].x >= width - mtiles[m].sizeX / 2) {
        mtiles[m].movingR = false;
      }
      if (mtiles[m].x <= 0 + mtiles[m].sizeX / 2) {
        mtiles[m].movingR = true;
      }
    }
  }
}

//Function of platforms (spawns/despawns,randomizer etc)
function movetiles() {
  //normal platforms
  for (i = 0; i < ntiles.length; i++) {
    if (player.affectTile === true) {
      ntiles[i].y = ntiles[i].y + player.gravity;
      highscore.score = highscore.score + 0.01;
    }
    if (ntiles[i].y > height + ntiles[i].sizeY) {
      //Where and if tiles can be respawned
      if (deletetile === true) {
        ntiles.splice(i, 1);
        //console.log("deleted");
        //console.log(ntiles.length);
        deletetile = false;
      } else {
        //console.log("else");
        ntiles[i].y = 0 - random(0, 600);
        ntiles[i].x = random(ntiles[i].sizeX / 2, width - ntiles[i].sizeX / 2);
      }
    }
  }
  //moving platforms
  for (m = 0; m < mtiles.length; m++) {
    if (player.affectTile === true) {
      mtiles[m].y = mtiles[m].y + player.gravity;
    }
    if (mtiles[m].y > height + ntiles[m].sizeY) {
      if (addtile === true) {
        //ich definiere hier das Objekt nochmal,
        //damit jedes Mal wirklich ein neues Objekt erstellt wird.
        mtilesNEW = {
          x: int(random(40, width - 80)),
          y: int(random(-600, -10)),
          sizeX: 80,
          sizeY: 10,
          change: false,
          movingR: true
        };
        mtiles.push(mtilesNEW);
        console.log(mtiles.length);
        //console.log("Added");
        addtile = false;
      } else {
        mtiles[m].y = 0 - random(2, 600);
        mtiles[m].x = int(
          random(mtiles[m].sizeX / 2, width - mtiles[m].sizeX / 2)
        );
      }
    }
  }
}

//Delete Platforms (Delete / Add)
function changetiles() {
  //delntile is 0 like the highscore
  if (delntile < highscore.score && ntiles.length >= 10) {
    //then delntile is 50. if the highscore is 25, delntile will be 100 ..
    delntile = delntile + heightdeleted;
    deletetile = true;
    factordel.push(delntile);
  }
  //addtile is 0 like the highscore..
  //Wenn ich mehr als 10 mache, dann stürzt das ganze Game ab...
  if (addmtile < highscore.score && mtiles.length < 10) {
    //heightadded = the value of the height wenn tiles will be added
    addmtile = addmtile + heightadded;
    addtile = true;
    factoradd.push(addmtile);
  }
}

//Background
function environmentfunction() {
  background(environment.color);
}

//Highscore
function highscorefunction() {
  fill(30);
  text("Height: " + int(highscore.score) + "m", highscore.x, highscore.y);
}

//function draw
function draw() {
  clear();
  environmentfunction();
  //Different platforms
  normaltile();
  movingtile();

  //Player
  PlayerFunction();
  PlayerAffectPlatform();

  movetiles();
  changetiles();

  //Item stuff
  items();
  itembar();
  itemfunction();
  highscorefunction();
  PrescreenFunction();
}
