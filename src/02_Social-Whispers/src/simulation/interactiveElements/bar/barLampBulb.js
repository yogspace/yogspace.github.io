/*
 * Social Whispers – Simulation game
 * Published under the MIT license.
 * (c) 2020 Florian Beck, Lars Brandies, Luisa von Trümbach and Maximilian Weber
 */

import StreetLampBulb from "../general/streetLampBulb.js";

export default class BarLampBulb extends StreetLampBulb {
  constructor(x, y, width, height, onImg, offImg) {
    super(x, y, width, height, onImg, offImg);
  }

  draw(){
    if(this.on){
      image(this.backgnd, 0, 0, this.width, this.height);
      noStroke();
      fill(249, 201, 91, 80);
      arc(this.width / 2, 2 * this.height / 3, this.width, this.height / 3.5, -PI, 0);
      quad(
        0, 2 * this.height / 3, 
        this.width, 2 * this.height / 3, 
        this.width + 2 * this.height, 6.1 * this.height,
        -2 * this.height, 6.1 * this.height);
      arc(this.width / 2, 6.1 * this.height, this.width + 4 * this.height, 0.8 * this.height, 0, PI);
    } else{
      image(this.offImg, 0, 0, this.width, this.height);
    }
  }
}