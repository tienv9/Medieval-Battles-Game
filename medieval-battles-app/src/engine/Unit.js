import { UnitBase } from "./UnitBase";

export class Unit extends UnitBase {
  constructor(props) {
    super(props);
    this.moved = false;
    this.attacked = false;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }
}