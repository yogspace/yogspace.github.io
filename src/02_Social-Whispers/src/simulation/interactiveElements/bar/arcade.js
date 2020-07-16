/*
 * Social Whispers – Simulation game
 * Published under the MIT license.
 * (c) 2020 Florian Beck, Lars Brandies, Luisa von Trümbach and Maximilian Weber
 */

import Sprite from "../../../sprite.js";

export default class Arcade extends Sprite {
  constructor(x, y, width, height, backgnd, backgnd_2) {
    super(x, y, width, height, backgnd);
    this.backgnd_2 = backgnd_2;
    this.switchImg = true;
  }

  switch() {
    this.switchImg = !this.switchImg;
  }

  draw() {
    if(floor(random(0, 2))) {
      this.switch();
    }
    if (this.backgnd != undefined) {
      if (this.switchImg) {
        image(this.backgnd_2, 0, 0, this.width, this.height);
      } else {
        image(this.backgnd, 0, 0, this.width, this.height);
      }
    }
  }

  clicked() {
    window.dispatchEvent(new CustomEvent("enterView", { detail: "pong" }));
    window.dispatchEvent(new CustomEvent("addAction", {detail: {
      origin: "bar",
      name: "playPong",
      data: {},
    }}));
  }
}