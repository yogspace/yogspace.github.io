/*
 * Social Whispers – Simulation game
 * Published under the MIT license.
 * (c) 2020 Florian Beck, Lars Brandies, Luisa von Trümbach and Maximilian Weber
 */

import Sprite from "../../../sprite.js";

export default class BarPhone extends Sprite {
  constructor(x, y, width, height, backgnd) {
    super(x, y, width, height, backgnd);
  }

  draw() {
    push();
    translate(this.width / 2, this.height / 2);
    rotate(this.rotationAngle);
    if (this.backgnd != undefined) {
      image(this.backgnd, -(this.width / 2), -(this.height / 2), this.width, this.height);
    }
    pop();
  }

  clicked() {
    window.dispatchEvent(new CustomEvent("endGame"));
  }

  resetElement() {
    this.show();
    this.enable();
  }
}