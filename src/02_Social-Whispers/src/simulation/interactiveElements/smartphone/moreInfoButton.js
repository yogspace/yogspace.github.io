import Sprite from "../../../sprite.js";

export default class MoreInfoButton extends Sprite {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.name = "moreInfoButton";
        this.hide();
        this.disable();
    }

    clicked() {
        window.dispatchEvent(new CustomEvent("tapPhone"));
        this.parent.inputActive();
        this.parent.children[2].hide();
        this.parent.children[3].hide();
        this.parent.children[4].show();
        this.parent.children[5].show();
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
        text("Mehr Informationen", 0, 0, this.width, this.height);
    }

    resetElement() {
        this.hide();
        this.disable();
    }
}