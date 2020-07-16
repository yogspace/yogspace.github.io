/*
 * Social Whispers – Simulation game
 * Published under the MIT license.
 * (c) 2020 Florian Beck, Lars Brandies, Luisa von Trümbach and Maximilian Weber
 */

import DisplayObject from "../../../displayObject.js";

export default class Speechbubble extends DisplayObject {
  constructor(x, y, width, name, direction = "right") {
    super(x, y, width);
    this.height = 25;
    this.direction = direction;
    this.name = "speechbubble" + name;
    this.content = undefined;
    this.hide();
  }

  draw() {
    this.setUpBubbles();
    this.updateTextBox();
    noStroke();

    if (this.direction === "left") {
      fill(170);
      beginShape();
      vertex(60, this.height - 10);
      vertex(55, this.height + 30);
      vertex(100, this.height - 10);
      endShape(CLOSE);
    } else {
      fill(200);
      beginShape();
      vertex(this.width - 60, this.height - 10);
      vertex(this.width - 55, this.height + 30);
      vertex(this.width - 100, this.height - 10);
      endShape(CLOSE);
    }

    rect(0, 0, this.width, this.height, 10);

    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);

    text(this.content, 10, 10, this.width - 20, this.height - 20);
  }

  updateTextBox() {
    this.height = this.calcTextBoxHeight();
  }

  calcTextBoxHeight() {
    let length = this.content.length;
    let avgCharWidth = (textWidth(this.content) / length) * 1.2;
    let charPerLine = (this.width - 25) / avgCharWidth;

    return ceil(length / charPerLine) * textLeading() + 25;
  }

  setUpBubbles() {
    let bubble;

    switch (this.name) {
      case "speechbubbleDemo_1":
        bubble = {
          text:
            "Die Regierung will uns hinter das Licht führen! Sei kein Schaf, komm' zu uns! ",
        };
        break;

      case "speechbubbleDemo_2":
        bubble = {
          text:
            "Die da drüben sind eine Gefahr für uns alle! Fall nicht auf sie rein, stell' dich zu uns!",
        };
        break;

      case "speechbubbleInfluencer":
        bubble = {
          text: "Hey du, komm' mal rüber! Kannst du mir bei etwas helfen?",
        };
        break;

      case "speechbubbleConspiracy":
        bubble = {
          text: "Hey, hast du Lust, dich zu uns zu gesellen?",
        };
        break;
    }
    this.content = bubble.text;
  }

  resetElement() {
    this.content = undefined;
    this.hide();
  }
}
