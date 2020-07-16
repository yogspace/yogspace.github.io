/*
 * Social Whispers – Simulation game
 * Published under the MIT license.
 * (c) 2020 Florian Beck, Lars Brandies, Luisa von Trümbach and Maximilian Weber
 */

import Sprite from "../../../sprite.js";

export default class BarLink extends Sprite {
  constructor(x, y, width, height, backgnd) {
    super(x, y, width, height, backgnd);
    this.hide();
    this.disable();
  }

  clicked() {
    window.dispatchEvent(new CustomEvent("enterView", { detail: "bar" }));
    this.disable();
    setTimeout( () => {
      this.enable();
    }, 1000);
  }

  resetElement() {
    this.hide();
    this.disable();
  }
}