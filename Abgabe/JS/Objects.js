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
  soundtimer: 0
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
  soundTimer: 0,
  //mobile
  touchR: false,
  touchL: false
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
  useitem: 32,
  changing: false
};
var keysMovement = [39, 37, 16, 32];
var keysMovementWhile = [39, 37, 16, 32];

//Background
var environment = {
  color: color(8, 0, 30),
  colortimer: 0,
  soundtimer: 0
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

//All Keys
var keyInfo = [
  "",
  "",
  "",
  "break",
  "",
  "",
  "",
  "",
  "backspace",
  "tab",
  "",
  "",
  "clear",
  "enter",
  "",
  "",
  "shift",
  "ctrl",
  "alt",
  "pause",
  "caps lock",
  "hangul",
  "",
  "",
  "",
  "hanja",
  "",
  "escape",
  "conversion",
  "non-conversion",
  "",
  "",
  "space",
  "page up",
  "page down",
  "end",
  "home",
  "left arrow",
  "up arrow",
  "right arrow",
  "down arrow",
  "select",
  "print",
  "execute",
  "print screen",
  "insert",
  "delete",
  "help",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ":",
  "semicolon",
  "<",
  "equals",
  "",
  "ß",
  "@",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "windows key",
  "right window key",
  "windows menu",
  "",
  "sleep",
  "numpad 0",
  "numpad 1",
  "numpad 2",
  "numpad 3",
  "numpad 4",
  "numpad 5",
  "numpad 6",
  "numpad 7",
  "numpad 8",
  "numpad 9",
  "multipy",
  "add",
  "numpad period",
  "substract",
  "decimal point",
  "divide",
  "f1",
  "f2",
  "f3",
  "f4",
  "f5",
  "f6",
  "f7",
  "f8",
  "f9",
  "f10",
  "f11",
  "f12",
  "f13",
  "f14",
  "f15",
  "f16",
  "f17",
  "f18",
  "f19",
  "f20",
  "f21",
  "f22",
  "f23",
  "f24",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "num lock",
  "scroll lock",
  "",
  "",
  "",
  "",
  "",
  "airplane mode",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "^",
  "!",
  "؛",
  "#",
  "$",
  "ù",
  "page backward",
  "page forward",
  "refresh",
  "closing paren",
  "*",
  "+",
  "home key",
  "mute",
  "decrease volume",
  "increase volume",
  "next",
  "previous",
  "stop",
  "play/pause",
  "e-mail",
  "mute/unmute",
  "decrease volume",
  "increase volume",
  "",
  "",
  "semicolon",
  "equal",
  "comma",
  "dash",
  "period",
  "forward slash",
  "ö",
  "?",
  "numpad period",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "open bracket",
  "back slash",
  "close bracket",
  "single quote",
  "`",
  "left/right ⌘",
  "altgr",
  "left back slash",
  "",
  "",
  "",
  "GNOME Compose Key",
  "ç",
  "",
  "XF86Forward",
  "XF86Back",
  "non-conversion",
  "",
  "",
  "",
  "",
  "alphanumeric",
  "",
  "hiragana",
  "half/full width",
  "kanji",
  "",
  "",
  "",
  "",
  "",
  "",
  "unlock trackpad",
  "",
  "",
  "",
  "toggle touchpad"
];
