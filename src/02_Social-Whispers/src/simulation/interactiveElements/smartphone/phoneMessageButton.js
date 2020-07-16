import Sprite from "../../../sprite.js";


export default class PhoneMessageButton extends Sprite {
  constructor(x, y, width, height, name, backgnd = undefined) {
    super(x, y, width, height, backgnd);
    this.name = "messageButton" + name;
    this.messages = [];
    this.conversationIndex = 0;
    this.currentMessage = undefined;
    this.event = undefined;
    // this.animationOver = undefined;
    // this.animation = undefined;
    this.disable();
    this.hide();
  }

  clicked() {
    window.dispatchEvent(new CustomEvent("phoneSendMsg"));
    this.currentMessage.animationText = setInterval(() => {
      this.currentMessage.animationTextOver = false;
      this.currentMessage.animationAnswerOver = false;
      this.parent.setBufferAnimation("RIGHT");
    }, 200);
    setTimeout(() => {
      this.currentMessage.animationAnswer = setInterval(() => {
        ;
        this.parent.setBufferAnimation("LEFT");
      }, 200);
    }, 3000);
    setTimeout(() => {
      this.parent.children.forEach((btn) => {
        this.currentMessage.isClicked = true;
        btn.disable();
        setTimeout(() => {
          this.currentMessage.animationTextOver = true;
          clearInterval(this.currentMessage.animationText);
          setTimeout(() => {
            btn.conversationIndex++
            this.currentMessage.animationAnswerOver = true;
            clearInterval(this.currentMessage.animationAnswer);
            this.parent.clearBufferAnimation();
            this.parent.updatePosition();
            window.dispatchEvent(new CustomEvent("phoneSendMsg"));
            btn.setUpMessages();
            if (btn.conversationIndex < 4 && btn.visible) {
              btn.enable();
            }
          }, 4000);
          this.parent.clearBufferAnimation();
          this.parent.updatePosition();
          window.dispatchEvent(new CustomEvent("phoneSendMsg"));
          btn.setUpMessages();
        }, 2000);



        btn.updateMessages();
        // btn.setUpMessages();
        if (this.currentMessage.conversationEnded) {
          this.parent.children.forEach((btn) => {
            btn.hide();
            btn.disable();
          });
        }

      });
    }, 0); // setTimeout as temporary bugfix - a real fix will need bigger code restructuring


    this.parent.showConversation(this.currentMessage);
    // this.parent.updatePosition();
    this.parent.redraw();


    if (
      this.currentMessage.conversationEnded ||
      this.currentMessage.demoChosen || this.currentMessage.proInterview
    ) {
      window.dispatchEvent(
        new CustomEvent("addAction", {
          detail: {
            origin: this.currentMessage.actionOrigin,
            name: this.currentMessage.actionName,
            data: this.currentMessage.actionData,
          },
        })
      );
    }
  }

  setEvent() {
    this.event = this.parent.event;
    this.show();
    this.enable();
    this.conversationIndex++;
    this.setUpMessages();
  }

  draw() {
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
    text(this.currentMessage.buttonText, 0, 0, this.width, this.height);
  }

  updateMessages() {


    if (this.conversationIndex > 2 && this.conversationIndex < 4) {
      this.show();
      this.enable();
    } else if (this.conversationEnd || this.conversationIndex >= 4) {
      this.hide();
      this.disable();
    }
  }

  setUpMessages() {
    let conversation;
    switch (this.conversationIndex) {
      case 1:
        switch (this.name) {
          case "messageButtonA":
            switch (this.event) {
              case "interview":
                conversation = {
                  id: 1,
                  buttonText: "Na klar, schießen Sie los.",
                  conversationText:
                    "Hi. Das wundert mich aber. Worum geht es denn?",
                  conversationAnswer:
                    "Ihr Name ist in Verbindung mit den gerade stattfindenden Demos aufgetaucht. Unterstützen Sie diese?",
                  conversationEnded: false,
                  animationTextOver: false,
                  animationAnswerOver: false,
                  proInterview: true,
                  actionOrigin: "coffeeHouse",
                  actionName: "interviewAccepted",
                  actionData: true,
                };
                break;
              case "invite":
                conversation = {
                  id: 1,
                  buttonText: "Das klingt ja interessant.",
                  conversationText:
                    "Ich bin mir in manchen Dingen tatsächlich unsicher. Vielleicht finde ich hier ja Antworten auf meine Fragen.",
                  conversationAnswer:
                    "Du bist damit nicht alleine. Du wurdest von den Mainstream-Medien geblendet. Aber damit ist es nun vorbei.",
                  conversationEnded: false,
                  animationTextOver: false,
                  animationAnswerOver: false,
                };
                break;
              case "friendMessage":
                conversation = {
                  id: 1,
                  buttonText: "Wer bist du?",
                  conversationText:
                    "Kennen wir uns etwa? Wieso schreibst du mir?",
                  conversationAnswer:
                    "Komm einfach zum 14qm. Du wirst es verstehen, sobald du dort angekommen bist.",
                  conversationEnded: true,
                  animationTextOver: false,
                  animationAnswerOver: false,
                };
                break;
            }
            break;
          case "messageButtonB":
            switch (this.event) {
              case "interview":
                conversation = {
                  id: 1,
                  buttonText: "Kein Interesse.",
                  conversationText:
                    "Von der \"The Daily Whisper\" also? Euch beantworte ich keine Fragen!",
                  conversationAnswer:
                    "Na gut. Dann checken Sie lieber mal Ihren Socialbook-Feed.",
                  conversationEnded: true,
                  animationTextOver: false,
                  animationAnswerOver: false,
                  actionOrigin: "coffeeHouse",
                  actionName: "interviewAccepted",
                  actionData: false,
                };
                break;

              case "invite":
                conversation = {
                  id: 1,
                  buttonText: "Das passiert jetzt nicht wirklich.",
                  conversationText:
                    "Ihr kennt also \"die Wahrheit\"? Vermutlich zündet ihr auch regelmäßig 5G-Türme auf eurer Suche nach der Wahrheit an.",
                  conversationAnswer:
                    "Schafe wie du werden erst verstehen, was um sie herum wirklich passiert, wenn es längst zu spät ist!",
                  conversationEnded: true,
                  animationTextOver: false,
                  animationAnswerOver: false,
                  actionOrigin: "coffeeHouse",
                  actionName: "invitationAccepted",
                  actionData: false,
                };
                break;
              case "friendMessage":
                conversation = {
                  id: 1,
                  buttonText: "Welche Bar?",
                  conversationText:
                    "Von welcher Bar sprichst du denn? Kennen wir uns etwa?",
                  conversationAnswer:
                    "Ich bin ein alter Freund. Komm so schnell du kannst zum 14qm.",
                  conversationEnded: true,
                  animationTextOver: false,
                  animationAnswerOver: false,
                };
                break;
            }
            break;
        }
        break;
      case 2:
        switch (this.name) {
          case "messageButtonA":
            switch (this.event) {
              case "interview":
                conversation = {
                  id: 2,
                  buttonText: "Pro-Demo.",
                  conversationText:
                    "In meinen Augen stehen die Demonstranten für die richtige Sache ein.",
                  conversationAnswer:
                    "Sie wollen also damit sagen, Sie unterstützen die Aussagen und Handlungen dieser Gruppe?",
                  conversationEnded: false,
                  animationTextOver: false,
                  animationAnswerOver: false,
                  demoChosen: true,
                  actionOrigin: "coffeeHouse",
                  actionName: "proDemo",
                  actionData: true,
                };
                break;
              case "invite":
                conversation = {
                  id: 2,
                  buttonText: "Der Gruppe beitreten.",
                  conversationText:
                    "Ich bin eurer Gruppe auf Socialbook beigetreten. ",
                  conversationAnswer:
                    "Damit wirst du vom Schaf zum Wolf. Willkommen!",
                  conversationEnded: true,
                  animationTextOver: false,
                  animationAnswerOver: false,
                  actionOrigin: "coffeeHouse",
                  actionName: "invitationAccepted",
                  actionData: true,
                };
                break;
            }
            break;
          case "messageButtonB":
            switch (this.event) {
              case "interview":
                conversation = {
                  id: 2,
                  buttonText: "Pro-Gegendemo.",
                  conversationText:
                    "Ich finde es wichtig, was die Gegendemonstranten leisten. ",
                  conversationAnswer:
                    "Sie stellen sich also damit auf die Seite der Gegendemonstranten?",
                  conversationEnded: false,
                  animationTextOver: false,
                  animationAnswerOver: false,
                  demoChosen: true,
                  actionOrigin: "coffeeHouse",
                  actionName: "proDemo",
                  actionData: false,
                };
                break;
              case "invite":
                conversation = {
                  id: 2,
                  buttonText: "Anders überlegen.",
                  conversationText:
                    "Ich glaube, ich sollte mich vorher erstmal informieren, was ihr so tut.",
                  conversationAnswer:
                    "Die Mainstream-Medien verbreiten nur Lügen und Fake News! Dir ist nicht mehr zu helfen.",
                  conversationEnded: true,
                  animationTextOver: false,
                  animationAnswerOver: false,
                  actionOrigin: "coffeeHouse",
                  actionName: "invitationAccepted",
                  actionData: false,
                };
                break;
            }
            break;
        }
        break;
      case 3:
        switch (this.name) {
          case "messageButtonA":
            switch (this.event) {
              case "interview":
                conversation = {
                  id: 3,
                  buttonText: "Aussage verteidigen.",
                  conversationText: "Ich bleibe bei dem, was ich gesagt habe.",
                  conversationAnswer:
                    "Na gut. Dann checken Sie lieber mal Ihren Socialbook-Feed.",
                  conversationEnded: true,
                  animationTextOver: false,
                  animationAnswerOver: false,
                  actionOrigin: "coffeeHouse",
                  actionName: "statementDefended",
                  actionData: true,
                };
                break;
            }
            break;
          case "messageButtonB":
            switch (this.event) {
              case "interview":
                conversation = {
                  id: 3,
                  buttonText: "Aussage revidieren.",
                  conversationText: "Das habe ich so nicht gesagt!",
                  conversationAnswer:
                    "Na gut. Dann checken Sie lieber mal Ihren Socialbook-Feed.",
                  conversationEnded: true,
                  animationTextOver: false,
                  animationAnswerOver: false,
                  actionOrigin: "coffeeHouse",
                  actionName: "statementDefended",
                  actionData: false,
                };
                break;
            }
            break;
        }
        break;
      default:
        break;
    }

    if (this.conversationIndex < 4) {
      this.messages.push(conversation);
      this.getMessages(this.conversationIndex);
    }
  }

  getMessages(conversationIndex) {
    let currentMessage = this.messages.find(
      (currentMessage) => currentMessage.id === conversationIndex
    );

    this.currentMessage = currentMessage;
  }

  resetElement() {
    this.messages = [];
    this.conversationIndex = 0;
    this.currentMessage = undefined;
    this.event = undefined;
    this.disable();
    this.hide();
  }
}
