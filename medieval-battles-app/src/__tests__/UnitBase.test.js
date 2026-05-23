import { UnitBase } from '../engine/UnitBase';

const makeBase = (overrides = {}) => {
  const unit = new UnitBase({ id: 1, owner: 0, x: 3, y: 4, facing: 'N', ...overrides });
  unit.stats = { move: 3 }; // UnitBase has no stats; Unit sets them
  return unit;
};

describe('UnitBase', () => {
  describe('initial state', () => {
    test('sets position, owner and facing', () => {
      const u = makeBase({ x: 2, y: 7, facing: 'E', owner: 1 });
      expect(u.x).toBe(2);
      expect(u.y).toBe(7);
      expect(u.facing).toBe('E');
      expect(u.owner).toBe(1);
    });

    test('hasAttacked starts false', () => {
      expect(makeBase().hasAttacked).toBe(false);
    });
  });

  describe('resetTurn', () => {
    test('clears hasAttacked and restores moveLeft from stats', () => {
      const u = makeBase();
      u.hasAttacked = true;
      u.moveLeft = 0;
      u.resetTurn();
      expect(u.hasAttacked).toBe(false);
      expect(u.moveLeft).toBe(3);
    });
  });

  describe('moveTo', () => {
    test('moves unit and deducts movement', () => {
      const u = makeBase();
      u.moveLeft = 2;
      const result = u.moveTo(5, 6);
      expect(result).toBe(true);
      expect(u.x).toBe(5);
      expect(u.y).toBe(6);
      expect(u.moveLeft).toBe(1);
    });

    test('fails when movement cost exceeds moveLeft', () => {
      const u = makeBase();
      u.moveLeft = 1;
      const result = u.moveTo(5, 6, 2);
      expect(result).toBe(false);
      expect(u.x).toBe(3); // unchanged
      expect(u.y).toBe(4);
    });

    test('accepts custom cost', () => {
      const u = makeBase();
      u.moveLeft = 3;
      u.moveTo(0, 0, 3);
      expect(u.moveLeft).toBe(0);
    });
  });

  describe('rotate', () => {
    test('sets new facing and returns true', () => {
      const u = makeBase({ facing: 'N' });
      const result = u.rotate('E');
      expect(result).toBe(true);
      expect(u.facing).toBe('E');
    });
  });
});
