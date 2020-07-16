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
    soundWelcome.play();
    prescreen.buttontimer = 0;
    showIntro = false;
    prescreen.soundtimer = 0;
  }
}

function PrescreenFunction() {
  //after the round
  // highscore.total = 5000;
  if (
    prescreen.show === true ||
    prescreen.showshop === true ||
    prescreen.showcontrols === true ||
    showIntro === true
  ) {
    prescreen.soundtimer = prescreen.soundtimer + 1;
    if (prescreen.soundtimer === 1 && showIntro === false) {
      soundPrescreenBackground.setVolume(0.7);
      soundPrescreenBackground.play();
    }

    if (prescreen.soundtimer >= 4430) {
      prescreen.soundtimer = 0;
    }
  }
  if (prescreen.show === true) {
    //Scale
    scale = 1;
    RushUpAndDownEnemy.sizeX = scale * 0.75 * 90;
    RushUpAndDownEnemy.sizeY = scale * 0.75 * 100;
    RushEnemy.sizeX = scale * 0.75 * 90;
    RushEnemy.sizeY = scale * 0.75 * 75;
    ShootEnemy.sizeX = scale * 0.75 * ShootESizeX;
    ShootEnemy.sizeY = scale * 0.75 * ShootESizeY;
    shoottiles.size = scale * 10;
    player.sizeX = scale * 70;
    player.sizeY = scale * 90;
    changeKeys.sizeX = scale * 50;
    changeKeys.sizeY = scale * 50;
    Jetpack.sizeX = scale * 50;
    Jetpack.sizeY = scale * 50;
    shield.sizeX = scale * 50;
    shield.sizeY = scale * 50;
    doubblejump.sizeX = scale * 50;
    doubblejump.sizeY = scale * 50;
    Coin.sizeX = scale * 20;
    Coin.sizeY = scale * 40;
    Heart.sizeX = scale * 50;
    Heart.sizeY = scale * 50;
    Pong.sizeX = scale * 50;
    Pong.sizeY = scale * 50;

    //if there are less tiles than at the beginning
    while (ntiles.length < ntilesanmount) {
      ntilesNEW = {
        x: random(40, width - 80),
        y: random(-600, height - 10),
        sizeX: 80 * scale,
        sizeY: 10 * scale,
        change: false,
        color: color(70, 70, 70),
      };
      ntiles.push(ntilesNEW);
    }

    while (mtiles.length > mtilesanmount) {
      mtiles.pop();
    }

    while (JetpackArray.length > 0) {
      JetpackArray.pop();
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

    //Back to main page
    fill(prescreen.buttonsemicolorBackToMainPage);
    rect(width - 100, height - 70, 100, 60);
    fill(prescreen.buttoncolorBackToMainPage);
    rect(width - 100, height - 72, 96, 56);
    fill(200);
    textSize(50);
    text("Back", width - 100, height - 55);
    textSize(20);

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
        (keyIsPressed === true &&
          keyCode === keysMovementWhile[3] &&
          prescreen.buttontimer >= 20)
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
        (keyIsPressed === true &&
          keyCode === keysMovement[3] &&
          prescreen.buttontimer >= 20)
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
        (keyIsPressed === true &&
          keyCode === keysMovement[3] &&
          prescreen.buttontimer >= 20)
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

    //Back-to-Menu button pressed
    if (
      mouseX >= width - 150 &&
      mouseX <= width - 50 &&
      mouseY >= height - 100 &&
      mouseY <= height - 40
    ) {
      prescreen.buttoncolorBackToMainPage = color(230, 30, 30);
      prescreen.buttonsemicolorBackToMainPage = color(170, 30, 30);
      if (
        (mouseIsPressed === true && prescreen.buttontimer >= 20) ||
        (keyIsPressed === true &&
          keyCode === keysMovement[3] &&
          prescreen.buttontimer >= 20)
      ) {
        soundButton.play();
        prescreen.buttontimer = 0;
        openRequestedPopup();
      }
    } else {
      prescreen.buttoncolorBackToMainPage = color(200, 30, 30);
      prescreen.buttonsemicolorBackToMainPage = color(170, 30, 30);
    }
  }
}

function reset() {
  // console.log(ntiles.length);
  if (prescreen.reset === true) {
    //For Mobile
    if (PlayOnMobile === true) {
      scale = 2;
    } else {
      scale = 1;
    }

    //scale reset
    RushUpAndDownEnemy.sizeX = scale * 0.75 * 90;
    RushUpAndDownEnemy.sizeY = scale * 0.75 * 100;
    RushEnemy.sizeX = scale * 0.75 * 90;
    RushEnemy.sizeY = scale * 0.75 * 75;
    ShootEnemy.sizeX = scale * 0.75 * ShootESizeX;
    ShootEnemy.sizeY = scale * 0.75 * ShootESizeY;
    shoottiles.size = scale * 10;
    player.sizeX = scale * 70;
    player.sizeY = scale * 90;
    changeKeys.sizeX = scale * 50;
    changeKeys.sizeY = scale * 50;
    Jetpack.sizeX = scale * 50;
    Jetpack.sizeY = scale * 50;
    shield.sizeX = scale * 50;
    shield.sizeY = scale * 50;
    doubblejump.sizeX = scale * 50;
    doubblejump.sizeY = scale * 50;
    Coin.sizeX = scale * 20;
    Coin.sizeY = scale * 40;
    Heart.sizeX = scale * 50;
    Heart.sizeY = scale * 50;
    Pong.sizeX = scale * 50;
    Pong.sizeY = scale * 50;

    //tiles are new sorted
    for (i = 0; i < ntiles.length; i = i + 1) {
      ntiles[i].x = random(40, width - 80);
      ntiles[i].y = random(-600, height - 10);
      ntiles[i].sizeX = 80 * scale;
      ntiles[i].sizeY = 10 * scale;
    }

    for (m = 0; m < mtiles.length; m = m + 1) {
      mtiles[m].x = random(40, width - 80);
      mtiles[m].y = random(-600, height - 10);
      mtiles[m].sizeX = 80 * scale;
      mtiles[m].sizeY = 10 * scale;
    }
    delntile = 0;
    addmtile = 0;
    ntilesFIRST.show = true;
    ntilesFIRST.x = width / 2;
    ntilesFIRST.y = height / 2 + height * 0.1;

    //Items
    Pong.y = 0 - random(4000, 10000);
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
    doubblejump.activated = false;
    shield.x = random(shield.sizeX / 2, width - shield.sizeX / 2);
    shield.y = 0 - random(600, 10);
    shield.while = false;
    shield.timer = 0;
    Jetpack.y = 0 - random(600, 10);
    Jetpack.x = random(Jetpack.sizeX / 2, width - Jetpack.sizeX / 2);
    Jetpack.while = false;
    Jetpack.timer = 0;
    changeKeys.timer = 0;
    changeKeys.timercolor = 0;
    changeKeys.choosecolor = false;
    changeKeys.while = false;
    changeKeys.show = true;
    changeKeys.x = random(changeKeys.sizeX / 2, width - changeKeys.sizeX / 2);
    changeKeys.y = 0 - random(1500, 7000);
    rotatePortal.starting = true;
    rotatePortal.rotated = false;
    rotatePortal.turning = false;
    rotatePortal.while = false;
    rotatePortal.angle = 0;
    rotatePortal.y = 0 - random(1500, 4000);
    rotatePortal.rotated = false;
    rotatePortal.EeartquakeX1 = -widthWhile / 2 - 4;
    rotatePortal.EeartquakeY1 = -heightWhile / 2 - 4;
    rotatePortal.EeartquakeX2 = -widthWhile / 2 + 4;
    rotatePortal.EeartquakeY2 = -heightWhile / 2 + 4;

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
    environment.colortimer = 0;

    //Other stuff
    keysMovement[0] = keysMovementWhile[0];
    keysMovement[1] = keysMovementWhile[1];
    keysMovement[2] = keysMovementWhile[2];
    keysMovement[3] = keysMovementWhile[3];
    firstscreen = false;
    prescreen.show = false;
    prescreen.showshop = false;
    prescreen.showcontrols = false;
    prescreen.buttontimer = 0;
    prescreen.soundtimer = 0;
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
  // soundPrescreenBackground.pause();

  if (prescreen.showcontrols === true) {
    //Background
    //KEYSTUFF
    fill(environment.color);
    rect(0, 0, width * 2, height * 2);
    fill(200);
    textAlign(LEFT);
    textSize(50);
    text("KEYBOARD", width * 0.1, 130);
    textSize(30);
    text("move right: ", width * 0.1, 200);
    text("move left: ", width * 0.1, 260);
    text("switch item: ", width * 0.1, 320);
    text("use item: ", width * 0.1, 380);

    text(keyInfo[keysMovement[0]], width * 0.1 + 200, 200);
    text(keyInfo[keysMovement[1]], width * 0.1 + 200, 260);
    text(keyInfo[keysMovement[2]], width * 0.1 + 200, 320);
    text(keyInfo[keysMovement[3]], width * 0.1 + 200, 380);

    textSize(50);
    text("TABLET", width * 0.1 + 550, 130);
    textSize(30);
    text("move right: ", width * 0.1 + 550, 200);
    text("move left: ", width * 0.1 + 550, 260);
    text("use item: ", width * 0.1 + 550, 320);
    text("touch right side", width * 0.1 + 200 + 550, 200);
    text("touch left side", width * 0.1 + 200 + 550, 260);
    text("touch itembar", width * 0.1 + 200 + 550, 320);

    if (
      mouseX >= width * 0.1 &&
      mouseX <= width * 0.1 + 250 &&
      mouseY >= 420 &&
      mouseY <= 480
    ) {
      fill(160);
    } else {
      fill(200);
    }
    rect(width * 0.1 + 125, 450, 250, 60);
    if (keys.changing === false) {
      fill(0);
      text("click here to change", width * 0.1 + 20, 460);
    } else {
      fill(0);
      text("click to save", width * 0.1 + 60, 460);
    }
    if (
      mouseX >= width * 0.1 &&
      mouseX <= width * 0.1 + 250 &&
      mouseY >= 490 &&
      mouseY <= 550
    ) {
      fill(160);
    } else {
      fill(200);
    }
    rect(width * 0.1 + 125, 520, 250, 60);
    fill(0);
    text("reset", width * 0.1 + 105, 530);

    //Back
    fill(prescreen.buttonsemicolorshop);
    rect(width - 120, 80, 160, 90);
    fill(prescreen.buttoncolorshop);
    rect(width - 122, 78, 156, 86);
    fill(255, 255, 255);
    textSize(50);
    text("back", width - 160, 96);
    textSize(20);

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
        prescreen.showcontrols = false;
        keys.changing = false;
      }
    } else {
      prescreen.buttoncolorshop = color(200, 30, 30);
      prescreen.buttonsemicolorshop = color(170, 30, 30);
    }

    //Change Keys
    if (
      mouseX >= width * 0.1 &&
      mouseX <= width * 0.1 + 250 &&
      mouseY >= 420 &&
      mouseY <= 480 &&
      mouseIsPressed === true &&
      prescreen.buttontimer >= 20
    ) {
      if (keys.changing === false) {
        soundButton.play();
        prescreen.buttontimer = 0;
        keys.changing = true;
      } else {
        soundButton.play();
        prescreen.buttontimer = 0;
        keys.changing = false;
      }
    }

    //reset
    if (
      mouseX >= width * 0.1 &&
      mouseX <= width * 0.1 + 250 &&
      mouseY >= 490 &&
      mouseY <= 550 &&
      mouseIsPressed === true &&
      prescreen.buttontimer >= 20
    ) {
      keysMovementWhile[0] = 39;
      keysMovementWhile[1] = 37;
      keysMovementWhile[2] = 16;
      keysMovementWhile[3] = 32;
      keysMovement[0] = 39;
      keysMovement[1] = 37;
      keysMovement[2] = 16;
      keysMovement[3] = 32;
      soundButton.play();
      prescreen.buttontimer = 0;
    }

    if (keys.changing === true) {
      if (
        mouseY >= 160 &&
        mouseY <= 220 &&
        mouseX >= width * 0.1 + 150 &&
        mouseX <= width * 0.1 + 350
      ) {
        fill(200);
        rect(width * 0.1 + 450, 190, 50, 30);
        triangle(
          width * 0.1 + 400,
          190,
          width * 0.1 + 430,
          165,
          width * 0.1 + 430,
          215
        );
        if (
          keyIsPressed === true &&
          prescreen.buttontimer >= 20 &&
          keyCode != keysMovement[0] &&
          keyCode != keysMovement[1] &&
          keyCode != keysMovement[2] &&
          keyCode != keysMovement[3]
        ) {
          prescreen.buttontimer = 0;
          // console.log(keysMovement[0]);
          // console.log("KeyCode: " + keyCode);
          soundButton.play();
          keysMovement.splice(0, 1, keyCode);
          // console.log(keysMovement[0]);
          keysMovementWhile.splice(0, 1, keyCode);
        }
      }
      if (
        mouseY > 220 &&
        mouseY <= 280 &&
        mouseX >= width * 0.1 + 150 &&
        mouseX <= width * 0.1 + 350
      ) {
        fill(200);
        rect(width * 0.1 + 450, 250, 50, 30);
        triangle(
          width * 0.1 + 400,
          250,
          width * 0.1 + 430,
          225,
          width * 0.1 + 430,
          275
        );
        if (
          keyIsPressed === true &&
          prescreen.buttontimer >= 20 &&
          keyCode != keysMovement[0] &&
          keyCode != keysMovement[1] &&
          keyCode != keysMovement[2] &&
          keyCode != keysMovement[3]
        ) {
          prescreen.buttontimer = 0;
          soundButton.play();
          keysMovement.splice(1, 1, keyCode);
          keysMovementWhile.splice(1, 1, keyCode);
        }
      }
      if (
        mouseY > 280 &&
        mouseY <= 340 &&
        mouseX >= width * 0.1 + 150 &&
        mouseX <= width * 0.1 + 350
      ) {
        fill(200);
        rect(width * 0.1 + 450, 310, 50, 30);
        triangle(
          width * 0.1 + 400,
          310,
          width * 0.1 + 430,
          285,
          width * 0.1 + 430,
          335
        );
        if (
          keyIsPressed === true &&
          prescreen.buttontimer >= 20 &&
          keyCode != keysMovement[0] &&
          keyCode != keysMovement[1] &&
          keyCode != keysMovement[2] &&
          keyCode != keysMovement[3]
        ) {
          prescreen.buttontimer = 0;
          soundButton.play();
          keysMovement.splice(2, 1, keyCode);
          keysMovementWhile.splice(2, 1, keyCode);
        }
      }
      if (
        mouseY > 340 &&
        mouseY <= 400 &&
        mouseX >= width * 0.1 + 150 &&
        mouseX <= width * 0.1 + 350
      ) {
        fill(200);
        rect(width * 0.1 + 450, 370, 50, 30);
        triangle(
          width * 0.1 + 400,
          370,
          width * 0.1 + 430,
          345,
          width * 0.1 + 430,
          395
        );
        if (
          keyIsPressed === true &&
          prescreen.buttontimer >= 20 &&
          keyCode != keysMovement[0] &&
          keyCode != keysMovement[1] &&
          keyCode != keysMovement[2] &&
          keyCode != keysMovement[3]
        ) {
          prescreen.buttontimer = 0;
          soundButton.play();
          keysMovement.splice(3, 1, keyCode);
          keysMovementWhile.splice(3, 1, keyCode);
        }
      }
    }
  }
}

//Back to Main
function openRequestedPopup() {
  window.open("../../index.html", "_self");
}
