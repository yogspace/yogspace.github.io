/*
 * Social Whispers – Simulation game
 * Published under the MIT license.
 * (c) 2020 Florian Beck, Lars Brandies, Luisa von Trümbach and Maximilian Weber
 */

import DisplayObject from "../../../displayObject.js";

export default class DemoForegnd extends DisplayObject {
  constructor(x, y, width, height, demoImg, noDemoImg) {
    super(x, y, width, height, demoImg);
    this.noDemoImg = noDemoImg;
    this.demo = true;
  }

  endDemo() {
      this.demo = false;
  }

  draw(){
    if (this.demo){
      image(this.backgnd, 0, 0, this.width, this.height);
    } else {
      image(this.noDemoImg, 0, 0, this.width, this.height);
    }
  }

  resetElement() {
    this.demo = true;
  }
}