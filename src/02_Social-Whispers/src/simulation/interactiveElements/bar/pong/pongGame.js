/*
 * Pong game.
 * Published under the MIT license.
 * (c) 2020 Max Weber and Florian Beck
 */

import DisplayObject from "../../../../displayObject.js";

export default class PongGame extends DisplayObject {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.started = false;
    this.slidingR = true;
    this.points = 0;
    this.pointWidth = 20;
    this.pointgrow = false;

    this.player = [
      {x: 100, y: this.height / 2},
      {x: this.width - 100, y: this.height / 2 + 15}
    ];
    this.ball = {
      x: this.width / 2, 
      y: this.height / 2,
      dir: "left",
      moving: false,
      xSpeed: 10,
      ySpeed: 0,
      rnd: 0
    };
  }

  draw() {
    // backgnd
    fill("#000000");
    rect(0, 0, this.width, this.height);

    // score
    fill(200, 200, 0);
    stroke(170, 170, 0);
    strokeWeight(3);
    rect((this.width - this.pointWidth) / 2, 21, this.pointWidth, 25, 20, 20);
    noStroke();
    textSize(35);
    fill(200);
    textAlign(LEFT);
    text(this.points, this.width / 2 - 70, 45);
    textSize(25);

    if (this.pointWidth >= 25) {
      this.pointgrow = false;
    } else if (this.pointWidth <= 2) {
      this.pointgrow = true;
    }
    if (this.pointgrow) {
      this.pointWidth++;
    } else {
      this.pointWidth--;
    }

    // player
    strokeWeight(3);
    fill(255, 255, 255);
    rectMode(CENTER);
    rect(this.player[0].x, this.player[0].y, 10, 40);
    rect(this.player[1].x, this.player[1].y, 10, 40);

    // ball
    if (this.ball.moving) {
      fill(255);
      rect(this.ball.x, this.ball.y, 10, 10);
    
      stroke(255);
      line(this.player[0].x, 80, this.player[1].x, 80);
      line(this.player[0].x, this.height - 50, this.player[1].x, this.height - 50);
      noStroke();
    }

    // instructions
    if (!this.ball.moving) {
      textSize(20);
      fill("#ffffff");
      textAlign(CENTER);
      text("Controls:", this.width / 2, this.height / 2 + 50);
      text("Left: Up / Down: \"W\" and \"S\"", this.width / 2, this.height / 2 + 80);
      text("Right: Up / Down: \"Arrow up\" and \"Arrow down\"", this.width / 2, this.height / 2 + 100);
      fill("#000000");
      textAlign(LEFT);
    }

    this.movePlayer();
    if (this.ball.moving)
      this.moveBall();
  }

  start() {
    this.ball.moving = true;
  }

  movePlayer() {
    // player 1
    if (keyIsDown(83)) {
      this.player[0].y += 10;
    } else if (keyIsDown(87)) {
      this.player[0].y -= 10;
    }
    
    // player 2
    if (keyIsDown(40)) {
      this.player[1].y += 10;
    } else if (keyIsDown(38)) {
      this.player[1].y -= 10;
    }

    for (let elem of this.player) {
      if (elem.y < 100) elem.y = 100;
      else if (elem.y > this.height - 70) elem.y = this.height - 70;
    }
  }
  
  moveBall() {
    // move
    if (this.ball.dir === "left")
      this.ball.x -= this.ball.xSpeed;
    else 
      this.ball.x += this.ball.xSpeed;
    this.ball.y += this.ball.rnd;

    // borders left and right
    if (
      this.ball.dir === "left" &&
      this.ball.x <= this.player[0].x + 10 &&
      this.ball.y >= this.player[0].y - 20 &&
      this.ball.y <= this.player[0].y + 20
    ) {
      this.ball.xSpeed++;
      this.ball.ySpeed += 0.1;
      this.ball.dir = "right";
      this.ball.rnd = int(random(-(5 - this.ball.ySpeed), 5 + this.ball.ySpeed));
      this.points++;
    }

    if (
      this.ball.dir === "right" &&
      this.ball.x >= this.player[1].x - 10 &&
      this.ball.y >= this.player[1].y - 20 &&
      this.ball.y <= this.player[1].y + 20
    ) {
      this.ball.xSpeed++;
      this.ball.ySpeed += 0.1;
      this.ball.dir = "left";
      this.ballrnd = int(random(-(5 - this.ball.ySpeed), 5 + this.ball.ySpeed));
      this.points++;
    }

    // borders top and bottom
    if (this.ball.y <= 85) {
      this.ball.rnd = int(random(1, 5 + this.ball.ySpeed));
    } else if (this.ball.y >= this.height - 55) {
      this.ball.rnd = int(random(-(5 + this.ball.ySpeed), -1));
    }
    
    // out of field
    if (
      (this.ball.x <= this.player[0].x + 10 && this.ball.y < this.player[0].y - 20) ||
      (this.ball.x <= this.player[0].x + 10 && this.ball.y > this.player[0].y + 20) ||
      (this.ball.x >= this.player[1].x - 10 && this.ball.y < this.player[1].y - 20) ||
      (this.ball.x >= this.player[1].x - 10 && this.ball.y > this.player[1].y + 20)
    ) {
      this.ball.moving = false;
      this.slidingR = true;
      this.ball.x = this.width / 2;
      this.ball.y = this.height / 2;
      this.started = false;
      this.parent.children[2].enable();
    }
  }

  resetElement() {
    this.ball.rnd = 0;
    this.ball.xSpeed = 10;
    this.ball.ySpeed = 0;
    this.points = 0;
    this.player[0] = {x: 100, y: this.height / 2 + 15};
    this.player[1] = {x: this.width - 100, y: this.height / 2 + 15};
  }
}