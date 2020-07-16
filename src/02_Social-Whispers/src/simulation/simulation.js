/*
 * Social Whispers – Simulation game
 * Published under the MIT license.
 * (c) 2020 Florian Beck, Lars Brandies, Luisa von Trümbach and Maximilian Weber
 */

export default class Simulation{
  constructor(){
    this.manipulativity = 0.5;
    this.reflectivity = 0.5;
    this.attentionseeking = 0.5;
    this.characters = {
      HEAD_OF_ILLUMINATI: "Anführer der Illuminaten",
      CONSPIRACY_THEORIST: "Verschwörungstheoretiker",
      FOLLOWER: "Mitläufer",
      WANNABE_INFLUENCER: "Möchtegern-Influencer",
      REFLECTIVE_USER: "Reflektierter Nutzer"
    };
  }

  getPersona() {
    // logic do distinguish between personas based on simulation parameters
    let m = this.manipulativity;
    let r = this.reflectivity;
    let a = this.attentionseeking;

    if (r < 0.33) {
      // reflectivity = red
      if(m < 0.33) {
        // manipulativity = red
        return this.characters.FOLLOWER;
      } else if (m < 0.67) {
        // manipulativity = yellow
        if (a < 0.67) {
          // attention seeking = red || yellow
          return this.characters.FOLLOWER;
        } else {
          // attention seeking = green
          return this.characters.CONSPIRACY_THEORIST;
        }
      } else {
        // manipulativity = green
        if (a < 0.67) {
          // attention seeking = red || yellow;
          return this.characters.CONSPIRACY_THEORIST;
        } else {
          // attention seeking = green;
          return this.characters.WANNABE_INFLUENCER;
        }
      }
    } else if (r < 0.67) {
      // reflectivity = yellow
      if(m < 0.33) {
        // manipulativity = red
        return this.characters.FOLLOWER;
      } else if (m < 0.67) {
        // manipulativity = yellow 
        if(a < 0.67) {
          // attention seeking = red || yellow
          return this.characters.FOLLOWER;
        } else {
          // attention seeking = green
          return this.characters.WANNABE_INFLUENCER;
        }
      } else {
        // manipulativity = green
        if(a < 0.67) {
          // attention seeking = red || yellow
          return this.characters.CONSPIRACY_THEORIST;
        } else {
          // attention seeking = green
          return this.characters.WANNABE_INFLUENCER;
        }
      }
    } else {
      // reflectivity = green
      if(m < 0.67) {
        // manipulativity = red || yellow
        return this.characters.REFLECTIVE_USER;
      } else {
        // manipulativity = green
        if (a < 0.33) {
          // attention seeking = red
          return this.characters.HEAD_OF_ILLUMINATI;
        } else {
          // attention seeking = yellow || green
          return this.characters.WANNABE_INFLUENCER;
        }
      }
    }
  }

  changeParameters(m, r, a) {
    this.changeAttentionseeking(a);
    this.changeManipulativity(m);
    this.changeReflectivity(r);
  }

  changeManipulativity(steps) {
    this.manipulativity += 0.1 * steps;
  }

  changeReflectivity(steps) {
    this.reflectivity += 0.1 * steps;
  }

  changeAttentionseeking(steps) {
    this.attentionseeking += 0.1 * steps;
  }
}