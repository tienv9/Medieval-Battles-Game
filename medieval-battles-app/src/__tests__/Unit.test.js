import { Unit } from '../engine/Unit';

const makeUnit = (type = 'swordsman', overrides = {}) =>
  new Unit({ id: 1, owner: 0, x: 0, y: 0, facing: 'N', type, ...overrides });

describe('Unit', () => {
  describe('initial state', () => {
    test('moveLeft equals stat move value', () => {
      expect(makeUnit('swordsman').moveLeft).toBe(2);
      expect(makeUnit('cavalry').moveLeft).toBe(4);
      expect(makeUnit('archer').moveLeft).toBe(1);
      expect(makeUnit('spearman').moveLeft).toBe(2);
    });

    test('reloadTurnsLeft starts at 0', () => {
      expect(makeUnit('archer').reloadTurnsLeft).toBe(0);
    });

    test('hasAttacked starts false', () => {
      expect(makeUnit().hasAttacked).toBe(false);
    });
  });

  describe('canMove', () => {
    test('true when distance <= moveLeft', () => {
      const u = makeUnit('swordsman'); // move 2
      expect(u.canMove(1)).toBe(true);
      expect(u.canMove(2)).toBe(true);
    });

    test('false when distance > moveLeft', () => {
      expect(makeUnit('swordsman').canMove(3)).toBe(false);
    });
  });

  describe('canAttack', () => {
    test('true before attacking', () => {
      expect(makeUnit().canAttack()).toBe(true);
    });

    test('false after attacking', () => {
      const u = makeUnit();
      u.attack();
      expect(u.canAttack()).toBe(false);
    });
  });

  describe('attack', () => {
    test('sets hasAttacked', () => {
      const u = makeUnit('swordsman');
      u.attack();
      expect(u.hasAttacked).toBe(true);
    });

    test('archer sets reloadTurnsLeft to 2', () => {
      const u = makeUnit('archer');
      u.attack();
      expect(u.reloadTurnsLeft).toBe(2);
    });

    test('non-archer does not set reload', () => {
      const u = makeUnit('swordsman');
      u.attack();
      expect(u.reloadTurnsLeft).toBe(0);
    });
  });

  describe('resetTurn — reload mechanic', () => {
    test('normal reset restores move and clears hasAttacked', () => {
      const u = makeUnit('swordsman');
      u.hasAttacked = true;
      u.moveLeft = 0;
      u.resetTurn();
      expect(u.hasAttacked).toBe(false);
      expect(u.moveLeft).toBe(2);
    });

    test('during reload: decrements counter, keeps hasAttacked true, moveLeft stays 0', () => {
      const u = makeUnit('archer');
      u.attack(); // reloadTurnsLeft = 2
      u.resetTurn(); // tick 1
      expect(u.reloadTurnsLeft).toBe(1);
      expect(u.hasAttacked).toBe(true);
      expect(u.moveLeft).toBe(0);
    });

    test('after reload expires: unit acts normally again', () => {
      const u = makeUnit('archer');
      u.attack(); // reloadTurnsLeft = 2
      u.resetTurn(); // tick 1 → reloadTurnsLeft = 1, still locked
      u.resetTurn(); // tick 2 → reloadTurnsLeft = 0, still locked this turn
      u.resetTurn(); // tick 3 → reloadTurnsLeft = 0, super.resetTurn fires
      expect(u.reloadTurnsLeft).toBe(0);
      expect(u.hasAttacked).toBe(false);
      expect(u.moveLeft).toBe(1); // archer move stat
    });
  });
});
