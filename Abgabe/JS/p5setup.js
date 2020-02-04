/***********************************************************************************
 *
 *
 *                     This is ANTIVIRUS!
 *            ___________________________________
 *
 *
 *             _________________________________
 *            ***********************************
 *           *###################################*
 *           *#|*******************************|#*
 *           *#|*        programmed by:       *|#*
 *           *#|*                             *|#*
 *           *#|*          yogspace           *|#*
 *           *#|*                             *|#*
 *           *#|*                             *|#*
 *           *#|*                             *|#*
 *           *#|*        Version: 1.0         *|#*
 *           *#|*******************************|#*
 *           *###################################*
 *           *************************************
 *           |-----------------------------------|
 *          / 1  2  3  4  5  6  7  8  9  0  ?  / |
 *         / q w e r t z u i o  p  ü +  [ ]   / /
 *        / a  s  d  f  g  h  j  k  l    []  / /
 *       / <  y  x  c  v  b  n  m  ,  .  -  / /
 *      / STR  ALT [///////////]  < // >   / /
 *     /_________________________________ / /
 *    /__________________________________/_/
 *
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
 * Prescreen-backroundmusic:
 * https://freemusicarchive.org/genre/Electronic
 *
 *
 * folgende Bugs müssen noch gefixt werden:
 *
 * - Tiles können nicht auf gleicher Position spawnen
 * - Spieler sammelt manchmal ein Item nicht auf
 * - ab und zu bewegen sich feste tiles um ein paar Pixel
 * - height wird hinzugefügt, obwohl der Spieler nicht weiter kommt
 *
 *
 *
 * - Dinge, die noch hinzugefügt werden:
 * - Item: Torch und Darkness
 * - Variablen Namen anpassen
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

/*
 *
 *
 * MOBILE MODE
 *
 *
 */

var PlayOnMobile = false;
var ntilesanmount;

/*
 *
 *
 * FONT
 *
 *
 */
var myFont;

/*
 *
 *
 * SOUND
 *
 *
 */
//Menu
var soundButton; //good
var soundWelcome; // good
var soundBackground; //good
var soundPongOverflow; //good
var soundPongCollusion; //good
var soundDenied; //good
var soundPrescreenBackground; //good

var soundjumping; //good
var soundjumpingLanding; // good
var soundgetCoin; // good
//Items
var soundgetItem; // good
var soundchangeItem; //good
var sounditem_doubblejump; //good
var sounditem_jumpshoe; //good
var sounditem_shield_close; //good
var sounditem_shield_open; //good
var sounditem_heart; // good
var sound_rotatePortal; // good
var sound_rotatePortalRotating; // good

//Enemies
var soundkillEnemy; //good
var soundgetHitted; //good
var soundEnemyShooting; //good
var soundRushEnemy; //good
var soundEnemyCooldown; //good
var soundShootEnemy; //good
var soundRushUpAndDownEnemy; // good
var soundRushUpAndDownEnemy2; // good

//Dying
var soundDieThroughFalling; // good
var soundDieThroughEnemy; // good
var soundDieThroughTimer; // good

/*
 *
 *
 * IMAGES
 *
 *
 */

var imageHeart;
var imageShootEnemy;
var imageRushEnemy;
var imageRushUPDEnemyGoLeft;
var imageRushUPDEnemyGoRight;
var imageEnemyDetection;
var imageJetpack;
var imageShield;
var imageDoubblejump;
var imagePong;
var imagePlayerRight;
var imagePlayerLeft;
var imageJetpackR;
var imageJetpackL;
var imageQR;
var imageNtile;
var imageMtile;

function preload() {
  //Font
  myFont = loadFont("Font/BebasNeue-Regular.otf");

  //Images SVG (Funktioniert leider nicht in Firefox)
  // imageHeart = loadImage("Bilder/SVG/Heart.svg");
  // imageShootEnemy = loadImage("Bilder/SVG/ShootEnemy.svg");
  // imageRushEnemy = loadImage("Bilder/SVG/RushEnemy.svg");
  // imageRushUPDEnemyGoLeft = loadImage("Bilder/SVG/RushUADEnemy-GoLeft.svg");
  // imageRushUPDEnemyGoRight = loadImage("Bilder/SVG/RushUADEnemy-GoRight.svg");
  // imageEnemyDetection = loadImage("Bilder/SVG/EnemyDetection.svg");
  // imageJetpack = loadImage("Bilder/SVG/jetpack.svg");
  // imageShield = loadImage("Bilder/SVG/shield.svg");
  // imageDoubblejump = loadImage("Bilder/SVG/Doubblejump.svg");
  // imagePong = loadImage("Bilder/SVG/Pong.svg");
  // imagePlayerRight = loadImage("Bilder/SVG/Player/PlayerRight.svg");
  // imagePlayerLeft = loadImage("Bilder/SVG/Player/PlayerLeft.svg");
  // imageJetpackR = loadImage("Bilder/SVG/Player/JetpackRight.svg");
  // imageJetpackL = loadImage("Bilder/SVG/Player/JetpackLeft.svg");
  // imageQR = loadImage("Bilder/SVG/qrcode.svg");

  //Images (PNG)
  imageHeart = loadImage("Bilder/PNG/Heart.png");
  imageShootEnemy = loadImage("Bilder/PNG/ShootEnemy.png");
  imageRushEnemy = loadImage("Bilder/PNG/RushEnemy.png");
  imageRushUPDEnemyGoLeft = loadImage("Bilder/PNG/RushUADEnemy-GoLeft.png");
  imageRushUPDEnemyGoRight = loadImage("Bilder/PNG/RushUADEnemy-GoRight.png");
  imageEnemyDetection = loadImage("Bilder/PNG/EnemyDetection.png");
  imageJetpack = loadImage("Bilder/PNG/jetpack.png");
  imageShield = loadImage("Bilder/PNG/shield.png");
  imageDoubblejump = loadImage("Bilder/PNG/Doubblejump.png");
  imagePong = loadImage("Bilder/PNG/Pong.png");
  imagePlayerRight = loadImage("Bilder/PNG/Player/PlayerRight.png");
  imagePlayerLeft = loadImage("Bilder/PNG/Player/PlayerLeft.png");
  imageJetpackR = loadImage("Bilder/PNG/Player/JetpackRight.png");
  imageJetpackL = loadImage("Bilder/PNG/Player/JetpackLeft.png");
  imageQR = loadImage("Bilder/PNG/qrcode.png");
  imageNtile = loadImage("Bilder/PNG/ntile.png");
  imageMtile = loadImage("Bilder/PNG/mtile.png");

  //Sounds
  soundPrescreenBackground = loadSound("Sound/prescreenbackground.mp3");
  soundDenied = loadSound("Sound/denied.mp3");
  soundRushUpAndDownEnemy2 = loadSound("Sound/EnemyRushUpAndDown.mp3");
  soundRushUpAndDownEnemy2.setVolume(0.6);
  soundRushUpAndDownEnemy = loadSound("Sound/EnemyUpDown.mp3");
  soundRushUpAndDownEnemy.setVolume(0.6);
  soundRushEnemy = loadSound("Sound/EnemyRush.mp3");
  soundRushEnemy.setVolume(0.6);
  soundEnemyCooldown = loadSound("Sound/EnemyCooldown.mp3");
  soundEnemyCooldown.setVolume(0.6);
  soundBackground = loadSound("Sound/background.mp3");
  soundWelcome = loadSound("Sound/welcome.mp3");
  soundButton = loadSound("Sound/presceen_button.mp3");
  soundButton.setVolume(0.6);
  soundkillEnemy = loadSound("Sound/enemy_killed.mp3");
  soundkillEnemy.setVolume(0.6);
  soundShootEnemy = loadSound("Sound/enemy_shootEnemy.mp3");
  soundShootEnemy.setVolume(1);
  soundgetCoin = loadSound("Sound/getCoins.mp3");
  soundgetCoin.setVolume(0.6);
  soundjumping = loadSound("Sound/jumping.mp3");
  soundjumping.setVolume(0.6);
  soundjumpingLanding = loadSound("Sound/jumping_landing.mp3");
  soundjumpingLanding.setVolume(0.6);
  soundgetItem = loadSound("Sound/getItem.mp3");
  soundgetItem.setVolume(0.6);
  soundgetHitted = loadSound("Sound/getHitted.mp3");
  soundgetHitted.setVolume(0.6);
  soundEnemyShooting = loadSound("Sound/enemy_shooting.mp3");
  soundEnemyShooting.setVolume(0.6);
  soundchangeItem = loadSound("Sound/changeItem.mp3");
  soundchangeItem.setVolume(0.7);
  sounditem_doubblejump = loadSound("Sound/item_doubblejump.mp3");
  sounditem_shield_close = loadSound("Sound/item_shield_close.mp3");
  sounditem_shield_open = loadSound("Sound/item_shield_open.mp3");
  sounditem_heart = loadSound("Sound/item_heart.mp3");
  soundDieThroughFalling = loadSound("Sound/falling.mp3");
  soundDieThroughFalling.setVolume(0.6);
  soundPongCollusion = sounditem_heart;
  soundPongCollusion.setVolume(0.6);
  soundPongOverflow = loadSound("Sound/Pong_flow.mp3");
  soundPongOverflow.setVolume(0.6);
  sounditem_jumpshoe = loadSound("Sound/item_jumpshoe.mp3");
  sound_rotatePortal = loadSound("Sound/rotatePortal.mp3");
  sound_rotatePortalRotating = loadSound("Sound/rotatePortal_rotating.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);

  //basic settings
  textFont(myFont);
  textAlign(LEFT);
  textSize(20);
  noStroke();
  imageMode(CENTER);
  rectMode(CENTER);
  textStyle(BOLD);
  angleMode(DEGREES);

  /*
  Wenn der Spieler ein Handy benutzt, gibt es
  weniger Tiles. 
  Außerdem ändert sich der scale.

  Wenn der Spieler auf einem Computer im Vollbildmodus spielt,
  gibt es ebenfalls mehr tiles, als wenn er in einem kleinen Fenster spielt.
  */
  console.log(displayHeight);
  console.log(displayWidth);
  if (displayHeight > displayWidth) {
    PlayOnMobile = true;
    console.log("You are playing on a mobile device.");
  } else {
    PlayOnMobile = false;
    console.log("You are playing on a computer system.");
  }

  //Start value: anmount of platforms
  //normal tiles
  if (PlayOnMobile === false) {
    if (windowWidth >= displayWidth - displayWidth / 5) {
      ntilesanmount = 60;
    } else {
      ntilesanmount = 35;
    }
  } else {
    ntilesanmount = 30;
  }
}

window.addEventListener("resize", function() {
  resizeCanvas(windowWidth, windowHeight);
  clear();
});

new p5();
var width = windowWidth;
var height = windowHeight;
