/*
 * Social Whispers – Simulation game
 * Published under the MIT license.
 * (c) 2020 Florian Beck, Lars Brandies, Luisa von Trümbach and Maximilian Weber
 */

import Sprite from "../../../sprite.js";

export default class Kiosk extends Sprite {
  constructor(x, y, width, height, closedImg, openedImg) {
    super(x, y, width, height, closedImg);
    this.openedImg = openedImg;
    this.opened = false;
  }

  open() {
    this.opened = true;
  }

  draw(){
    if(this.opened) {
      image(this.openedImg, 0, 0, this.width, this.height);
    } else {
      image(this.backgnd, 0, 0, this.width, this.height);
    }
  }

  // hovered() {}

  resetElement() {
    this.opened = false;
  }
}