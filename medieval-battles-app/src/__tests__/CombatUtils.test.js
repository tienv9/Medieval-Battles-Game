import { roll, getCombatBonus, isBehindAttack, getFlankType, resolveCombat } from '../utils/CombatUtils';

const makeUnit = (overrides) => ({
  type: 'swordsman',
  x: 5,
  y: 5,
  facing: 'N',
  ...overrides,
});

describe('roll', () => {
  test('always returns an integer between 1 and 6', () => {
    for (let i = 0; i < 100; i++) {
      const r = roll();
      expect(r).toBeGreaterThanOrEqual(1);
      expect(r).toBeLessThanOrEqual(6);
      expect(Number.isInteger(r)).toBe(true);
    }
  });
});

describe('getCombatBonus', () => {
  const cases = [
    ['spearman', 'cavalry',  +2],
    ['cavalry',  'spearman', -2],
    ['swordsman','spearman', +2],
    ['spearman', 'swordsman',-2],
    ['swordsman','cavalry',  +1],
    ['cavalry',  'swordsman',-1],
    ['swordsman','archer',   +1],
    ['archer',   'swordsman',-1],
  ];

  test.each(cases)('%s vs %s → %d', (atkType, defType, expected) => {
    expect(getCombatBonus(makeUnit({ type: atkType }), makeUnit({ type: defType }))).toBe(expected);
  });

  test('neutral matchups return 0', () => {
    expect(getCombatBonus(makeUnit({ type: 'archer' }), makeUnit({ type: 'cavalry' }))).toBe(0);
    expect(getCombatBonus(makeUnit({ type: 'cavalry' }), makeUnit({ type: 'archer' }))).toBe(0);
  });
});

describe('isBehindAttack', () => {
  const defender = makeUnit({ x: 5, y: 5 });

  test('attacker south of N-facing defender is behind', () => {
    expect(isBehindAttack(makeUnit({ x: 5, y: 7 }), { ...defender, facing: 'N' })).toBe(true);
  });

  test('attacker north of N-facing defender is NOT behind', () => {
    expect(isBehindAttack(makeUnit({ x: 5, y: 3 }), { ...defender, facing: 'N' })).toBe(false);
  });

  test('attacker north of S-facing defender is behind', () => {
    expect(isBehindAttack(makeUnit({ x: 5, y: 3 }), { ...defender, facing: 'S' })).toBe(true);
  });

  test('attacker west of E-facing defender is behind', () => {
    expect(isBehindAttack(makeUnit({ x: 3, y: 5 }), { ...defender, facing: 'E' })).toBe(true);
  });

  test('attacker east of W-facing defender is behind', () => {
    expect(isBehindAttack(makeUnit({ x: 7, y: 5 }), { ...defender, facing: 'W' })).toBe(true);
  });

  test('attacker on same tile returns false', () => {
    expect(isBehindAttack(makeUnit({ x: 5, y: 5 }), { ...defender, facing: 'N' })).toBe(false);
  });
});

describe('getFlankType', () => {
  const defender = makeUnit({ x: 5, y: 5 });

  test.each([
    ['N', 5, 3, 'front'],
    ['N', 5, 7, 'rear'],
    ['N', 3, 5, 'side'],
    ['N', 7, 5, 'side'],
    ['S', 5, 7, 'front'],
    ['S', 5, 3, 'rear'],
    ['S', 3, 5, 'side'],
    ['E', 7, 5, 'front'],
    ['E', 3, 5, 'rear'],
    ['E', 5, 3, 'side'],
    ['W', 3, 5, 'front'],
    ['W', 7, 5, 'rear'],
    ['W', 5, 7, 'side'],
  ])('facing %s, attacker (%d,%d) → %s', (facing, ax, ay, expected) => {
    expect(getFlankType(makeUnit({ x: ax, y: ay }), { ...defender, facing })).toBe(expected);
  });
});

describe('resolveCombat', () => {
  afterEach(() => jest.restoreAllMocks());

  const mockRolls = (atkRaw, defRaw) => {
    // roll() = Math.floor(random * 6) + 1, so random = (result - 1) / 6
    jest
      .spyOn(Math, 'random')
      .mockReturnValueOnce((atkRaw - 1) / 6)
      .mockReturnValueOnce((defRaw - 1) / 6);
  };

  test('attacker wins when roll is strictly higher', () => {
    mockRolls(6, 1);
    const { killed } = resolveCombat(
      makeUnit({ type: 'swordsman' }),
      makeUnit({ type: 'swordsman', facing: 'N' }),
    );
    expect(killed).toBe(true);
  });

  test('defender survives when rolls are equal', () => {
    mockRolls(3, 3);
    const { killed } = resolveCombat(
      makeUnit({ type: 'swordsman', x: 5, y: 3 }), // north of N-facing defender (frontal)
      makeUnit({ type: 'swordsman', x: 5, y: 5, facing: 'N' }),
    );
    expect(killed).toBe(false);
  });

  test('archer weakness applies -6 to defending archer', () => {
    // attacker roll 1, defender archer roll 6 → after -6 penalty def = 0, atk wins
    mockRolls(1, 6);
    const { killed } = resolveCombat(
      makeUnit({ type: 'swordsman' }),
      makeUnit({ type: 'archer', facing: 'N' }),
    );
    expect(killed).toBe(true);
  });

  test('archer weakness does NOT apply when attacker is also archer', () => {
    // atk 1, def 6 — no penalty; defender survives
    mockRolls(1, 6);
    const { killed } = resolveCombat(
      makeUnit({ type: 'archer', x: 5, y: 3 }), // frontal
      makeUnit({ type: 'archer', x: 5, y: 5, facing: 'N' }),
    );
    expect(killed).toBe(false);
  });

  test('back attack applies -6 to defender', () => {
    // atk 1, def 6 → after -6 back penalty def = 0, atk wins
    mockRolls(1, 6);
    const { killed } = resolveCombat(
      makeUnit({ type: 'swordsman', x: 5, y: 7 }), // south of N-facing defender
      makeUnit({ type: 'swordsman', x: 5, y: 5, facing: 'N' }),
    );
    expect(killed).toBe(true);
  });

  test('side attack applies -3 to defender', () => {
    // atk 4, def 6 → after -3 side penalty def = 3, atk wins
    mockRolls(4, 6);
    const { killed } = resolveCombat(
      makeUnit({ type: 'swordsman', x: 7, y: 5 }), // east of N-facing defender (side)
      makeUnit({ type: 'swordsman', x: 5, y: 5, facing: 'N' }),
    );
    expect(killed).toBe(true);
  });

  test('result includes log entries', () => {
    mockRolls(4, 2);
    const { logs } = resolveCombat(
      makeUnit({ type: 'swordsman' }),
      makeUnit({ type: 'swordsman', facing: 'N' }),
    );
    expect(Array.isArray(logs)).toBe(true);
    expect(logs.length).toBeGreaterThan(0);
  });
});
