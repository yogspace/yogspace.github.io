/*
 * Social Whispers – Simulation game
 * Published under the MIT license.
 * (c) 2020 Florian Beck, Lars Brandies, Luisa von Trümbach and Maximilian Weber
 */

import Sprite from "../../../sprite.js";

export default class DemoBench extends Sprite {
  constructor(x, y, width, height, backgnd) {
    super(x, y, width, height, backgnd);
  }

  clicked() {
    this.disable();
    window.dispatchEvent(new CustomEvent("benchSitdown"));
    window.dispatchEvent(new CustomEvent("addAction", { detail: {
      origin: "demo",
      name: "watchDemo",
      data: {}
    }}));
  }

  resetElement() {
    this.enable();
  }
}