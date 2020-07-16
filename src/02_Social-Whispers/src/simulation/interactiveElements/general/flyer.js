/*
 * Social Whispers – Simulation game
 * Published under the MIT license.
 * (c) 2020 Florian Beck, Lars Brandies, Luisa von Trümbach and Maximilian Weber
 */

import Sprite from "../../../sprite.js";

export default class Flyer extends Sprite {
  constructor(width, height, backgnd) {
    let scale = 0.8 * windowHeight / height;
    super((windowWidth - width * scale)/ 2, (windowHeight - height * scale) / 2, width, height, backgnd);
    this.scale = scale;
    this.disable();
    this.hide();
  }

  clicked() {
    this.disable();
    this.hide();
    window.dispatchEvent(new CustomEvent("closeFlyer"));
  }

  resetElement() {
    this.disable();
    this.hide();
  }
}