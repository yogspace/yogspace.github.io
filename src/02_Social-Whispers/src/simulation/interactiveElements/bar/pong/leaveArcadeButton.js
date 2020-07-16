/*
 * Social Whispers – Simulation game
 * Published under the MIT license.
 * (c) 2020 Florian Beck, Lars Brandies, Luisa von Trümbach and Maximilian Weber
 */

import InteractiveObject from "../../../../interactiveObject.js";

export default class LeaveArcadeButton extends InteractiveObject {
  constructor(x, y, width, height, backgnd) {
    super(x, y, width, height, backgnd);
  };

  clicked() {
    window.dispatchEvent(new CustomEvent("pongLeave"));
    this.parent.reset();
  }
}