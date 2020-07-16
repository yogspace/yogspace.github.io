import Sprite from "../../../sprite.js";

export default class PhoneMailButton extends Sprite {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.name = "mailButton";
    this.disable();
    this.hide();
  }

  clicked() {
    window.dispatchEvent(new CustomEvent("tapPhone"));
    this.hide();
    this.disable();
    this.parent.children[5].disable();
    this.parent.children[5].hide();

    // send mail
    let from = "social-whispers@interactivemedia.design";
    let to = this.parent.children[5].getContent();
    let content = `
    <p>
      Liebe*r Teilnehmer*in,<br />
      <br />
      vielen Dank für Deine Teilnahme an unserer Simulation und Dein Interesse am Thema!<br />
      Im Anhang findest Du weitere Hinweise zum Umgang mit Informationen in sozialen Medien.<br />
      <br />
      Viele Grüße<br />
      <br />
      Florian, Lars, Luisa und Max
    </p>`
    this.sendMail(from, to, content);
    this.parent.sendMail(to);
  }



  draw() {
    this.enable();
    if (this.hover) {
      stroke(255, 165, 0);
    } else {
      noStroke();
    }

    textAlign(CENTER, CENTER);
    fill("grey");
    rect(0, 0, this.width, this.height, 5);
    noStroke();
    fill("black");
    text("Senden", 0, 0, this.width, this.height);
  }

  sendMail(from, to, content) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "./src/simulation/interactiveElements/smartphone/mail.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (!(xhr.readyState === 4 && xhr.status === 200)) {
        this.parent.children[5].sendFailed();
      }
    };
    xhr.send(JSON.stringify({ from: from, to: to, content: content }));
  }

  resetElement() {
    this.disable();
    this.hide();
  }
}