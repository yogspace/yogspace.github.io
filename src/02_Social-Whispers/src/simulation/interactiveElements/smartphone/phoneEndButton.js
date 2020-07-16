import Sprite from "../../../sprite.js";

export default class PhoneEndButton extends Sprite {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.enable();
    this.show();
  }

  clicked() {
    window.dispatchEvent(new CustomEvent("tapPhone"));
    window.dispatchEvent(new CustomEvent("revealRole"));
    this.hide();
    this.disable();
  }

  draw() {
    if (this.hover) {
      stroke(255, 165, 0);
    } else {
      noStroke();
    }

    textAlign(CENTER, CENTER);
    fill("grey");
    rect(0, 0, this.width, this.height, 5);
    noStroke();
    fill("black");
    text("Wer bin ich?", 0, 0, this.width, this.height);
  }

  resetElement() {
    this.enable();
    this.show();
  }
}