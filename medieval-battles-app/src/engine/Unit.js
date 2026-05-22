import { UnitBase } from "./UnitBase";
import { UNIT_TYPES } from "./UnitTypes";

export class Unit extends UnitBase {
  constructor({ id, owner, x, y, facing, type }) {
    super({ id, owner, x, y, facing });

    this.type = type;
    this.stats = UNIT_TYPES[type];
    this.moveLeft = this.stats.move;
    this.reloadTurnsLeft = 0;
  }

  resetTurn() {
    if (this.reloadTurnsLeft > 0) {
      this.reloadTurnsLeft--;
      this.hasAttacked = true;
      this.moveLeft = 0;
    } else {
      super.resetTurn();
    }
  }

  canMove(distance) {
    return distance <= this.moveLeft;
  }

  canAttack() {
    return !this.hasAttacked;
  }

  attack() {
    this.hasAttacked = true;
    if (this.type === "archer") {
      this.reloadTurnsLeft = 2;
    }
  }
}