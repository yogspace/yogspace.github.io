/*
 * Social Whispers – Simulation game
 * Published under the MIT license.
 * (c) 2020 Florian Beck, Lars Brandies, Luisa von Trümbach and Maximilian Weber
 */

import Sprite from "../../../sprite.js";

export default class DemoPeople extends Sprite {
  constructor(x, y, width, height, backgnd, type) {
    super(x, y, width, height, backgnd);
    this.type = type;
    this.disable();
  }

  clicked() {
    window.dispatchEvent(new CustomEvent("addAction", {detail: {
      origin: "demo",
      name: "joinDemo",
      data: this.type,
    }}));
  }

  hovered() {
      window.dispatchEvent(new CustomEvent("cursor", { detail: "hovered" }));
  }

  resetElement() {
    this.disable();
    this.show();
  }
}