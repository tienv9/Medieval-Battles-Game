export class UnitBase {
  constructor({ id, owner, x, y, facing }) {
    this.id = id;
    this.owner = owner;
    this.x = x;
    this.y = y;
    this.facing = facing;

    this.hasMoved = false;
    this.hasAttacked = false;
  }

  resetTurn() {
    this.hasMoved = false;
    this.hasAttacked = false;
  }

  moveTo(x, y) {
    if (this.hasMoved) return false;
    this.x = x;
    this.y = y;
    this.hasMoved = true;
    return true;
  }
}