//The Player and first tile
function PlayerFunction() {
  if (
    prescreen.show === false &&
    prescreen.showshop === false &&
    prescreen.showcontrols === false &&
    showIntro === false
  ) {
    console.log("KeyCode: " + keyCode);

    //first tile
    if (ntilesFIRST.show === true) {
      // fill(70, 70, 70);
      // rect(ntilesFIRST.x, ntilesFIRST.y, ntilesFIRST.sizeX, ntilesFIRST.sizeY);
      fill(0, 255, 0);
      textSize(15);
      text(
        "01101010101011",
        ntilesFIRST.x - ntilesFIRST.sizeX / 2,
        ntilesFIRST.y + ntilesFIRST.sizeY
      );
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

    if (player.y <= 0) {
      player.y = 0;
    }

    //Movement of player
    if (keyIsPressed === true && player.moving === true) {
      if (keyIsDown(keysMovement[1])) {
        player.moveR = false;
        if (player.affectTile === false) {
          player.x = player.x - 10;
        } else {
          player.x = player.x - 1 / 10;
        }
      }
      if (keyIsDown(keysMovement[0])) {
        player.moveR = true;
        if (player.affectTile === false) {
          player.x = player.x + 10;
        } else {
          player.x = player.x + 1 / 10;
        }
      }
    }
    //For Mobile
    if (player.touchL === false && player.touchR === true) {
      if (player.affectTile === false) {
        player.x = player.x + 10;
      } else {
        player.x = player.x + 1 / 10;
      }
    }
    if (player.touchR === false && player.touchL === true) {
      if (player.affectTile === false) {
        player.x = player.x - 10;
      } else {
        player.x = player.x - 1 / 10;
      }
    }

    //Appearance of the player
    if (player.moveR === true) {
      image(imagePlayerRight, player.x, player.y, player.sizeX, player.sizeY);
      if (jumpshoe.while === true) {
        player.jetpackR = true;
        player.jetpackL = false;
      } else {
        player.jetpackR = false;
      }

      if (player.jetpackR === true) {
        fill(0);
        image(
          imageJetpackR,
          player.x - player.sizeX / 2,
          player.y,
          player.sizeX / 2,
          player.sizeY
        );
      }
    } else {
      image(imagePlayerLeft, player.x, player.y, player.sizeX, player.sizeY);
      if (jumpshoe.while === true) {
        player.jetpackL = true;
        player.jetpackR = false;
      } else {
        player.jetpackL = false;
      }
      if (player.jetpackL === true) {
        fill(0);
        image(
          imageJetpackL,
          player.x + player.sizeX / 2,
          player.y,
          player.sizeX / 2,
          player.sizeY
        );
      }
    }

    //Border left / right
    if (
      player.x - player.sizeX / 2 <= 0 &&
      keyIsDown(keysMovement[1]) &&
      player.moving === true
    ) {
      player.x = width - player.sizeX / 2;
    }
    if (
      player.x + player.sizeX / 2 >= width &&
      keyIsDown(keysMovement[0]) &&
      player.moving === true
    ) {
      player.x = player.sizeX / 2;
    }
  }
}

//For mobile
function touchStarted() {
  if (
    prescreen.show === false &&
    prescreen.showshop === false &&
    prescreen.showcontrols === false &&
    showIntro === false &&
    gameOverCoins === false &&
    gameOverFall === false &&
    gameOverLifes === false
  ) {
    if (
      mouseX >= 0 &&
      mouseX < width / 2 &&
      mouseY >= height / 2 &&
      mouseY <= height
    ) {
      if (Pong.while === false) {
        player.touchR = false;
        player.touchL = true;
        player.moveR = false;
      }
      //Pong
      touchDownLeft = true;
      touchUpLeft = false;
      touchDownRight = false;
      touchUpRight = false;
    }

    if (
      mouseX >= width / 2 &&
      mouseX <= width &&
      mouseY >= height / 2 &&
      mouseY <= height
    ) {
      if (Pong.while === false) {
        player.touchL = false;
        player.touchR = true;
        player.moveR = true;
      }
      //Pong
      touchDownRight = true;
      touchDownLeft = false;
      touchUpRight = false;
      touchUpLeft = false;
    }

    if (
      mouseX >= width / 2 &&
      mouseX <= width &&
      mouseY >= 0 &&
      mouseY < height / 2
    ) {
      //Pong
      touchDownRight = false;
      touchDownLeft = false;
      touchUpRight = true;
      touchUpLeft = false;
    }
    if (
      mouseX >= 0 &&
      mouseX < width / 2 &&
      mouseY >= 0 &&
      mouseY < height / 2
    ) {
      //Pong
      touchDownRight = false;
      touchDownLeft = false;
      touchUpRight = false;
      touchUpLeft = true;
    }

    //Use Item
    if (mouseX >= 0 && mouseX <= 100) {
      if (
        mouseY > height / 2 - jumpshoe.sizeY / 2 &&
        mouseY < height / 2 + jumpshoe.sizeY / 2 &&
        JumpshoeArray.length > 0 &&
        prescreen.buttontimer >= 15 &&
        jumpshoe.while === false &&
        doubblejump.while === false &&
        Pong.while === false
      ) {
        jumpshoe.while = true;
        JumpshoeArray.pop();
      }
      if (
        mouseY > height / 2 + 70 - doubblejump.sizeY / 2 &&
        mouseY < height / 2 + 70 + doubblejump.sizeY / 2 &&
        DoubblejumpArray.length > 0 &&
        prescreen.buttontimer >= 15 &&
        jumpshoe.while === false &&
        doubblejump.while === false &&
        Pong.while === false
      ) {
        doubblejump.while = true;
        DoubblejumpArray.pop();
      }
      if (
        mouseY > height / 2 + 140 - shield.sizeY / 2 &&
        mouseY < height / 2 + 140 + shield.sizeY / 2 &&
        DoubblejumpArray.length > 0 &&
        prescreen.buttontimer >= 15 &&
        Pong.while === false
      ) {
        shield.while = true;
        shieldArray.pop();
      }
    }
  }
}
function touchEnded() {
  if (
    prescreen.show === false &&
    prescreen.showshop === false &&
    prescreen.showcontrols === false &&
    showIntro === false
  ) {
    player.touchL = false;
    player.touchR = false;
    //Pong
    touchDownLeft = false;
    touchDownRight = false;
    touchUpLeft = false;
    touchUpRight = false;
  }
}

//Player affect tiles
function PlayerAffectPlatform() {
  if (
    prescreen.show === false &&
    prescreen.showshop === false &&
    prescreen.showcontrols === false
  ) {
    if (prescreen.buttontimer >= 120) {
      soundPrescreenBackground.stop();
    }
    // if (player.jump === false) {
    //   console.log("1: " + int(player.y));
    //   console.log("2: " + int(player.yPos1 + player.sizeY / 2));
    //   console.log("3: " + int(player.yPos2 + player.sizeY / 2));
    // }

    //weiterkommen
    /*
      Hier habe ich die Detection ob sich der Spieler auf einer Plattform
      befindet. Wie ich auf die Zahlen gekommen bin, habe ich in der Datei
      tiles-detection.pdf notiert.
      */

    //First normal tile
    if (
      //1
      //unten rechts
      (player.x + player.sizeX / 2 - 10 >=
        ntilesFIRST.x - ntilesFIRST.sizeX / 2 &&
        player.x + player.sizeX / 2 - 10 <=
          ntilesFIRST.x + ntilesFIRST.sizeX / 2 &&
        player.yPos1 + player.sizeY / 2 <=
          ntilesFIRST.y - ntilesFIRST.sizeY / 2 &&
        player.yPos2 + player.sizeY / 2 >=
          ntilesFIRST.y - ntilesFIRST.sizeY / 2) ||
      //unten links
      (player.x - player.sizeX / 2 + 10 >=
        ntilesFIRST.x - ntilesFIRST.sizeX / 2 &&
        player.x - player.sizeX / 2 + 10 <=
          ntilesFIRST.x + ntilesFIRST.sizeX / 2 &&
        player.yPos1 + player.sizeY / 2 <=
          ntilesFIRST.y - ntilesFIRST.sizeY / 2 &&
        player.yPos2 + player.sizeY / 2 >=
          ntilesFIRST.y - ntilesFIRST.sizeY / 2) ||
      //2
      //unten rechts
      (player.x + player.sizeX / 2 - 10 >=
        ntilesFIRST.x - ntilesFIRST.sizeX / 2 &&
        player.x + player.sizeX / 2 - 10 <=
          ntilesFIRST.x + ntilesFIRST.sizeX / 2 &&
        player.yPos1 + player.sizeY / 2 <=
          ntilesFIRST.y + ntilesFIRST.sizeY / 2 &&
        player.yPos2 + player.sizeY / 2 >=
          ntilesFIRST.y + ntilesFIRST.sizeY / 2) ||
      //unten links
      (player.x - player.sizeX / 2 + 10 >=
        ntilesFIRST.x - ntilesFIRST.sizeX / 2 &&
        player.x - player.sizeX / 2 + 10 <=
          ntilesFIRST.x + ntilesFIRST.sizeX / 2 &&
        player.yPos1 + player.sizeY / 2 <=
          ntilesFIRST.y + ntilesFIRST.sizeY / 2 &&
        player.yPos2 + player.sizeY / 2 >=
          ntilesFIRST.y + ntilesFIRST.sizeY / 2) ||
      //3
      //unten rechts
      (player.x + player.sizeX / 2 - 10 >=
        ntilesFIRST.x - ntilesFIRST.sizeX / 2 &&
        player.x + player.sizeX / 2 - 10 <=
          ntilesFIRST.x + ntilesFIRST.sizeX / 2 &&
        player.yPos1 + player.sizeY / 2 <=
          ntilesFIRST.y - ntilesFIRST.sizeY / 2 &&
        player.yPos2 + player.sizeY / 2 >=
          ntilesFIRST.y + ntilesFIRST.sizeY / 2) ||
      //unten links
      (player.x - player.sizeX / 2 + 10 >=
        ntilesFIRST.x - ntilesFIRST.sizeX / 2 &&
        player.x - player.sizeX / 2 + 10 <=
          ntilesFIRST.x + ntilesFIRST.sizeX / 2 &&
        player.yPos1 + player.sizeY / 2 <=
          ntilesFIRST.y - ntilesFIRST.sizeY / 2 &&
        player.yPos2 + player.sizeY / 2 >=
          ntilesFIRST.y + ntilesFIRST.sizeY / 2) ||
      //4
      //unten rechts
      (player.x + player.sizeX / 2 - 10 >=
        ntilesFIRST.x - ntilesFIRST.sizeX / 2 &&
        player.x + player.sizeX / 2 - 10 <=
          ntilesFIRST.x + ntilesFIRST.sizeX / 2 &&
        player.yPos1 + player.sizeY / 2 <=
          ntilesFIRST.y + ntilesFIRST.sizeY / 2 &&
        player.yPos2 + player.sizeY / 2 >=
          ntilesFIRST.y + ntilesFIRST.sizeY / 2) ||
      //unten links
      (player.x - player.sizeX / 2 + 10 >=
        ntilesFIRST.x - ntilesFIRST.sizeX / 2 &&
        player.x - player.sizeX / 2 + 10 <=
          ntilesFIRST.x + ntilesFIRST.sizeX / 2 &&
        player.yPos1 + player.sizeY / 2 <=
          ntilesFIRST.y + ntilesFIRST.sizeY / 2 &&
        player.yPos2 + player.sizeY / 2 >=
          ntilesFIRST.y + ntilesFIRST.sizeY / 2) ||
      //5
      //unten rechts
      (player.x + player.sizeX / 2 - 10 >=
        ntilesFIRST.x - ntilesFIRST.sizeX / 2 &&
        player.x + player.sizeX / 2 - 10 <=
          ntilesFIRST.x + ntilesFIRST.sizeX / 2 &&
        player.yPos1 + player.sizeY / 2 >=
          ntilesFIRST.y - ntilesFIRST.sizeY / 2 &&
        player.yPos2 + player.sizeY / 2 <=
          ntilesFIRST.y + ntilesFIRST.sizeY / 2) ||
      //unten links
      (player.x - player.sizeX / 2 + 10 >=
        ntilesFIRST.x - ntilesFIRST.sizeX / 2 &&
        player.x - player.sizeX / 2 + 10 - 10 <=
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
          if (
            ShootEnemy.cooldown >= 5 &&
            RushEnemy.cooldown >= 5 &&
            RushUpAndDownEnemy.cooldown >= 5
          ) {
            player.affectTile = true;
          } else {
            player.affectTile = false;
          }

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
    for (i = 0; i < ntiles.length; i = i + 1) {
      if (
        //1
        //unten rechts
        (player.x + player.sizeX / 2 - 10 >=
          ntiles[i].x - ntiles[i].sizeX / 2 &&
          player.x + player.sizeX / 2 - 10 <=
            ntiles[i].x + ntiles[i].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntiles[i].y - ntiles[i].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntiles[i].y - ntiles[i].sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 + 10 >=
          ntiles[i].x - ntiles[i].sizeX / 2 &&
          player.x - player.sizeX / 2 + 10 <=
            ntiles[i].x + ntiles[i].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntiles[i].y - ntiles[i].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntiles[i].y - ntiles[i].sizeY / 2) ||
        //2
        //unten rechts
        (player.x + player.sizeX / 2 - 10 >=
          ntiles[i].x - ntiles[i].sizeX / 2 &&
          player.x + player.sizeX / 2 - 10 <=
            ntiles[i].x + ntiles[i].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntiles[i].y + ntiles[i].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntiles[i].y + ntiles[i].sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 + 10 >=
          ntiles[i].x - ntiles[i].sizeX / 2 &&
          player.x - player.sizeX / 2 + 10 <=
            ntiles[i].x + ntiles[i].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntiles[i].y + ntiles[i].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntiles[i].y + ntiles[i].sizeY / 2) ||
        //3
        //unten rechts
        (player.x + player.sizeX / 2 - 10 >=
          ntiles[i].x - ntiles[i].sizeX / 2 &&
          player.x + player.sizeX / 2 - 10 <=
            ntiles[i].x + ntiles[i].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntiles[i].y - ntiles[i].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntiles[i].y + ntiles[i].sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 + 10 >=
          ntiles[i].x - ntiles[i].sizeX / 2 &&
          player.x - player.sizeX / 2 + 10 <=
            ntiles[i].x + ntiles[i].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntiles[i].y - ntiles[i].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntiles[i].y + ntiles[i].sizeY / 2) ||
        //4
        //unten rechts
        (player.x + player.sizeX / 2 - 10 >=
          ntiles[i].x - ntiles[i].sizeX / 2 &&
          player.x + player.sizeX / 2 - 10 <=
            ntiles[i].x + ntiles[i].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntiles[i].y + ntiles[i].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntiles[i].y + ntiles[i].sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 + 10 >=
          ntiles[i].x - ntiles[i].sizeX / 2 &&
          player.x - player.sizeX / 2 + 10 <=
            ntiles[i].x + ntiles[i].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            ntiles[i].y + ntiles[i].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            ntiles[i].y + ntiles[i].sizeY / 2) ||
        //5
        //unten rechts
        (player.x + player.sizeX / 2 - 10 >=
          ntiles[i].x - ntiles[i].sizeX / 2 &&
          player.x + player.sizeX / 2 - 10 <=
            ntiles[i].x + ntiles[i].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 >=
            ntiles[i].y - ntiles[i].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 <=
            ntiles[i].y + ntiles[i].sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 + 10 >=
          ntiles[i].x - ntiles[i].sizeX / 2 &&
          player.x - player.sizeX / 2 + 10 <=
            ntiles[i].x + ntiles[i].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 >=
            ntiles[i].y - ntiles[i].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 <= ntiles[i].y + ntiles[i].sizeY / 2)
      ) {
        if (player.jump === false && player.moving === true) {
          if (player.y + player.sizeY / 2 >= player.jumpStart) {
            player.y = ntiles[i].y - ntiles[i].sizeY / 2 - player.sizeY / 2;
          } else {
            if (
              ShootEnemy.cooldown >= 5 &&
              RushEnemy.cooldown >= 5 &&
              RushUpAndDownEnemy.cooldown >= 5
            ) {
              player.affectTile = true;
            } else {
              player.affectTile = false;
            }
            player.y = ntiles[i].y - ntiles[i].sizeY / 2 - player.sizeY / 2;
          }
        }
      }
    }

    // else{
    //   player.affectTile = false;
    //   player.jump = false;
    //   player.gravity = 3;
    // }

    //moving Tile
    for (m = 0; m < mtiles.length; m = m + 1) {
      if (
        //unten rechts
        //1
        //unten rechts
        (player.x + player.sizeX / 2 - 10 >=
          mtiles[m].x - mtiles[m].sizeX / 2 &&
          player.x + player.sizeX / 2 - 10 <=
            mtiles[m].x + mtiles[m].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            mtiles[m].y - mtiles[m].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            mtiles[m].y - mtiles[m].sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 + 10 >=
          mtiles[m].x - mtiles[m].sizeX / 2 &&
          player.x - player.sizeX / 2 + 10 <=
            mtiles[m].x + mtiles[m].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            mtiles[m].y - mtiles[m].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            mtiles[m].y - mtiles[m].sizeY / 2) ||
        //2
        //unten rechts
        (player.x + player.sizeX / 2 - 10 >=
          mtiles[m].x - mtiles[m].sizeX / 2 &&
          player.x + player.sizeX / 2 - 10 <=
            mtiles[m].x + mtiles[m].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            mtiles[m].y + mtiles[m].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            mtiles[m].y + mtiles[m].sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 + 10 >=
          mtiles[m].x - mtiles[m].sizeX / 2 &&
          player.x - player.sizeX / 2 + 10 <=
            mtiles[m].x + mtiles[m].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            mtiles[m].y + mtiles[m].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            mtiles[m].y + mtiles[m].sizeY / 2) ||
        //3
        //unten rechts
        (player.x + player.sizeX / 2 - 10 >=
          mtiles[m].x - mtiles[m].sizeX / 2 &&
          player.x + player.sizeX / 2 - 10 <=
            mtiles[m].x + mtiles[m].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            mtiles[m].y - mtiles[m].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            mtiles[m].y + mtiles[m].sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 + 10 >=
          mtiles[m].x - mtiles[m].sizeX / 2 &&
          player.x - player.sizeX / 2 + 10 <=
            mtiles[m].x + mtiles[m].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            mtiles[m].y - mtiles[m].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            mtiles[m].y + mtiles[m].sizeY / 2) ||
        //4
        //unten rechts
        (player.x + player.sizeX / 2 - 10 >=
          mtiles[m].x - mtiles[m].sizeX / 2 &&
          player.x + player.sizeX / 2 - 10 <=
            mtiles[m].x + mtiles[m].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            mtiles[m].y + mtiles[m].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            mtiles[m].y + mtiles[m].sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 + 10 >=
          mtiles[m].x - mtiles[m].sizeX / 2 &&
          player.x - player.sizeX / 2 + 10 <=
            mtiles[m].x + mtiles[m].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 <=
            mtiles[m].y + mtiles[m].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 >=
            mtiles[m].y + mtiles[m].sizeY / 2) ||
        //5
        //unten rechts
        (player.x + player.sizeX / 2 - 10 >=
          mtiles[m].x - mtiles[m].sizeX / 2 &&
          player.x + player.sizeX / 2 - 10 <=
            mtiles[m].x + mtiles[m].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 >=
            mtiles[m].y - mtiles[m].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 <=
            mtiles[m].y + mtiles[m].sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 + 10 >=
          mtiles[m].x - mtiles[m].sizeX / 2 &&
          player.x - player.sizeX / 2 + 10 <=
            mtiles[m].x + mtiles[m].sizeX / 2 &&
          player.yPos1 + player.sizeY / 2 >=
            mtiles[m].y - mtiles[m].sizeY / 2 &&
          player.yPos2 + player.sizeY / 2 <= mtiles[m].y + mtiles[m].sizeY / 2)
      ) {
        if (
          player.jump === false &&
          player.y + player.sizeY / 2 < player.jumpStart &&
          player.moving === true
        ) {
          player.standingOnMtile = true;

          if (
            ShootEnemy.cooldown >= 5 &&
            RushEnemy.cooldown >= 5 &&
            RushUpAndDownEnemy.cooldown >= 5
          ) {
            player.affectTile = true;
          } else {
            player.affectTile = false;
          }
          player.y = mtiles[m].y - mtiles[m].sizeY / 2 - player.sizeY / 2;
        }
      } else {
        player.standingOnMtile = false;
      }
      // else{
      //   player.affectTile = false;
      //   player.jump = false;
      //   player.gravity = 3;
      // }

      //Player follows moving platform
      if (mtiles[m].movingR === true && player.standingOnMtile === true) {
        player.x = player.x + 2;
      }

      if (mtiles[m].movingR === false && player.standingOnMtile === true) {
        player.x = player.x - 2;
      }
    }
    if (player.y + player.sizeY / 2 >= player.jumpStart) {
      player.affectTile = false;
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
}

//Enemys
function ShootEnemyFunction() {
  if (
    prescreen.show === false &&
    prescreen.showshop === false &&
    prescreen.showcontrols === false &&
    showIntro === false
  ) {
    // prescreen.show = false;
    // player.moving = false;
    if (player.moving === true) {
      fill(ShootEnemy.color);
      //Movement and appearance of the Enemy
      image(
        imageShootEnemy,
        ShootEnemy.x,
        ShootEnemy.y,
        ShootEnemy.sizeX,
        ShootEnemy.sizeY
      );
      if (ShootEnemy.moving === true && ShootEnemy.show === true) {
        ShootEnemy.x = ShootEnemy.x + random(-4, 4);
        ShootEnemy.y = ShootEnemy.y + random(-4, 4);
      }
      if (
        player.affectTile === true &&
        player.y <= height - height / 3 &&
        player.moving === true
      ) {
        ShootEnemy.y = ShootEnemy.y + player.gravity;
      }
      if (player.affectTileTooClose === true && player.moving === true) {
        ShootEnemy.y = ShootEnemy.y + player.boost;
      }
      if (ShootEnemy.x - ShootEnemy.sizeX / 2 > width) {
        ShootEnemy.x = 0 + ShootEnemy.sizeX / 2;
      }
      if (ShootEnemy.x + ShootEnemy.sizeX / 2 < 0) {
        ShootEnemy.x = width - ShootEnemy.sizeX / 2;
      }

      //If the Enemy is not in the players area
      if (
        ShootEnemy.y + ShootEnemy.sizeY / 2 < 0 - 400 ||
        ShootEnemy.y - ShootEnemy.sizeY / 2 > height
      ) {
        ShootEnemy.show = false;
        soundShootEnemy.stop();
      } else {
        ShootEnemy.show = true;
        if (ShootEnemy.show === true && ShootEnemy.moving === true) {
          soundShootEnemy.play();
        }
      }
      //randomizer position Enemy
      if (ShootEnemy.y - ShootEnemy.sizeY / 2 > height) {
        ShootEnemy.y = 0 - random(3000, 500);
        ShootEnemy.x = random(
          ShootEnemy.sizeX / 2,
          width - ShootEnemy.sizeX / 2
        );
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
            if (shield.while === false) {
              soundgetHitted.play();
              ShootEnemy.shootdelay = 0;
              ShootEnemy.cooldown = 0;
              shoottiles.y = ShootEnemy.y;
              HeartArray.pop();
            } else {
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
          player.y + player.sizeY / 2 >= ShootEnemy.y - ShootEnemy.sizeY / 2) ||
        //oben rechts
        (player.x + player.sizeX / 2 >= ShootEnemy.x - ShootEnemy.sizeX / 2 &&
          player.x + player.sizeX / 2 <= ShootEnemy.x + ShootEnemy.sizeX / 2 &&
          player.y - player.sizeY / 2 <= ShootEnemy.y + ShootEnemy.sizeY / 2 &&
          player.y - player.sizeY / 2 >= ShootEnemy.y - ShootEnemy.sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >= ShootEnemy.x - ShootEnemy.sizeX / 2 &&
          player.x - player.sizeX / 2 <= ShootEnemy.x + ShootEnemy.sizeX / 2 &&
          player.y + player.sizeY / 2 <= ShootEnemy.y + ShootEnemy.sizeY / 2 &&
          player.y + player.sizeY / 2 >= ShootEnemy.y - ShootEnemy.sizeY / 2) ||
        //oben links
        (player.x - player.sizeX / 2 >= ShootEnemy.x - ShootEnemy.sizeX / 2 &&
          player.x - player.sizeX / 2 <= ShootEnemy.x + ShootEnemy.sizeX / 2 &&
          player.y - player.sizeY / 2 <= ShootEnemy.y + ShootEnemy.sizeY / 2 &&
          player.y - player.sizeY / 2 >= ShootEnemy.y - ShootEnemy.sizeY / 2)
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
          soundShootEnemy.stop();
          if (doubblejump.while === false && jumpshoe.while === false) {
            player.jump = true;
            player.jumpEnd = 0;
            player.gravity = 3;
            player.boost = 25;
          }
          ShootEnemy.y = 0 - random(6000, 500);
          Coins = Coins + Coin.weight;
          // player.affectTile = true;
        } else {
          if (ShootEnemy.cooldown >= 30) {
            soundgetHitted.play();
            ShootEnemy.cooldown = 0;
            RushUpAndDownEnemy.cooldown = 0;
            RushEnemy.cooldown = 0;
            HeartArray.pop();
          }
        }
      }
    }
  }
}

function RushEnemyFunction() {
  if (
    prescreen.show === false &&
    prescreen.showshop === false &&
    prescreen.showcontrols === false &&
    showIntro === false
  ) {
    // prescreen.show = false;
    // player.moving = false;
    if (player.moving === true) {
      fill(RushEnemy.color);
      //Movement and appearance of the Enemy
      image(
        imageRushEnemy,
        RushEnemy.x,
        RushEnemy.y,
        RushEnemy.sizeX,
        RushEnemy.sizeY
      );
      if (
        player.affectTile === true &&
        player.y <= height - height / 3 &&
        player.moving === true
      ) {
        RushEnemy.y = RushEnemy.y + player.gravity;
      }
      if (player.affectTileTooClose === true && player.moving === true) {
        RushEnemy.y = RushEnemy.y + player.boost;
      }

      //If the Enemy is not in the players area
      if (
        RushEnemy.y + RushEnemy.sizeY / 2 < 0 - 400 ||
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
          player.y + player.sizeY / 2 >= RushEnemy.y - RushEnemy.sizeY / 2) ||
        //oben rechts
        (player.x + player.sizeX / 2 >= RushEnemy.x - RushEnemy.sizeX / 2 &&
          player.x + player.sizeX / 2 <= RushEnemy.x + RushEnemy.sizeX / 2 &&
          player.y - player.sizeY / 2 <= RushEnemy.y + RushEnemy.sizeY / 2 &&
          player.y - player.sizeY / 2 >= RushEnemy.y - RushEnemy.sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >= RushEnemy.x - RushEnemy.sizeX / 2 &&
          player.x - player.sizeX / 2 <= RushEnemy.x + RushEnemy.sizeX / 2 &&
          player.y + player.sizeY / 2 <= RushEnemy.y + RushEnemy.sizeY / 2 &&
          player.y + player.sizeY / 2 >= RushEnemy.y - RushEnemy.sizeY / 2) ||
        //oben links
        (player.x - player.sizeX / 2 >= RushEnemy.x - RushEnemy.sizeX / 2 &&
          player.x - player.sizeX / 2 <= RushEnemy.x + RushEnemy.sizeX / 2 &&
          player.y - player.sizeY / 2 <= RushEnemy.y + RushEnemy.sizeY / 2 &&
          player.y - player.sizeY / 2 >= RushEnemy.y - RushEnemy.sizeY / 2)
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
          if (doubblejump.while === false && jumpshoe.while === false) {
            player.jump = true;
            player.jumpEnd = 0;
            player.gravity = 3;
            player.boost = 25;
          }
          RushEnemy.y = 0 - random(6000, 500);
          Coins = Coins + Coin.weight;
          // player.affectTile = true;
        } else {
          if (RushEnemy.cooldown > 30) {
            soundgetHitted.play();
            ShootEnemy.cooldown = 0;
            RushUpAndDownEnemy.cooldown = 0;
            RushEnemy.cooldown = 0;
            HeartArray.pop();
          }
        }
      }
    }
  }
}

function RushEnemyUpAndDownFunction() {
  if (
    prescreen.show === false &&
    prescreen.showshop === false &&
    prescreen.showcontrols === false &&
    showIntro === false
  ) {
    // prescreen.show = false;
    // player.moving = false;
    if (player.moving === true) {
      if (RushUpAndDownEnemy.movingR === true) {
        image(
          imageRushUPDEnemyGoRight,
          RushUpAndDownEnemy.x,
          RushUpAndDownEnemy.y,
          RushUpAndDownEnemy.sizeX,
          RushUpAndDownEnemy.sizeY
        );
      } else {
        image(
          imageRushUPDEnemyGoLeft,
          RushUpAndDownEnemy.x,
          RushUpAndDownEnemy.y,
          RushUpAndDownEnemy.sizeX,
          RushUpAndDownEnemy.sizeY
        );
      }
      // fill(RushUpAndDownEnemy.color);
      //Movement and appearance of the Enemy
      if (
        player.affectTile === true &&
        player.y <= height - height / 3 &&
        player.moving === true
      ) {
        RushUpAndDownEnemy.y = RushUpAndDownEnemy.y + player.gravity;
      }

      if (player.affectTileTooClose === true && player.moving === true) {
        RushUpAndDownEnemy.y = RushUpAndDownEnemy.y + player.boost;
      }

      //If the Enemy is not in the players area
      if (
        RushUpAndDownEnemy.y + RushUpAndDownEnemy.sizeY / 2 < 0 - 400 ||
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
      if (
        RushUpAndDownEnemy.show === true &&
        RushUpAndDownEnemy.cooldown > 30
      ) {
        if (RushUpAndDownEnemy.x + RushUpAndDownEnemy.sizeX / 2 >= width) {
          soundRushUpAndDownEnemy.play();
          RushUpAndDownEnemy.movingR = false;
        }
        if (RushUpAndDownEnemy.x - RushUpAndDownEnemy.sizeX / 2 <= 0) {
          soundRushUpAndDownEnemy.play();
          RushUpAndDownEnemy.movingR = true;
        }

        if (RushUpAndDownEnemy.movingR === true) {
          RushUpAndDownEnemy.x =
            RushUpAndDownEnemy.x + RushUpAndDownEnemy.speed;
        } else {
          RushUpAndDownEnemy.x =
            RushUpAndDownEnemy.x - RushUpAndDownEnemy.speed;
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
            RushUpAndDownEnemy.y - RushUpAndDownEnemy.sizeY / 2) ||
        //oben rechts
        (player.x + player.sizeX / 2 >=
          RushUpAndDownEnemy.x - RushUpAndDownEnemy.sizeX / 2 &&
          player.x + player.sizeX / 2 <=
            RushUpAndDownEnemy.x + RushUpAndDownEnemy.sizeX / 2 &&
          player.y - player.sizeY / 2 <=
            RushUpAndDownEnemy.y + RushUpAndDownEnemy.sizeY / 2 &&
          player.y - player.sizeY / 2 >=
            RushUpAndDownEnemy.y - RushUpAndDownEnemy.sizeY / 2) ||
        //unten links
        (player.x - player.sizeX / 2 >=
          RushUpAndDownEnemy.x - RushUpAndDownEnemy.sizeX / 2 &&
          player.x - player.sizeX / 2 <=
            RushUpAndDownEnemy.x + RushUpAndDownEnemy.sizeX / 2 &&
          player.y + player.sizeY / 2 <=
            RushUpAndDownEnemy.y + RushUpAndDownEnemy.sizeY / 2 &&
          player.y + player.sizeY / 2 >=
            RushUpAndDownEnemy.y - RushUpAndDownEnemy.sizeY / 2) ||
        //oben links
        (player.x - player.sizeX / 2 >=
          RushUpAndDownEnemy.x - RushUpAndDownEnemy.sizeX / 2 &&
          player.x - player.sizeX / 2 <=
            RushUpAndDownEnemy.x + RushUpAndDownEnemy.sizeX / 2 &&
          player.y - player.sizeY / 2 <=
            RushUpAndDownEnemy.y + RushUpAndDownEnemy.sizeY / 2 &&
          player.y - player.sizeY / 2 >=
            RushUpAndDownEnemy.y - RushUpAndDownEnemy.sizeY / 2)
      ) {
        if (
          (player.jump === false &&
            RushUpAndDownEnemy.y + ShootEnemy.sizeY / 2 > 0 &&
            RushUpAndDownEnemy.y - RushUpAndDownEnemy.sizeY / 2 <=
              heightWhile &&
            player.y <= RushUpAndDownEnemy.y - RushUpAndDownEnemy.sizeY / 2) ||
          (shield.while === true &&
            RushUpAndDownEnemy.y + ShootEnemy.sizeY / 2 > 0 &&
            RushUpAndDownEnemy.y - RushUpAndDownEnemy.sizeY / 2 <= heightWhile)
        ) {
          soundkillEnemy.play();
          RushUpAndDownEnemy.cooldown = 0;
          if (doubblejump.while === false && jumpshoe.while === false) {
            player.jump = true;
            player.jumpEnd = 0;
            player.gravity = 3;
            player.boost = 25;
          }
          RushUpAndDownEnemy.y = 0 - random(6000, 500);
          Coins = Coins + Coin.weight;
          // player.affectTile = true;
        } else {
          if (RushUpAndDownEnemy.cooldown > 30) {
            soundgetHitted.play();
            ShootEnemy.cooldown = 0;
            RushUpAndDownEnemy.cooldown = 0;
            RushEnemy.cooldown = 0;
            HeartArray.pop();
          }
        }
      }
    }
  }
}

function PortalRotation() {
  if (
    prescreen.show === false &&
    prescreen.showshop === false &&
    prescreen.showcontrols === false &&
    showIntro === false
  ) {
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
  if (
    prescreen.show === false &&
    prescreen.showshop === false &&
    prescreen.showcontrols === false &&
    showIntro === false
  ) {
    if (player.moving === true) {
      //Show Enemys
      if (EnemyDetection === true) {
        if (ShootEnemy.y > 0 - 400 && ShootEnemy.y < 0 - ShootEnemy.sizeY / 2) {
          image(
            imageShootEnemy,
            ShootEnemy.x,
            50,
            ShootEnemy.sizeX / 2,
            ShootEnemy.sizeY / 2
          );
        }
        if (RushEnemy.y > 0 - 400 && RushEnemy.y < 0 - RushEnemy.sizeY / 2) {
          image(
            imageRushEnemy,
            RushEnemy.x,
            50,
            RushEnemy.sizeX / 2,
            RushEnemy.sizeY / 2
          );
        }

        if (
          RushUpAndDownEnemy.y > 0 - 400 &&
          RushUpAndDownEnemy.y < 0 - RushUpAndDownEnemy.sizeY / 2
        ) {
          image(
            imageRushUPDEnemyGoRight,
            RushUpAndDownEnemy.x,
            50,
            RushUpAndDownEnemy.sizeX / 2,
            RushUpAndDownEnemy.sizeY / 2
          );
        }
      }

      //Choose items
      if (keyIsDown(keysMovement[2])) {
        if (doubblejump.choose === true && prescreen.buttontimer >= 5) {
          soundchangeItem.play();
          // console.log("jumpshoe");
          doubblejump.choose = false;
          shield.choose = false;
          jumpshoe.choose = true;
          prescreen.buttontimer = 0;
        }
        if (jumpshoe.choose === true && prescreen.buttontimer >= 5) {
          soundchangeItem.play();
          // console.log("doubblejump");
          jumpshoe.choose = false;
          doubblejump.choose = false;
          shield.choose = true;
          prescreen.buttontimer = 0;
        }
        if (shield.choose === true && prescreen.buttontimer >= 5) {
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
      image(imageJetpack, 50, height / 2, jumpshoe.sizeX, jumpshoe.sizeY);
      fill(200);
      textSize(25);
      text(JumpshoeArray.length, 100, height - height / 2);

      //Doubblejump
      if (
        doubblejump.choose === true &&
        jumpshoe.choose === false &&
        shield.choose == false
      ) {
        fill(200);
        rect(
          50,
          height / 2 + 70,
          jumpshoe.sizeX * 1.2,
          jumpshoe.sizeY * 1.2,
          5
        );
      }
      fill(doubblejump.color);
      image(
        imageDoubblejump,
        50,
        height / 2 + 70,
        jumpshoe.sizeX,
        jumpshoe.sizeY
      );
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
      image(imageShield, 50, height / 2 + 140, shield.sizeX, shield.sizeY);
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
        image(imageHeart, width - 75, height - 40, Heart.sizeX, Heart.sizeY);
        if (HeartArray.length > 1) {
          image(imageHeart, width - 150, height - 40, Heart.sizeX, Heart.sizeY);
          if (HeartArray.length > 2) {
            image(
              imageHeart,
              width - 225,
              height - 40,
              Heart.sizeX,
              Heart.sizeY
            );
            if (HeartArray.length > 3) {
              image(
                imageHeart,
                width - 300,
                height - 40,
                Heart.sizeX,
                Heart.sizeY
              );
              if (HeartArray.length > 4) {
                image(
                  imageHeart,
                  width - 375,
                  height - 40,
                  Heart.sizeX,
                  Heart.sizeY
                );
              }
            }
          }
        }
      }
    }
  }
}

//Items on the map
function items() {
  if (
    prescreen.show === false &&
    prescreen.showshop === false &&
    prescreen.showcontrols === false &&
    showIntro === false
  ) {
    //Jumpshoe
    if (jumpshoe.show === true) {
      image(
        imageJetpack,
        jumpshoe.x,
        jumpshoe.y,
        jumpshoe.sizeX,
        jumpshoe.sizeY
      );

      if (
        player.affectTile === true &&
        player.y <= height - height / 3 &&
        player.moving === true
      ) {
        jumpshoe.y = jumpshoe.y + player.gravity;
      }
      if (player.affectTileTooClose === true && player.moving === true) {
        jumpshoe.y = jumpshoe.y + player.boost;
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
        JumpshoeArray.push(1);
        jumpshoe.show = false;
        jumpshoe.x = random(jumpshoe.sizeX / 2, width - jumpshoe.sizeX / 2);
        jumpshoe.y = random(-10000, -2000);
        jumpshoe.show = true;
      }
    }

    //Doubblejump
    if (doubblejump.show === true) {
      image(
        imageDoubblejump,
        doubblejump.x,
        doubblejump.y,
        doubblejump.sizeX,
        doubblejump.sizeY
      );

      if (
        player.affectTile === true &&
        player.y <= height - height / 3 &&
        player.moving === true
      ) {
        doubblejump.y = doubblejump.y + player.gravity;
      }
      if (player.affectTileTooClose === true && player.moving === true) {
        doubblejump.y = doubblejump.y + player.boost;
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
      image(imageShield, shield.x, shield.y, shield.sizeX, shield.sizeY);

      if (
        player.affectTile === true &&
        player.y <= height - height / 3 &&
        player.moving === true
      ) {
        shield.y = shield.y + player.gravity;
      }
      if (player.affectTileTooClose === true && player.moving === true) {
        shield.y = shield.y + player.boost;
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
      image(imageHeart, Heart.x, Heart.y, Heart.sizeX, Heart.sizeY);

      if (
        player.affectTile === true &&
        player.y <= height - height / 3 &&
        player.moving === true
      ) {
        Heart.y = Heart.y + player.gravity;
      }
      if (player.affectTileTooClose === true && player.moving === true) {
        Heart.y = Heart.y + player.boost;
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
      image(imagePong, Pong.x, Pong.y, Pong.sizeX, Pong.sizeY);

      if (
        player.affectTile === true &&
        player.y <= height - height / 3 &&
        player.moving === true
      ) {
        Pong.y = Pong.y + player.gravity;
      }
      if (player.affectTileTooClose === true && player.moving === true) {
        Pong.y = Pong.y + player.boost;
      }
      if (Pong.y >= height + Pong.sizeY) {
        Pong.x = random(Pong.sizeX / 2, width - Pong.sizeX / 2);
        Pong.y = random(-20000, -8000);
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
          Pong.y = random(-10000, -8000);
          Pong.while = true;
          Pong.show = true;
        }
      }
    }

    //changing keys
    // console.log(changeKeys.timercolor);
    // console.log(changeKeys.y);
    if (changeKeys.show === true) {
      if (changeKeys.y + changeKeys.sizeY / 2 < 0) {
        changeKeys.timercolor = 0;
      }
      changeKeys.timercolor = changeKeys.timercolor + 1;

      if (changeKeys.timercolor === 1) {
        changeKeys.chooseimage = true;
        if (changeKeys.chooseimage === true) {
          changeKeys.imageCount = int(random(0, 4));
          changeKeys.chooseimage = false;
        }
      }

      if (changeKeys.imageCount === 0) {
        image(
          imageShield,
          changeKeys.x,
          changeKeys.y,
          changeKeys.sizeX,
          changeKeys.sizeY
        );
      }
      if (changeKeys.imageCount === 1) {
        image(
          imageHeart,
          changeKeys.x,
          changeKeys.y,
          changeKeys.sizeX,
          changeKeys.sizeY
        );
      }
      if (changeKeys.imageCount === 2) {
        image(
          imageJetpack,
          changeKeys.x,
          changeKeys.y,
          changeKeys.sizeX,
          changeKeys.sizeY
        );
      }
      if (changeKeys.imageCount === 3) {
        image(
          imageDoubblejump,
          changeKeys.x,
          changeKeys.y,
          changeKeys.sizeX,
          changeKeys.sizeY
        );
      }
      if (changeKeys.imageCount === 4) {
        image(
          imagePong,
          changeKeys.x,
          changeKeys.y,
          changeKeys.sizeX,
          changeKeys.sizeY
        );
      }

      if (
        player.affectTile === true &&
        player.y <= height - height / 3 &&
        player.moving === true
      ) {
        changeKeys.y = changeKeys.y + player.gravity;
      }

      if (player.affectTileTooClose === true && player.moving === true) {
        changeKeys.y = changeKeys.y + player.boost;
      }
      if (changeKeys.y >= height + changeKeys.sizeY) {
        changeKeys.x = random(
          changeKeys.sizeX / 2,
          width - changeKeys.sizeX / 2
        );
        changeKeys.y = random(-3000, -5000);
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
        changeKeys.y = random(-3000, -5000);
        changeKeys.while = true;
        changeKeys.timercolor = 0;
        changeKeys.show = true;
      }
    }

    //Coin
    if (Coin.show === true) {
      fill(Coin.color);
      stroke(Coin.semicolor);
      strokeWeight(5);
      rect(Coin.x, Coin.y, Coin.sizeX, Coin.sizeY, 10);
      noStroke();

      if (
        player.affectTile === true &&
        player.y <= height - height / 3 &&
        player.moving === true
      ) {
        Coin.y = Coin.y + player.gravity;
      }
      if (player.affectTileTooClose === true && player.moving === true) {
        Coin.y = Coin.y + player.boost;
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
        Coin.y = random(-600, -100);
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
    rect(Pong.slideX, heightWhile / 2, width, height * 2);

    player.moving = false;
    player.touchL = false;
    player.touchR = false;
    player.affectTileTooClose = false;
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
        shield.while = false;
        shield.timer = 0;
        sounditem_shield_close.stop();
        Pong.startingTimer = 0;
        keysMovement[0] = keysMovementWhile[0];
        keysMovement[1] = keysMovementWhile[1];
        keysMovement[2] = keysMovementWhile[2];
        keysMovement[3] = keysMovementWhile[3];
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
    player.touchL = false;
    player.touchR = false;
    changeKeys.timer = changeKeys.timer + 1;
    keysMovement[3] = keysMovementWhile[2];
    keysMovement[0] = keysMovementWhile[1];
    keysMovement[1] = keysMovementWhile[0];
    keysMovement[2] = keysMovementWhile[3];
    if (changeKeys.timer >= 180) {
      keysMovement[0] = keysMovementWhile[0];
      keysMovement[1] = keysMovementWhile[1];
      keysMovement[2] = keysMovementWhile[2];
      keysMovement[3] = keysMovementWhile[3];
      changeKeys.timer = 0;
      changeKeys.while = false;
    }

    changeKeys.x = random(changeKeys.sizeX / 2, width - changeKeys.sizeX / 2);
    changeKeys.y = random(-2000, -10000);
  }

  //Doubblejump use
  if (keyIsDown(keysMovement[3])) {
    if (
      doubblejump.choose === true &&
      DoubblejumpArray.length > 0 &&
      prescreen.buttontimer >= 15 &&
      jumpshoe.while === false &&
      doubblejump.while === false &&
      Pong.while === false
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
  if (keyIsDown(keysMovement[3])) {
    if (
      jumpshoe.choose === true &&
      JumpshoeArray.length > 0 &&
      prescreen.buttontimer >= 15 &&
      jumpshoe.while === false &&
      doubblejump.while === false &&
      Pong.while === false
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
      player.boost >= 46 &&
      player.boost <= jumpshoe.usingafter
    ) {
      sounditem_jumpshoe.play();
    }
    if (player.boost >= 20 && player.jump === true) {
      player.affectTileTooClose = true;
    } else {
      player.affectTileTooClose = false;
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
    jumpshoe.timerusing = 0;
    jumpshoe.using = 3 / 2;
    jumpshoe.usingafter = 30;
    player.jumpEnd = 0;
  }

  //Shield use
  if (keyIsDown(keysMovement[3])) {
    if (
      shield.choose === true &&
      shieldArray.length > 0 &&
      prescreen.buttontimer >= 15 &&
      shield.while === false &&
      Pong.while === false
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
      fill(32, 178, 170, 200);
    }
    ellipse(player.x, player.y, player.sizeX * 2, player.sizeY * 2);
    if (shield.timer >= shield.maxtime || Pong.while === true) {
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
    if (
      prescreen.show === false &&
      prescreen.showshop === false &&
      prescreen.showcontrols === false &&
      showIntro === false
    ) {
      // fill(ntiles[i].color);
      // rect(ntiles[i].x, ntiles[i].y, ntiles[i].sizeX, ntiles[i].sizeY);
      fill(0, 255, 0);
      textSize(15);
      text(
        "01101010101011",
        ntiles[i].x - ntiles[i].sizeX / 2,
        ntiles[i].y + ntilesFIRST.sizeY
      );
    }
  }
}

//moving platform
function movingtile() {
  if (
    prescreen.show === false &&
    prescreen.showshop === false &&
    prescreen.showcontrols === false &&
    showIntro === false
  ) {
    for (m = 0; m < mtiles.length; m++) {
      // fill(mtiles[m].color);
      // rect(mtiles[m].x, mtiles[m].y, mtiles[m].sizeX, mtiles[m].sizeY);
      fill(255, 0, 0);
      textSize(15);
      text(
        "01101010101011",
        mtiles[m].x - mtiles[m].sizeX / 2,
        mtiles[m].y + ntilesFIRST.sizeY
      );

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
}

//Function of platforms (spawns/despawns,randomizer etc)
function movetiles() {
  if (
    prescreen.show === false &&
    prescreen.showshop === false &&
    prescreen.showcontrols === false &&
    showIntro === false
  ) {
    //normal platforms
    for (i = 0; i < ntiles.length; i++) {
      if (
        player.affectTile === true &&
        player.moving === true &&
        player.y <= height - height / 3
      ) {
        ntiles[i].y = ntiles[i].y + player.gravity;
      }
      if (player.affectTileTooClose === true && player.moving === true) {
        ntiles[i].y = ntiles[i].y + player.boost;
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
          ntiles[i].x = random(
            ntiles[i].sizeX / 2,
            width - ntiles[i].sizeX / 2
          );
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
      }
      if (player.affectTileTooClose === true && player.moving === true) {
        mtiles[m].y = mtiles[m].y + player.boost;
      }
    }
  }
}

//Delete Platforms (Delete / Add)
function changetiles() {
  if (
    prescreen.show === false &&
    prescreen.showshop === false &&
    prescreen.showcontrols === false &&
    showIntro === false
  ) {
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
      if (mtiles[m].y > height + mtiles[m].sizeY) {
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
          mtiles[m].x = random(
            mtiles[m].sizeX / 2,
            width - mtiles[m].sizeX / 2
          );
        }
      }
    }
  }
}

//Background
function environmentfunction() {
  if (
    prescreen.show === false &&
    prescreen.showshop === false &&
    prescreen.showcontrols === false &&
    showIntro === false
  ) {
    // for (m = 0; m < mtiles.length; m++) {
    //   for (i = 0; i < ntiles.length; i++) {
    background(environment.color);
    environment.soundtimer = environment.soundtimer + 1;
    if (environment.soundtimer === 1) {
      soundBackground.play();
      if (environment.soundtimer >= 2700) {
        environment.soundtimer = 0;
      }
    }

    // if (player.y < heightWhile / 5) {
    //   player.affectTileTooClose = true;
    // } else {
    //   player.affectTileTooClose = false;
    // }

    // if (player.affectTileTooClose === true) {
    //   // player.affectTiles = true;
    //   ntiles[i].y = ntiles[i].y + 5;
    //   mtiles[m].y = mtiles[m].y + 5;
    //   ShootEnemy.y = ShootEnemy.y + 5;
    //   RushEnemy.y = RushEnemy.y + 5;
    //   RushUpAndDownEnemy.y = RushUpAndDownEnemy.y;
    //   Pong.y = Pong.y + 5;
    //   jumpshoe.y = jumpshoe.y + 5;
    //   doubblejump.y = doubblejump.y + 5;
    //   Coin.y = Coin.y + 5;
    //   shield.y = shield.y + 5;
    //   changeKeys.y = changeKeys.y + 5;
    // }
    //   }
    // }
  }
}

//Highscore
function highscorefunction() {
  if (
    prescreen.show === false &&
    prescreen.showshop === false &&
    prescreen.showcontrols === false &&
    showIntro === false
  ) {
    if (Pong.starting === false) {
      fill(200);
      textSize(35);
      text("Lines Of Code: " + int(highscore.score), highscore.x, highscore.y);

      if (
        (player.affectTile === true &&
          player.moving === true &&
          prescreen.show === false) ||
        (player.affectTileTooClose === true &&
          player.moving === true &&
          prescreen.show === false)
      ) {
        highscore.score = highscore.score + 0.5;
      }
    }

    //Coin
    fill(Coin.color);
    stroke(Coin.semicolor);
    strokeWeight(5);
    rect(
      width / 2 - 30,
      highscore.y + 10,
      Coin.sizeX * (3 / 2),
      Coin.sizeY * (3 / 2),
      10
    );
    if (
      Coins === 10 ||
      Coins === 5 ||
      Coins === 3 ||
      Coins === 2 ||
      Coins === 1
    ) {
      fill(Coin.colortimer2);
    } else {
      fill(Coin.colortimer);
    }
    noStroke();
    textSize(35);
    text(Coins, width / 2 - 10, highscore.y + 20);
    textSize(25);
  }
}

//Game over
function gameOver() {
  if (
    prescreen.showshop === false &&
    prescreen.show === false &&
    prescreen.showcontrols === false &&
    showIntro === false
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
      textSize(60);
      player.moving = false;

      if (
        player.falling === true &&
        prescreen.delay > 0 &&
        player.y > height - 30 - player.sizeY / 2
      ) {
        gameOverFall = true;
        player.touchL = false;
        player.touchR = false;
        //Pong
        touchDownLeft = false;
        touchDownRight = false;
        touchUpLeft = false;
        touchUpRight = false;
      }
      if (prescreen.delay > 0 && Coins <= 0) {
        gameOverCoins = true;
        player.falling = false;
        player.touchL = false;
        player.touchR = false;
        //Pong
        touchDownLeft = false;
        touchDownRight = false;
        touchUpLeft = false;
        touchUpRight = false;
      }
      if (HeartArray.length < 1 && prescreen.delay > 0) {
        gameOverLifes = true;
        player.falling = false;
        player.touchL = false;
        player.touchR = false;
        //Pong
        touchDownLeft = false;
        touchDownRight = false;
        touchUpLeft = false;
        touchUpRight = false;
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
        Coins = 0;
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
      player.affectTileTooClose = false;
      changeKeys.while = false;
      ShootEnemy.moving = false;
      RushEnemy.moving = false;
      RushUpAndDownEnemy.moving = false;
      soundBackground.stop();
      soundEnemyShooting.stop();
      soundRushEnemy.stop();
      soundShootEnemy.stop();
      soundRushUpAndDownEnemy.stop();
      soundRushUpAndDownEnemy2.stop();
      sounditem_shield_close.stop();
      rotatePortal.starting = false;
      prescreen.delay = prescreen.delay + 1;
      player.y = player.y + 10;
      if (highscore.adding === true) {
        highscore.total = highscore.total + highscore.score;
        highscore.adding = false;
      }
      rounds.push(int(highscore.score));
      if (prescreen.delay > 100) {
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
    text("P. Aff.T: " + player.affectTile, 500, 120);
  }
}

//function draw
function draw() {
  clear();

  //Prescreen & Buttons
  PrescreenFunction();
  PrescreenShop();
  PrescreenControls();
  reset();
  Intro();

  environmentfunction();

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
  // PortalRotation();

  highscorefunction();

  //Pong start
  if (Pong.starting === true) {
    fill(0);
    rect(width / 2, height / 2, width, height);
    Spieler();
    Ball();
    BallMoving();
    Restart();
  }
  //Pong end

  //gameOver
  gameOver();

  //developing
  developing();
}
