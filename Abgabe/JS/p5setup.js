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

function preload() {
  //Font
  myFont = loadFont("Font/BebasNeue-Regular.otf");

  //Images
  imageHeart = loadImage("Bilder/Heart.svg");
  imageShootEnemy = loadImage("Bilder/ShootEnemy.svg");
  imageRushEnemy = loadImage("Bilder/RushEnemy.svg");
  imageRushUPDEnemyGoLeft = loadImage("Bilder/RushUADEnemy-GoLeft.svg");
  imageRushUPDEnemyGoRight = loadImage("Bilder/RushUADEnemy-GoRight.svg");
  imageEnemyDetection = loadImage("Bilder/EnemyDetection.svg");
  imageJetpack = loadImage("Bilder/jetpack.svg");
  imageShield = loadImage("Bilder/shield.svg");
  imageDoubblejump = loadImage("Bilder/Doubblejump.svg");
  imagePong = loadImage("Bilder/Pong.svg");
  imagePlayerRight = loadImage("Bilder/Player/PlayerRight.svg");
  imagePlayerLeft = loadImage("Bilder/Player/PlayerLeft.svg");
  imageJetpackR = loadImage("Bilder/Player/JetpackRight.svg");
  imageJetpackL = loadImage("Bilder/Player/JetpackLeft.svg");
  imageQR = loadImage("Bilder/qrcode.svg");

  //Sounds
  soundDenied = loadSound("Sound/denied.mp3");
  soundRushUpAndDownEnemy2 = loadSound("Sound/EnemyRushUpAndDown.mp3");
  soundRushUpAndDownEnemy = loadSound("Sound/EnemyUpDown.mp3");
  soundRushEnemy = loadSound("Sound/EnemyRush.mp3");
  soundEnemyCooldown = loadSound("Sound/EnemyCooldown.mp3");
  soundBackground = loadSound("Sound/background.mp3");
  soundWelcome = loadSound("Sound/welcome.mp3");
  soundButton = loadSound("Sound/presceen_button.mp3");
  soundkillEnemy = loadSound("Sound/enemy_killed.mp3");
  soundShootEnemy = loadSound("Sound/enemy_shootEnemy.mp3");
  soundgetCoin = loadSound("Sound/getCoins.mp3");
  soundjumping = loadSound("Sound/jumping.mp3");
  soundjumpingLanding = loadSound("Sound/jumping_landing.mp3");
  soundgetItem = loadSound("Sound/getItem.mp3");
  soundgetHitted = loadSound("Sound/getHitted.mp3");
  soundEnemyShooting = loadSound("Sound/enemy_shooting.mp3");
  soundchangeItem = loadSound("Sound/changeItem.mp3");
  sounditem_doubblejump = loadSound("Sound/item_doubblejump.mp3");
  sounditem_shield_close = loadSound("Sound/item_shield_close.mp3");
  sounditem_shield_open = loadSound("Sound/item_shield_open.mp3");
  sounditem_heart = loadSound("Sound/item_heart.mp3");
  soundDieThroughFalling = loadSound("Sound/falling.mp3");
  soundPongCollusion = sounditem_heart;
  soundPongOverflow = loadSound("Sound/Pong_flow.mp3");
  sounditem_jumpshoe = loadSound("Sound/item_jumpshoe.mp3");
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

  // sound_jumping.setVolume(0.1);
}

window.addEventListener("resize", function() {
  resizeCanvas(windowWidth, windowHeight);
  clear();
});

new p5();
var width = windowWidth;
var height = windowHeight;
