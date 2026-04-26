export class UnitBase {
  constructor({ id, owner, x, y, facing }) {
    this.id = id;
    this.owner = owner;
    this.x = x;
    this.y = y;
    this.facing = facing;

    this.hasAttacked = false;
    this.moveLeft = 0;
  }

  resetTurn() {
    this.hasAttacked = false;
    this.moveLeft = this.stats.move;
  }

  moveTo(x, y, cost = 1) {
    if (this.moveLeft < cost) return false;

    this.x = x;
    this.y = y;
    this.moveLeft -= cost;
    return true;
  }

  rotate(newFacing) {
    this.facing = newFacing;
    return true;
  }
}