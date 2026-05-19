import React, { useState } from "react";
import Board from "./ui/board";
import { Unit } from "./engine/Unit";
import RulePopUp from "./engine/RulePopUp";
import { getCombatBonus } from "./utils/CombatUtils";

const createUnits = () => {
  const units = [];
  let id = 0;

  const SIZE = 10;

  const grid = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => null)
  );

  const row0 = [
    "swordsman",
    "swordsman",
    "swordsman",
    "swordsman",
    "spearman",
    "spearman",
    "spearman",
    "spearman",
  ];

  const row1 = [
    "cavalry",
    "cavalry",
    "archer",
    "archer",
    "archer",
    "archer",
    "cavalry",
    "cavalry",
  ];

  const placeRow = (row, y, owner, facing) => {
    const startX = 1; // 1 empty square border

    row.forEach((type, i) => {
      const x = startX + i;

      grid[y][x] = new Unit({
        id: id++,
        owner,
        type,
        x,
        y,
        facing,
      });

      units.push(grid[y][x]);
    });
  };

  // Player 0 (bottom side)
  placeRow(row0, 8, 0, "N");
  placeRow(row1, 9, 0, "N");

  // Player 1 (top side mirrored)
  placeRow(row1, 0, 1, "S");
  placeRow(row0, 1, 1, "S");

  return units;
};

function roll() {
  return Math.floor(Math.random() * 6) + 1;
}

const rotateClockwise = (facing) => {
  const order = ["N", "E", "S", "W"];
  const idx = order.indexOf(facing);
  return order[(idx + 1) % 4];
};

const isBehindAttack = (attacker, defender) => {
  switch (defender.facing) {
    case "N":
      return attacker.y > defender.y;

    case "S":
      return attacker.y < defender.y;

    case "E":
      return attacker.x < defender.x;

    case "W":
      return attacker.x > defender.x;

    default:
      return false;
  }
};


export default function App() {
  const [units, setUnits] = useState(createUnits());
  const [selected, setSelected] = useState(null);
  const [turn, setTurn] = useState(0);
  const [attackMode, setAttackMode] = useState(false);
  const [combatLog, setCombatLog] = useState([]);
  const [showRules, setShowRules] = useState(false);

  const currentPlayer = turn % 2;

  const getUnit = (x, y) => units.find((u) => u.x === x && u.y === y);

  const canMove = (unit, x, y) => {
    const dx = Math.abs(unit.x - x);
    const dy = Math.abs(unit.y - y);
    const dist = dx + dy;

    return dist <= unit.moveLeft && !getUnit(x, y);
  };

  const handleClick = (x, y) => {
    const unit = getUnit(x, y);

    // ATTACK MODE
    if (attackMode) {
      const sel = units.find((u) => u.id === selected);

      if (!sel || sel.hasAttacked) return;

      const dx = Math.abs(sel.x - x);
      const dy = Math.abs(sel.y - y);
      const dist = dx + dy;

      if (dist <= sel.stats.range) {
        let logs = [];

        if (unit && unit.owner !== currentPlayer) {
          let atk = roll();
          let def = roll();

          // Type advantage
          const atkBonus = getCombatBonus(sel, unit);
          let defBonus = getCombatBonus(unit, sel);

          // Archer defense weakness (except vs other archers)
          if (unit.type === "archer" && sel.type !== "archer") {
            defBonus -= 6;
            logs.push(`Archer weakness! ${unit.type} gets -6 defense`);
          }

          atk += atkBonus;
          def += defBonus;

          if (atkBonus !== 0) {
            logs.push(
              `${sel.type} combat modifier: ${atkBonus > 0 ? "+" : ""}${atkBonus}`,
            );
          }

          if (defBonus !== 0) {
            logs.push(
              `${unit.type} combat modifier: ${defBonus > 0 ? "+" : ""}${defBonus}`,
            );
          }

          // Back attack
          if (isBehindAttack(sel, unit)) {
            def -= 6;

            logs.push(`Back attack! Enemy ${unit.type} gets -6 defense`);
          }

          logs.push(`Your ${sel.type} roll a ${atk}`);
          logs.push(`Enemy ${unit.type} roll a ${def}`);

          if (atk > def) {
            logs.push(`Your roll is higher. Enemy ${unit.type} dies`);

            setUnits((prev) => prev.filter((u) => u.id !== unit.id));
          } else {
            logs.push(`Enemy defends successfully`);
          }
        }

        setCombatLog(logs);

        sel.attack();

        setAttackMode(false);
        setSelected(null);
      }

      return;
    }

    // MOVEMENT
    if (selected !== null) {
      const sel = units.find((u) => u.id === selected);

      if (!sel) return;

      if (!unit && canMove(sel, x, y)) {
        const dx = Math.abs(sel.x - x);
        const dy = Math.abs(sel.y - y);
        const cost = dx + dy;

        sel.moveTo(x, y, cost);

        setUnits([...units]);
      }
    } else if (unit && unit.owner === currentPlayer) {
      setSelected(unit.id);
    }
  };

  const endTurn = () => {
    units.forEach((u) => u.resetTurn());

    setUnits([...units]);

    setSelected(null);
    setAttackMode(false);

    setTurn((t) => t + 1);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <div style={{ display: "flex", gap: 20, padding: 20 }}>
        <Board
          units={units}
          selected={selected}
          currentPlayer={currentPlayer}
          attackMode={attackMode}
          onCellClick={handleClick}
        />

        <div>
          <button
            onClick={() => setShowRules(true)}
            style={{
              position: "fixed",
              top: 10,
              right: 10,
              padding: "8px 12px",
              backgroundColor: "#facc15",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: "bold",
              zIndex: 10000,
            }}
          >
            Rules
          </button>

          <button onClick={endTurn}>End Turn</button>

          <br />
          <br />

          <button
            disabled={selected === null}
            onClick={() => {
              const unit = units.find((u) => u.id === selected);

              if (!unit) return;

              const newFacing = rotateClockwise(unit.facing);

              if (unit.rotate(newFacing)) {
                setUnits([...units]);
              }
            }}
          >
            Rotate
          </button>

          <br />
          <br />

          <button
            disabled={
              selected === null ||
              units.find((u) => u.id === selected)?.hasAttacked
            }
            onClick={() => {
              const unit = units.find((u) => u.id === selected);

              if (!unit || unit.hasAttacked) return;

              // Toggle attack mode
              if (!attackMode) {
                unit.savedMoveLeft = unit.moveLeft;
                unit.moveLeft = 0;
                setAttackMode(true);
              } else {
                unit.moveLeft = unit.savedMoveLeft ?? unit.moveLeft;
                setAttackMode(false);
              }

              setUnits([...units]);
            }}
          >
            {attackMode ? "Cancel Attack" : "Attack"}
          </button>

          <br />
          <br />

          <button
            disabled={
              selected === null ||
              (() => {
                const u = units.find((u) => u.id === selected);
                return !u || (u.moveLeft === 0 && u.hasAttacked);
              })()
            }
            onClick={() => {
              const unit = units.find((u) => u.id === selected);

              if (!unit) return;

              unit.moveLeft = 0;
              unit.hasAttacked = true;

              setAttackMode(false);
              setSelected(null);

              setUnits([...units]);
            }}
          >
            End Unit Turn
          </button>

          <p>
            Turn: {turn} | Player {currentPlayer}
          </p>
        </div>

        <div
          style={{
            position: "fixed",
            bottom: 10,
            right: 10,
            width: 220,
            minHeight: 80,
            backgroundColor: "#111",
            color: "white",
            padding: 10,
            borderRadius: 8,
            fontSize: 12,
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          }}
        >
          <strong>Combat Log</strong>

          <div style={{ marginTop: 5 }}>
            {combatLog.length === 0 ? (
              <div>No actions yet</div>
            ) : (
              combatLog.map((line, i) => <div key={i}>{line}</div>)
            )}
          </div>
        </div>
      </div>
      <RulePopUp open={showRules} onClose={() => setShowRules(false)} />
    </div>
  );
}
