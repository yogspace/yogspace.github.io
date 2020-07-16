/*
 * Social Whispers – Simulation game
 * Published under the MIT license.
 * (c) 2020 Florian Beck, Lars Brandies, Luisa von Trümbach and Maximilian Weber
 */

import Sprite from "../sprite.js";

export default class Game extends Sprite {
  constructor(player) {
    super(0, 0, windowWidth, windowHeight, undefined);
    this.currentView = undefined;
    this.player = player;
    this.children = {};
  }

  addView(view) {
    this.children[view.name] = view;
  }

  enterView(name) {
    if (name in this.children) {
      this.children[name].enter();
      this.currentView = name;
    }
  }

  moveView(dir, speed) {
    if (this.currentView) {
      this.children[this.currentView].move(dir, speed);
    }
  }

  mousePressed() {
    if (this.currentView) {
      if (!this.children.global.mousePressed() && !this.player.phoneInUse) {
        this.children[this.currentView].mousePressed();
      }
    }
  }

  mouseClicked() {
    if (this.currentView) {
      if (!this.children.global.mouseClicked() && !this.player.phoneInUse) {
        this.children[this.currentView].mouseClicked();
      }
    }
  }

  mouseReleased() {
    if (this.currentView) {
      if (!this.children.global.mouseReleased() && !this.player.phoneInUse) {
        this.children[this.currentView].mouseReleased();
      }
    }
  }

  mouseHovered() {
    if (this.currentView) {
      this.children.global.mouseHovered();
      if (!this.player.phoneInUse) {
        this.children[this.currentView].mouseHovered();
      }
    }
  }

  mouseWheel(ev) {
    if (this.currentView) {
      this.children.global.mouseWheel(ev);
    }
  }

  display() {
    window.dispatchEvent(new CustomEvent("cursor", { detail: "standard" }));
    this.mouseHovered();

    if (this.currentView) {
      this.children[this.currentView].display();
      this.children.global.display();
    }

    if (this.currentView != "titlescreen") {
      if (mouseX >= windowWidth - 150) {
        if (mouseX >= windowWidth - 50) this.moveView("right", 3);
        else this.moveView("right", 1);
      } else if (mouseX <= 150) {
        if (mouseX <= 50) this.moveView("left", 3);
        else this.moveView("left", 1);
      }
    }
  }

  reset() {
    let children = Object.values(this.children);
    for (let elem of children) {
      elem.reset();
    }
    this.player.reset();
    window.dispatchEvent(new CustomEvent("soundReset"));
    window.dispatchEvent(new CustomEvent("enterView", { detail: "park" }));
  }
}
