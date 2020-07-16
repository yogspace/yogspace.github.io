import Sprite from "../../../sprite.js";

export default class ChoosePostButton extends Sprite {
  constructor(x, y, width, height, name, post) {
    super(x, y, width, height);
    this.name = name;
    this.post = post;
    this.hide();
    this.disable();
  }

  clicked() {
    if (this.enabled) {
      window.dispatchEvent(new CustomEvent("phoneSendMsg"));
      window.dispatchEvent(new CustomEvent("postChosen", { detail: this.post }));
      this.parent.redraw();
      this.parent.resetElement();
    }
  }

  draw() {
    if (this.hover) {
      stroke(255, 165, 0);
    } else {
      noStroke();
    }

    let textNode;

    if (this.name == "A") {
      textNode = "Pro-Demo";
    } else if (this.name == "B") {
      textNode = "Pro-Gegendemo";
    } else if (this.name == "C") {
      textNode = "Beide scheiße";
    }

    textAlign(CENTER, CENTER);
    fill("grey");
    rect(0, 0, this.width, this.height, 5);
    noStroke();
    fill("black");
    text(textNode, 0, 0, this.width, this.height);
  }

  resetElement() {
    this.hide();
    this.disable();
  }
}