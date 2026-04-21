export class Player {
  constructor(id) {
    this.id = id;
    this.units = [];
  }

  addUnit(unit) {
    this.units.push(unit);
  }

  aliveUnits() {
    return this.units.filter(u => u !== null);
  }
}