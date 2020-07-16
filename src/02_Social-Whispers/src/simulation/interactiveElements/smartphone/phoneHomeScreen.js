import Sprite from "../../../sprite.js";

export default class PhoneHomeScreen extends Sprite {
  constructor(x, y, width, height, postOverlay) {
    super(x, y, width, height);
    this.postOverlay = postOverlay;
    this.name = "homeScreen";
    this.pos = 0;
    this.activePosts = [];
    this.postSet = false;
    this.posts = createGraphics(this.width, this.height);
  }

  draw() {
    fill(220);
    noStroke();
    rect(0, 0, this.width, this.height);

    this.mouseScroll();

    image(this.posts, 0, 0, this.width, this.height);

    // this.redraw();
  }

  setPost(img) {
    this.activePosts.push(img);
    this.postSet = true;
    this.redraw();
  }

  redraw() {
    this.posts.clear();
    if (!this.postSet) {
      this.posts.noStroke();
      this.posts.textSize(20);
      this.posts.textAlign(LEFT, CENTER);
      this.posts.textFont(window.fonts.franklinGothic);
      this.posts.fill(0);
      this.posts.text(
        "In deiner Timeline gibt es gerade nichts zu sehen.",
        30,
        30,
        400,
        105
      );
    }
    for (let i in this.activePosts) {
      this.posts.image(this.postOverlay, 12.5, 12.5 + i * 400 + this.pos, 430, 382);
      this.posts.image(this.activePosts[i], 15, 15 + i * 400 + this.pos, 425, 320);
    }
  }

  mouseScroll() {
    let ev = {};
    if (this.hover) {
      if (mouseY < 0.25 * windowHeight) {
        ev["delta"] = -6;
        this.wheel(ev);
      } else if (mouseY > 0.7 * windowHeight) {
        ev["delta"] = 6;
        this.wheel(ev);
      }
    }
  }

  wheel(ev) {
    if (this.visible) {
      if (this.pos > 0) {
        this.pos = 0;
      } else if (this.pos < -(1 + 340 * this.activePosts.length)) {
        this.pos = -(1 + 340 * this.activePosts.length);
      } else {
        this.pos -= ev.delta;
        this.redraw();
      }
    }
  }

  resetElement() {
    this.pos = 0;
    this.activePosts = [];
    this.postSet = false;
    this.posts = createGraphics(this.width, this.height);
  }
}
