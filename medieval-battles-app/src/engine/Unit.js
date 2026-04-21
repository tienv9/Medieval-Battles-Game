import { UnitBase } from "./UnitBase";
import { UNIT_TYPES } from "./UnitTypes";

export class Unit extends UnitBase {
  constructor({ id, owner, x, y, facing, type }) {
    super({ id, owner, x, y, facing });

    this.type = type;
    this.stats = UNIT_TYPES[type];
  }

  canMove(distance) {
    return !this.hasMoved && distance <= this.stats.move;
  }

  canAttack() {
    return !this.hasAttacked;
  }

  attack() {
    this.hasAttacked = true;
  }
}