import React, { useState } from "react";
import Board from "./ui/Board";
import { Unit } from "./engine/Unit";

const createUnits = () => {
  const units = [];
  let id = 0;

  for (let i = 0; i < 16; i++) {
    const types = ["swordsman", "spearman", "archer", "cavalry"];
    const type = types[i % 4];

    units.push(new Unit({ id: id++, owner: 0, type, x: i % 8, y: 8 + Math.floor(i / 8), facing: "N" }));
    units.push(new Unit({ id: id++, owner: 1, type, x: i % 8, y: Math.floor(i / 8), facing: "S" }));
  }

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

export default function App() {
  const [units, setUnits] = useState(createUnits());
  const [selected, setSelected] = useState(null);
  const [turn, setTurn] = useState(0);
  const [attackMode, setAttackMode] = useState(false);

  const currentPlayer = turn % 2;

  const getUnit = (x, y) => units.find(u => u.x === x && u.y === y);

  const canMove = (unit, x, y) => {
    const dx = Math.abs(unit.x - x);
    const dy = Math.abs(unit.y - y);
    const dist = dx + dy;
    return dist <= unit.moveLeft && !getUnit(x, y);
  };

  const handleClick = (x, y) => {
    const unit = getUnit(x, y);

    if (attackMode) {
      const sel = units.find(u => u.id === selected);
      if (!sel) return;

      const dx = Math.abs(sel.x - x);
      const dy = Math.abs(sel.y - y);
      const dist = dx + dy;

      if (dist <= sel.stats.range) {
        if (unit && unit.owner !== currentPlayer) {
          const atk = roll();
          const def = roll();

          if (atk > def) {
            setUnits(prev => prev.filter(u => u.id !== unit.id));
          }
        }

        setAttackMode(false);
        setSelected(null);
      }
      return;
    }

    if (selected !== null) {
      const sel = units.find(u => u.id === selected);
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
    units.forEach(u => u.resetTurn());
    setUnits([...units]);
    setSelected(null);
    setAttackMode(false);
    setTurn(t => t + 1);
  };

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <Board
        units={units}
        selected={selected}
        currentPlayer={currentPlayer}
        attackMode={attackMode}
        onCellClick={handleClick}
      />

      <div>
        <button onClick={endTurn}>End Turn</button>

        <br /><br />

        <button
          disabled={selected === null}
          onClick={() => {
            const unit = units.find(u => u.id === selected);
            if (!unit) return;

            const newFacing = rotateClockwise(unit.facing);
            if (unit.rotate(newFacing)) {
              setUnits([...units]);
            }
          }}
        >
          Rotate
        </button>

        <br /><br />

        <button
          disabled={selected === null}
          onClick={() => {
            const unit = units.find(u => u.id === selected);
            if (!unit) return;

            unit.moveLeft = 0;
            setAttackMode(true);
            setUnits([...units]);
          }}
        >
          Attack
        </button>

        <p>Turn: {turn} | Player {currentPlayer}</p>
      </div>
    </div>
  );
}