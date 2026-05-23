export const roll = () => Math.floor(Math.random() * 6) + 1;

export const getCombatBonus = (unit, enemy) => {
  if (unit.type === "spearman" && enemy.type === "cavalry") return 2;
  if (unit.type === "cavalry" && enemy.type === "spearman") return -2;
  if (unit.type === "swordsman" && enemy.type === "spearman") return 2;
  if (unit.type === "spearman" && enemy.type === "swordsman") return -2;
  if (unit.type === "swordsman" && enemy.type === "cavalry") return 1;
  if (unit.type === "cavalry" && enemy.type === "swordsman") return -1;
  if (unit.type === "swordsman" && enemy.type === "archer") return 1;
  if (unit.type === "archer" && enemy.type === "swordsman") return -1;
  return 0;
};

export const isBehindAttack = (attacker, defender) => {
  switch (defender.facing) {
    case "N": return attacker.y > defender.y;
    case "S": return attacker.y < defender.y;
    case "E": return attacker.x < defender.x;
    case "W": return attacker.x > defender.x;
    default:  return false;
  }
};

export const isInFront = (attacker, target) => {
  switch (attacker.facing) {
    case "N": return target.y < attacker.y;
    case "S": return target.y > attacker.y;
    case "E": return target.x > attacker.x;
    case "W": return target.x < attacker.x;
    default:  return false;
  }
};

// Returns 'front', 'side', or 'rear' based on where the attacker is relative
// to the defender's facing. Side = attacker is on the perpendicular axis.
export const getFlankType = (attacker, defender) => {
  switch (defender.facing) {
    case "N":
      if (attacker.y < defender.y) return "front";
      if (attacker.y > defender.y) return "rear";
      return "side";
    case "S":
      if (attacker.y > defender.y) return "front";
      if (attacker.y < defender.y) return "rear";
      return "side";
    case "E":
      if (attacker.x > defender.x) return "front";
      if (attacker.x < defender.x) return "rear";
      return "side";
    case "W":
      if (attacker.x < defender.x) return "front";
      if (attacker.x > defender.x) return "rear";
      return "side";
    default:
      return "front";
  }
};

export const resolveCombat = (attacker, defender) => {
  const logs = [];
  let atk = roll();
  let def = roll();

  const atkBonus = getCombatBonus(attacker, defender);
  let defBonus = getCombatBonus(defender, attacker);

  if (defender.type === "archer" && attacker.type !== "archer") {
    defBonus -= 6;
    logs.push(`Archer weakness! ${defender.type} gets -6 defense`);
  }

  atk += atkBonus;
  def += defBonus;

  if (atkBonus !== 0) {
    logs.push(`${attacker.type} combat modifier: ${atkBonus > 0 ? "+" : ""}${atkBonus}`);
  }
  if (defBonus !== 0) {
    logs.push(`${defender.type} combat modifier: ${defBonus > 0 ? "+" : ""}${defBonus}`);
  }

  const flankType = getFlankType(attacker, defender);
  if (flankType === "rear") {
    def -= 6;
    logs.push(`Back attack! Enemy ${defender.type} gets -6 defense`);
  } else if (flankType === "side") {
    def -= 3;
    logs.push(`Side attack! Enemy ${defender.type} gets -3 defense`);
  }

  logs.push(`Your ${attacker.type} roll a ${atk}`);
  logs.push(`Enemy ${defender.type} roll a ${def}`);

  const killed = atk > def;
  logs.push(killed ? `Your roll is higher. Enemy ${defender.type} dies` : `Enemy defends successfully`);

  return { killed, logs };
};
