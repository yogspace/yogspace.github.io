/*
 * Social Whispers – Simulation game
 * Published under the MIT license.
 * (c) 2020 Florian Beck, Lars Brandies, Luisa von Trümbach and Maximilian Weber
 */

import InteractiveObject from "../interactiveObject.js";

export default class TitleScreenButton extends InteractiveObject {
  constructor(x, y, width, height, text, font, textColor, accentColor, action) {
    super(x, y, width, height);
    this.text = text;
    this.font = font;
    this.textColor = textColor;
    this.accentColor = accentColor;
    this.action = action;
    this.dx = 0;
    this.playSound = true;
  }

  draw() {
    noStroke();
    textAlign(LEFT, TOP);
    textSize(this.height);
    textFont(this.font);
    this.width = textWidth(this.text) + this.dx;
    if (this.hover) {
      this.dx = 10;
      fill(this.accentColor);
    } else {
      this.dx = 0;
      this.playSound = true;
      fill(this.textColor);
    }
    text(this.text, this.dx, 0);
  }

  clicked() {
    if (this.enabled && this.action === "playStartVideo") {
      window.dispatchEvent(new CustomEvent(this.action));
      window.dispatchEvent(new CustomEvent("playButtonSound"));
    }
  }

  hovered() {
    window.dispatchEvent(new CustomEvent("cursor", { detail: "hovered" }));
    if (this.action === "playStartVideo") {
      window.dispatchEvent(new CustomEvent("showStartInfo"));
    } else {
      window.dispatchEvent(new CustomEvent(this.action));
    }
    if (this.playSound) {
      window.dispatchEvent(new CustomEvent("playButtonSound"));
      this.playSound = false;
    }
  }
}
