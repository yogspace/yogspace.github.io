var Diandra = [];
var KeyTimer = 0;

function PlayerName() {
  fill(255);
  textSize(32);
  textAlign(LEFT);
  text(Diandra.join(""), width / 2, height / 2);

  KeyTimer++;
  if (
    keyIsPressed === true &&
    keyCode != 8 &&
    keyCode != 32 &&
    Diandra.length <= 10 &&
    KeyTimer > 2
  ) {
    KeyTimer = 0;
    Diandra.push(key);
  }
  if (
    keyIsPressed === true &&
    keyCode === 8 &&
    Diandra.length >= 0 &&
    KeyTimer > 5
  ) {
    KeyTimer = 0;
    Diandra.pop();
  }
}

function draw() {
  clear();
  PlayerName();
}
