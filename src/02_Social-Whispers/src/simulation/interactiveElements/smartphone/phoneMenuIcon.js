import Sprite from "../../../sprite.js";

export default class PhoneMenuIcon extends Sprite {
  constructor(x, y, width, height, backgnd, target) {
    super(x, y, width, height, backgnd);
    this.target = target;
    this.notification = false;
  }

  setTarget(target) {
    this.target = target;
  }

  setNotification() {
    this.notification = true;
  }

  resetNotification() {
    this.notification = false;
  }

  notificationActive() {
    return this.notification;
  }

  draw() {
    if (this.backgnd != undefined) {
      image(this.backgnd, 0, 0, this.width, this.height);
    }

    if (this.notification && this.target != "postScreen") {
      noStroke();
      fill("#ff0000");
      ellipse(this.width - 8, 8, 20);
    }
  }

  clicked() {
    window.dispatchEvent(new CustomEvent("showScreen", { detail: this.target }));
  }

  resetElement() {
    if (this.target === "endScreen") {
      this.target = "messageScreen";
    }
    this.show();
  }
}
