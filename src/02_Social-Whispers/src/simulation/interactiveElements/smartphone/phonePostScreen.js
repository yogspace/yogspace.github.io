import Sprite from "../../../sprite.js";

export default class PhonePostScreen extends Sprite {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.name = "postScreen";
    this.post = createGraphics(this.width, this.height);
    this.newPost = undefined;
    this.postReady = false;
  }

  draw() {
    fill(220);
    noStroke();
    rect(0, 0, this.width, this.height);
    this.redraw();
    if (this.postReady) {
      for (let elem of this.children) {
        if (elem.name === "postButton") {
          elem.postIsReady();
        }
      }
    }

    for (let elem in this.children) {
      if (this.children[elem].visible) {
        if (this.children[1].hover) {
          this.post.clear();
          this.post.image(this.children[1].post, 12.5, 12.5, 430, 324);
          this.setPost(this.children[1].post);
        } else if (this.children[2].hover) {
          this.post.clear();
          this.post.image(this.children[2].post, 12.5, 12.5, 430, 324);
          this.setPost(this.children[2].post);
        } else if (this.children[3].hover) {
          this.post.clear();
          this.post.image(this.children[3].post, 12.5, 12.5, 430, 324);
          this.setPost(this.children[3].post);
        }
      }
    }

    image(this.post, 0, 0, this.width, this.height);
  }

  redraw() {
    this.post.clear();
    if (this.postReady) {
      this.post.image(this.newPost, 12.5, 12.5, 430, 324);
    } else {
      this.post.noStroke();
      this.post.textSize(20);
      this.post.textAlign(LEFT, CENTER);
      this.post.textFont(window.fonts.franklinGothic);
      this.post.fill(0);
      this.post.text("Es gibt gerade nichts zu posten.", 30, 20, 330, 105);
    }
  }

  setPost(img) {
    this.newPost = img;
    this.postReady = true;
    this.redraw();
  }

  getPost() {
    return this.newPost;
  }

  resetElement() {
    this.newPost = undefined;
    this.postReady = false;
    this.post = createGraphics(this.width, this.height);
  }
}
