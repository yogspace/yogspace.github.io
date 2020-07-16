/*
 * Social Whispers – Simulation game
 * Published under the MIT license.
 * (c) 2020 Florian Beck, Lars Brandies, Luisa von Trümbach and Maximilian Weber
 */

import Sprite from "../../../sprite.js";

export default class demoSign extends Sprite {
  constructor(x, y, width, height, backgnd) {
    super(x, y, width, height, backgnd);
  }

  clicked() {
    this.disable();
    this.hide();
    window.dispatchEvent(new CustomEvent("addAction", {detail: {
      origin: "demo",
      name: "pickupSign",
      data: {},
    }}));
  }

  resetElement() {
    this.enable();
    this.show();
  }
}