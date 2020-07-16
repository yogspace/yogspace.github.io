/*
 * Social Whispers – Simulation game
 * Published under the MIT license.
 * (c) 2020 Florian Beck, Lars Brandies, Luisa von Trümbach and Maximilian Weber
 */

import Simulation from "./simulation.js";

export default class Player extends Simulation{
  constructor(){
    super();
    this.actions = {};
    this.phoneInUse = false;
  }

  addAction(origin, name, data){
    if (!(origin in this.actions)) {
        this.actions[origin] = {};
    }
    this.actions[origin][name] = data;
  }

  actionDone(view, action = undefined, data = undefined) {
    if (view in this.actions) {
      if ((action === undefined && data === undefined) || (action in this.actions[view] && data === undefined)) {
        return true;
      } else {
        return this.actions[view][action];
      }
    }
    return false;
  }

  usePhone(bool) {
    this.phoneInUse = bool;
  }

  reset(){
    this.actions = {};
    this.phoneInUse = false;
    this.manipulativity = 0.5;
    this.reflectivity = 0.5;
    this.attentionseeking = 0.5;
  }
}