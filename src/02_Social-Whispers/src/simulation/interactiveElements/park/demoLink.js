/*
 * Social Whispers – Simulation game
 * Published under the MIT license.
 * (c) 2020 Florian Beck, Lars Brandies, Luisa von Trümbach and Maximilian Weber
 */

import Sprite from "../../../sprite.js";

export default class DemoLink extends Sprite {
  constructor(x, y, width, height, backgnd, noDemo, signsLeft = undefined, signsRight = undefined) {
    super(x, y, width, height, backgnd);
    this.signsLeft = signsLeft;
    this.signsRight = signsRight;
    this.counter = 0;
    this.steps = 0.3;
    this.noDemo = noDemo;
    this.demo = true;
  }

  endDemo() {
    this.demo = false;
  }

  clicked() {
    window.dispatchEvent(new CustomEvent("enterView", { detail: "demo" }));
    this.disable();
    setTimeout( () => {
      this.enable();
    }, 1000);
  }

  draw() {
    if (this.backgnd != undefined) {
      if (this.demo) {
        image(this.backgnd, 0, 0, this.width, this.height);
        if (this.signsLeft != undefined) {
          image(this.signsLeft, 160, this.counter + 25, 435, 89);
          image(this.signsRight, 170, -this.counter + 25, 434, 105);
  
          this.counter += this.steps;
          if (this.counter >= 7 || this.counter <= 0) {
            this.steps = -this.steps;
          }
        }
      } else if(this.noDemo != undefined) {
        image(this.noDemo, 0, 0, this.width, this.height);
      }
    }
  }

  resetElement() {
    this.counter = 0;
    this.steps = 0.3;
    this.demo = true;
  }
}