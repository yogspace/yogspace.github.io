import Sprite from "../../../sprite.js";

export default class PhoneVideoPlayer extends Sprite {
  constructor(x, y, width, height, backgnd, videos) {
    super(x, y, width, height, backgnd);
    this.videos = videos;
    this.video = undefined;
    this.screen = undefined;
    this.pos = undefined;
    this.isClicked = false;
    this.videoSet = false;
    this.hide();
    this.disable();
  }

  draw() {
    this.enable();
    this.screen = this.parent.message;
    this.pos = this.parent.pos;

    this.screen.image(this.video, 30, 500 + this.pos, this.width, this.height);
    if (!this.isClicked) {
      this.screen.image(
        this.backgnd,
        30,
        500 + this.pos,
        this.width,
        this.height
      );
    }
  }

  setVideo() {
    switch (this.parent.role) {
      case "Reflektierter Nutzer":
        this.video = this.videos[0];
        break;
      case "Verschwörungstheoretiker":
        this.video = this.videos[1];
        break;
      case "Mitläufer":
        this.video = this.videos[2];
        break;
      case "Möchtegern-Influencer":
        this.video = this.videos[3];
        break;
    }
  }

  startVideo() {
    this.video.size(this.width);
    this.video.play();
    this.video.volume(1);
  }

  hitTest(x, y) {
    let e = this;
    let m = createVector(x, y);
    let s = 1;

    while (e != undefined) {
      let vt = createVector(e.x, e.y);
      if (e.parent != undefined) {
        vt.mult(e.parent.calcScale);
      }
      m = p5.Vector.sub(m, vt);
      s *= e.scale;

      e = e.parent;
    }

    return (
      m.x > 0 && m.x < this.width * s &&
      m.y > this.pos + 100 && m.y < this.height * s + this.pos + 100
    );
  }

  activateButtons() {

    this.parent.children[2].show();
    this.parent.children[3].show();
    this.parent.buttonsActive();
  }

  clicked() {
    window.dispatchEvent(new CustomEvent("tapPhone"));
    this.startVideo();
    this.updatePosition();
    this.isClicked = true;
  }

  updatePosition() {
    this.parent.updatePosition(-318);
  }

  resetElement() {
    if (this.video != undefined) {
      this.video.pause();
      this.video.hide();
      this.video = undefined;
    }
    this.screen = undefined;
    this.pos = undefined;
    this.isClicked = false;
    this.videoSet = false;
    this.hide();
    this.disable();
  }
}
