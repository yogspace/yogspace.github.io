/*
 *                This is DoodleJump!
 *
 *
 *
 *
 *
 *             programmed by: Max Weber
 *
 *                   Version: 1.5
 *
 *
 *
 *
 * If you jump into an enemy, you will loose a life. If you
 * jump from the top, he will despawn and you will get Coins.
 *
 *                   instructions:
 *              shift:          choose item
 *              space:          use item
 *              right arrow:    go right
 *              left arrow:     go left
 *              0:              developer stats
 *
 *
 * Sounds:
 * https://www.zapsplat.com/sound-effect-categories/
 *
 *
 *
 * folgende Bugs müssen noch gefixt werden:
 *
 * - Tiles können nicht auf gleicher Position spawnen
 * - hängt sich manchmal auf (im Godmode)
 * - ab und zu bewegen sich feste tiles um ein paar Pixel
 *
 *
 * - images
 * - tasten verändern
 * - rotation
 *
 *
 *
 *
 *
 *
 *
 *
 * thanks!
 *
 *
 */

//Changable values:
//Start value: anmount of platforms
//normal tiles
var ntilesanmount = random(55, 75);
//moving tiles
var mtilesanmount = random(0, 2);
//the value for the height when tiles will despawn
var heightdeleted = 20;
var heightadded = 75;

//value for the speed of the tiles
var speed = 3;

var prescreen = {
  reset: false,
  show: true,
  showshop: false,
  showcontrols: false,
  buttoncolor: color(200, 30, 30),
  buttonsemicolor: color(170, 30, 30),
  buttoncolorshop: color(200, 30, 30),
  buttonsemicolorshop: color(170, 30, 30),
  buttoncolorcontrols: color(200, 30, 30),
  buttonsemicolorcontrols: color(170, 30, 30),
  buttoncolorMODI: color(200, 30, 30),
  buttonactivated: false,
  buttontimer: 0,
  delay: 0,
  soundtimer: 1,
  startGame: false
};

//Player
var player = {
  x: width / 2,
  y: height - height * (1 / 6),
  sizeX: 50,
  sizeY: 90,
  color: color(255, 255, 255),
  moving: true,
  jump: true,
  jumpEnd: 0,
  jumpStart: height,
  gravity: 3,
  boost: 30,
  falling: true,
  //if affect platform
  affectTile: false,
  affectTileTooClose: false,
  //detection
  yPos1: 0,
  yPos2: 0,
  //sound
  soundTimer: 0
};

//keys
var keys = {
  moveright: 39,
  moveleft: 37,
  switchitem: 16,
  useitem: 32
};

//Background
var environment = {
  color: color(70, 0, 0),
  soundtimer: 0
};
//Array for normal platforms
var ntiles = [];
//random positions of normal platforms
for (i = 0; i < ntilesanmount; i++) {
  ntiles[i] = {
    x: random(40, width - 80),
    y: random(-600, height - 10),
    sizeX: 80,
    sizeY: 10,
    change: false,
    color: color(70, 70, 70)
  };
}
var ntilesNEW = {
  x: random(40, width - 80),
  y: random(-600, height - 10),
  sizeX: random(20, 90),
  sizeY: random(20, 90),
  change: false,
  color: color(70, 70, 70)
};

//this is the first tile the player will interact with..
var ntilesFIRST = {
  x: width / 2,
  y: height / 2 + height * 0.1,
  sizeX: 80,
  sizeY: 10,
  show: true,
  color: color(70, 70, 70)
};

//Array for moving platforms
var mtiles = [];
//random position of moving platforms
for (m = 0; m < mtilesanmount; m = m + 1) {
  mtiles[m] = {
    x: random(40, width - 80),
    y: random(-600, height - 10),
    sizeX: 80,
    sizeY: 10,
    change: false,
    movingR: true,
    color: color(120, 120, 120)
  };
}

//New Moving Platforms
var mtilesNEW = {
  x: random(40, width - 80),
  y: random(-600, -10),
  sizeX: 80,
  sizeY: 10,
  change: false,
  movingR: true,
  color: color(120, 120, 120)
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
  x: random(50, width - 50),
  y: random(-600, -10),
  sizeX: 50,
  sizeY: 50,
  color: color(20, 100, 200),
  show: true,
  choose: true,
  while: false,
  timer: 0,
  using: 3 / 2,
  usingafter: 30
};

//Doubblejump
var DoubblejumpArray = [];
var doubblejump = {
  x: random(50, width - 50),
  y: random(-600, -10),
  sizeX: 50,
  sizeY: 50,
  color: color(199, 21, 133),
  show: true,
  choose: false,
  while: false
};

//Shield
var shieldArray = [];
var shield = {
  x: random(50, width - 50),
  y: random(-600, -10),
  sizeX: 50,
  sizeY: 50,
  color: color(50, 205, 50),
  show: true,
  choose: false,
  while: false,
  timer: 0,
  maxtime: 120,
  maxtimewhile: 120
};
var shieldshowtime = 0;

//Pong
var Pong = {
  x: random(40, width - 80),
  y: random(-2000, -10000),
  sizeX: 50,
  sizeY: 50,
  color: color(0, 100, 100),
  while: false,
  show: true,
  slideX: width + width / 2,
  slidingR: false,
  slidingL: false,
  starting: false,
  startingTimer: 0
};

//Coins
var Coins = 100;
var newCoins = 0;
var CoinTimer = 0;
var Coin = {
  x: random(40, width - 40),
  y: random(-600, -10),
  sizeX: 20,
  sizeY: 20,
  sizeXWhile: 20,
  color: color(255, 255, 0),
  semicolor: color(255, 120, 0),
  show: true,
  weight: 5,
  animation: false,

  //For highscore
  colortimer: color(200, 100, 100),
  colortimer2: color(200, 200, 200)
};

//ChangeKeys
var changeKeys = {
  x: random(50, width - 50),
  y: random(-600, -10),
  sizeX: 50,
  sizeY: 50,
  color: color(0, 255, 0),
  show: true,
  timer: 0,
  timercolor: 0,
  choosecolor: false,
  while: false
};

//Hearts
var HeartArray = [1, 1, 1];
var HeartArrayWhile = [1, 1, 1];
var Heart = {
  x: random(40, width - 80),
  y: random(-600, -10),
  sizeX: 50,
  sizeY: 50,
  color: color(200, 10, 10),
  show: true,
  weight: 1,
  cooldown: 0
};

//Enemies

var RushEnemy = {
  x: random(25, width - 25),
  y: 0 - random(3000, 500),
  // y: random(100, 500),
  sizeX: 50,
  sizeY: 50,
  color: color(170, 120, 20),
  show: true,
  moving: true,
  movingR: true,
  cooldown: 0,
  rush: false,
  speed: 7,
  soundTimer: 0
};

var RushUpAndDownEnemy = {
  x: random(25, width - 25),
  y: 0 - random(3000, 500),
  // y: random(100, 500),
  sizeX: 50,
  sizeY: 50,
  color: color(170, 120, 20),
  show: true,
  moving: true,
  movingR: true,
  movingUp: false,
  movingUpDown: false,
  movingtimer: 0,
  cooldown: 0,
  rush: false,
  speed: 7,
  soundTimer: 0
};

//Shoottiles
var ShootESizeX = random(100, 20);
var ShootESizeXTotal = random(ShootESizeX, width - ShootESizeX);
var ShootESizeY = random(120, 50);
var ShootEnemy = {
  x: ShootESizeXTotal,
  y: 0 - random(3000, 500),
  sizeX: ShootESizeX,
  sizeY: ShootESizeY,
  color: color(170, 120, 20),
  show: true,
  moving: true,
  shooting: true,
  shootdelay: 20,
  cooldown: 0
};

//Shoottiles
var shoottiles = {
  x: ShootESizeXTotal,
  y: ShootESizeY,
  size: 10,
  color: color(124, 252, 0),
  show: false,
  moving: false,
  speed: 10
};

//Portal rotate
var rotatePortal = {
  x1: 0,
  x2: width,
  y1: 0,
  y2: 0,
  color: color(124, 252, 0),
  starting: false,
  timer: 0,
  faktor: 1,
  show: false
};

//Loosing
var gameOverCoins = false;
var gameOverFall = false;
var gameOverTimer = 0;
var gameOverLifes = false;
var dying = ["you are a bad monsterhunter"];
var falling = ["you fell to death"];
var noCoinsLeft = ["you were too slow"];

//factors for deltion/adding of platforms
var factordel = [];
var delntile = 0;
var deletetile = false;
var factoradd = [];
var addmtile = 0;
var addtile = false;

//for prescreen
var showIntro = true;
var introTimer = 0;
var firstscreen = true;

//for shop
var shop = {
  cwprice: 150,
  caprice: 100,
  haprice: 500,
  hwprice: 1500,
  slprice: 300
};

//for developer stats
var showStats = false;
var showStatsTimer = 0;
var godmodetimer = 0;

//Canvas width
var widthWhile;
var heightWhile;

//Colors
itemcolors = [
  jumpshoe.color,
  doubblejump.color,
  Pong.color,
  Heart.color,
  shield.color
];

//The Prescreen
function Intro() {
  if (showIntro === true) {
    introTimer = introTimer + 1;
    //Background
    fill(environment.color);
    rect(0, 0, width * 2, height * 2);
    textAlign(CENTER);
    fill(255);
    textSize(80);
    text("ROBO JUMP", width / 2, height / 2);
    if (introTimer >= 20) {
      textSize(40);
      fill(170, 170, 170, introTimer * 5);
      text("FIND THE ERROR", width / 2, height / 2 + height / 3);
    }
    if (introTimer >= 50) {
      soundWelcome.play();
      showIntro = false;
      introTimer = 0;
    }
  }
}
function PrescreenFunction() {
  prescreen.buttontimer = prescreen.buttontimer + 1;
  for (m = 0; m < mtiles.length; m = m + 1) {
    for (i = 0; i < ntiles.length; i = i + 1) {
      //after the round
      if (
        prescreen.show === true &&
        prescreen.showshop === false &&
        prescreen.showcontrols === false
      ) {
        if (JumpshoeArray.length > 0) {
          JumpshoeArray.pop();
        }
        if (DoubblejumpArray.length > 0) {
          DoubblejumpArray.pop();
        }
        if (shieldArray.length > 0) {
          shieldArray.pop();
        }

        //Heart regeneration
        if (HeartArray.length < HeartArrayWhile.length) {
          HeartArray.push(1);
        }

        if (HeartArray.length > HeartArrayWhile.length) {
          HeartArray.pop();
        }

        //if there are less tiles than at the beginning
        ntilesNEW = {
          x: random(40, width - 80),
          y: random(-600, height - 10),
          sizeX: 80,
          sizeY: 10,
          change: false,
          color: color(70, 70, 70)
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
        textAlign(CENTER);

        //Start
        fill(prescreen.buttonsemicolor);
        rect(width / 2, height - 100, 300, 100);
        fill(prescreen.buttoncolor);
        rect(width / 2 - 2, height - 102, 296, 96);
        fill(200);
        textSize(50);
        text("play", width / 2, height - 85);
        textSize(20);

        //Shop
        fill(prescreen.buttonsemicolorshop);
        rect(width / 2, height - 220, 300, 100);
        fill(prescreen.buttoncolorshop);
        rect(width / 2 - 2, height - 222, 296, 96);
        fill(200);
        textSize(50);
        text("shop", width / 2, height - 205);
        textSize(20);

        //Controls
        fill(prescreen.buttonsemicolorcontrols);
        rect(width / 2, height - 340, 300, 100);
        fill(prescreen.buttoncolorcontrols);
        rect(width / 2 - 2, height - 342, 296, 96);
        fill(200);
        textSize(50);
        text("controls", width / 2, height - 325);
        textSize(20);

        fill(200);
        textAlign(LEFT);
        textSize(40);
        text(
          "Lines of Code: " + int(highscore.total),
          width / 2 - 100,
          50
        );

        //what you can see after the first round
        if (firstscreen === false) {
          textAlign(CENTER);
          text("latest score: ", width / 2 - width / 4, 130);
          text(int(highscore.score) + " LOC", width / 2 - width / 4, 185);
          text("best score: ", width / 2 + width / 4, 130);
          text(max(rounds) + " LOC", width / 2 + width / 4, 185);

          //Stats

          textAlign(LEFT);
          textSize(20);
        } else {
          //modi godmode
          fill(200);
          textSize(20);
          text("godmode", width / 2 - 70, height - 418);

          if (
            mouseIsPressed === true &&
            mouseX >= width / 2 - 115 &&
            mouseX <= width / 2 - 85 &&
            mouseY >= height - 444 &&
            mouseY <= height - 414 &&
            prescreen.buttontimer >= 10
          ) {
            soundButton.play();
            prescreen.buttontimer = 0;
            if (prescreen.buttonactivated === false) {
              prescreen.buttonactivated = true;
            } else {
              prescreen.buttonactivated = false;
            }
          }

          if (prescreen.buttonactivated === true) {
            fill(prescreen.buttoncolorMODI);
            rect(width / 2 - 100, height - 429, 30, 30);
          } else {
            highscore.total = 0;
            fill(100, 100, 100);
            rect(width / 2 - 100, height - 429, 30, 30);
          }
        }
        //Start button pressed
        if (
          mouseX >= width / 2 - 150 &&
          mouseX <= width / 2 + 150 &&
          mouseY >= height - 150 &&
          mouseY <= height - 50
        ) {
          prescreen.buttoncolor = color(230, 30, 30);
          prescreen.buttonsemicolor = color(170, 30, 30);
          //stuff to reset
          if (mouseIsPressed === true) {
            soundButton.play();
            prescreen.startGame = true;
            prescreen.delay = 0;
            prescreen.reset = true;
          }
        } else {
          prescreen.buttoncolor = color(200, 30, 30);
          prescreen.buttonsemicolor = color(170, 30, 30);
        }

        //Shop button pressed
        if (
          mouseX >= width / 2 - 150 &&
          mouseX <= width / 2 + 150 &&
          mouseY >= height - 270 &&
          mouseY <= height - 170
        ) {
          prescreen.buttoncolorshop = color(230, 30, 30);
          prescreen.buttonsemicolorshop = color(170, 30, 30);
          if (mouseIsPressed === true) {
            soundButton.play();
            prescreen.show = false;
            prescreen.showcontrols = false;
            prescreen.showshop = true;
          }
        } else {
          prescreen.buttoncolorshop = color(200, 30, 30);
          prescreen.buttonsemicolorshop = color(170, 30, 30);
        }
        //Controls button pressed
        if (
          mouseX >= width / 2 - 150 &&
          mouseX <= width / 2 + 150 &&
          mouseY >= height - 390 &&
          mouseY <= height - 290
        ) {
          prescreen.buttoncolorcontrols = color(230, 30, 30);
          prescreen.buttonsemicolorcontrols = color(170, 30, 30);
          if (mouseIsPressed === true) {
            soundButton.play();
            prescreen.show = false;
            prescreen.showshop = false;
            prescreen.showcontrols = true;
          }
        } else {
          prescreen.buttoncolorcontrols = color(200, 30, 30);
          prescreen.buttonsemicolorcontrols = color(170, 30, 30);
        }
      }
    }
  }
}

function reset() {
  for (m = 0; m < mtiles.length; m = m + 1) {
    for (i = 0; i < ntiles.length; i = i + 1) {
      if (prescreen.reset === true) {
        //tiles are new sorted
        ntiles[i].x = random(40, width - 80);
        ntiles[i].y = random(-600, height - 10);
        mtiles[m].x = random(40, width - 80);
        mtiles[m].y = random(-600, height - 10);
        ntilesFIRST.show = true;
        ntilesFIRST.x = width / 2;
        ntilesFIRST.y = height / 2 + height * 0.1;

        //Items
        Pong.y = random(-3000, -10000);
        Pong.x = random(Pong.sizeX / 2, width - Pong.sizeX / 2);
        Pong.while = false;
        Pong.startingTimer = 0;
        Heart.x = random(Heart.sizeX / 2, width - Heart.sizeX / 2);
        Heart.y = 0 - random(5000, 1000);
        Coins = 100;
        Coins = Coins + newCoins;
        doubblejump.y = 0 - random(600, 10);
        doubblejump.x = random(
          doubblejump.sizeX / 2,
          width - doubblejump.sizeX / 2
        );
        doubblejump.while = false;
        shield.x = random(shield.sizeX / 2, width - shield.sizeX / 2);
        shield.y = 0 - random(600, 10);
        shield.while = false;
        shield.timer = 0;
        jumpshoe.y = 0 - random(600, 10);
        jumpshoe.x = random(jumpshoe.sizeX / 2, width - jumpshoe.sizeX / 2);
        jumpshoe.while = false;
        jumpshoe.timer = 0;
        changeKeys.timer = 0;
        changeKeys.timercolor = 0;
        changeKeys.choosecolor = false;
        changeKeys.while = false;
        changeKeys.show = true;
        changeKeys.x = random(
          changeKeys.sizeX / 2,
          width - changeKeys.sizeX / 2
        );
        changeKeys.y = 0 - random(1500, 7000);
        keys.moveright = 39;
        keys.moveleft = 37;
        keys.switchitem = 16;
        keys.useitem = 32;

        //Player
        player.x = width / 2;
        player.y = height - height * (1 / 6);
        player.moving = true;
        player.jump = true;
        player.jumpEnd = 0;
        player.jumpStart = height;
        player.gravity = 3;
        player.boost = 30;
        player.falling = true;
        player.affectTile = false;
        player.yPos1 = 0;
        player.yPos2 = 0;

        //Enemys
        ShootEnemy.moving = true;
        ShootEnemy.shootdelay = 20;
        ShootEnemy.cooldown = 0;
        ShootEnemy.y = 0 - random(3000, 500);
        ShootEnemy.x = random(ShootESizeX, width - ShootESizeX);
        shoottiles.x = ShootEnemy.y;

        RushEnemy.y = 0 - random(4000, 1000);
        RushEnemy.x = random(RushEnemy.sizeX, width - RushEnemy.sizeX);

        RushUpAndDownEnemy.y = 0 - random(5000, 2000);
        RushUpAndDownEnemy.x = random(RushEnemy.sizeX, width - RushEnemy.sizeX);
        RushUpAndDownEnemy.movingUp = false;

        //Highscore
        highscore.score = 0;
        highscore.adding = true;

        //Other stuff
        firstscreen = false;
        prescreen.show = false;
        prescreen.showshop = false;
        prescreen.showcontrols = false;
        prescreen.buttontimer = 0;
        gameOverTimer = 0;
        widthWhile = width;
        heightWhile = height;
        Pong.slideX = widthWhile + widthWhile / 2;

        if (prescreen.buttonactivated === true) {
          godmodetimer = 0;
        }
        prescreen.reset = false;
      }
    }
  }
}

function PrescreenShop() {
  // prescreen.show = false;
  // prescreen.showshop = true;
  // highscore.total = 2000;

  if (
    prescreen.show === false &&
    prescreen.showshop === true &&
    prescreen.showcontrols === false
  ) {
    //Background
    fill(environment.color);
    rect(0, 0, width * 2, height * 2);
    fill(200);
    textAlign(LEFT);
    textSize(40);
    text("Total: " + int(highscore.total) + " LOC", 20, 80);
    //Back
    fill(prescreen.buttonsemicolorshop);
    rect(width - 120, 80, 160, 90);
    fill(prescreen.buttoncolorshop);
    rect(width - 122, 78, 156, 86);
    fill(200);
    textSize(50);
    text("back", width - 165, 96);
    textSize(20);

    //Coin
    fill(Coin.color);
    stroke(Coin.semicolor);
    strokeWeight(3);
    ellipse(50, 235, Coin.sizeX * 2, Coin.sizeY * 2);
    noStroke();

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
      fill(200);
      text(shop.caprice + " LOC", width - 105, 208);
      fill(0);
    } else {
      text("max", width / 2 + 50, 208);
    }
    if (Coin.weight < 100) {
      text("+ 5", width / 2 + 50, 280);
      rect(width - 70, 270, 80, 40, 5);
      fill(200);
      text(shop.cwprice + " LOC", width - 105, 280);
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
      highscore.total >= shop.caprice &&
      prescreen.buttontimer >= 20 &&
      Coins <= 99999
    ) {
      soundButton.play();
      highscore.total = highscore.total - shop.caprice;
      shop.caprice = shop.caprice + 15;
      prescreen.buttontimer = 0;
      newCoins = newCoins + 10;
    }

    if (
      mouseIsPressed === true &&
      mouseX >= width - 110 &&
      mouseX <= width - 30 &&
      mouseY >= 250 &&
      mouseY <= 290 &&
      highscore.total >= shop.cwprice &&
      prescreen.buttontimer >= 20 &&
      Coin.weight < 100
    ) {
      soundButton.play();
      highscore.total = highscore.total - shop.cwprice;
      shop.cwprice = shop.cwprice + 25;
      prescreen.buttontimer = 0;
      Coin.weight = Coin.weight + 5;
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
      text(shop.haprice + " LOC", width - 105, 370);
      fill(0);
    } else {
      text("max", width / 2 + 50, 370);
    }
    if (Heart.weight < 3) {
      text("+ 1", width / 2 + 50, 438);
      rect(width - 70, 428, 80, 40, 5);
      fill(255);
      text("soon", width - 105, 438);
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
      highscore.total >= shop.haprice &&
      prescreen.buttontimer >= 20 &&
      HeartArray.length < 5 &&
      HeartArrayWhile.length < 5
    ) {
      soundButton.play();
      prescreen.buttontimer = 0;
      HeartArray.push(1);
      HeartArrayWhile.push(1);
      highscore.total = highscore.total - shop.haprice;
      shop.haprice = shop.haprice + 250;
    }

    if (
      mouseIsPressed === true &&
      mouseX >= width - 110 &&
      mouseX <= width - 30 &&
      mouseY >= 410 &&
      mouseY <= 450 &&
      highscore.total >= shop.hwprice &&
      prescreen.buttontimer >= 20 &&
      Heart.weight < 3
    ) {
      // soundButton.play();
      prescreen.buttontimer = 0;

      /*
      Heart.weight = Heart.weight + 1;
      highscore.total = highscore.total - 500;
      shop.hwprice = shop.hwprice + 500;
      */
    }

    //Shield
    fill(shield.color);
    rect(50, 560, shield.sizeX, shield.sizeY, 20);

    fill(prescreen.buttoncolor);
    rectMode(CORNER);
    rect(100, 491, width - 120, 60, 20);
    rect(100, 560, width - 120, 60, 20);
    rectMode(CENTER);
    fill(0);
    textSize(25);
    text("Lapse: " + shield.maxtime / 30 + "s", 120, 530);
    text("soon.. ", 120, 598);
    if (shield.maxtime < 300) {
      text("+ 1s", width / 2 + 50, 530);
      rect(width - 70, 520, 80, 40, 5);
      fill(255);
      text(shop.slprice + " LOC", width - 105, 530);
      fill(0);
    } else {
      text("max", width / 2 + 50, 530);
    }
    /*
Platzhalter für Schild  
if (Heart.weight < 3) {
  text("+ 1", width / 2 + 50, 598);
  rect(width - 70, 588, 80, 40, 5);
  fill(255);
  text("soon", width - 95, 598);
  fill(0);
} else {
  text("max", width / 2 + 50, 438);
}*/
    textSize(20);
    if (
      mouseIsPressed === true &&
      mouseX >= width - 110 &&
      mouseX <= width - 30 &&
      mouseY >= 500 &&
      mouseY <= 540 &&
      highscore.total >= shop.slprice &&
      prescreen.buttontimer >= 20 &&
      shield.maxtime < 300 &&
      shield.maxtimewhile < 300
    ) {
      soundButton.play();
      prescreen.buttontimer = 0;
      shield.maxtime = shield.maxtime + 30;
      shield.maxtimewhile = shield.maxtimewhile + 30;
      highscore.total = highscore.total - shop.slprice;
      shop.slprice = shop.slprice + 250;
    }

    //Platzhalter für Schild
    /*
if (
  mouseIsPressed === true &&
  mouseX >= width - 110 &&
  mouseX <= width - 30 &&
  mouseY >= 410 &&
  mouseY <= 450 &&
  highscore.total >= shop.hwprice &&
  prescreen.buttontimer >= 20 &&
  Heart.weight < 3
) {
  prescreen.buttontimer = 0;

  
  Heart.weight = Heart.weight + 1;
  highscore.total = highscore.total - shop.hwprice;
  shop.hwprice = shop.hwprice + 500;

}
*/

    //Back
    if (
      mouseX >= width - 200 &&
      mouseX <= width - 40 &&
      mouseY >= 35 &&
      mouseY <= 125
    ) {
      prescreen.buttoncolorshop = color(230, 30, 30);
      prescreen.buttonsemicolorshop = color(200, 30, 30);
      if (mouseIsPressed === true) {
        soundButton.play();
        prescreen.show = true;
        prescreen.showshop = false;
      }
    } else {
      prescreen.buttoncolorshop = color(200, 30, 30);
      prescreen.buttonsemicolorshop = color(170, 30, 30);
    }
  }
}

function PrescreenControls() {
  // prescreen.show = false;
  // prescreen.showshop = false;
  // prescreen.showcontrols = true;

  if (
    prescreen.show === false &&
    prescreen.showshop === false &&
    prescreen.showcontrols === true
  ) {
    //Background
    fill(environment.color);
    rect(0, 0, width * 2, height * 2);
    fill(200);
    textAlign(LEFT);
    textSize(30);
    text("move right: ", width * 0.1, 200);
    text("move left: ", width * 0.1, 260);
    text("switch item: ", width * 0.1, 320);
    text("use item: ", width * 0.1, 380);

    /*
    String.fromCharCode(keyCode);
    keys.moveright
    keys.moveleft 
    keys.switchitem
    keys.useitem
    */
    text(" right arrow", width * 0.1 + 200, 200);
    text(" left arrow", width * 0.1 + 200, 260);
    text(" shift", width * 0.1 + 200, 320);
    text(" space", width * 0.1 + 200, 380);

    //Back
    fill(prescreen.buttonsemicolorshop);
    rect(width - 120, 80, 160, 90);
    fill(prescreen.buttoncolorshop);
    rect(width - 122, 78, 156, 86);
    fill(255, 255, 255);
    textSize(50);
    text("back", width - 165, 96);
    textSize(20);

    if (
      mouseX >= width - 200 &&
      mouseX <= width - 40 &&
      mouseY >= 35 &&
      mouseY <= 125
    ) {
      prescreen.buttoncolorshop = color(230, 30, 30);
      prescreen.buttonsemicolorshop = color(200, 30, 30);
      if (mouseIsPressed === true) {
        soundButton.play();
        prescreen.show = true;
        prescreen.showshop = false;
        prescreen.showcontrols = false;
      }
    } else {
      prescreen.buttoncolorshop = color(200, 30, 30);
      prescreen.buttonsemicolorshop = color(170, 30, 30);
    }
  }
}

//The Player and first tile
function PlayerFunction() {
  fill(player.color);
  rect(player.x, player.y, player.sizeX, player.sizeY);

  //first tile
  if (ntilesFIRST.show === true) {
    fill(70, 70, 70);
    rect(ntilesFIRST.x, ntilesFIRST.y, ntilesFIRST.sizeX, ntilesFIRST.sizeY);
  }
  //Gravitation and boost of player
  if (player.jump === true && player.moving === true) {
    player.gravity = 3;
    player.boost = player.boost - jumpshoe.using;
    player.y = player.y - player.boost;
    if (player.boost <= 0 || player.y <= player.jumpEnd) {
      player.jump = false;
    }
  }
  if (player.jump === false && player.moving === true) {
    player.boost = jumpshoe.usingafter;
    player.gravity = player.gravity + 1 / 2;
    player.yPos1 = player.y;
    player.y = player.y + player.gravity;
    player.yPos2 = player.yPos1 + player.gravity;
    if (player.gravity >= 27.5) {
      player.gravity = 27.5;
    }
    if (player.y + player.sizeY / 2 >= player.jumpStart) {
      soundjumping.play();
      player.soundTimer = 0;
      player.jump = true;
    }
  }

  //Movement of player
  if (keyIsPressed === true && player.moving === true) {
    if (keyIsDown(keys.moveleft)) {
      if (player.affectTile === false) {
        player.x = player.x - 10;
      } else {
        player.x = player.x - 1 / 10;
      }
    }
    if (keyIsDown(keys.moveright)) {
      if (player.affectTile === false) {
        player.x = player.x + 10;
      } else {
        player.x = player.x + 1 / 10;
      }
    }
  }

  //Border left / right
  if (
    player.x - player.sizeX / 2 <= 0 &&
    keyIsDown(keys.moveleft) &&
    player.moving === true
  ) {
    player.x = width - player.sizeX / 2;
  }
  if (
    player.x + player.sizeX / 2 >= width &&
    keyIsDown(keys.moveright) &&
    player.moving === true
  ) {
    player.x = player.sizeX / 2;
  }
}

//Player affect tiles
function PlayerAffectPlatform() {
  // if (player.jump === false) {
  //   console.log("1: " + int(player.y));
  //   console.log("2: " + int(player.yPos1 + player.sizeY / 2));
  //   console.log("3: " + int(player.yPos2 + player.sizeY / 2));
  // }

  //weiterkommen
  for (m = 0; m < mtiles.length; m = m + 1) {
    for (i = 0; i < ntiles.length; i = i + 1) {
      /*
      Hier habe ich die Detection ob sich der Spieler auf einer Plattform
      befindet. Wie ich auf die Zahlen gekommen bin, habe ich in der Datei
      tiles-detection.pdf notiert.
      */

      //First normal tile
      if (
        //1
        //unten rechts
        (player.x + player.sizeX / 2 >= ntilesFIRST.x - ntilesFIRST.sizeX / 2 &&
          player.x + player.sizeX / 2 <=
            ntilesFIRST.x + ntilesFIRST.sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntilesFIRST.y - ntilesFIRST.sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntilesFIRST.y - ntilesFIRST.sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >= ntilesFIRST.x - ntilesFIRST.sizeX / 2 &&
          player.x - player.sizeX / 2 <=
            ntilesFIRST.x + ntilesFIRST.sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntilesFIRST.y - ntilesFIRST.sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntilesFIRST.y - ntilesFIRST.sizeY / 2) ||
        //2
        //unten rechts
        (player.x + player.sizeX / 2 >= ntilesFIRST.x - ntilesFIRST.sizeX / 2 &&
          player.x + player.sizeX / 2 <=
            ntilesFIRST.x + ntilesFIRST.sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntilesFIRST.y + ntilesFIRST.sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntilesFIRST.y + ntilesFIRST.sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >= ntilesFIRST.x - ntilesFIRST.sizeX / 2 &&
          player.x - player.sizeX / 2 <=
            ntilesFIRST.x + ntilesFIRST.sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntilesFIRST.y + ntilesFIRST.sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntilesFIRST.y + ntilesFIRST.sizeY / 2) ||
        //3
        //unten rechts
        (player.x + player.sizeX / 2 >= ntilesFIRST.x - ntilesFIRST.sizeX / 2 &&
          player.x + player.sizeX / 2 <=
            ntilesFIRST.x + ntilesFIRST.sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntilesFIRST.y - ntilesFIRST.sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntilesFIRST.y + ntilesFIRST.sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >= ntilesFIRST.x - ntilesFIRST.sizeX / 2 &&
          player.x - player.sizeX / 2 <=
            ntilesFIRST.x + ntilesFIRST.sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntilesFIRST.y - ntilesFIRST.sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntilesFIRST.y + ntilesFIRST.sizeY / 2) ||
        //4
        //unten rechts
        (player.x + player.sizeX / 2 >= ntilesFIRST.x - ntilesFIRST.sizeX / 2 &&
          player.x + player.sizeX / 2 <=
            ntilesFIRST.x + ntilesFIRST.sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntilesFIRST.y + ntilesFIRST.sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntilesFIRST.y + ntilesFIRST.sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >= ntilesFIRST.x - ntilesFIRST.sizeX / 2 &&
          player.x - player.sizeX / 2 <=
            ntilesFIRST.x + ntilesFIRST.sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntilesFIRST.y + ntilesFIRST.sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntilesFIRST.y + ntilesFIRST.sizeY / 2) ||
        //5
        //unten rechts
        (player.x + player.sizeX / 2 >= ntilesFIRST.x - ntilesFIRST.sizeX / 2 &&
          player.x + player.sizeX / 2 <=
            ntilesFIRST.x + ntilesFIRST.sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 >=
            ntilesFIRST.y - ntilesFIRST.sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 <=
            ntilesFIRST.y + ntilesFIRST.sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >= ntilesFIRST.x - ntilesFIRST.sizeX / 2 &&
          player.x - player.sizeX / 2 <=
            ntilesFIRST.x + ntilesFIRST.sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 >=
            ntilesFIRST.y - ntilesFIRST.sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 <=
            ntilesFIRST.y + ntilesFIRST.sizeY / 2)
      ) {
        if (player.jump === false && player.moving === true) {
          if (player.y + player.sizeY / 2 >= player.jumpStart) {
            player.y = ntilesFIRST.y - ntilesFIRST.sizeY / 2 - player.sizeY / 2;
          } else {
            player.affectTile = true;
            player.y = ntilesFIRST.y - ntilesFIRST.sizeY / 2 - player.sizeY / 2;
          }
        }
      }
      // else{
      //   player.affectTile = false;
      //   player.jump = false;
      //   player.gravity = 3;
      // }

      //normal tile
      if (
        //1
        //unten rechts
        (player.x + player.sizeX / 2 >= ntiles[i].x - ntiles[i].sizeX / 2 &&
          player.x + player.sizeX / 2 <= ntiles[i].x + ntiles[i].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntiles[i].y - ntiles[i].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntiles[i].y - ntiles[i].sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >= ntiles[i].x - ntiles[i].sizeX / 2 &&
          player.x - player.sizeX / 2 <= ntiles[i].x + ntiles[i].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntiles[i].y - ntiles[i].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntiles[i].y - ntiles[i].sizeY / 2) ||
        //2
        //unten rechts
        (player.x + player.sizeX / 2 >= ntiles[i].x - ntiles[i].sizeX / 2 &&
          player.x + player.sizeX / 2 <= ntiles[i].x + ntiles[i].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntiles[i].y + ntiles[i].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntiles[i].y + ntiles[i].sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >= ntiles[i].x - ntiles[i].sizeX / 2 &&
          player.x - player.sizeX / 2 <= ntiles[i].x + ntiles[i].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntiles[i].y + ntiles[i].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntiles[i].y + ntiles[i].sizeY / 2) ||
        //3
        //unten rechts
        (player.x + player.sizeX / 2 >= ntiles[i].x - ntiles[i].sizeX / 2 &&
          player.x + player.sizeX / 2 <= ntiles[i].x + ntiles[i].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntiles[i].y - ntiles[i].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntiles[i].y + ntiles[i].sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >= ntiles[i].x - ntiles[i].sizeX / 2 &&
          player.x - player.sizeX / 2 <= ntiles[i].x + ntiles[i].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntiles[i].y - ntiles[i].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntiles[i].y + ntiles[i].sizeY / 2) ||
        //4
        //unten rechts
        (player.x + player.sizeX / 2 >= ntiles[i].x - ntiles[i].sizeX / 2 &&
          player.x + player.sizeX / 2 <= ntiles[i].x + ntiles[i].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntiles[i].y + ntiles[i].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntiles[i].y + ntiles[i].sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >= ntiles[i].x - ntiles[i].sizeX / 2 &&
          player.x - player.sizeX / 2 <= ntiles[i].x + ntiles[i].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntiles[i].y + ntiles[i].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntiles[i].y + ntiles[i].sizeY / 2) ||
        //5
        //unten rechts
        (player.x + player.sizeX / 2 >= ntiles[i].x - ntiles[i].sizeX / 2 &&
          player.x + player.sizeX / 2 <= ntiles[i].x + ntiles[i].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 >=
            ntiles[i].y - ntiles[i].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 <=
            ntiles[i].y + ntiles[i].sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >= ntiles[i].x - ntiles[i].sizeX / 2 &&
          player.x - player.sizeX / 2 <= ntiles[i].x + ntiles[i].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 >=
            ntiles[i].y - ntiles[i].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 <= ntiles[i].y + ntiles[i].sizeY / 2)
      ) {
        if (player.jump === false && player.moving === true) {
          if (player.y + player.sizeY / 2 >= player.jumpStart) {
            player.y = ntiles[i].y - ntiles[i].sizeY / 2 - player.sizeY / 2;
          } else {
            player.affectTile = true;
            player.y = ntiles[i].y - ntiles[i].sizeY / 2 - player.sizeY / 2;
          }
        }
      }
      // else{
      //   player.affectTile = false;
      //   player.jump = false;
      //   player.gravity = 3;
      // }

      //moving Tile
      if (
        //unten rechts
        //1
        //unten rechts
        (player.x + player.sizeX / 2 >= mtiles[m].x - mtiles[m].sizeX / 2 &&
          player.x + player.sizeX / 2 <= mtiles[m].x + mtiles[m].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            mtiles[m].y - mtiles[m].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            mtiles[m].y - mtiles[m].sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >= mtiles[m].x - mtiles[m].sizeX / 2 &&
          player.x - player.sizeX / 2 <= mtiles[m].x + mtiles[m].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            mtiles[m].y - mtiles[m].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            mtiles[m].y - mtiles[m].sizeY / 2) ||
        //2
        //unten rechts
        (player.x + player.sizeX / 2 >= mtiles[m].x - mtiles[m].sizeX / 2 &&
          player.x + player.sizeX / 2 <= mtiles[m].x + mtiles[m].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            mtiles[m].y + mtiles[m].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            mtiles[m].y + mtiles[m].sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >= mtiles[m].x - mtiles[m].sizeX / 2 &&
          player.x - player.sizeX / 2 <= mtiles[m].x + mtiles[m].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            mtiles[m].y + mtiles[m].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            mtiles[m].y + mtiles[m].sizeY / 2) ||
        //3
        //unten rechts
        (player.x + player.sizeX / 2 >= mtiles[m].x - mtiles[m].sizeX / 2 &&
          player.x + player.sizeX / 2 <= mtiles[m].x + mtiles[m].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            mtiles[m].y - mtiles[m].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            mtiles[m].y + mtiles[m].sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >= mtiles[m].x - mtiles[m].sizeX / 2 &&
          player.x - player.sizeX / 2 <= mtiles[m].x + mtiles[m].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            mtiles[m].y - mtiles[m].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            mtiles[m].y + mtiles[m].sizeY / 2) ||
        //4
        //unten rechts
        (player.x + player.sizeX / 2 >= mtiles[m].x - mtiles[m].sizeX / 2 &&
          player.x + player.sizeX / 2 <= mtiles[m].x + mtiles[m].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            mtiles[m].y + mtiles[m].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            mtiles[m].y + mtiles[m].sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >= mtiles[m].x - mtiles[m].sizeX / 2 &&
          player.x - player.sizeX / 2 <= mtiles[m].x + mtiles[m].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            mtiles[m].y + mtiles[m].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            mtiles[m].y + mtiles[m].sizeY / 2) ||
        //5
        //unten rechts
        (player.x + player.sizeX / 2 >= mtiles[m].x - mtiles[m].sizeX / 2 &&
          player.x + player.sizeX / 2 <= mtiles[m].x + mtiles[m].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 >=
            mtiles[m].y - mtiles[m].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 <=
            mtiles[m].y + mtiles[m].sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >= mtiles[m].x - mtiles[m].sizeX / 2 &&
          player.x - player.sizeX / 2 <= mtiles[m].x + mtiles[m].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 >=
            mtiles[m].y - mtiles[m].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 <= mtiles[m].y + mtiles[m].sizeY / 2)
      ) {
        if (
          player.jump === false &&
          player.y + player.sizeY / 2 < player.jumpStart &&
          player.moving === true
        ) {
          player.affectTile = true;
          player.y = mtiles[m].y - mtiles[m].sizeY / 2 - player.sizeY / 2;
        }
      }
      // else{
      //   player.affectTile = false;
      //   player.jump = false;
      //   player.gravity = 3;
      // }
    }
  }

  if (player.y + player.sizeY / 2 >= player.jumpStart) {
    player.affectTile = false;
    // player.y = player.jumpStart - player.sizeY / 2 - ntilesFIRST.sizeY / 2;
  }

  if (player.affectTile === true) {
    player.jumpStart = height - height / 3;
    player.soundTimer = player.soundTimer + 1;
    if (player.soundTimer === 1) {
      soundjumpingLanding.play();
    }
  } else {
    player.jumpStart = height + 100;
  }
}

//Enemys
function ShootEnemyFunction() {
  // prescreen.show = false;
  // player.moving = false;
  if (player.moving === true) {
    fill(ShootEnemy.color);
    //Movement and appearance of the Enemy
    rect(ShootEnemy.x, ShootEnemy.y, ShootEnemy.sizeX, ShootEnemy.sizeY, 20);
    if (ShootEnemy.moving === true && ShootEnemy.show === true) {
      ShootEnemy.x = ShootEnemy.x + random(-4, 4);
      ShootEnemy.y = ShootEnemy.y + random(-4, 4);
    }
    if (player.affectTile === true && player.y <= height - height / 3) {
      ShootEnemy.y = ShootEnemy.y + player.gravity;
    }
    if (ShootEnemy.x - ShootEnemy.sizeX / 2 > width) {
      ShootEnemy.x = 0 + ShootEnemy.sizeX / 2;
    }
    if (ShootEnemy.x + ShootEnemy.sizeX / 2 < 0) {
      ShootEnemy.x = width - ShootEnemy.sizeX / 2;
    }

    //If the Enemy is not in the players area
    if (
      ShootEnemy.y + ShootEnemy.sizeY / 2 < 0 ||
      ShootEnemy.y - ShootEnemy.sizeY / 2 > height
    ) {
      ShootEnemy.show = false;
    } else {
      ShootEnemy.show = true;
      if (ShootEnemy.show === true && ShootEnemy.moving === true) {
        soundShootEnemy.play();
      }
    }
    //randomizer position Enemy
    if (ShootEnemy.y - ShootEnemy.sizeY / 2 > height) {
      ShootEnemy.y = 0 - random(3000, 500);
      ShootEnemy.x = random(ShootEnemy.sizeX / 2, width - ShootEnemy.sizeX / 2);
    }

    //Cooldown
    if (ShootEnemy.cooldown < 30) {
      ShootEnemy.moving = false;
    } else {
      ShootEnemy.moving = true;
      if (ShootEnemy.cooldown === 30 && ShootEnemy.show === true) {
        soundEnemyCooldown.play();
      }
    }

    //Shooting

    if (
      ShootEnemy.show === true &&
      ShootEnemy.y + ShootEnemy.sizeX / 2 > 0 &&
      ShootEnemy.y - ShootEnemy.sizeY / 2 < height
    ) {
      shoottiles.show = true;
      ShootEnemy.shooting = true;
      ShootEnemy.shootdelay = ShootEnemy.shootdelay + 1;
    } else {
      ShootEnemy.shooting = false;
      ShootEnemy.shootdelay = 20;
    }
    if (
      ShootEnemy.shooting === true &&
      ShootEnemy.shootdelay > 30 &&
      ShootEnemy.cooldown > 30
    ) {
      shoottiles.show = true;
      shoottiles.move = true;
      if (ShootEnemy.shootdelay === 31) {
        soundEnemyShooting.play();
      }
    } else {
      shoottiles.x = ShootEnemy.x;
      shoottiles.move = false;
    }

    if (shoottiles.show === true) {
      fill(shoottiles.color);
      shoottiles.y = ShootEnemy.y;
      rect(shoottiles.x, shoottiles.y, shoottiles.size, shoottiles.size, 5);

      //Shoot direction
      if (shoottiles.move === true) {
        if (player.x < ShootEnemy.x) {
          shoottiles.x = shoottiles.x - shoottiles.speed;
        }
        if (player.x > ShootEnemy.x) {
          shoottiles.x = shoottiles.x + shoottiles.speed;
        }
        if (shoottiles.x < 0 || shoottiles.x > width) {
          ShootEnemy.shootdelay = 0;
          shoottiles.x = ShootEnemy.x;
        }

        if (
          shoottiles.x >= player.x - player.sizeX / 2 &&
          shoottiles.x <= player.x + player.sizeX / 2 &&
          shoottiles.y >= player.y - player.sizeY / 2 &&
          shoottiles.y <= player.y + player.sizeY / 2 &&
          ShootEnemy.cooldown > 30
        ) {
          if (shield.while === false){
          soundgetHitted.play();
          ShootEnemy.shootdelay = 0;
          ShootEnemy.cooldown = 0;
          shoottiles.y = ShootEnemy.y;
          HeartArray.pop();
          }
          else {
            ShootEnemy.shooting = false;
            ShootEnemy.shootdelay = 20;
          }
        }
      }
    }

    //If player hits enemy

    ShootEnemy.cooldown = ShootEnemy.cooldown + 1;
    if (
      //unten rechts
      (player.x + player.sizeX / 2 >= ShootEnemy.x - ShootEnemy.sizeX / 2 &&
        player.x + player.sizeX / 2 <= ShootEnemy.x + ShootEnemy.sizeX / 2 &&
        player.y + player.sizeY / 2 <= ShootEnemy.y + ShootEnemy.sizeY / 2 &&
        player.y + player.sizeY / 2 >= ShootEnemy.y - ShootEnemy.sizeY / 2 &&
        ShootEnemy.cooldown > 30) ||
      //oben rechts
      (player.x + player.sizeX / 2 >= ShootEnemy.x - ShootEnemy.sizeX / 2 &&
        player.x + player.sizeX / 2 <= ShootEnemy.x + ShootEnemy.sizeX / 2 &&
        player.y - player.sizeY / 2 <= ShootEnemy.y + ShootEnemy.sizeY / 2 &&
        player.y - player.sizeY / 2 >= ShootEnemy.y - ShootEnemy.sizeY / 2 &&
        ShootEnemy.cooldown > 30) ||
      //unten links
      (player.x - player.sizeX / 2 >= ShootEnemy.x - ShootEnemy.sizeX / 2 &&
        player.x - player.sizeX / 2 <= ShootEnemy.x + ShootEnemy.sizeX / 2 &&
        player.y + player.sizeY / 2 <= ShootEnemy.y + ShootEnemy.sizeY / 2 &&
        player.y + player.sizeY / 2 >= ShootEnemy.y - ShootEnemy.sizeY / 2 &&
        ShootEnemy.cooldown > 30) ||
      //oben links
      (player.x - player.sizeX / 2 >= ShootEnemy.x - ShootEnemy.sizeX / 2 &&
        player.x - player.sizeX / 2 <= ShootEnemy.x + ShootEnemy.sizeX / 2 &&
        player.y - player.sizeY / 2 <= ShootEnemy.y + ShootEnemy.sizeY / 2 &&
        player.y - player.sizeY / 2 >= ShootEnemy.y - ShootEnemy.sizeY / 2 &&
        ShootEnemy.cooldown > 30)
    ) {
      if (
        (player.jump === false &&
          player.y <= ShootEnemy.y - ShootEnemy.sizeY / 2 &&
          ShootEnemy.y + ShootEnemy.sizeY / 2 > 0 &&
          ShootEnemy.y - ShootEnemy.sizeY / 2 <= heightWhile) ||
        (shield.while === true &&
          ShootEnemy.y + ShootEnemy.sizeY / 2 > 0 &&
          ShootEnemy.y - ShootEnemy.sizeY / 2 <= heightWhile)
      ) {
        soundkillEnemy.play();
        ShootEnemy.cooldown = 0;
        player.jump = true;
        player.jumpEnd = 0;
        player.gravity = 3;
        player.boost = 25;
        ShootEnemy.y = 0 - random(6000, 500);
        Coins = Coins + Coin.weight;
        // player.affectTile = true;
      } else {
        soundgetHitted.play();
        ShootEnemy.cooldown = 0;
        HeartArray.pop();
      }
    }
  }
}

function RushEnemyFunction() {
  // prescreen.show = false;
  // player.moving = false;
  if (player.moving === true) {
    fill(RushEnemy.color);
    //Movement and appearance of the Enemy
    rect(RushEnemy.x, RushEnemy.y, RushEnemy.sizeX, RushEnemy.sizeY, 20);
    if (player.affectTile === true && player.y <= height - height / 3) {
      RushEnemy.y = RushEnemy.y + player.gravity;
    }

    //If the Enemy is not in the players area
    if (
      RushEnemy.y + RushEnemy.sizeY / 2 < 0 ||
      RushEnemy.y - RushEnemy.sizeY / 2 > height
    ) {
      RushEnemy.show = false;
    } else {
      RushEnemy.soundTimer = RushEnemy.soundTimer + 1;
      if (RushEnemy.soundTimer >= 4) {
        soundRushEnemy.play();
        RushEnemy.soundTimer = 0;
      }
      RushEnemy.show = true;
    }
    //randomizer position Enemy
    if (RushEnemy.y - RushEnemy.sizeY / 2 > height) {
      RushEnemy.y = 0 - random(3000, 500);
      RushEnemy.x = random(RushEnemy.sizeX / 2, width - RushEnemy.sizeX / 2);
    }

    //Cooldown
    if (RushEnemy.cooldown < 30) {
      RushEnemy.moving = false;
    } else {
      if (RushEnemy.cooldown === 30 && RushEnemy.show === true) {
        soundEnemyCooldown.play();
      }
      RushEnemy.moving = true;
    }

    //Moving

    if (RushEnemy.show === true && RushEnemy.cooldown > 30) {
      if (RushEnemy.x + RushEnemy.sizeX / 2 >= width) {
        RushEnemy.movingR = false;
        soundRushUpAndDownEnemy.play();
      }
      if (RushEnemy.x - RushEnemy.sizeX / 2 <= 0) {
        RushEnemy.movingR = true;
        soundRushUpAndDownEnemy.play();
      }

      if (RushEnemy.movingR === true) {
        RushEnemy.x = RushEnemy.x + RushEnemy.speed;
      } else {
        RushEnemy.x = RushEnemy.x - RushEnemy.speed;
      }
    }

    //If player hits enemy

    RushEnemy.cooldown = RushEnemy.cooldown + 1;
    if (
      //unten rechts
      (player.x + player.sizeX / 2 >= RushEnemy.x - RushEnemy.sizeX / 2 &&
        player.x + player.sizeX / 2 <= RushEnemy.x + RushEnemy.sizeX / 2 &&
        player.y + player.sizeY / 2 <= RushEnemy.y + RushEnemy.sizeY / 2 &&
        player.y + player.sizeY / 2 >= RushEnemy.y - RushEnemy.sizeY / 2 &&
        RushEnemy.cooldown > 30) ||
      //oben rechts
      (player.x + player.sizeX / 2 >= RushEnemy.x - RushEnemy.sizeX / 2 &&
        player.x + player.sizeX / 2 <= RushEnemy.x + RushEnemy.sizeX / 2 &&
        player.y - player.sizeY / 2 <= RushEnemy.y + RushEnemy.sizeY / 2 &&
        player.y - player.sizeY / 2 >= RushEnemy.y - RushEnemy.sizeY / 2 &&
        RushEnemy.cooldown > 30) ||
      //unten links
      (player.x - player.sizeX / 2 >= RushEnemy.x - RushEnemy.sizeX / 2 &&
        player.x - player.sizeX / 2 <= RushEnemy.x + RushEnemy.sizeX / 2 &&
        player.y + player.sizeY / 2 <= RushEnemy.y + RushEnemy.sizeY / 2 &&
        player.y + player.sizeY / 2 >= RushEnemy.y - RushEnemy.sizeY / 2 &&
        RushEnemy.cooldown > 30) ||
      //oben links
      (player.x - player.sizeX / 2 >= RushEnemy.x - RushEnemy.sizeX / 2 &&
        player.x - player.sizeX / 2 <= RushEnemy.x + RushEnemy.sizeX / 2 &&
        player.y - player.sizeY / 2 <= RushEnemy.y + RushEnemy.sizeY / 2 &&
        player.y - player.sizeY / 2 >= RushEnemy.y - RushEnemy.sizeY / 2 &&
        RushEnemy.cooldown > 30)
    ) {
      if (
        (player.jump === false &&
          RushEnemy.y + RushEnemy.sizeY / 2 > 0 &&
          RushEnemy.y - RushEnemy.sizeY / 2 <= heightWhile &&
          player.y <= RushEnemy.y - RushEnemy.sizeY / 2) ||
        (shield.while === true &&
          RushEnemy.y + RushEnemy.sizeY / 2 >= 0 &&
          RushEnemy.y - RushEnemy.sizeY / 2 < heightWhile)
      ) {
        soundkillEnemy.play();
        RushEnemy.cooldown = 0;
        player.jump = true;
        player.jumpEnd = 0;
        player.gravity = 3;
        player.boost = 25;
        RushEnemy.y = 0 - random(6000, 500);
        Coins = Coins + Coin.weight;
        // player.affectTile = true;
      } else {
        soundgetHitted.play();
        RushEnemy.cooldown = 0;
        HeartArray.pop();
      }
    }
  }
}

function RushEnemyUpAndDownFunction() {
  // prescreen.show = false;
  // player.moving = false;
  if (player.moving === true) {
    fill(RushUpAndDownEnemy.color);
    //Movement and appearance of the Enemy
    rect(
      RushUpAndDownEnemy.x,
      RushUpAndDownEnemy.y,
      RushUpAndDownEnemy.sizeX,
      RushUpAndDownEnemy.sizeY,
      20
    );
    if (player.affectTile === true && player.y <= height - height / 3) {
      RushUpAndDownEnemy.y = RushUpAndDownEnemy.y + player.gravity;
    }

    //If the Enemy is not in the players area
    if (
      RushUpAndDownEnemy.y + RushUpAndDownEnemy.sizeY / 2 < 0 ||
      RushUpAndDownEnemy.y - RushUpAndDownEnemy.sizeY / 2 > height
    ) {
      RushUpAndDownEnemy.show = false;
    } else {
      RushUpAndDownEnemy.show = true;
    }
    //randomizer position Enemy
    if (RushUpAndDownEnemy.y - RushUpAndDownEnemy.sizeY / 2 > height) {
      RushUpAndDownEnemy.y = 0 - random(3000, 500);
      RushUpAndDownEnemy.x = random(
        RushUpAndDownEnemy.sizeX / 2,
        width - RushUpAndDownEnemy.sizeX / 2
      );
    }

    //Cooldown
    if (RushUpAndDownEnemy.cooldown < 30) {
      RushUpAndDownEnemy.moving = false;
    } else {
      if (
        RushUpAndDownEnemy.cooldown === 30 &&
        RushUpAndDownEnemy.show === true
      ) {
        soundEnemyCooldown.play();
      }
      RushUpAndDownEnemy.moving = true;
    }

    //Moving
    if (RushUpAndDownEnemy.show === true && RushUpAndDownEnemy.cooldown > 30) {
      if (RushUpAndDownEnemy.x + RushUpAndDownEnemy.sizeX / 2 >= width) {
        soundRushUpAndDownEnemy.play();
        RushUpAndDownEnemy.movingR = false;
      }
      if (RushUpAndDownEnemy.x - RushUpAndDownEnemy.sizeX / 2 <= 0) {
        soundRushUpAndDownEnemy.play();
        RushUpAndDownEnemy.movingR = true;
      }

      if (RushUpAndDownEnemy.movingR === true) {
        RushUpAndDownEnemy.x = RushUpAndDownEnemy.x + RushUpAndDownEnemy.speed;
      } else {
        RushUpAndDownEnemy.x = RushUpAndDownEnemy.x - RushUpAndDownEnemy.speed;
      }

      if (
        RushUpAndDownEnemy.y > (1 / 6) * heightWhile &&
        RushUpAndDownEnemy.y < heightWhile - (1 / 6) * heightWhile
      ) {
        RushUpAndDownEnemy.movingUpDown = true;
        RushUpAndDownEnemy.soundTimer =
          RushUpAndDownEnemy.soundTimer + RushUpAndDownEnemy.soundTimer;
        if (RushUpAndDownEnemy.soundTimer >= 10) {
          soundRushUpAndDownEnemy2.play();
          RushUpAndDownEnemy.soundTimer = 0;
        }
      } else {
        RushUpAndDownEnemy.movingUpDown = false;
        RushUpAndDownEnemy.soundTimer =
          RushUpAndDownEnemy.soundTimer + RushUpAndDownEnemy.soundTimer;
        if (RushUpAndDownEnemy.soundTimer >= 10) {
          soundRushUpAndDownEnemy2.play();
          RushUpAndDownEnemy.soundTimer = 0;
        }
      }
      if (
        RushUpAndDownEnemy.movingUpDown === true &&
        RushUpAndDownEnemy.movingUp === false
      ) {
        RushUpAndDownEnemy.y = RushUpAndDownEnemy.y + RushEnemy.speed;
        RushUpAndDownEnemy.movingtimer = RushUpAndDownEnemy.movingtimer + 1;
        if (RushUpAndDownEnemy.movingtimer > 30) {
          soundRushUpAndDownEnemy.play();
          RushUpAndDownEnemy.movingtimer = 0;
          RushUpAndDownEnemy.movingUp = true;
        }
      }
      if (
        RushUpAndDownEnemy.movingUpDown === true &&
        RushUpAndDownEnemy.movingUp === true
      ) {
        RushUpAndDownEnemy.y = RushUpAndDownEnemy.y - RushEnemy.speed;
        RushUpAndDownEnemy.movingtimer = RushUpAndDownEnemy.movingtimer + 1;
        if (RushUpAndDownEnemy.movingtimer > 30) {
          soundRushUpAndDownEnemy.play();
          RushUpAndDownEnemy.movingtimer = 0;
          RushUpAndDownEnemy.movingUp = false;
        }
      }
    }

    //If player hits enemy
    RushUpAndDownEnemy.cooldown = RushUpAndDownEnemy.cooldown + 1;
    if (
      //unten rechts
      (player.x + player.sizeX / 2 >=
        RushUpAndDownEnemy.x - RushUpAndDownEnemy.sizeX / 2 &&
        player.x + player.sizeX / 2 <=
          RushUpAndDownEnemy.x + RushUpAndDownEnemy.sizeX / 2 &&
        player.y + player.sizeY / 2 <=
          RushUpAndDownEnemy.y + RushUpAndDownEnemy.sizeY / 2 &&
        player.y + player.sizeY / 2 >=
          RushUpAndDownEnemy.y - RushUpAndDownEnemy.sizeY / 2 &&
        RushUpAndDownEnemy.cooldown > 30) ||
      //oben rechts
      (player.x + player.sizeX / 2 >=
        RushUpAndDownEnemy.x - RushUpAndDownEnemy.sizeX / 2 &&
        player.x + player.sizeX / 2 <=
          RushUpAndDownEnemy.x + RushUpAndDownEnemy.sizeX / 2 &&
        player.y - player.sizeY / 2 <=
          RushUpAndDownEnemy.y + RushUpAndDownEnemy.sizeY / 2 &&
        player.y - player.sizeY / 2 >=
          RushUpAndDownEnemy.y - RushUpAndDownEnemy.sizeY / 2 &&
        RushUpAndDownEnemy.cooldown > 30) ||
      //unten links
      (player.x - player.sizeX / 2 >=
        RushUpAndDownEnemy.x - RushUpAndDownEnemy.sizeX / 2 &&
        player.x - player.sizeX / 2 <=
          RushUpAndDownEnemy.x + RushUpAndDownEnemy.sizeX / 2 &&
        player.y + player.sizeY / 2 <=
          RushUpAndDownEnemy.y + RushUpAndDownEnemy.sizeY / 2 &&
        player.y + player.sizeY / 2 >=
          RushUpAndDownEnemy.y - RushUpAndDownEnemy.sizeY / 2 &&
        RushUpAndDownEnemy.cooldown > 30) ||
      //oben links
      (player.x - player.sizeX / 2 >=
        RushUpAndDownEnemy.x - RushUpAndDownEnemy.sizeX / 2 &&
        player.x - player.sizeX / 2 <=
          RushUpAndDownEnemy.x + RushUpAndDownEnemy.sizeX / 2 &&
        player.y - player.sizeY / 2 <=
          RushUpAndDownEnemy.y + RushUpAndDownEnemy.sizeY / 2 &&
        player.y - player.sizeY / 2 >=
          RushUpAndDownEnemy.y - RushUpAndDownEnemy.sizeY / 2 &&
        RushUpAndDownEnemy.cooldown > 30)
    ) {
      if (
        (player.jump === false &&
          RushUpAndDownEnemy.y + ShootEnemy.sizeY / 2 > 0 &&
          RushUpAndDownEnemy.y - RushUpAndDownEnemy.sizeY / 2 <= heightWhile &&
          player.y <= RushUpAndDownEnemy.y - RushUpAndDownEnemy.sizeY / 2) ||
        (shield.while === true &&
          RushUpAndDownEnemy.y + ShootEnemy.sizeY / 2 > 0 &&
          RushUpAndDownEnemy.y - RushUpAndDownEnemy.sizeY / 2 <= heightWhile)
      ) {
        soundkillEnemy.play();
        RushUpAndDownEnemy.cooldown = 0;
        player.jump = true;
        player.jumpEnd = 0;
        player.gravity = 3;
        player.boost = 25;
        RushUpAndDownEnemy.y = 0 - random(6000, 500);
        Coins = Coins + Coin.weight;
        // player.affectTile = true;
      } else {
        soundgetHitted.play();
        RushUpAndDownEnemy.cooldown = 0;
        HeartArray.pop();
      }
    }
  }
}

function PortalRotation() {
  if (prescreen.show === false && prescreen.showshop === false) {
    fill(rotatePortal.color);

    if (rotatePortal.show === true) {
      stroke(rotatePortal.color);
      strokeWeight(5);
      line(rotatePortal.x1, rotatePortal.y1, rotatePortal.x2, rotatePortal.y2);
      noStroke();

      if (player.affectTile === true && player.y <= height - height / 3) {
        rotatePortal.y1 = rotatePortal.y1 + player.gravity;
        rotatePortal.y2 = rotatePortal.y2 + player.gravity;
      }
      if (rotatePortal.y1 >= height) {
        rotatePortal.y1 = random(-10, -20);
        rotatePortal.y2 = rotatePortal.y1;
      }

      if (player.y - player.sizeY / 2 <= rotatePortal.y1) {
        rotatePortal.show = false;
        rotatePortal.y1 = random(-10, -20);
        rotatePortal.y1 = rotatePortal.y2;
        rotatePortal.show = true;
      }
    }
  }
}

//Itembar
function itembar() {
  if (player.moving === true) {
    //Choose items
    if (keyIsDown(keys.switchitem)) {
      if (doubblejump.choose === true && prescreen.buttontimer >= 15) {
        soundchangeItem.play();
        // console.log("jumpshoe");
        doubblejump.choose = false;
        shield.choose = false;
        jumpshoe.choose = true;
        prescreen.buttontimer = 0;
      }
      if (jumpshoe.choose === true && prescreen.buttontimer >= 15) {
        soundchangeItem.play();
        // console.log("doubblejump");
        jumpshoe.choose = false;
        doubblejump.choose = false;
        shield.choose = true;
        prescreen.buttontimer = 0;
      }
      if (shield.choose === true && prescreen.buttontimer >= 15) {
        soundchangeItem.play();
        // console.log("doubblejump");
        jumpshoe.choose = false;
        shield.choose = false;
        doubblejump.choose = true;
        prescreen.buttontimer = 0;
      }
    }

    //Jumpshoe
    if (
      jumpshoe.choose === true &&
      doubblejump.choose === false &&
      shield.choose === false
    ) {
      fill(200);
      rect(50, height / 2, jumpshoe.sizeX * 1.2, jumpshoe.sizeY * 1.2, 5);
    }
    fill(jumpshoe.color);
    rect(50, height / 2, jumpshoe.sizeX, jumpshoe.sizeY, 5);
    fill(200);
    text(JumpshoeArray.length, 100, height - height / 2);

    //Doubblejump
    if (
      doubblejump.choose === true &&
      jumpshoe.choose === false &&
      shield.choose == false
    ) {
      fill(200);
      rect(50, height / 2 + 70, jumpshoe.sizeX * 1.2, jumpshoe.sizeY * 1.2, 5);
    }
    fill(doubblejump.color);
    rect(50, height / 2 + 70, jumpshoe.sizeX, jumpshoe.sizeY, 5);
    fill(200);
    text(DoubblejumpArray.length, 100, height / 2 + 70);

    //Shield
    if (
      shield.choose === true &&
      doubblejump.choose === false &&
      jumpshoe.choose === false
    ) {
      fill(200);
      rect(50, height / 2 + 140, shield.sizeX * 1.2, shield.sizeY * 1.2, 5);
    }
    fill(shield.color);
    rect(50, height / 2 + 140, shield.sizeX, shield.sizeY, 5);
    fill(30);
    if (shield.while === true) {
      shieldshowtime = (shield.maxtime - shield.timer) / 30;
      text(int(shieldshowtime), 45, height / 2 + 148);
    }
    fill(200);
    text(shieldArray.length, 100, height / 2 + 140);

    // prescreen.show = false;
    // player.moving = false;
    // prescreen.showshop = false;
    //Heart
    fill(Heart.color);
    if (HeartArray.length > 0) {
      rect(width - 75, height - 40, Heart.sizeX, Heart.sizeY, 5);
      if (HeartArray.length > 1) {
        rect(width - 150, height - 40, Heart.sizeX, Heart.sizeY, 5);
        if (HeartArray.length > 2) {
          rect(width - 225, height - 40, Heart.sizeX, Heart.sizeY, 5);
          if (HeartArray.length > 3) {
            rect(width - 300, height - 40, Heart.sizeX, Heart.sizeY, 5);
            if (HeartArray.length > 4) {
              rect(width - 375, height - 40, Heart.sizeX, Heart.sizeY, 5);
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
    if (jumpshoe.show === true) {
      fill(jumpshoe.color);
      rect(jumpshoe.x, jumpshoe.y, jumpshoe.sizeX, jumpshoe.sizeY, 20);

      if (player.affectTile === true && player.y <= height - height / 3) {
        jumpshoe.y = jumpshoe.y + player.gravity;
      }
      if (jumpshoe.y >= height + jumpshoe.sizeY) {
        jumpshoe.x = random(jumpshoe.sizeX / 2, width - jumpshoe.sizeX / 2);
        jumpshoe.y = random(-10000, -2000);
      }

      if (
        //unten rechts
        (player.x + player.sizeX / 2 >= jumpshoe.x - jumpshoe.sizeX / 2 &&
          player.x + player.sizeX / 2 <= jumpshoe.x + jumpshoe.sizeX / 2 &&
          player.y + player.sizeY / 2 <= jumpshoe.y + jumpshoe.sizeY / 2 &&
          player.y + player.sizeY / 2 >= jumpshoe.y - jumpshoe.sizeY / 2) ||
        //oben rechts
        (player.x + player.sizeX / 2 >= jumpshoe.x - jumpshoe.sizeX / 2 &&
          player.x + player.sizeX / 2 <= jumpshoe.x + jumpshoe.sizeX / 2 &&
          player.y - player.sizeY / 2 <= jumpshoe.y + jumpshoe.sizeY / 2 &&
          player.y - player.sizeY / 2 >= jumpshoe.y - jumpshoe.sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >= jumpshoe.x - jumpshoe.sizeX / 2 &&
          player.x - player.sizeX / 2 <= jumpshoe.x + jumpshoe.sizeX / 2 &&
          player.y + player.sizeY / 2 <= jumpshoe.y + jumpshoe.sizeY / 2 &&
          player.y + player.sizeY / 2 >= jumpshoe.y - jumpshoe.sizeY / 2) ||
        //oben links
        (player.x - player.sizeX / 2 >= jumpshoe.x - jumpshoe.sizeX / 2 &&
          player.x - player.sizeX / 2 <= jumpshoe.x + jumpshoe.sizeX / 2 &&
          player.y - player.sizeY / 2 <= jumpshoe.y + jumpshoe.sizeY / 2 &&
          player.y - player.sizeY / 2 >= jumpshoe.y - jumpshoe.sizeY / 2)
      ) {
        soundgetItem.play();
        jumpshoe.show = false;
        JumpshoeArray.push(1);
        jumpshoe.x = random(jumpshoe.sizeX / 2, width - jumpshoe.sizeX / 2);
        jumpshoe.y = random(-10000, -2000);
        jumpshoe.show = true;
      }
    }

    //Doubblejump
    if (doubblejump.show === true) {
      fill(doubblejump.color);
      rect(
        doubblejump.x,
        doubblejump.y,
        doubblejump.sizeX,
        doubblejump.sizeY,
        20
      );

      if (player.affectTile === true && player.y <= height - height / 3) {
        doubblejump.y = doubblejump.y + player.gravity;
      }
      if (doubblejump.y >= height + doubblejump.sizeY) {
        doubblejump.x = random(
          doubblejump.sizeX / 2,
          width - doubblejump.sizeX / 2
        );
        doubblejump.y = random(-10000, -2000);
      }

      if (
        //unten rechts
        (player.x + player.sizeX / 2 >= doubblejump.x - doubblejump.sizeX / 2 &&
          player.x + player.sizeX / 2 <=
            doubblejump.x + doubblejump.sizeX / 2 &&
          player.y + player.sizeY / 2 <=
            doubblejump.y + doubblejump.sizeY / 2 &&
          player.y + player.sizeY / 2 >=
            doubblejump.y - doubblejump.sizeY / 2) ||
        //oben rechts
        (player.x + player.sizeX / 2 >= doubblejump.x - doubblejump.sizeX / 2 &&
          player.x + player.sizeX / 2 <=
            doubblejump.x + doubblejump.sizeX / 2 &&
          player.y - player.sizeY / 2 <=
            doubblejump.y + doubblejump.sizeY / 2 &&
          player.y - player.sizeY / 2 >=
            doubblejump.y - doubblejump.sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >= doubblejump.x - doubblejump.sizeX / 2 &&
          player.x - player.sizeX / 2 <=
            doubblejump.x + doubblejump.sizeX / 2 &&
          player.y + player.sizeY / 2 <=
            doubblejump.y + doubblejump.sizeY / 2 &&
          player.y + player.sizeY / 2 >=
            doubblejump.y - doubblejump.sizeY / 2) ||
        //oben links
        (player.x - player.sizeX / 2 >= doubblejump.x - doubblejump.sizeX / 2 &&
          player.x - player.sizeX / 2 <=
            doubblejump.x + doubblejump.sizeX / 2 &&
          player.y - player.sizeY / 2 <=
            doubblejump.y + doubblejump.sizeY / 2 &&
          player.y - player.sizeY / 2 >= doubblejump.y - doubblejump.sizeY / 2)
      ) {
        soundgetItem.play();
        doubblejump.show = false;
        DoubblejumpArray.push(1);
        doubblejump.x = random(
          doubblejump.sizeX / 2,
          width - doubblejump.sizeX / 2
        );
        doubblejump.y = random(-10000, -2000);
        doubblejump.show = true;
      }
    }

    //Shield
    if (shield.show === true) {
      fill(shield.color);
      rect(shield.x, shield.y, shield.sizeX, shield.sizeY, 20);

      if (player.affectTile === true && player.y <= height - height / 3) {
        shield.y = shield.y + player.gravity;
      }
      if (shield.y >= height + shield.sizeY) {
        shield.x = random(shield.sizeX / 2, width - shield.sizeX / 2);
        shield.y = random(-10000, -2000);
      }

      if (
        //unten rechts
        (player.x + player.sizeX / 2 >= shield.x - shield.sizeX / 2 &&
          player.x + player.sizeX / 2 <= shield.x + shield.sizeX / 2 &&
          player.y + player.sizeY / 2 <= shield.y + shield.sizeY / 2 &&
          player.y + player.sizeY / 2 >= shield.y - shield.sizeY / 2) ||
        //oben rechts
        (player.x + player.sizeX / 2 >= shield.x - shield.sizeX / 2 &&
          player.x + player.sizeX / 2 <= shield.x + shield.sizeX / 2 &&
          player.y - player.sizeY / 2 <= shield.y + shield.sizeY / 2 &&
          player.y - player.sizeY / 2 >= shield.y - shield.sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >= shield.x - shield.sizeX / 2 &&
          player.x - player.sizeX / 2 <= shield.x + shield.sizeX / 2 &&
          player.y + player.sizeY / 2 <= shield.y + shield.sizeY / 2 &&
          player.y + player.sizeY / 2 >= shield.y - shield.sizeY / 2) ||
        //oben links
        (player.x - player.sizeX / 2 >= shield.x - shield.sizeX / 2 &&
          player.x - player.sizeX / 2 <= shield.x + shield.sizeX / 2 &&
          player.y - player.sizeY / 2 <= shield.y + shield.sizeY / 2 &&
          player.y - player.sizeY / 2 >= shield.y - shield.sizeY / 2)
      ) {
        soundgetItem.play();
        shield.show = false;
        shieldArray.push(1);
        shield.x = random(shield.sizeX / 2, width - shield.sizeX / 2);
        shield.y = random(-10000, -2000);
        shield.show = true;
      }
    }

    //Heart
    if (Heart.show === true) {
      fill(Heart.color);
      Heart.cooldown = Heart.cooldown + 1;
      rect(Heart.x, Heart.y, Heart.sizeX, Heart.sizeY, 20);

      if (player.affectTile === true && player.y <= height - height / 3) {
        Heart.y = Heart.y + player.gravity;
      }
      if (Heart.y >= height + Heart.sizeY) {
        Heart.x = random(Heart.sizeX / 2, width - Heart.sizeX / 2);
        Heart.y = random(-10000, -2000);
      }

      if (
        //unten rechts
        (player.x + player.sizeX / 2 >= Heart.x - Heart.sizeX / 2 &&
          player.x + player.sizeX / 2 <= Heart.x + Heart.sizeX / 2 &&
          player.y + player.sizeY / 2 <= Heart.y + Heart.sizeY / 2 &&
          player.y + player.sizeY / 2 >= Heart.y - Heart.sizeY / 2 &&
          Heart.cooldown > 60) ||
        //oben rechts
        (player.x + player.sizeX / 2 >= Heart.x - Heart.sizeX / 2 &&
          player.x + player.sizeX / 2 <= Heart.x + Heart.sizeX / 2 &&
          player.y - player.sizeY / 2 <= Heart.y + Heart.sizeY / 2 &&
          player.y - player.sizeY / 2 >= Heart.y - Heart.sizeY / 2 &&
          Heart.cooldown > 60) ||
        //unten links
        (player.x - player.sizeX / 2 >= Heart.x - Heart.sizeX / 2 &&
          player.x - player.sizeX / 2 <= Heart.x + Heart.sizeX / 2 &&
          player.y + player.sizeY / 2 <= Heart.y + Heart.sizeY / 2 &&
          player.y + player.sizeY / 2 >= Heart.y - Heart.sizeY / 2 &&
          Heart.cooldown > 60) ||
        //oben links
        (player.x - player.sizeX / 2 >= Heart.x - Heart.sizeX / 2 &&
          player.x - player.sizeX / 2 <= Heart.x + Heart.sizeX / 2 &&
          player.y - player.sizeY / 2 <= Heart.y + Heart.sizeY / 2 &&
          player.y - player.sizeY / 2 >= Heart.y - Heart.sizeY / 2 &&
          Heart.cooldown > 60)
      ) {
        sounditem_heart.play();
        if (HeartArray.length < HeartArrayWhile.length) {
          Heart.show = false;
          HeartArray.push(1);
          Heart.cooldown = 0;
          Heart.x = random(Heart.sizeX / 2, width - Heart.sizeX / 2);
          Heart.y = random(-10000, -2000);
          Heart.show = true;
        } else {
          sounditem_heart.play();
          Heart.show = false;
          Heart.cooldown = 0;
          Heart.x = random(Heart.sizeX / 2, width - Heart.sizeX / 2);
          Heart.y = random(-10000, -2000);
          Heart.show = true;
        }
      }
    }

    //Pong
    if (Pong.show === true) {
      fill(Pong.color);
      rect(Pong.x, Pong.y, Pong.sizeX, Pong.sizeY, 20);

      if (player.affectTile === true && player.y <= height - height / 3) {
        Pong.y = Pong.y + player.gravity;
      }
      if (Pong.y >= height + Pong.sizeY) {
        Pong.x = random(Pong.sizeX / 2, width - Pong.sizeX / 2);
        Pong.y = random(-20000, -1000);
      }

      if (
        //unten rechts
        (player.x + player.sizeX / 2 >= Pong.x - Pong.sizeX / 2 &&
          player.x + player.sizeX / 2 <= Pong.x + Pong.sizeX / 2 &&
          player.y + player.sizeY / 2 <= Pong.y + Pong.sizeY / 2 &&
          player.y + player.sizeY / 2 >= Pong.y - Pong.sizeY / 2) ||
        //oben rechts
        (player.x + player.sizeX / 2 >= Pong.x - Pong.sizeX / 2 &&
          player.x + player.sizeX / 2 <= Pong.x + Pong.sizeX / 2 &&
          player.y - player.sizeY / 2 <= Pong.y + Pong.sizeY / 2 &&
          player.y - player.sizeY / 2 >= Pong.y - Pong.sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >= Pong.x - Pong.sizeX / 2 &&
          player.x - player.sizeX / 2 <= Pong.x + Pong.sizeX / 2 &&
          player.y + player.sizeY / 2 <= Pong.y + Pong.sizeY / 2 &&
          player.y + player.sizeY / 2 >= Pong.y - Pong.sizeY / 2) ||
        //oben links
        (player.x - player.sizeX / 2 >= Pong.x - Pong.sizeX / 2 &&
          player.x - player.sizeX / 2 <= Pong.x + Pong.sizeX / 2 &&
          player.y - player.sizeY / 2 <= Pong.y + Pong.sizeY / 2 &&
          player.y - player.sizeY / 2 >= Pong.y - Pong.sizeY / 2)
      ) {
        if (HeartArray.length >= 1) {
          soundgetItem.play();
          Pong.show = false;
          Pong.x = random(Pong.sizeX / 2, width - Pong.sizeX / 2);
          Pong.y = random(-20000, -1000);
          Pong.while = true;
          Pong.show = true;
        }
      }
    }

    //changing keys
    if (changeKeys.show === true) {
      if (changeKeys.y + changeKeys.sizeY / 2 < 0) {
        changeKeys.timercolor = 0;
      }
      changeKeys.timercolor = changeKeys.timercolor + 1;

      if (changeKeys.timercolor === 1) {
        changeKeys.choosecolor = true;
        if (changeKeys.choosecolor === true) {
          changeKeys.color = random(itemcolors);
          changeKeys.choosecolor = false;
        }
      }
      fill(changeKeys.color);
      rect(changeKeys.x, changeKeys.y, changeKeys.sizeX, changeKeys.sizeY, 20);

      if (player.affectTile === true && player.y <= height - height / 3) {
        changeKeys.y = changeKeys.y + player.gravity;
      }
      if (changeKeys.y >= height + changeKeys.sizeY) {
        changeKeys.x = random(
          changeKeys.sizeX / 2,
          width - changeKeys.sizeX / 2
        );
        changeKeys.y = random(-100, -300);
        changeKeys.timercolor = 0;
      }

      if (
        //unten rechts
        (player.x + player.sizeX / 2 >= changeKeys.x - changeKeys.sizeX / 2 &&
          player.x + player.sizeX / 2 <= changeKeys.x + changeKeys.sizeX / 2 &&
          player.y + player.sizeY / 2 <= changeKeys.y + changeKeys.sizeY / 2 &&
          player.y + player.sizeY / 2 >= changeKeys.y - changeKeys.sizeY / 2) ||
        //oben rechts
        (player.x + player.sizeX / 2 >= changeKeys.x - changeKeys.sizeX / 2 &&
          player.x + player.sizeX / 2 <= changeKeys.x + changeKeys.sizeX / 2 &&
          player.y - player.sizeY / 2 <= changeKeys.y + changeKeys.sizeY / 2 &&
          player.y - player.sizeY / 2 >= changeKeys.y - changeKeys.sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >= changeKeys.x - changeKeys.sizeX / 2 &&
          player.x - player.sizeX / 2 <= changeKeys.x + changeKeys.sizeX / 2 &&
          player.y + player.sizeY / 2 <= changeKeys.y + changeKeys.sizeY / 2 &&
          player.y + player.sizeY / 2 >= changeKeys.y - changeKeys.sizeY / 2) ||
        //oben links
        (player.x - player.sizeX / 2 >= changeKeys.x - changeKeys.sizeX / 2 &&
          player.x - player.sizeX / 2 <= changeKeys.x + changeKeys.sizeX / 2 &&
          player.y - player.sizeY / 2 <= changeKeys.y + changeKeys.sizeY / 2 &&
          player.y - player.sizeY / 2 >= changeKeys.y - changeKeys.sizeY / 2)
      ) {
        soundgetItem.play();
        changeKeys.show = false;
        changeKeys.x = random(
          changeKeys.sizeX / 2,
          width - changeKeys.sizeX / 2
        );
        changeKeys.y = random(-100, -300);
        changeKeys.while = true;
        changeKeys.timercolor = 0;
        changeKeys.show = true;
      }
    }

    //Coin
    if (Coin.show === true) {
      fill(Coin.color);
      stroke(Coin.semicolor);
      strokeWeight(3);
      ellipse(Coin.x, Coin.y, Coin.sizeX, Coin.sizeY);
      noStroke();

      if (player.affectTile === true && player.y <= height - height / 3) {
        Coin.y = Coin.y + player.gravity;
      }
      if (Coin.y >= height + Coin.sizeY) {
        Coin.x = random(40, width - 80);
        Coin.y = random(-600, -100);
      }

      if (
        //unten rechts
        (player.x + player.sizeX / 2 >= Coin.x - Coin.sizeX / 2 &&
          player.x + player.sizeX / 2 <= Coin.x + Coin.sizeX / 2 &&
          player.y + player.sizeY / 2 <= Coin.y + Coin.sizeY / 2 &&
          player.y + player.sizeY / 2 >= Coin.y - Coin.sizeY / 2) ||
        //oben rechts
        (player.x + player.sizeX / 2 >= Coin.x - Coin.sizeX / 2 &&
          player.x + player.sizeX / 2 <= Coin.x + Coin.sizeX / 2 &&
          player.y - player.sizeY / 2 <= Coin.y + Coin.sizeY / 2 &&
          player.y - player.sizeY / 2 >= Coin.y - Coin.sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >= Coin.x - Coin.sizeX / 2 &&
          player.x - player.sizeX / 2 <= Coin.x + Coin.sizeX / 2 &&
          player.y + player.sizeY / 2 <= Coin.y + Coin.sizeY / 2 &&
          player.y + player.sizeY / 2 >= Coin.y - Coin.sizeY / 2) ||
        //oben links
        (player.x - player.sizeX / 2 >= Coin.x - Coin.sizeX / 2 &&
          player.x - player.sizeX / 2 <= Coin.x + Coin.sizeX / 2 &&
          player.y - player.sizeY / 2 <= Coin.y + Coin.sizeY / 2 &&
          player.y - player.sizeY / 2 >= Coin.y - Coin.sizeY / 2) ||
        (player.x + player.sizeX / 2 >= Coin.x &&
          player.x - player.sizeX / 2 <= Coin.x &&
          player.y - player.sizeY <= Coin.y &&
          player.y + player.sizeY / 2 >= Coin.y)
      ) {
        Coin.show = false;
        soundgetCoin.play();
        Coins = Coins + Coin.weight;
        Coin.x = random(Coin.sizeX / 2, width - Coin.sizeX / 2);
        Coin.y = random(-6000, -1000);
        Coin.show = true;
      }
    }
    //every half second coins = coins - 1
    if (Pong.while === false) {
      CoinTimer = CoinTimer + 1;
      if (
        Coins >= 1 &&
        CoinTimer >= 15 &&
        player.y - player.sizeY / 2 < heightWhile &&
        player.moving === true
      ) {
        Coins = Coins - 1;
        CoinTimer = 0;
      }
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
        shieldArray.push(1);
        if (
          DoubblejumpArray.length > 99 &&
          JumpshoeArray.length > 99 &&
          shieldArray.length > 99
        ) {
          godmodetimer = 99;
        }
      }
    }
  }
}

//Different functions of the items
function itemfunction() {
  if (Pong.while === true) {
    fill(0);
    rect(Pong.slideX, heightWhile / 2, widthWhile, heightWhile);

    player.moving = false;
    ShootEnemy.moving = false;
    if (Pong.slidingR === false) {
      Pong.slidingL = true;
    } else {
      Pong.slidingL = false;
    }
    if (Pong.slidingL === true && Pong.starting === false) {
      Pong.startingTimer = Pong.startingTimer + 1;
      if (Pong.startingTimer === 1) {
        soundPongOverflow.play();
      }
      Pong.slideX = Pong.slideX - 15;
      if (Pong.slideX < width / 2) {
        Pong.starting = true;
        Pong.startingTimer = 0;
        shield.while = false;
        shield.timer = 0;
        keys.moveright = 39;
        keys.moveleft = 37;
        keys.switchitem = 16;
        keys.useitem = 32;
        changeKeys.timer = 0;
        changeKeys.while = false;
        changeKeys.choosecolor = false;
        rotatePortal.starting = false;
        Pong.slidingL = false;
      }
    }
    if (Pong.slidingR === true && Pong.starting === false) {
      Pong.startingTimer = Pong.startingTimer + 1;
      if (Pong.startingTimer === 1) {
        soundPongOverflow.play();
      }
      Pong.slideX = Pong.slideX + 15;
      if (Pong.slideX > width + width / 2) {
        Pong.slidingR = false;
        Pong.while = false;
        Pong.startingTimer = 0;
        player.moving = true;
        player.jump = true;
        player.jumpEnd = 0;
        player.gravity = 3;
        player.boost = 25;
      }
    }

    Pong.x = random(Pong.sizeX / 2, width - Pong.sizeX / 2);
    Pong.y = random(-2000, -10000);
  }

  //change Keys
  if (changeKeys.while === true) {
    changeKeys.timer = changeKeys.timer + 1;
    keys.moveright = 37;
    keys.moveleft = 39;
    keys.switchitem = 32;
    keys.useitem = 16;
    if (changeKeys.timer >= 180) {
      keys.moveright = 39;
      keys.moveleft = 37;
      keys.switchitem = 16;
      keys.useitem = 32;
      changeKeys.timer = 0;
      changeKeys.while = false;
    }

    changeKeys.x = random(changeKeys.sizeX / 2, width - changeKeys.sizeX / 2);
    changeKeys.y = random(-2000, -10000);
  }

  //Doubblejump use
  if (keyIsDown(keys.useitem)) {
    if (
      doubblejump.choose === true &&
      DoubblejumpArray.length > 0 &&
      prescreen.buttontimer >= 15
    ) {
      // console.log("doubblejump yeah");
      sounditem_doubblejump.play();
      prescreen.buttontimer = 0;
      doubblejump.while = true;
      DoubblejumpArray.pop();
    }
  }
  if (doubblejump.while === true) {
    // player.affectTile = true;
    player.jump = true;
    player.jumpEnd = 0;
    player.gravity = 3;
    player.boost = 25;
    doubblejump.while = false;
  }

  //Jumpshoe use
  if (keyIsDown(keys.useitem)) {
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
    if (
      player.jump === true &&
      player.boost >= 45 &&
      player.boost <= jumpshoe.usingafter
    ) {
      sounditem_jumpshoe.play();
    }
    // console.log(jumpshoe.timer);
    jumpshoe.using = 3;
    jumpshoe.usingafter = 50;
    player.jumpEnd = -100;
    if (jumpshoe.timer > jumpshoewhile) {
      jumpshoe.while = false;
      jumpshoe.timer = 0;
    }
  } else {
    jumpshoe.using = 3 / 2;
    jumpshoe.usingafter = 30;
    player.jumpEnd = 0;
  }

  //Shield use
  if (keyIsDown(keys.useitem)) {
    if (
      shield.choose === true &&
      shieldArray.length > 0 &&
      prescreen.buttontimer >= 15
    ) {
      prescreen.buttontimer = 0;
      shield.while = true;
      shieldArray.pop();
    }
  }
  if (shield.while === true) {
    shield.timer = shield.timer + 1;
    if (shield.timer === 1) {
      sounditem_shield_open.play();
    }
    if (shield.timer === shield.maxtime - 5 && player.moving === true) {
      sounditem_shield_close.play();
    }
    if (
      shield.timer < shield.maxtime &&
      shield.timer != shield.maxtime - 3 &&
      shield.timer != shield.maxtime - 5 &&
      shield.timer != shield.maxtime - 6 &&
      shield.timer != shield.maxtime - 10 &&
      shield.timer != shield.maxtime - 11 &&
      shield.timer != shield.maxtime - 15 &&
      shield.timer != shield.maxtime - 16 &&
      shield.timer != shield.maxtime - 20 &&
      shield.timer != shield.maxtime - 21
    ) {
      fill(50, 205, 50, 200);
    }
    ellipse(player.x, player.y, player.sizeX * 2, player.sizeY * 2);
    if (shield.timer >= shield.maxtime) {
      shield.while = false;
      shield.timer = 0;
    }
  }

  //Coin animation
  if (Coin.animation === true) {
    Coin.sizeX = Coin.sizeX + 2;
    if (Coin.sizeX >= Coin.sizeXWhile) {
      Coin.animation = false;
    }
  }
  if (Coin.animation === false) {
    Coin.sizeX = Coin.sizeX - 2;
    if (Coin.sizeX <= 1) {
      Coin.animation = true;
    }
  }
}

//Characteristics of platforms
//basic Platform
function normaltile() {
  for (i = 0; i < ntiles.length; i++) {
    fill(ntiles[i].color);
    rect(ntiles[i].x, ntiles[i].y, ntiles[i].sizeX, ntiles[i].sizeY);
  }
}

//moving platform
function movingtile() {
  for (m = 0; m < mtiles.length; m++) {
    fill(mtiles[m].color);
    rect(mtiles[m].x, mtiles[m].y, mtiles[m].sizeX, mtiles[m].sizeY);

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
    if (
      player.affectTile === true &&
      player.moving === true &&
      player.y <= height - height / 3
    ) {
      ntiles[i].y = ntiles[i].y + player.gravity;
    }
    if (ntiles[i].y > height + ntiles[i].sizeY) {
      //Where and if tiles can be respawned
      if (deletetile === true) {
        ntiles.splice(i, 1);
        //console.log("deleted");
        //console.log(ntiles.length);
        deletetile = false;
      } else {
        ntiles[i].y = 0 - random(10, 600);
        ntiles[i].x = random(ntiles[i].sizeX / 2, width - ntiles[i].sizeX / 2);
      }
    }
  }

  if (
    player.affectTile === true &&
    player.moving === true &&
    player.y <= height - height / 3
  ) {
    ntilesFIRST.y = ntilesFIRST.y + player.gravity;
    if (ntilesFIRST.y >= height) {
      ntilesFIRST.show = false;
    }
  }

  //moving platforms
  for (m = 0; m < mtiles.length; m++) {
    if (
      player.affectTile === true &&
      player.moving === true &&
      player.y <= height - height / 3
    ) {
      mtiles[m].y = mtiles[m].y + player.gravity;

      if (
        player.x - player.sizeX / 2 >= mtiles[m].x - mtiles[m].sizeX &&
        player.x + player.sizeX <= mtiles[m].x + mtiles[m].sizeX / 2 &&
        player.y + player.sizeY >= mtiles[m].y - mtiles[m].sizeY * 2 &&
        player.y + player.sizeY <= mtiles[m].y + mtiles[m].sizeY * 2
      ) {
        if (mtiles[m].movingR === false) {
          player.x = player.x - 2;
        } else {
          player.x = player.x + 2;
        }
      }
    }
  }
}

//Delete Platforms (Delete / Add)
function changetiles() {
  for (m = 0; m < mtiles.length; m++) {
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
    if (mtiles[m].y > height + ntiles[m].sizeY) {
      if (addtile === true) {
        //ich definiere hier das Objekt nochmal,
        //damit jedes Mal wirklich ein neues Objekt erstellt wird.
        mtilesNEW = {
          x: random(40, width - 80),
          y: 0 - random(10, 600),
          sizeX: 80,
          sizeY: 10,
          change: false,
          movingR: true,
          color: color(120, 120, 120)
        };
        mtiles.push(mtilesNEW);
        //console.log("Added");
        addtile = false;
      } else {
        mtiles[m].y = 0 - random(10, 600);
        mtiles[m].x = random(mtiles[m].sizeX / 2, width - mtiles[m].sizeX / 2);
      }
    }
  }
}

//Background
function environmentfunction() {
  for (m = 0; m < mtiles.length; m++) {
    for (i = 0; i < ntiles.length; i++) {
      background(environment.color);
      environment.soundtimer = environment.soundtimer + 1;
      if (environment.soundtimer === 1) {
        soundBackground.play();
        if (environment.soundtimer >= 131 * 30) {
          environment.soundtimer = 0;
        }
      }

      if (player.y < heightWhile / 5) {
        player.affectTileTooClose = true;
      } else {
        player.affectTileTooClose = false;
      }

      if (player.affectTileTooClose === true) {
        player.affectTiles = true;
        //   ntiles[i].y = ntiles[i].y + 1;
        //   mtiles[m].y = mtiles[m].y + 1;
        //   if (ShootEnemy.show === true) {
        //     ShootEnemy.y = ShootEnemy.y + 1;
        //   }
        //   if (RushEnemy.show === true) {
        //     RushEnemy.y = RushEnemy.y + 1;
        //   }
        //   if (Pong.show === true) {
        //     Pong.y = Pong.y + 1;
        //   }
        //   if (jumpshoe.show === true) {
        //     jumpshoe.y = jumpshoe.y + 1;
        //   }
        //   if (doubblejump.show === true) {
        //     doubblejump.y = doubblejump.y + 1;
        //   }
        //   if (Coin.show === true) {
        //     Coin.y = Coin.y + 1;
        //   }
      }
    }
  }
}

function inGameImages() {
  if (
    prescreen.show === false &&
    prescreen.showshop === false &&
    prescreen.showcontrols === false &&
    player.moving === true
  ) {
    image(fire, width / 2, height - 90, 100, 100);
  }
}

//Highscore
function highscorefunction() {
  if (Pong.starting === false) {
    fill(200);
    textSize(30);
    text("Lines Of Code: " + int(highscore.score), highscore.x, highscore.y);

    if (
      player.affectTile === true &&
      player.moving === true &&
      prescreen.show === false
    ) {
      highscore.score = highscore.score + 0.5;
    }
  }
  //Coin
  fill(Coin.color);
  stroke(Coin.semicolor);
  strokeWeight(3);
  ellipse(
    width / 2 - 30,
    highscore.y - Coin.sizeY / 2,
    (Coin.sizeX * 3) / 2,
    (Coin.sizeY * 3) / 2
  );
  if (
    Coin === 10 &&
    Coin === 9 &&
    Coin === 6 &&
    Coin === 5 &&
    Coin === 3 &&
    Coin === 2 &&
    Coin === 1
  ) {
    fill(Coin.colortimer);
  } else {
    fill(Coin.colortimer2);
  }
  noStroke();
  textSize(35);
  text(Coins, width / 2 - 10, highscore.y);
  textSize(25);
}

//Game over
function gameOver() {
  if (
    prescreen.showshop === false &&
    prescreen.show === false &&
    prescreen.showcontrols === false
  ) {
    fill(200);
    if (
      player.yPos1 + player.sizeY / 2 >= height ||
      Coins <= 0 ||
      HeartArray.length < 1 ||
      width != widthWhile ||
      height != heightWhile
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
        gameOverTimer = gameOverTimer + 1;
        if (gameOverTimer === 1) {
          soundDieThroughFalling.play();
        }
        text(random(falling), width / 2, height / 2);
        gameOverFall = false;
      }

      if (gameOverCoins === true && prescreen.delay > 0) {
        gameOverFall = false;
        gameOverTimer = gameOverTimer + 1;
        if (gameOverTimer === 1) {
          soundDieThroughFalling.play();
        }
        text(random(noCoinsLeft), width / 2, height / 2);
        gameOverCoins = false;
      }

      if (gameOverLifes === true && prescreen.delay > 0) {
        gameOverFall = false;
        gameOverTimer = gameOverTimer + 1;
        if (gameOverTimer === 1) {
          soundDieThroughFalling.play();
        }
        text(random(dying), width / 2, height / 2);
        gameOverLifes = false;
      }

      textAlign(LEFT);
      textSize(20);

      // console.log(highscore.score);
      // console.log(highscore.total);
      changeKeys.timer = 0;
      changeKeys.while = false;
      ShootEnemy.moving = false;
      RushEnemy.moving = false;
      RushUpAndDownEnemy.moving = false;
      rotatePortal.starting = false;
      prescreen.delay = prescreen.delay + 1;
      player.y = player.y + 10;
      if (highscore.adding === true) {
        highscore.total = highscore.total + highscore.score;
        highscore.adding = false;
      }
      rounds.push(int(highscore.score));
      if (prescreen.delay > 100) {
        prescreen.startGame = false;
        widthWhile = width;
        heightWhile = height;
        prescreen.show = true;
        prescreen.showshop = false;
        prescreen.showcontrols = false;
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
  Intro();

  if (showIntro === false) {
    environmentfunction();
        
    //Prescreen & GAME OVER   
   PrescreenFunction();
   reset();
   PrescreenShop();
   PrescreenControls();

    if (prescreen.startGame === true){
    //Different platforms
    normaltile();
    movingtile();

    //Player
    PlayerFunction();
    PlayerAffectPlatform();
    //Enemies
    RushEnemyFunction();
    ShootEnemyFunction();
    RushEnemyUpAndDownFunction();

    //Platform functions
    movetiles();
    changetiles();

    //Item stuff
    items();
    itembar();
    itemfunction();
    PortalRotation();

    highscorefunction();
  
    // inGameImages();


    //Pong start
    if (Pong.starting === true) {
      Spieler();
      Ball();
      BallMoving();
      Restart();
    }
    //Pong end

    gameOver();
  }
    //developing
    developing();
  }
}
