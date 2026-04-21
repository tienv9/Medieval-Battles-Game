export class UnitBase {
  constructor({ id, owner, type, x, y, facing }) {
    this.id = id;
    this.owner = owner;
    this.type = type;
    this.x = x;
    this.y = y;
    this.facing = facing;
  }
}