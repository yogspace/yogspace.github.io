/*
 * Social Whispers – Simulation game
 * Published under the MIT license.
 * (c) 2020 Florian Beck, Lars Brandies, Luisa von Trümbach and Maximilian Weber
 */

import DisplayObject from "./displayObject.js";

export default class AnimatedDisplayObject extends DisplayObject { 
  constructor(x, y, width, height, backgnd = undefined) {
    super(x, y, width, height, backgnd);
    this.saveX = this.x;
    this.saveY = this.y;
    this.saveScale = this.scale;
  }

  resetElement() {
    this.show();
    this.x = this.saveX;
    this.y = this.saveY;
    this.scale = this.saveScale;
  }
}