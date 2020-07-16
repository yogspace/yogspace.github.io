/*

RANDOM WORLD - Moon Driver

*/

//Change these to change the accuracy of the Floor
var FloorSize = 15;
var pitch = 10;

var lastFloorYPos;

//Score
var score = 0;

//Floor rect
var floor = {
  x: 0,
  y: height / 2,
  sizeX: FloorSize,
  sizeY: height
};

//Key Stuff
var keyTimer = 0;

//Abstand X
var FloorArray = [];
var abstandX = 0;

while (abstandX < width) {
  floor = {
    x: abstandX,
    y: height / 2,
    sizeX: FloorSize,
    sizeY: height
  };
  FloorArray.push(floor);
  abstandX = abstandX + floor.sizeX;
}

//Background
function Environment() {
  fill(176, 224, 230);
  ellipse(100, 90, 95, 100);

  textSize(20);
  text("score: " + int(score) + " ft.", width - 150, 50);
}

//FIRST LAYER
function PlayerFunction() {
  fill(53, 53, 53);
  ellipse(FloorArray[23].x, FloorArray[23].y - 35 / 2, 35, 35);
  ellipse(FloorArray[28].x, FloorArray[28].y - 35 / 2, 35, 35);
  quad(
    FloorArray[23].x - 20,
    FloorArray[23].y - 20,
    FloorArray[23].x - 15,
    FloorArray[23].y - 50,
    FloorArray[28].x + 10,
    FloorArray[28].y - 50,
    FloorArray[28].x + 25,
    FloorArray[28].y - 20
  );
}

//Item bar
function ItemBar() {
  fill(25, 25, 25);
  rect(0, 0, floor.sizeX * 2, height);
}

//Function of one floor rect
function FloorFunction() {
  for (i = 0; i < FloorArray.length; i++) {
    fill(255, 215, 200);
    // rect(
    //   FloorArray[i].x,
    //   FloorArray[i].y,
    //   FloorArray[i].sizeX,
    //   FloorArray[i].sizeY,
    //   20
    // );
    quad(
      FloorArray[i].x,
      FloorArray[i].y,

      FloorArray[i].x + 50,
      FloorArray[i].y,

      FloorArray[i].x + 50,
      FloorArray[i].y + height,

      FloorArray[i].x,
      FloorArray[i].y + height
    );
  }
}

//Move the floor
function MoveFloor() {
  keyTimer++;
  if (
    (keyIsPressed === true && keyCode === 32 && keyTimer >= 1) ||
    (mouseIsPressed === true && keyTimer >= 1)
  ) {
    score = score + 1 / 5;
    for (i = 0; i < FloorArray.length; i++) {
      FloorArray[i].x = FloorArray[i].x - FloorSize;
      // console.log(FloorArray[i]);
      // FloorArray.shift();
      if (FloorArray[i].x <= 0) {
        FloorArray.shift();

        floor = {
          x: abstandX,
          y: FloorArray[FloorArray.length - 1].y + random(pitch),
          sizeX: FloorSize,
          sizeY: height
        };
        FloorArray.push(floor);
        lastFloorYPos = FloorArray[FloorArray.length - 1].y;
        // FloorArray[i].x = abstandX - 50;
        // console.log(FloorArray[i]);
        // FloorArray[i].sizeY = 20;
        // console.log(FloorArray[i]);
      }
      keyTimer = 0;
    }
  }
}

//check if the floor is too high or too low AND!! the pitch
function CheckIfFloorTooHighOrLow() {
  // console.log(lastFloorYPos);
  //Too Low
  if (lastFloorYPos >= height - 150) {
    pitch = random(0 - FloorSize * 2, 0);
  }
  //Too High
  if (lastFloorYPos <= 150) {
    pitch = random(0, FloorSize * 2);
  }

  //normal
  if (lastFloorYPos > 150 && lastFloorYPos < height - 50) {
    pitch = random(0 - FloorSize * 2, FloorSize * 2);
  }
}

//BACKGROUND
//Change these to change the accuracy of the Floor
var BackgroundFloorSize = 10;
var Backgroundpitch = 10;

var BackgroundlastFloorYPos;

//Score
var Backgroundscore = 0;

//Floor rect
var Backgroundfloor = {
  x: 0,
  y: height / 2,
  sizeX: BackgroundFloorSize,
  sizeY: height
};

//Key Stuff
var BackgroundkeyTimer = 0;

//Abstand X
var BackgroundFloorArray = [];
var BackgroundabstandX = 0;

while (BackgroundabstandX < width) {
  Backgroundfloor = {
    x: BackgroundabstandX,
    y: height / 2,
    sizeX: BackgroundFloorSize,
    sizeY: height
  };
  BackgroundFloorArray.push(Backgroundfloor);
  BackgroundabstandX = BackgroundabstandX + Backgroundfloor.sizeX;
}

//Function of one floor rect
function BackgroundFloorFunction() {
  for (i = 0; i < BackgroundFloorArray.length; i++) {
    fill(222, 184, 135);
    // rect(
    //   FloorArray[i].x,
    //   FloorArray[i].y,
    //   FloorArray[i].sizeX,
    //   FloorArray[i].sizeY,
    //   20
    // );
    quad(
      BackgroundFloorArray[i].x,
      BackgroundFloorArray[i].y,

      BackgroundFloorArray[i].x + 50,
      BackgroundFloorArray[i].y,

      BackgroundFloorArray[i].x + 50,
      BackgroundFloorArray[i].y + height,

      BackgroundFloorArray[i].x,
      BackgroundFloorArray[i].y + height
    );
  }
}

//Move the floor
function BackgroundMoveFloor() {
  BackgroundkeyTimer++;
  if (
    (keyIsPressed === true && keyCode === 32 && BackgroundkeyTimer >= 1) ||
    (mouseIsPressed === true && BackgroundkeyTimer >= 1)
  ) {
    for (i = 0; i < BackgroundFloorArray.length; i++) {
      BackgroundFloorArray[i].x =
        BackgroundFloorArray[i].x - BackgroundFloorSize;
      // console.log(FloorArray[i]);
      // FloorArray.shift();
      if (BackgroundFloorArray[i].x <= 0) {
        BackgroundFloorArray.shift();

        Backgroundfloor = {
          x: BackgroundabstandX,
          y:
            BackgroundFloorArray[BackgroundFloorArray.length - 1].y +
            random(Backgroundpitch),
          sizeX: BackgroundFloorSize,
          sizeY: height
        };
        BackgroundFloorArray.push(Backgroundfloor);
        BackgroundlastFloorYPos =
          BackgroundFloorArray[BackgroundFloorArray.length - 1].y;
        // FloorArray[i].x = abstandX - 50;
        // console.log(FloorArray[i]);
        // FloorArray[i].sizeY = 20;
        // console.log(FloorArray[i]);
      }
      BackgroundkeyTimer = 0;
    }
  }
}

//check if the floor is too high or too low AND!! the pitch
function BackgroundCheckIfFloorTooHighOrLow() {
  // console.log(lastFloorYPos);
  //Too Low
  if (BackgroundlastFloorYPos >= lastFloorYPos + 150) {
    Backgroundpitch = random(0 - BackgroundFloorSize * 3, 0);
  }
  //Too High
  if (BackgroundlastFloorYPos <= 100) {
    Backgroundpitch = random(0, BackgroundFloorSize * 3);
  }

  //normal
  if (
    BackgroundlastFloorYPos > 150 &&
    BackgroundlastFloorYPos < lastFloorYPos - 150
  ) {
    Backgroundpitch = random(
      0 - BackgroundFloorSize * 3,
      BackgroundFloorSize * 3
    );
  }
}

//Foreground
//Change these to change the accuracy of the Floor
var ForegroundFloorSize = 25;
var Foregroundpitch = 10;

var ForegroundlastFloorYPos;

//Score
var Foregroundscore = 0;

//Floor rect
var Foregroundfloor = {
  x: width,
  y: height / 2,
  sizeX: ForegroundFloorSize,
  sizeY: height
};

//Key Stuff
var ForegroundkeyTimer = 0;

//Abstand X
var ForegroundFloorArray = [];
var ForegroundabstandX = 0;

while (ForegroundabstandX < width) {
  Foregroundfloor = {
    x: ForegroundabstandX,
    y: height / 2,
    sizeX: ForegroundFloorSize,
    sizeY: height
  };
  ForegroundFloorArray.push(Foregroundfloor);
  ForegroundabstandX = ForegroundabstandX + Foregroundfloor.sizeX;
}

//Function of one floor rect
function ForegroundFloorFunction() {
  for (i = 0; i < ForegroundFloorArray.length; i++) {
    fill(255, 248, 220);
    // rect(
    //   FloorArray[i].x,
    //   FloorArray[i].y,
    //   FloorArray[i].sizeX,
    //   FloorArray[i].sizeY,
    //   20
    // );
    quad(
      ForegroundFloorArray[i].x,
      ForegroundFloorArray[i].y,

      ForegroundFloorArray[i].x + 50,
      ForegroundFloorArray[i].y,

      ForegroundFloorArray[i].x + 50,
      ForegroundFloorArray[i].y + height,

      ForegroundFloorArray[i].x,
      ForegroundFloorArray[i].y + height
    );
  }
}

//Move the floor
function ForegroundMoveFloor() {
  ForegroundkeyTimer++;
  if (
    (keyIsPressed === true && keyCode === 32 && ForegroundkeyTimer >= 1) ||
    (mouseIsPressed === true && ForegroundkeyTimer >= 1)
  ) {
    for (i = 0; i < ForegroundFloorArray.length; i++) {
      ForegroundFloorArray[i].x =
        ForegroundFloorArray[i].x - ForegroundFloorSize;
      // console.log(FloorArray[i]);
      // FloorArray.shift();
      if (ForegroundFloorArray[i].x <= 0) {
        ForegroundFloorArray.shift();

        Foregroundfloor = {
          x: ForegroundabstandX,
          y:
            ForegroundFloorArray[ForegroundFloorArray.length - 1].y +
            random(Foregroundpitch),
          sizeX: ForegroundFloorSize,
          sizeY: height
        };
        ForegroundFloorArray.push(Foregroundfloor);
        ForegroundlastFloorYPos =
          ForegroundFloorArray[ForegroundFloorArray.length - 1].y;
        // FloorArray[i].x = abstandX - 50;
        // console.log(FloorArray[i]);
        // FloorArray[i].sizeY = 20;
        // console.log(FloorArray[i]);
      }
      ForegroundkeyTimer = 0;
    }
  }
}

//check if the floor is too high or too low AND!! the pitch
function ForegroundCheckIfFloorTooHighOrLow() {
  // console.log(lastFloorYPos);
  //Too Low
  if (ForegroundlastFloorYPos >= height + 150) {
    Foregroundpitch = random(0 - ForegroundFloorSize * 3, 0);
  }
  //Too High
  if (ForegroundlastFloorYPos <= lastFloorYPos) {
    Foregroundpitch = random(0, ForegroundFloorSize * 3);
  }

  //normal
  if (
    ForegroundlastFloorYPos > lastFloorYPos &&
    ForegroundlastFloorYPos < height
  ) {
    Foregroundpitch = random(
      0 - ForegroundFloorSize * 3,
      ForegroundFloorSize * 3
    );
  }
}

function textFunction() {
  textAlign(CENTER);
  textFont("Lucida Sans Unicode");
  text("[PRESS SPACE]", width / 2, height - height / 20);
}

function draw() {
  clear();
  Environment();

  BackgroundFloorFunction();
  BackgroundCheckIfFloorTooHighOrLow();
  BackgroundMoveFloor();

  FloorFunction();
  CheckIfFloorTooHighOrLow();
  MoveFloor();
  PlayerFunction();

  ForegroundFloorFunction();
  ForegroundCheckIfFloorTooHighOrLow();
  ForegroundMoveFloor();
  ItemBar();
  textFunction();
}
