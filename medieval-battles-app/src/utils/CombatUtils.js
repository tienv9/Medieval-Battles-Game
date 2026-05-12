// Place this file in src/utils/CombatUtils.js

export const getCombatBonus = (unit, enemy) => {
  // Spearman vs Cavalry
  if (unit.type === 'spearman' && enemy.type === 'cavalry') {
    return 2;
  }

  // Cavalry vs Spearman
  if (unit.type === 'cavalry' && enemy.type === 'spearman') {
    return -2;
  }

  // Swordsman vs Spearman
  if (unit.type === 'swordsman' && enemy.type === 'spearman') {
    return 2;
  }

  // Spearman vs Swordsman
  if (unit.type === 'spearman' && enemy.type === 'swordsman') {
    return -2;
  }

  // Swordsman vs Cavalry
  if (unit.type === 'swordsman' && enemy.type === 'cavalry') {
    return 1;
  }

  // Cavalry vs Swordsman
  if (unit.type === 'cavalry' && enemy.type === 'swordsman') {
    return -1;
  }

  // Swordsman vs Archer
  if (unit.type === 'swordsman' && enemy.type === 'archer') {
    return 1;
  }

  // Archer vs Swordsman
  if (unit.type === 'archer' && enemy.type === 'swordsman') {
    return -1;
  }

  return 0;
}