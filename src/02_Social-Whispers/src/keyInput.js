/*
 * Published under the MIT license.
 * (c) 2020 Florian Beck
 */

export default class KeyInput {
  constructor() {
    this.focusElement = undefined;
  }

  getFocus(element) {
    this.focusElement = element;
  }

  keyTyped() {
    if (this.focusElement != undefined) {
      this.sendKeyTyped(key);
    }
    return false;
  }

  keyPressed() {
    if (this.focusElement != undefined) {
      if (keyCode === BACKSPACE) {
        this.sendDeleteKey();
      } else if (
        keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW ||
        keyCode === UP_ARROW || keyCode === DOWN_ARROW
      ) {
        this.sendArrowKeys(keyCode);
      }
  
      this.sendKeyPressed(keyCode);
    }
    return false;
  }

  sendKeyTyped(key) {
    this.focusElement.keyTyped(key);
  }

  sendKeyPressed(keyCode) {
    this.focusElement.keyPressed(keyCode);
  }

  sendDeleteKey() {
    this.focusElement.deleteKey();
  }

  sendArrowKeys(keyCode) {
    this.focusElement.arrowKeys(keyCode);
  }
}
