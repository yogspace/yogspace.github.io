/*
This is DoodleJump!

programmed by: Max Weber

Version: 1.3

 

folgende Bugs müssen noch gefixt werden:

- Tiles können nicht auf gleicher Position spawnen
- Spieler fällt durch gar keine Tiles mehr durch
- Spieler verliert manchmal nicht, obwohl er ganz unten ist
- Prüfung ob sich Spieler auf Tiles befindet soll präziser sein
- hängt sich manchmal auf (im Godmode)
- player.jumpEnd ist manchmal unpräzise


- Stats
- Item Shield
- Background
- Images (lava)
- Sound
- Pong
https://p5js.org/reference/#/p5/max
last2rounds


If you jump into an enemy, you will loose a life. If you
jump from the top, he will despawn and you will get Coins.

instructions:
shift:          choose item
space:          use item
right arrow:    go right
left arrow:     go left
0:              developer stats


   
 
thanks!
*/

//Changable values:
//Start value: anmount of platforms
//normal tiles
var ntilesanmount = random(25, 45);
//moving tiles
var mtilesanmount = random(0, 2);
//the value for the height when tiles will despawn
var heightdeleted = 20;
var heightadded = 75;

//value for the speed of the tiles
var speed = 3;

var prescreen = {
  show: true,
  showshop: false,
  buttoncolor: color(20, 150, 60),
  buttonsemicolor: color(20, 120, 60),
  buttoncolorshop: color(20, 150, 60),
  buttonsemicolorshop: color(20, 120, 60),
  buttoncolorMODI: color(20, 150, 60),
  buttonactivated: false,
  buttontimer: 0,
  delay: 0
};

//Player
player = {
  x: width / 2,
  y: height / 3 + 300,
  sizeX: 40,
  sizeY: 40,
  color: color(255, 255, 255),
  moving: true,
  jump: true,
  jumpEnd: 100,
  jumpStart: height,
  gravity: 3,
  boost: 30,
  falling: true,
  //if affect platform
  affectTile: false
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
var ntilesNEW = {
  x: int(random(40, width - 80)),
  y: int(random(-600, height - 10)),
  sizeX: random(20, 90),
  sizeY: random(20, 90),
  change: false
};

//this is the first tile the player will interact with..
var ntilesFIRST = {
  x: width / 2,
  y: height / 2 + height * 0.1,
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
var rounds = [];
var highscore = {
  x: 10,
  y: 30,
  score: 0,
  total: 0,
  adding: true
};

/*
item stuff
*/

//Jumpshoe
var JumpshoeArray = [];
var jumpshoewhile = 150;

var jumpshoe = {
  x: int(random(40, width - 80)),
  y: int(random(-600, -10)),
  sizeX: 50,
  sizeY: 50,
  color: color(20, 100, 200),
  show: true,
  choose: true,
  while: false,
  timer: 0,
  using: 1.5,
  usingafter: 30
};

//Doubblejump
var DoubblejumpArray = [];
var doubblejump = {
  x: int(random(40, width - 80)),
  y: int(random(-600, -10)),
  sizeX: 50,
  sizeY: 50,
  color: color(200, 80, 100),
  show: true,
  choose: false,
  while: false
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
var newCoins = 0;
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

//Hearts
var HeartArray = [1, 1, 1];
var HeartArrayWhile = [1, 1, 1];
var Heart = {
  x: int(random(40, width - 80)),
  y: int(random(-600, -10)),
  sizeX: 50,
  sizeY: 50,
  color: color(200, 10, 10),
  show: true,
  weight: 1,
  cooldown: 0
};

//Enemies
ESizeX = random(100, 20);
ESizeXTotal = random(ESizeX, width - ESizeX);
ESizeY = random(120, 50);
var Enemy = {
  x: ESizeXTotal,
  y: 0 - random(3000, 500),
  sizeX: ESizeX,
  sizeY: ESizeY,
  color: color(170, 120, 20),
  show: true,
  moving: true,
  shooting: true,
  shootdelay: 20,
  cooldown: 0
};
//Shoottiles
var shoottiles = {
  x: ESizeXTotal,
  y: ESizeY,
  size: 10,
  color: color(40, 40, 40),
  show: false,
  moving: false,
  speed: 10
};

//Loosing
var gameOverCoins = false;
var gameOverFall = false;
var gameOverLifes = false;
var dying = ["you are a bad monsterhunter"];
var falling = ["you fell to death"];
var noCoinsLeft = ["you were too slow"];

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

//for prescreen
var firstscreen = true;

//for developer stats
var showStats = false;
var showStatsTimer = 0;
var godmodetimer = 0;

//The Prescreen
function PrescreenFunction() {
  prescreen.buttontimer = prescreen.buttontimer + 1;
  for (m = 0; m < mtiles.length; m = m + 1) {
    for (i = 0; i < ntiles.length; i = i + 1) {
      //after the round
      if (prescreen.show === true && prescreen.showshop === false) {
        //tiles are new sorted
        ntiles[i].x = int(random(40, width - 80));
        ntiles[i].y = int(random(-600, height - 10));
        mtiles[m].x = int(random(40, width - 80));
        mtiles[m].y = int(random(-600, height - 10));

        if (JumpshoeArray.length > 0) {
          JumpshoeArray.pop();
        }
        if (DoubblejumpArray.length > 0) {
          DoubblejumpArray.pop();
        }

        //Heart regeneration
        if (HeartArray.length < HeartArrayWhile.length) {
          HeartArray.push(1);
        }

        //if there are less tiles than at the beginning
        ntilesNEW = {
          x: int(random(40, width - 80)),
          y: int(random(-600, height - 10)),
          sizeX: 80,
          sizeY: 10,
          change: false
        };
        if (ntiles.length < ntilesanmount) {
          ntiles.push(ntilesNEW);
        }

        if (mtiles.length > mtilesanmount) {
          mtiles.pop();
        }

        player.moving = false;
        prescreen.delay = 0;

        //Background
        fill(environment.color);
        rect(0, 0, width * 2, height * 2);

        //Start
        fill(prescreen.buttonsemicolor);
        rect(width / 2, height - 100, 300, 100, 20);
        fill(prescreen.buttoncolor);
        rect(width / 2, height - 103, 297, 95, 20);
        fill(255, 255, 255);
        textSize(50);
        text("play", width / 2 - 35, height - 90);
        textSize(20);

        //Shop
        fill(prescreen.buttonsemicolorshop);
        rect(width / 2, height - 220, 300, 100, 20);
        fill(prescreen.buttoncolorshop);
        rect(width / 2, height - 223, 297, 95, 20);
        fill(255, 255, 255);
        textSize(50);
        text("shop", width / 2 - 42, height - 210);
        textSize(20);

        fill(0);
        textAlign(LEFT);
        textSize(40);
        text("Total: " + int(highscore.total) + "m", width / 2 - 100, 50);

        //what you can see after the first round
        if (firstscreen === false) {
          textAlign(CENTER);
          text("latest score: ", width / 2 - width / 4, 130);
          text(int(highscore.score) + "m", width / 2 - width / 4, 185);
          text("best score: ", width / 2 + width / 4, 130);
          text(max(rounds) + "m", width / 2 + width / 4, 185);

          //Stats

          // if (rounds.length - 100 === 1) {
          //   text(
          //     "you played: " + (rounds.length) + " round",
          //     width / 2,
          //     330
          //   );
          // }
          // if (rounds.length - 100 > 1) {
          //   text(
          //     "you played: " + (rounds.length) + " rounds",
          //     width / 2,
          //     330
          //   );
          // }
          textAlign(LEFT);
          textSize(20);
        } else {
          //modi godmode
          fill(environment.color);
          fill(0);
          textSize(20);
          text("godmode", width / 2 - 70, height - 323);

          if (
            mouseIsPressed === true &&
            mouseX >= width / 2 - 115 &&
            mouseX <= width / 2 - 85 &&
            mouseY >= height - 344 &&
            mouseY <= height - 314 &&
            prescreen.buttontimer >= 50
          ) {
            prescreen.buttontimer = 0;
            if (prescreen.buttonactivated === false) {
              prescreen.buttonactivated = true;
            } else {
              prescreen.buttonactivated = false;
            }
          }

          if (prescreen.buttonactivated === true) {
            fill(prescreen.buttoncolorMODI);
            rect(width / 2 - 100, height - 329, 30, 30);
          } else {
            fill(environment.color);
            rect(width / 2 - 100, height - 329, 30, 30);
          }
        }
        //Start button pressed
        if (
          mouseX >= width / 2 - 150 &&
          mouseX <= width / 2 + 150 &&
          mouseY >= height - 150 &&
          mouseY <= height - 50
        ) {
          prescreen.buttoncolor = color(20, 180, 60);
          prescreen.buttonsemicolor = color(20, 150, 60);
          //stuff to reset
          if (mouseIsPressed === true) {
            prescreen.delay = 0;
            ntilesFIRST.show = true;
            ntilesFIRST.x = width / 2;
            ntilesFIRST.y = height / 2 + height * 0.1;
            doubblejump.y = 0 - int(random(600, 10));
            jumpshoe.y = 0 - int(random(600, 10));
            doubblejump.while = false;
            jumpshoe.while = false;
            prescreen.buttontimer = 0;
            jumpshoe.timer = 0;
            player.falling = true;
            player.x = width / 2;
            player.y = height / 2 + 300;
            player.jump = true;
            player.jumpEnd = 100;
            player.boost = 30;
            player.jumpStart = height + 100;
            player.moving = true;
            Enemy.moving = true;
            Enemy.shootdelay = 20;
            Enemy.cooldown = 0;
            Enemy.y = 0 - int(random(3000, 500));
            Enemy.x = random(ESizeX, width - ESizeX);
            shoottiles.x = Enemy.y;
            highscore.score = 0;
            highscore.adding = true;
            Heart.x = int(random(40, width - 80));
            Heart.y = 0 - int(random(5000, 1000));
            Coins = 100;
            Coins = Coins + newCoins;
            firstscreen = false;
            prescreen.show = false;
            prescreen.showshop = false;
            if (prescreen.buttonactivated === true) {
              godmodetimer = 0;
            }
          }
        } else {
          prescreen.buttoncolor = color(20, 150, 60);
          prescreen.buttonsemicolor = color(20, 120, 60);
        }

        //Shop button pressed
        if (
          mouseX >= width / 2 - 150 &&
          mouseX <= width / 2 + 150 &&
          mouseY >= height - 270 &&
          mouseY <= height - 170
        ) {
          prescreen.buttoncolorshop = color(20, 180, 60);
          prescreen.buttonsemicolorshop = color(20, 150, 60);
          if (mouseIsPressed === true) {
            prescreen.show = false;
            prescreen.showshop = true;
          }
        } else {
          prescreen.buttoncolorshop = color(20, 150, 60);
          prescreen.buttonsemicolorshop = color(20, 120, 60);
        }
      }
    }
  }
}

function PrescreenShop() {
  // prescreen.show = false;
  // prescreen.showshop = true;
  // highscore.total = 200;

  if (prescreen.show === false && prescreen.showshop === true) {
    //Background
    fill(environment.color);
    rect(0, 0, width * 2, height * 2);
    fill(0);
    textAlign(LEFT);
    textSize(40);
    text("Total: " + int(highscore.total) + "m", 20, 80);
    //Back
    fill(prescreen.buttonsemicolorshop);
    rect(width - 120, 80, 160, 90, 20);
    fill(prescreen.buttoncolorshop);
    rect(width - 120, 77, 157, 85, 20);
    fill(255, 255, 255);
    textSize(50);
    text("back", width - 165, 91);
    textSize(20);

    //Coin
    fill(Coin.color);
    rect(50, 235, Coin.sizeX * 2, Coin.sizeY * 2, 20);

    fill(prescreen.buttoncolor);
    rectMode(CORNER);
    rect(100, 171, width - 120, 60, 20);
    rect(100, 241, width - 120, 60, 20);
    rectMode(CENTER);
    fill(0);
    textSize(25);
    text("Anmount: " + (100 + newCoins), 120, 208);
    text("Weight: " + Coin.weight, 120, 280);
    if (Coins <= 99999) {
      text("+ 10", width / 2 + 50, 208);
      rect(width - 70, 200, 80, 40, 5);
      fill(255);
      text("100m", width - 95, 208);
      fill(0);
    } else {
      text("max", width / 2 + 50, 208);
    }
    if (Coin.weight < 100) {
      text("+ 5", width / 2 + 50, 280);
      rect(width - 70, 270, 80, 40, 5);
      fill(255);
      text("150m", width - 95, 280);
      fill(0);
    } else {
      text("max", width / 2 + 50, 280);
    }
    textSize(20);
    if (
      mouseIsPressed === true &&
      mouseX >= width - 110 &&
      mouseX <= width - 30 &&
      mouseY >= 180 &&
      mouseY <= 220 &&
      highscore.total >= 100 &&
      prescreen.buttontimer >= 20 &&
      Coins <= 99999
    ) {
      prescreen.buttontimer = 0;
      newCoins = newCoins + 10;

      highscore.total = highscore.total - 100;
    }

    if (
      mouseIsPressed === true &&
      mouseX >= width - 110 &&
      mouseX <= width - 30 &&
      mouseY >= 250 &&
      mouseY <= 290 &&
      highscore.total >= 150 &&
      prescreen.buttontimer >= 20 &&
      Coin.weight < 100
    ) {
      prescreen.buttontimer = 0;
      Coin.weight = Coin.weight + 5;
      highscore.total = highscore.total - 150;
    }

    //Heart
    fill(Heart.color);
    rect(50, 395, Heart.sizeX, Heart.sizeY, 20);

    fill(prescreen.buttoncolor);
    rectMode(CORNER);
    rect(100, 331, width - 120, 60, 20);
    rect(100, 400, width - 120, 60, 20);
    rectMode(CENTER);
    fill(0);
    textSize(25);
    text("Anmount: " + HeartArrayWhile.length, 120, 370);
    text("Weight: " + Heart.weight, 120, 438);
    if (HeartArray.length < 5) {
      text("+ 1", width / 2 + 50, 370);
      rect(width - 70, 360, 80, 40, 5);
      fill(255);
      text("500m", width - 95, 370);
      fill(0);
    } else {
      text("max", width / 2 + 50, 370);
    }
    if (Heart.weight < 3) {
      text("+ 1", width / 2 + 50, 438);
      rect(width - 70, 428, 80, 40, 5);
      fill(255);
      text("soon", width - 95, 438);
      fill(0);
    } else {
      text("max", width / 2 + 50, 438);
    }
    textSize(20);
    if (
      mouseIsPressed === true &&
      mouseX >= width - 110 &&
      mouseX <= width - 30 &&
      mouseY >= 340 &&
      mouseY <= 380 &&
      highscore.total >= 500 &&
      prescreen.buttontimer >= 20 &&
      HeartArray.length < 5 &&
      HeartArrayWhile.length < 5
    ) {
      prescreen.buttontimer = 0;
      HeartArray.push(1);
      HeartArrayWhile.push(1);

      highscore.total = highscore.total - 500;
    }

    if (
      mouseIsPressed === true &&
      mouseX >= width - 110 &&
      mouseX <= width - 30 &&
      mouseY >= 410 &&
      mouseY <= 450 &&
      highscore.total >= 500 &&
      prescreen.buttontimer >= 20 &&
      Heart.weight < 3
    ) {
      prescreen.buttontimer = 0;

      /*
      Heart.weight = Heart.weight + 1;
      highscore.total = highscore.total - 500;
      */
    }

    //Back
    if (
      mouseX >= width - 200 &&
      mouseX <= width - 40 &&
      mouseY >= 35 &&
      mouseY <= 125
    ) {
      prescreen.buttoncolorshop = color(20, 180, 60);
      prescreen.buttonsemicolorshop = color(20, 150, 60);
      if (mouseIsPressed === true) {
        prescreen.show = true;
        prescreen.showshop = false;
      }
    } else {
      prescreen.buttoncolorshop = color(20, 150, 60);
      prescreen.buttonsemicolorshop = color(20, 120, 60);
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
  }
  //Gravitation and boost of player
  if (player.jump === true && player.moving === true) {
    player.gravity = 3;
    player.boost = player.boost - jumpshoe.using;
    if (player.boost <= 0) {
      player.jump = false;
    }
  }
  if (player.jump === false && player.moving === true) {
    player.boost = jumpshoe.usingafter;
    player.gravity = player.gravity + 0.75;
    if (player.gravity >= 27.5) {
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
  if (keyIsPressed === true && player.moving === true) {
    if (keyIsDown(37)) {
      if (player.affectTile === false) {
        player.x = player.x - 7;
      } else {
        player.x = player.x - 1;
      }
    }
    if (keyIsDown(39)) {
      if (player.affectTile === false) {
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
}

//Player affect tiles
function PlayerAffectPlatform() {
  //weiterkommen
  for (m = 0; m < mtiles.length; m = m + 1) {
    for (i = 0; i < ntiles.length; i = i + 1) {
      //First normal tile
      if (
        int(player.x) + player.sizeX / 2 >
          ntilesFIRST.x - ntilesFIRST.sizeX / 2 &&
        int(player.x) - player.sizeX / 2 <
          ntilesFIRST.x + ntilesFIRST.sizeX / 2 &&
        int(player.y) + player.sizeY / 2 >
          ntilesFIRST.y - ntilesFIRST.sizeY * 2 &&
        int(player.y) + player.sizeY / 2 < ntilesFIRST.y - ntilesFIRST.sizeY / 2
      ) {
        if (player.jump === false && player.moving === true) {
          if (player.y + player.sizeY / 2 > player.jumpStart) {
            player.y = ntilesFIRST.y - ntilesFIRST.sizeY / 2 - player.sizeY / 2;
          } else {
            player.affectTile = true;
            player.y = ntilesFIRST.y - ntilesFIRST.sizeY / 2 - player.sizeY / 2;
          }
        }
      }

      //normal tile
      if (
        int(player.x) + player.sizeX / 2 > ntiles[i].x - ntiles[i].sizeX / 2 &&
        int(player.x) - player.sizeX / 2 < ntiles[i].x + ntiles[i].sizeX / 2 &&
        int(player.y) + player.sizeY / 2 > ntiles[i].y - ntiles[i].sizeY * 2 &&
        int(player.y) + player.sizeY / 2 < ntiles[i].y - ntiles[i].sizeY / 2
      ) {
        if (player.jump === false && player.moving === true) {
          if (player.y + player.sizeY / 2 > player.jumpStart) {
            player.y = ntiles[i].y - ntiles[i].sizeY / 2 - player.sizeY / 2;
          } else {
            player.affectTile = true;
            player.y = ntiles[i].y - ntiles[i].sizeY / 2 - player.sizeY / 2;
          }
        }
      }

      //moving Tile
      if (
        int(player.x) + player.sizeX / 2 > mtiles[m].x - mtiles[m].sizeX / 2 &&
        int(player.x) - player.sizeX / 2 < mtiles[m].x + mtiles[m].sizeX / 2 &&
        int(player.y) + player.sizeY / 2 > mtiles[m].y - mtiles[m].sizeY * 2 &&
        int(player.y) + player.sizeY / 2 < mtiles[m].y - mtiles[m].sizeY / 2
      ) {
        if (
          player.jump === false &&
          player.y + player.sizeY / 2 <= player.jumpStart &&
          player.moving === true
        ) {
          player.affectTile = true;
          player.y = mtiles[m].y - mtiles[m].sizeY / 2 - player.sizeY / 2;
        }
      }
    }

    if (player.y >= player.jumpStart) {
      player.affectTile = false;
    }
  }

  if (player.affectTile === true) {
    player.jumpStart = height - height / 3;
  } else {
    player.jumpStart = height + 100;
  }
}

//Enemys
function EnemyFunction() {
  // prescreen.show = false;
  // player.moving = false;
  if (player.moving === true) {
    fill(Enemy.color);
    //Movement and appearance of the Enemy
    rect(Enemy.x, Enemy.y, Enemy.sizeX, Enemy.sizeY, 20);
    if (Enemy.moving === true && Enemy.show === true) {
      Enemy.x = Enemy.x + random(-4, 4);
      Enemy.y = Enemy.y + random(-4, 4);
    }
    if (player.affectTile === true) {
      Enemy.y = Enemy.y + player.gravity;
    }
    if (Enemy.x - Enemy.sizeX / 2 > width) {
      Enemy.x = 0 + Enemy.sizeX / 2;
    }
    if (Enemy.x + Enemy.sizeX / 2 < 0) {
      Enemy.x = width - Enemy.sizeX / 2;
    }

    //If the Enemy is not in the players area
    if (Enemy.y + Enemy.sizeY / 2 < 0 || Enemy.y - Enemy.sizeY / 2 > height) {
      Enemy.show = false;
    } else {
      Enemy.show = true;
    }
    //randomizer position Enemy
    if (Enemy.y - Enemy.sizeY / 2 > height) {
      Enemy.y = 0 - random(3000, 500);
      Enemy.x = random(Enemy.sizeX / 2, width - Enemy.sizeX / 2);
    }

    //Cooldown
    if (Enemy.cooldown < 30) {
      Enemy.moving = false;
    } else {
      Enemy.moving = true;
    }

    //Shooting

    if (
      Enemy.show === true &&
      Enemy.y + Enemy.sizeX / 2 > 0 &&
      Enemy.y - Enemy.sizeY / 2 < height
    ) {
      shoottiles.show = true;
      Enemy.shooting = true;
      Enemy.shootdelay = Enemy.shootdelay + 1;
    } else {
      Enemy.shooting = false;
      Enemy.shootdelay = 20;
    }
    if (
      Enemy.shooting === true &&
      Enemy.shootdelay > 30 &&
      Enemy.cooldown > 30
    ) {
      shoottiles.show = true;
      shoottiles.move = true;
    } else {
      shoottiles.x = Enemy.x;
      shoottiles.move = false;
    }

    if (shoottiles.show === true) {
      fill(shoottiles.color);
      shoottiles.y = Enemy.y;
      rect(shoottiles.x, shoottiles.y, shoottiles.size, shoottiles.size, 5);

      //Shoot direction
      if (shoottiles.move === true) {
        if (Enemy.x > width / 2) {
          shoottiles.x = shoottiles.x - shoottiles.speed;
        }
        if (Enemy.x < width / 2) {
          shoottiles.x = shoottiles.x + shoottiles.speed;
        }
        if (shoottiles.x < 0 || shoottiles.x > width) {
          Enemy.shootdelay = 0;
          shoottiles.x = Enemy.x;
        }

        if (
          shoottiles.x >= player.x - player.sizeX / 2 &&
          shoottiles.x <= player.x + player.sizeX / 2 &&
          shoottiles.y >= player.y - player.sizeY / 2 &&
          shoottiles.y <= player.y + player.sizeY / 2 &&
          Enemy.cooldown > 30
        ) {
          Enemy.shootdelay = 0;
          Enemy.cooldown = 0;
          shoottiles.y = Enemy.y;
          HeartArray.pop();
        }
      }
    }

    //If player hits enemy

    Enemy.cooldown = Enemy.cooldown + 1;
    if (
      Enemy.cooldown > 30 &&
      player.x >= Enemy.x - Enemy.sizeX / 2 - player.sizeX / 2 &&
      player.x <= Enemy.x + Enemy.sizeX / 2 + player.sizeX / 2 &&
      player.y > Enemy.y - Enemy.sizeY / 2 - player.sizeY / 2 &&
      player.y < Enemy.y + Enemy.sizeY / 2 + player.sizeY / 2
    ) {
      if (player.jump === false) {
        Enemy.cooldown = 0;
        player.boost = 40;
        Enemy.y = 0 - random(6000, 500);
        Coins = Coins + Coin.weight;
        player.affectTile = true;
      } else {
        Enemy.cooldown = 0;
        HeartArray.pop();
      }
    }
  }
}

//Itembar
function itembar() {
  if (player.moving === true) {
    //Choose items
    if (keyIsDown(16)) {
      if (doubblejump.choose === true && prescreen.buttontimer >= 15) {
        // console.log("jumpshoe");
        doubblejump.choose = false;
        jumpshoe.choose = true;
        prescreen.buttontimer = 0;
      }
      if (jumpshoe.choose === true && prescreen.buttontimer >= 15) {
        // console.log("doubblejump");
        jumpshoe.choose = false;
        doubblejump.choose = true;
        prescreen.buttontimer = 0;
      }
    }

    fill(255);
    rectMode(CORNER);
    rect(0, height - 40, width, 70, 50);
    rectMode(CENTER);

    //Jumpshoe
    if (jumpshoe.choose === true && doubblejump.choose === false) {
      fill(0);
      rect(100, height - 20, jumpshoe.sizeX / 1.6, jumpshoe.sizeY / 1.6, 5);
    }
    fill(jumpshoe.color);
    rect(100, height - 20, jumpshoe.sizeX / 2, jumpshoe.sizeY / 2, 5);
    fill(0);
    text(JumpshoeArray.length, 120, height - 13);

    //Doubblejump
    if (doubblejump.choose === true && jumpshoe.choose === false) {
      fill(0);
      rect(200, height - 20, jumpshoe.sizeX / 1.6, jumpshoe.sizeY / 1.6, 5);
    }
    fill(doubblejump.color);
    rect(200, height - 20, jumpshoe.sizeX / 2, jumpshoe.sizeY / 2, 5);
    fill(0);
    text(DoubblejumpArray.length, 220, height - 13);

    //Coin
    fill(Coin.color);
    rect(300, height - 20, Coin.sizeX / 2, Coin.sizeY / 2, 5);
    fill(0);
    text(Coins, 310, height - 13);

    // prescreen.show = false;
    // player.moving = false;
    // prescreen.showshop = false;
    //Heart
    fill(Heart.color);
    if (HeartArray.length > 0) {
      rect(400, height - 20, Heart.sizeX / 2, Heart.sizeY / 2, 5);
      if (HeartArray.length > 1) {
        rect(440, height - 20, Heart.sizeX / 2, Heart.sizeY / 2, 5);
        if (HeartArray.length > 2) {
          rect(480, height - 20, Heart.sizeX / 2, Heart.sizeY / 2, 5);
          if (HeartArray.length > 3) {
            rect(520, height - 20, Heart.sizeX / 2, Heart.sizeY / 2, 5);
            if (HeartArray.length > 4) {
              rect(560, height - 20, Heart.sizeX / 2, Heart.sizeY / 2, 5);
            }
          }
        }
      }
    }
  }
}

//Items on the map
function items() {
  if (prescreen.show === false && prescreen.showshop === false) {
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

    Heart.cooldown = Heart.cooldown + 1;
    if (Heart.cooldown > 100) {
      Heart.cooldown = 0;
    }
    //Heart
    fill(Heart.color);
    if (Heart.show === true) {
      rect(Heart.x, Heart.y, Heart.sizeX, Heart.sizeY, 20);

      if (player.affectTile === true) {
        Heart.y = Heart.y + player.gravity;
      }
      if (Heart.y >= height + Heart.sizeY) {
        Heart.x = int(random(40, width - 80));
        Heart.y = int(random(-10000, -2000));
      }

      if (
        player.y - player.sizeY / 2 <= Heart.y + Heart.sizeY &&
        player.y + player.sizeY / 2 >= Heart.y - Heart.sizeY &&
        player.x - player.sizeX / 2 <= Heart.x + Heart.sizeX &&
        player.x + player.sizeX / 2 >= Heart.x - Heart.sizeX &&
        HeartArray.length < HeartArrayWhile.length &&
        Heart.cooldown > 60
      ) {
        Heart.show = false;
        HeartArray.push(1);
        Heart.cooldown = 0;
        Heart.x = int(random(40, width - 80));
        Heart.y = int(random(-10000, -2000));
        Heart.show = true;
      }

      if (
        player.y <= Heart.y + Heart.sizeY &&
        player.y >= Heart.y - Heart.sizeY &&
        player.x <= Heart.x + Heart.sizeX &&
        player.x >= Heart.x - Heart.sizeX &&
        HeartArray.length >= HeartArrayWhile.length &&
        Heart.cooldown > 60
      ) {
        Heart.show = false;
        Heart.cooldown = 0;
        Heart.x = int(random(40, width - 80));
        Heart.y = int(random(-10000, -2000));
        Heart.show = true;
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
    //every half second coins = coins - 1
    CoinTimer = CoinTimer + 1;
    if (CoinTimer >= 15 && player.y - player.sizeY / 2 < height - 40) {
      Coins = Coins - 1;
      CoinTimer = 0;
    }

    //GODMODE ACTIVATED
    if (prescreen.buttonactivated === true) {
      Coins = 9999999;
      highscore.total = 9999999;
      godmodetimer++;
      if (HeartArray.length < 5) {
        HeartArray.push(1);
        HeartArrayWhile.push(1);
      }
      if (godmodetimer < 99) {
        DoubblejumpArray.push(1);
        JumpshoeArray.push(1);
        if (DoubblejumpArray.length > 99 && JumpshoeArray.length > 99) {
          godmodetimer = 99;
        }
      }
    }
  }
}

//Different functions of the items
function itemfunction() {
  if (Pong.show === false) {
    player.moving = false;
    Enemy.moving = false;
    Pong.x = int(random(40, width - 80));
    Pong.y = int(random(-10000, -2000));
    // Pong.show = true;
  }

  if (keyIsDown(32)) {
    //Doubblejump use
    if (
      doubblejump.choose === true &&
      DoubblejumpArray.length > 0 &&
      prescreen.buttontimer >= 15
    ) {
      // console.log("doubblejump yeah");
      prescreen.buttontimer = 0;
      doubblejump.while = true;
      DoubblejumpArray.pop();
    }
    if (doubblejump.while === true) {
      player.affectTile = true;
      doubblejump.while = false;
    }

    //Jumpshoe use
    if (
      jumpshoe.choose === true &&
      JumpshoeArray.length > 0 &&
      prescreen.buttontimer >= 15
    ) {
      // console.log("jumpshoe yeah");
      prescreen.buttontimer = 0;
      jumpshoe.while = true;
      JumpshoeArray.pop();
    }
  }
  if (jumpshoe.while === true) {
    jumpshoe.timer = jumpshoe.timer + 1;
    // console.log(jumpshoe.timer);
    jumpshoe.using = 3;
    jumpshoe.usingafter = 50;
    player.jumpEnd = 0;
    if (jumpshoe.timer > jumpshoewhile) {
      jumpshoe.while = false;
      jumpshoe.timer = 0;
    }
  } else {
    jumpshoe.using = 1.5;
    jumpshoe.usingafter = 30;
    player.jumpEnd = 100;
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

//moving platform
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
    if (player.affectTile === true && player.moving === true) {
      ntiles[i].y = ntiles[i].y + player.gravity;
    }
    if (ntiles[i].y > height + 40 + ntiles[i].sizeY) {
      //Where and if tiles can be respawned
      if (deletetile === true) {
        ntiles.splice(i, 1);
        //console.log("deleted");
        //console.log(ntiles.length);
        deletetile = false;
      } else {
        ntiles[i].y = 0 - random(0, 600);
        ntiles[i].x = random(ntiles[i].sizeX / 2, width - ntiles[i].sizeX / 2);
      }
    }
  }

  if (player.affectTile === true && player.moving === true) {
    ntilesFIRST.y = ntilesFIRST.y + player.gravity;
    if (ntilesFIRST.y >= height) {
      ntilesFIRST.show = false;
    }
  }

  //moving platforms
  for (m = 0; m < mtiles.length; m++) {
    if (player.affectTile === true && player.moving === true) {
      mtiles[m].y = mtiles[m].y + player.gravity;

      if (
        player.x + player.sizeX / 2 > mtiles[m].x - mtiles[m].sizeX &&
        player.x - player.sizeX < mtiles[m].x + mtiles[m].sizeX / 2 &&
        player.y + player.sizeY >= mtiles[m].y - mtiles[m].sizeY * 2 &&
        player.y + player.sizeY <= mtiles[m].y + mtiles[m].sizeY * 2
      ) {
        //Player follow moving platforms
        if (mtiles[m].movingR === true) {
          player.x = player.x + 2;
        }
        if (mtiles[m].movingR === false) {
          player.x = player.x - 2;
        }
      }
    }
    if (mtiles[m].y > height + 40 + ntiles[m].sizeY) {
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
  if (addmtile < highscore.score && mtiles.length < 12) {
    //heightadded = the value of the height when tiles are added
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

  if (
    player.affectTile === true &&
    player.moving === true &&
    prescreen.show === false
  ) {
    highscore.score = highscore.score + 0.5;
  }
}

//Gameover
function gameOver() {
  if (prescreen.showshop === false && prescreen.show === false) {
    if (
      player.y > height - 30 - player.sizeY / 2 ||
      Coins <= 0 ||
      HeartArray.length < 1
    ) {
      textAlign(CENTER);
      textSize(50);
      player.moving = false;

      if (
        player.falling === true &&
        prescreen.delay > 0 &&
        player.y > height - 30 - player.sizeY / 2
      ) {
        gameOverFall = true;
      }
      if (prescreen.delay > 0 && Coins <= 0) {
        gameOverCoins = true;
        player.falling = false;
      }
      if (HeartArray.length < 1 && prescreen.delay > 0) {
        gameOverLifes = true;
        player.falling = false;
      }

      if (gameOverFall === true && prescreen.delay > 0 && player.y > height) {
        text(random(falling), width / 2, height / 2);
        gameOverFall = false;
      }

      if (gameOverCoins === true && prescreen.delay > 0) {
        gameOverFall = false;
        text(random(noCoinsLeft), width / 2, height / 2);
        gameOverCoins = false;
      }

      if (gameOverLifes === true && prescreen.delay > 0) {
        gameOverFall = false;
        text(random(dying), width / 2, height / 2);
        gameOverLifes = false;
      }

      textAlign(LEFT);
      textSize(20);

      // console.log(highscore.score);
      // console.log(highscore.total);

      Enemy.moving = false;
      prescreen.delay = prescreen.delay + 1;
      player.y = player.y + 10;
      if (highscore.adding === true) {
        highscore.total = highscore.total + highscore.score;
        highscore.adding = false;
      }
      rounds.push(int(highscore.score));
      if (prescreen.delay > 100) {
        prescreen.show = true;
        prescreen.showshop = false;
      }
    }
  }
}

//for developers
function developing() {
  if (keyIsDown(48)) {
    showStatsTimer = showStatsTimer + 1;

    if (showStats === false && showStatsTimer >= 10) {
      showStats = true;
      showStatsTimer = 0;
    }
    if (showStats === true && showStatsTimer >= 10) {
      showStats = false;
      showStatsTimer = 0;
    }
  }
  if (showStats === true) {
    fill(100);
    text("P.X: " + int(player.x), 300, 20);
    text("P.BO: " + int(player.boost), 400, 20);
    text("P.GR: " + int(player.gravity), 400, 40);
    text("P.Y: " + int(player.y), 300, 40);
    text("P.JS: " + int(player.jumpStart), 300, 60);
    text("P.JE: " + int(player.jumpEnd), 400, 60);
    text("M.X: " + mouseX, 500, 20);
    text("M.Y: " + mouseY, 500, 40);
    text("N.T: " + ntiles.length, 500, 60);
    text("M.T: " + mtiles.length, 500, 80);
    text("P. Mov: " + player.moving, 500, 100);
  }
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
  //Enemies
  EnemyFunction();

  //Platform functions
  movetiles();
  changetiles();

  //Item stuff
  items();
  itembar();
  itemfunction();
  highscorefunction();

  //Prescreen & GAME OVER
  PrescreenFunction();
  PrescreenShop();
  gameOver();

  //developing
  developing();
}
