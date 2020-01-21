/*
 *                This is DoodleJump!
 *
 *
 *
 *
 *
 *             programmed by: yogspace
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
var ntilesanmount;
if (windowWidth >= displayWidth - displayWidth / 5) {
  ntilesanmount = 60;
} else {
  ntilesanmount = 35;
}
var ntilesanmounthalfwidth = 35;
//moving tiles
var mtilesanmount = 2;
//the value for the height when tiles will despawn
var heightdeleted = 20;
var heightadded = 75;

//value for the speed of the tiles
var speed = 3;

var prescreen = {
  reset: false,
  show: false,
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
  soundtimer: 1
};

//for prescreen
var showIntro = true;
var firstscreen = true;

//Player
var player = {
  x: width / 2,
  y: height - height * (1 / 6),
  sizeX: 70,
  sizeY: 90,
  color: color(255, 255, 255),
  moving: true,
  moveR: false,
  jump: true,
  jumpEnd: 0,
  jumpStart: height,
  gravity: 3,
  boost: 30,
  falling: true,
  //if affect platform
  affectTile: false,
  affectTileTooClose: false,
  standingOnMtile: false,
  //items
  jetpackR: false,
  jetpackL: false,
  //detection
  yPos1: 0,
  yPos2: 0,
  //sound
  soundTimer: 0
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

//keys
var keys = {
  moveright: 39,
  moveleft: 37,
  switchitem: 16,
  useitem: 32
};

//Background
var environment = {
  color: color(8, 0, 30),
  soundtimer: 0
};

// //RandomText
// RTxt = ["10100101110100101011"];
// var randomText = {
//   color: color(50, 205, 50, 100),
//   timer: 0,
//   x: 10,
//   y: width / 2
// };

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
  color: color(32, 178, 170),
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
  sizeY: 40,
  sizeXWhile: 20,
  color: color(0, 255, 0),
  semicolor: color(70, 70, 70),
  show: true,
  weight: 5,
  animation: false,

  //For highscore
  colortimer: color(200, 200, 200),
  colortimer2: color(200, 0, 0)
};

//ChangeKeys
var changeKeys = {
  x: random(50, width - 50),
  y: random(-600, -10),
  sizeX: 50,
  sizeY: 50,
  imageCount: 5,
  show: true,
  timer: 0,
  timercolor: 0,
  chooseimage: false,
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

var EnemyDetection = false;

/*
 *
 *
 * Enemies
 *
 *
 */
var RushEnemy = {
  x: random(25, width - 25),
  y: 0 - random(3000, 500),
  // y: random(100, 500),
  sizeX: 90,
  sizeY: 75,
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
  sizeX: 90,
  sizeY: 100,
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

//Shoot Enemy
var ShootESizeX = 80;
var ShootESizeXTotal = random(ShootESizeX, width - ShootESizeX);
var ShootESizeY = 160;
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
var dying = ["killed by an Error"];
var falling = ["you lost control"];
var noCoinsLeft = ["you ran out of Energy"];

//factors for deltion/adding of platforms
var factordel = [];
var delntile = 0;
var deletetile = false;
var factoradd = [];
var addmtile = 0;
var addtile = false;

//for shop
var shop = {
  cwprice: 150,
  caprice: 100,
  haprice: 500,
  slprice: 300,
  EDprice: 3000
};

//for developer stats
var showStats = false;
var showStatsTimer = 0;
var godmodetimer = 0;

//Canvas width
var widthWhile;
var heightWhile;

//The Prescreen
function Intro() {
  prescreen.buttontimer = prescreen.buttontimer + 1;

  // console.log(prescreen.show);
  // console.log(prescreen.showshop);
  // console.log(prescreen.showcontrols);
  if (showIntro === true) {
    //Background
    fill(environment.color);
    rect(0, 0, width * 2, height * 2);
    textAlign(CENTER);
    fill(255);
    textSize(80);
    text("ANTIVIRUS", width / 2, height / 2);
    if (prescreen.buttontimer >= 30) {
      textSize(40);
      fill(170, 170, 170, prescreen.buttontimer * 5);
      text("KILL THE ERROR", width / 2, height / 2 + height / 3);
      textSize(20);
      text("by yogspace", width / 2 + width / 3, height - 30);
      image(
        imageShootEnemy,
        width / 2 + 150,
        height / 2 + height / 3 - ShootEnemy.sizeX / 4,
        (ShootEnemy.sizeX * 1) / 2,
        (ShootEnemy.sizeY * 1) / 2
      );
    }
  }
  if (prescreen.buttontimer >= 50 && showIntro === true) {
    prescreen.show = true;
    prescreen.buttontimer = 0;
    showIntro = false;
  }
}

function PrescreenFunction() {
  //after the round
  if (prescreen.show === true) {
    //if there are less tiles than at the beginning

    while (ntiles.length < ntilesanmount) {
      ntilesNEW = {
        x: random(40, width - 80),
        y: random(-600, height - 10),
        sizeX: 80,
        sizeY: 10,
        change: false,
        color: color(70, 70, 70)
      };
      ntiles.push(ntilesNEW);
    }

    while (mtiles.length > mtilesanmount) {
      mtiles.pop();
    }

    while (JumpshoeArray.length > 0) {
      JumpshoeArray.pop();
    }
    while (DoubblejumpArray.length > 0) {
      DoubblejumpArray.pop();
    }
    while (shieldArray.length > 0) {
      shieldArray.pop();
    }

    //Heart regeneration
    if (HeartArray.length < HeartArrayWhile.length) {
      HeartArray.push(1);
    }

    if (HeartArray.length > HeartArrayWhile.length) {
      HeartArray.pop();
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
    text("Lines of Code: " + int(highscore.total), width / 2 - 100, 50);

    //what you can see after the first round
    if (firstscreen === false) {
      textAlign(CENTER);
      text("latest score: ", width / 2 - width / 4, 130);
      text(int(highscore.score) + " Lines of code", width / 2 - width / 4, 185);
      text("best score: ", width / 2 + width / 4, 130);
      text(max(rounds) + " lines of code", width / 2 + width / 4, 185);

      //Stats

      textAlign(LEFT);
      textSize(20);
    } else {
      if (prescreen.buttontimer === 30) {
        soundWelcome.play();
      }

      //modi godmode
      fill(200);
      textSize(20);
      text("godmode", width / 2 - 70, height - 418);
      image(imageQR, width - 50, 50, 60, 60);

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
      if (
        (mouseIsPressed === true && prescreen.buttontimer >= 20) ||
        (keyIsPressed === true && keyCode === 32 && prescreen.buttontimer >= 20)
      ) {
        soundButton.play();
        prescreen.delay = 0;
        prescreen.reset = true;
        prescreen.buttontimer = 0;
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
      if (
        (mouseIsPressed === true && prescreen.buttontimer >= 20) ||
        (keyIsPressed === true && keyCode === 32 && prescreen.buttontimer >= 20)
      ) {
        soundButton.play();
        prescreen.show = false;
        prescreen.showshop = true;
        prescreen.buttontimer = 0;
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
      if (
        (mouseIsPressed === true && prescreen.buttontimer >= 20) ||
        (keyIsPressed === true && keyCode === 32 && prescreen.buttontimer >= 20)
      ) {
        soundButton.play();
        prescreen.show = false;
        prescreen.showcontrols = true;
        prescreen.buttontimer = 0;
      }
    } else {
      prescreen.buttoncolorcontrols = color(200, 30, 30);
      prescreen.buttonsemicolorcontrols = color(170, 30, 30);
    }
  }
}

function reset() {
  // console.log(ntiles.length);
  if (prescreen.reset === true) {
    //tiles are new sorted
    for (i = 0; i < ntiles.length; i = i + 1) {
      ntiles[i].x = random(40, width - 80);
      ntiles[i].y = random(-600, height - 10);
    }

    for (m = 0; m < mtiles.length; m = m + 1) {
      mtiles[m].x = random(40, width - 80);
      mtiles[m].y = random(-600, height - 10);
    }
    delntile = 0;
    addmtile = 0;
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
    changeKeys.x = random(changeKeys.sizeX / 2, width - changeKeys.sizeX / 2);
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

    RushUpAndDownEnemy.y = 0 - random(7000, 3000);
    RushUpAndDownEnemy.x = random(RushEnemy.sizeX, width - RushEnemy.sizeX);
    RushUpAndDownEnemy.movingUp = false;

    //Highscore
    highscore.score = 0;
    highscore.adding = true;

    //Background
    environment.soundtimer = 0;

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

function PrescreenShop() {
  // prescreen.show = false;
  // prescreen.showshop = true;
  // highscore.total = 5000;

  if (prescreen.showshop === true) {
    //Background
    fill(environment.color);
    rect(0, 0, width * 2, height * 2);
    fill(200);
    textAlign(LEFT);
    textSize(50);
    text("Total: " + int(highscore.total) + " lines of code", 40, 96);
    //Back
    fill(prescreen.buttonsemicolorshop);
    rect(width - 120, 80, 160, 90);
    fill(prescreen.buttoncolorshop);
    rect(width - 122, 78, 156, 86);
    fill(200);
    // textSize(50);
    text("back", width - 160, 96);
    textSize(20);

    //Coin
    fill(Coin.color);
    stroke(Coin.semicolor);
    strokeWeight(5);
    rect(50, 235, Coin.sizeX * 2, Coin.sizeY * 2, 10);
    noStroke();

    fill(prescreen.buttoncolor);
    rectMode(CORNER);
    rect(100, 171, width - 120, 60, 20);
    rect(100, 241, width - 120, 60, 20);
    rectMode(CENTER);
    fill(0);
    textSize(25);
    text("Energy Anmount: " + (100 + newCoins), 120, 208);
    text("Battery capacity: " + Coin.weight, 120, 280);
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
      prescreen.buttontimer >= 20 &&
      Coins <= 99999
    ) {
      if (highscore.total >= shop.caprice) {
        soundButton.play();
        highscore.total = highscore.total - shop.caprice;
        shop.caprice = shop.caprice + 15;
        prescreen.buttontimer = 0;
        newCoins = newCoins + 10;
      } else {
        soundDenied.play();
        prescreen.buttontimer = 0;
      }
    }

    if (
      mouseIsPressed === true &&
      mouseX >= width - 110 &&
      mouseX <= width - 30 &&
      mouseY >= 250 &&
      mouseY <= 290 &&
      prescreen.buttontimer >= 20 &&
      Coin.weight < 100
    ) {
      if (highscore.total >= shop.cwprice) {
        soundButton.play();
        highscore.total = highscore.total - shop.cwprice;
        shop.cwprice = shop.cwprice + 25;
        prescreen.buttontimer = 0;
        Coin.weight = Coin.weight + 5;
      } else {
        soundDenied.play();
        prescreen.buttontimer = 0;
      }
    }

    //Heart
    fill(Heart.color);
    image(imageHeart, 50, 360, Heart.sizeX, Heart.sizeY);

    fill(prescreen.buttoncolor);
    rectMode(CORNER);
    rect(100, 331, width - 120, 60, 20);
    rectMode(CENTER);
    fill(0);
    textSize(25);
    text("Max Anmount: " + HeartArrayWhile.length, 120, 370);
    if (HeartArray.length < 5) {
      text("+ 1", width / 2 + 50, 370);
      rect(width - 70, 360, 80, 40, 5);
      fill(255);
      text(shop.haprice + " LOC", width - 105, 370);
      fill(0);
    } else {
      text("max", width / 2 + 50, 370);
    }
    textSize(20);
    if (
      mouseIsPressed === true &&
      mouseX >= width - 110 &&
      mouseX <= width - 30 &&
      mouseY >= 340 &&
      mouseY <= 380 &&
      prescreen.buttontimer >= 20 &&
      HeartArray.length < 5 &&
      HeartArrayWhile.length < 5
    ) {
      if (highscore.total >= shop.haprice) {
        soundButton.play();
        prescreen.buttontimer = 0;
        HeartArray.push(1);
        HeartArrayWhile.push(1);
        highscore.total = highscore.total - shop.haprice;
        shop.haprice = shop.haprice + 250;
      } else {
        soundDenied.play();
        prescreen.buttontimer = 0;
      }
    }

    //Shield
    image(imageShield, 50, 450, shield.sizeX, shield.sizeY);

    fill(prescreen.buttoncolor);
    rectMode(CORNER);
    rect(100, 421, width - 120, 60, 20);
    rectMode(CENTER);
    fill(0);
    textSize(25);
    text("Shield Time: " + shield.maxtime / 30 + "s", 120, 460);
    if (shield.maxtime < 300) {
      text("+ 1s", width / 2 + 50, 460);
      rect(width - 70, 450, 80, 40, 5);
      fill(255);
      text(shop.slprice + " LOC", width - 105, 460);
      fill(0);
    } else {
      text("max", width / 2 + 50, 460);
    }

    textSize(20);
    if (
      mouseIsPressed === true &&
      mouseX >= width - 110 &&
      mouseX <= width - 30 &&
      mouseY >= 430 &&
      mouseY <= 470 &&
      prescreen.buttontimer >= 20 &&
      shield.maxtime < 300 &&
      shield.maxtimewhile < 300
    ) {
      if (highscore.total >= shop.slprice) {
        soundButton.play();
        prescreen.buttontimer = 0;
        shield.maxtime = shield.maxtime + 30;
        shield.maxtimewhile = shield.maxtimewhile + 30;
        highscore.total = highscore.total - shop.slprice;
        shop.slprice = shop.slprice + 250;
      } else {
        soundDenied.play();
        prescreen.buttontimer = 0;
      }
    }

    //Enemy Detection
    image(imageEnemyDetection, 50, 540, shield.sizeX, shield.sizeY);

    fill(prescreen.buttoncolor);
    rectMode(CORNER);
    rect(100, 511, width - 120, 60, 20);
    rectMode(CENTER);
    fill(0);
    textSize(25);
    text("VIRUS SCAN", 120, 550);
    if (EnemyDetection === false) {
      rect(width - 70, 540, 80, 40, 5);
      fill(255);
      text(shop.EDprice + " LOC", width - 105, 550);
      fill(0);
    } else {
      text("ACTIVATED", width / 2 + 50, 550);
    }

    textSize(20);
    if (
      mouseIsPressed === true &&
      mouseX >= width - 110 &&
      mouseX <= width - 30 &&
      mouseY >= 520 &&
      mouseY <= 560 &&
      prescreen.buttontimer >= 20 &&
      EnemyDetection === false
    ) {
      if (highscore.total >= shop.EDprice) {
        soundButton.play();
        prescreen.buttontimer = 0;
        EnemyDetection = true;
        highscore.total = highscore.total - shop.EDprice;
      } else {
        soundDenied.play();
        prescreen.buttontimer = 0;
      }
    }

    //Back
    if (
      mouseX >= width - 200 &&
      mouseX <= width - 40 &&
      mouseY >= 35 &&
      mouseY <= 125
    ) {
      prescreen.buttoncolorshop = color(230, 30, 30);
      prescreen.buttonsemicolorshop = color(200, 30, 30);
      if (mouseIsPressed === true && prescreen.buttontimer >= 20) {
        prescreen.buttontimer = 0;
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
  // showIntro = false;

  if (prescreen.showcontrols === true) {
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
    text("back", width - 160, 96);
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
        prescreen.showcontrols = false;
      }
    } else {
      prescreen.buttoncolorshop = color(200, 30, 30);
      prescreen.buttonsemicolorshop = color(170, 30, 30);
    }
  }
}