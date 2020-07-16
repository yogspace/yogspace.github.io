/*
 * Social Whispers – Simulation game
 * Published under the MIT license.
 * (c) 2020 Florian Beck, Lars Brandies, Luisa von Trümbach and Maximilian Weber
 */

import Sprite from "../../../sprite.js";

export default class StreetLampBulb extends Sprite {
  constructor(x, y, width, height, onImg, offImg) {
    super(x, y, width, height, onImg);
    this.offImg = offImg;
    this.on = true;
  }

  clicked(){
    window.dispatchEvent(new CustomEvent("lampClick"));
    this.switch();
  }

  switch() {
    this.on = !this.on;    
  }

  draw(){
    if(this.on){
      image(this.backgnd, 0, 0, this.width, this.height);
      noStroke();
      // blendMode(BLEND);
      fill(249, 201, 91, 80);
      arc(this.width / 2, 2 * this.height / 3, this.width, this.height / 4, -PI, 0);
      quad(0, 2 * this.height / 3, this.width, 2 * this.height / 3, this.width + 4 * this.height, 27 * this.height, - 4 * this.height, 27 * this.height);
      arc(this.width / 2, 27 * this.height, this.width + 8 * this.height, 4 * this.height, 0, PI);
      // blendMode(BLEND);
    } else{
      image(this.offImg, 0, 0, this.width, this.height);
    }
  }

  getRealPos() {
    let e = this;
    let ve = createVector(0, 0);

    while (e != undefined) {
      let vt = createVector(e.x, e.y);
      if (e.parent != undefined) {
        vt.mult(e.parent.calcScale);
      }
      ve = p5.Vector.add(ve, vt);
      e = e.parent;
    }
    return {x: ve.x, y: ve.y};
  }

  resetElement() {
    if (this.parent.name != "bar") {
      this.on = true;
    }
  }
}