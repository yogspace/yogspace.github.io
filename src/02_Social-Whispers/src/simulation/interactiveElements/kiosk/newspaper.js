/*
 * Social Whispers – Simulation game
 * Published under the MIT license.
 * (c) 2020 Florian Beck, Lars Brandies, Luisa von Trümbach and Maximilian Weber
 */

import Sprite from "../../../sprite.js";

export default class Newspaper extends Sprite {
  constructor(x, y, width, height, backgnd, name) {
    super(x, y, width, height, backgnd);
    this.name = name;
    this.hide();
    this.disable();
  }

  clicked() {
    window.dispatchEvent(new CustomEvent("addAction", { detail: {
      origin: "kiosk",
      name: "buyNewspaper",
      data: this.name
    }}));
  }

  resetElement() {
    this.hide();
    this.disable();
  }
}