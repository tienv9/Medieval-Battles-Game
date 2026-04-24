export class UnitBase {
  constructor({ id, owner, x, y, facing }) {
    this.id = id;
    this.owner = owner;
    this.x = x;
    this.y = y;
    this.facing = facing;

    this.hasMoved = false;
    this.hasAttacked = false;
    this.hasRotated = false;
  }

  resetTurn() {
    this.hasMoved = false;
    this.hasAttacked = false;
    this.hasRotated = false;
  }

  moveTo(x, y) {
    if (this.hasMoved) return false;
    this.x = x;
    this.y = y;
    this.hasMoved = true;
    return true;
  }

  rotate(newFacing) {
    if (this.hasRotated) return false;
    this.facing = newFacing;
    this.hasRotated = true;
    return true;
  }
}