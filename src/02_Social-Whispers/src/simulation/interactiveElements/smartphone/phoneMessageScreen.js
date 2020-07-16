import Sprite from "../../../sprite.js";

export default class PhoneMessage extends Sprite {
  constructor(x, y, width, height, user, journalist, conspiracy) {
    super(x, y, width, height);
    this.name = "messageScreen";
    this.user = user;
    this.journalist = journalist;
    this.conspiracy = conspiracy;
    this.conversation = [];
    this.pos = 0;
    this.event = undefined;
    this.message = createGraphics(this.width, this.height);
    this.buffering = false;
    this.bufferingDirection = undefined;
    this.chatNode = undefined;
    this.chatAnimated = false;
    this.count = 0;
  }

  draw() {
    fill(220);
    noStroke();
    rect(0, 0, this.width, this.height);

    this.mouseScroll();

    image(this.message, 0, 0, this.width, this.height);

    textFont(window.fonts.franklinGothic);
    textSize(16);
    textAlign(LEFT, CENTER);

    rect(0, 0, this.width, 80);

    if (this.event === "interview") {
      image(this.journalist, 20, 20);
    } else if (this.event === "invite") {
      image(this.conspiracy, 20, 20);
    } else {
      image(this.user, 20, 20);
    }

    fill(100);
    rect(100, 71, this.width - 115, 4);

    this.redraw();
  }

  redraw() {
    this.message.clear();
    this.message.fill(220);
    this.message.noStroke();
    this.message.textSize(20);
    this.message.textAlign(LEFT, CENTER);
    this.message.textFont(window.fonts.franklinGothic);

    if (this.event === "interview") {
      this.message.fill(200);
      this.message.rect(20, 100 + this.pos, 330, 130, 5);

      this.message.noStroke();
      this.message.fill(0);
      this.message.text(
        "Hallo, ich bin Journalist bei der \"The Daily Whisper\" und hätte ein paar Fragen.",
        35,
        105 + this.pos,
        315,
        115
      );
    } else if (this.event === "invite") {
      this.message.fill(200);
      this.message.rect(20, 100 + this.pos, 330, 130, 5);

      this.message.noStroke();
      this.message.fill(0);
      this.message.text(
        "Wie wir sehen konnten, bist du auch auf der Suche. Trete unserer Gruppe bei. An diesem Ort gibt es nichts als die Wahrheit.",
        35,
        105 + this.pos,
        315,
        115
      );
    } else if (this.event === "friendMessage") {
      this.message.fill(200);
      this.message.rect(20, 100 + this.pos, 330, 130, 5);

      this.message.noStroke();
      this.message.fill(0);
      this.message.text(
        "Ich muss mit dir reden. Wir treffen uns in der Bar.",
        35,
        105 + this.pos,
        315,
        115
      );
    } else {
      this.message.noStroke();
      this.message.fill(0);
      this.message.text("Du hast keine neuen Nachrichten.", 30, 90, 330, 105);
    }

    for (let elem in this.conversation) {
      if (this.conversation[elem].isClicked && this.conversation[elem].animationTextOver) {
        this.message.fill(170);
        this.message.rect(90, 250 + 300 * elem + this.pos, 330, 130, 5);
        this.message.noStroke();
        this.message.fill(0);
        this.message.text(this.conversation[elem].conversationText, 105, 250 + 300 * elem + this.pos, 320, 120);
      }
    }

    for (let elem in this.conversation) {
      if (this.conversation[elem].isClicked && this.conversation[elem].animationAnswerOver) {
        this.message.fill(200);
        this.message.rect(20, 400 + 300 * elem + this.pos, 330, 130, 5);
        this.message.noStroke();
        this.message.fill(0);
        this.message.text(this.conversation[elem].conversationAnswer, 35, 400 + 300 * elem + this.pos, 320, 120);
      }
    }

    if (this.children[0].hover || this.children[1].hover) {
      this.hoverAnimation();
    }

    if (this.buffering) {
      this.bufferAnimation(this.bufferingDirection);
      this.chatAnimation();
    } else {
      this.clearChatAnimation();
    }
  }

  updatePosition() {
    this.pos += -55;
    this.redraw();
  }

  showConversation(textNode) {
    let conv = textNode;
    this.conversation.push(conv);
  }

  setEvent(event) {
    this.event = event;
    for (let elem of this.children) {
      elem.setEvent();
    }
  }

  setBufferAnimation(direction) {
    this.buffering = true;
    this.bufferingDirection = direction;
  }

  clearBufferAnimation() {
    this.buffering = false;
  }

  clearChatAnimation() {
    this.count = 0;
  }

  chatAnimation() {
    if (this.count < 45) {
      this.count++;
    } else {
      this.count = 0
    }
    if (this.count <= 15) {
      this.chatNode = ".      ";
    } else if (this.count > 15 && this.count <= 30) {
      this.chatNode = ".  .   ";
    } else {
      this.chatNode = ".  .  .";
    }
  }

  bufferAnimation(direction) {
    switch (direction) {
      case "RIGHT":
        this.message.textAlign(CENTER, CENTER);
        this.message.fill(170);
        this.message.rect(350, 250 + 300 * (this.conversation.length - 1) + this.pos, 80, 70, 5);
        this.message.noStroke();
        this.message.fill(0);
        this.message.text(this.chatNode, 350, 250 + 300 * (this.conversation.length - 1) + this.pos, 80, 70);
        break;
      case "LEFT":
        this.message.textAlign(CENTER, CENTER);
        this.message.fill(200);
        this.message.rect(20, 400 + 300 * (this.conversation.length - 1) + this.pos, 80, 70, 5);
        this.message.noStroke();
        this.message.fill(0);
        this.message.text(this.chatNode, 20, 400 + 300 * (this.conversation.length - 1) + this.pos, 80, 70);
        break;
    };
  }

  hoverAnimation() {
    this.message.textAlign(CENTER, CENTER);
    this.message.fill(170);
    this.message.rect(350, 250 + 300 * this.conversation.length + this.pos, 80, 70, 5);
    this.message.noStroke();
    this.message.fill(0);
    this.message.text(".  .  .", 350, 250 + 300 * this.conversation.length + this.pos, 80, 70);
  }

  mouseScroll() {
    let ev = {};
    for (let elem of this.conversation)
      if (this.hover && elem.conversationEnded) {
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
      } else if (this.pos < -(1 + 220 * this.conversation.length)) {
        this.pos = -(1 + 220 * this.conversation.length);
      } else {
        this.pos -= ev.delta;
        this.redraw();
      }
    }
  }

  resetElement() {
    this.conversation = [];
    this.pos = 0;
    this.event = undefined;
    this.buffering = false;
    this.bufferingDirection = undefined;
    this.chatNode = undefined;
    this.chatAnimated = false;
    this.count = 0;
    this.message = createGraphics(this.width, this.height);
  }
}
