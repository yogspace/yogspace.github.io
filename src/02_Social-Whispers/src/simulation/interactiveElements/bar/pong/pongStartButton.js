/*
 * Pong game.
 * Published under the MIT license.
 * (c) 2020 Max Weber and Florian Beck
 */

import InteractiveObject from "../../../../interactiveObject.js";

export default class PongStartButton extends InteractiveObject {
  constructor(x, y, width, height, backgnd) {
    super(x, y, width, height, backgnd);
  }

  clicked() {
    window.dispatchEvent(new CustomEvent("pongStart"));
    this.disable();
  }
}