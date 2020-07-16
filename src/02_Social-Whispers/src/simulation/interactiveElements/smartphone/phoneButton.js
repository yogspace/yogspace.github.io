import Sprite from "../../../sprite.js";

export default class PhoneButton extends Sprite {
  constructor(x, y, width, height, backgnd = undefined) {
    super(x, y, width, height, backgnd);
  }

  clicked() {
    window.dispatchEvent(new CustomEvent("phoneTap"));
    window.dispatchEvent(new CustomEvent("closePhone"));
  }

  resetElement() {
    this.enable();
  }
}