import Sprite from "../../../sprite.js";

export default class MobilePhone extends Sprite{
  constructor(width, height, backgnd, overlay, brokenOverlay){
    let scale = 0.8 * windowHeight / height;
    super((windowWidth - width * scale)/ 2, (windowHeight - height * scale) / 2, width, height, backgnd);
    this.overlay = overlay;
    this.brokenOverlay = brokenOverlay;
    this.scale = scale;
    this.broken = false;
    this.currentScreen = undefined;
    this.disable();
    this.hide();
  }

  showScreen(name) {
    for (let i in this.children) {
      if (this.children[i].name === name) {
        this.currentScreen = i;
        window.dispatchEvent(new CustomEvent("clearNotifications"));
        return true;
      }
    }
    return false;
  }

  activeScreen() {
    return this.children[this.currentScreen].name;
  }

  display() {
    if (this.visible) {
      push();
      translate(this.x, this.y);
      rotate(this.rotation);
      scale(this.scale);

      this.draw();

      for (let i in this.children) {
        if (this.children[i].name === undefined) {
          this.children[i].display();
        } else if (i === this.currentScreen) {
          this.children[i].display();
        }
      }

      if (this.broken) {
        image(this.brokenOverlay, 0, 0, this.width, this.height);
      } 

      pop();
    }
  }

  draw() {
    if (this.backgnd != undefined) {
        image(this.backgnd, 0, 0, this.width, this.height);
        image(this.overlay, 18.9, 24.4, this.width - 2 * 18.9, this.height - 96);
      }
  }

  break() {
    this.broken = true;
  }

  mousePressed() {
    if (this.enabled && this.hitTest(mouseX, mouseY)) {
      for (let i in this.children) {
        if (this.children[i].name === undefined) {
          this.children[i].mousePressed();
        } else if (i === this.currentScreen) {
          this.children[i].mousePressed();
        }
      }
      return true;
    }
  }

  mouseClicked() {
    if (this.enabled && this.hitTest(mouseX, mouseY)) {
      for (let i in this.children) {
        if (this.children[i].name === undefined) {
          this.children[i].mouseClicked();
        } else if (i === this.currentScreen) {
          this.children[i].mouseClicked();
        }
      }
      return true;
    }
  }

  mouseReleased() {
    if (this. enabled && this.hitTest(mouseX, mouseY)) {
      for (let i in this.children) {
        if (this.children[i].name === undefined) {
          this.children[i].mouseReleased();
        } else if (i === this.currentScreen) {
          this.children[i].mouseReleased();
        }
      }
      return true;
    }
  }

  resetElement() {
    this.broken = false;
    this.showScreen("homeScreen");
    this.disable();
    this.hide();
  }
}