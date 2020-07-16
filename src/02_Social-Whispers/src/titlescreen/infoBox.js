/*
 * Social Whispers – Simulation game
 * Published under the MIT license.
 * (c) 2020 Florian Beck, Lars Brandies, Luisa von Trümbach and Maximilian Weber
 */

import DisplayObject from "../displayObject.js";

export default class InfoBox extends DisplayObject {
  constructor(x, y, width, height, headline, headlineFont, text, textFont, color) {
    super(x, y, width, height);
    this.headline = headline;
    this.headlineFont = headlineFont;
    this.text = text;
    this.txtFont = textFont;
    this.color = color;
    this.hide();
  }

  draw() {
    noStroke();
    fill(this.color);
    textFont(this.headlineFont);
    textSize(25);
    text(this.headline, 0, 0, this.width, this.height);

    textFont(this.txtFont);
    textSize(20);
    textLeading(this.textSize);
    text(this.text, 0, 50, this.width, this.height);
  }
}