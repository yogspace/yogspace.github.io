import InteractiveObject from "../../../interactiveObject.js";

export default class PhoneIcon extends InteractiveObject {
  constructor(x, y, width, height, backgnd) {
    super(x, y, width, height, backgnd);
    this.rotationAngle = 0;
    this.saveX = this.x;
    this.saveY = this.y;
    this.saveScale = this.scale;
    this.notification = false;
    this.hideNotification = false;
    this.hide();
    this.disable();
  }

  draw() {
    push();
    translate(this.width / 2, this.height / 2);
    rotate(this.rotationAngle);
    if (this.backgnd != undefined) {
      image(this.backgnd, -(this.width / 2), -(this.height / 2), this.width, this.height);
    }
    if (this.notification && !this.hideNotification) {
      noStroke();
      fill("#ff0000");
      ellipse(this.width - 58, -80, 20);
    }
    pop();
  }

  clicked() {
    window.dispatchEvent(new CustomEvent("phoneTap"));
    window.dispatchEvent(new CustomEvent("openPhone"));
  
  }

  setNotification() {
    this.notification = true;
  }

  resetNotification() {
    this.notification = false;
  }

  showNotification(bool) {
    this.hideNotification = !bool;
  }

  resetElement() {
    this.x = this.saveX;
    this.y = this.saveY;
    this.scale = this.saveScale;
    this.notification = false;
    this.hideNotification = false;
    setTimeout( () => {
      this.show();
      this.enable();
    }, 1000);
  }
}