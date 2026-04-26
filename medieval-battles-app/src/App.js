import React, { useState } from "react";
import Board from "./ui/Board";
import { Unit } from "./engine/Unit";

const createUnits = () => {
  const units = [];
  let id = 0;

  for (let i = 0; i < 16; i++) {
    const types = ["swordsman", "spearman", "archer", "cavalry"];
    const type = types[i % 4];

    units.push(
      new Unit({
        id: id++,
        owner: 0,
        type,
        x: i % 8,
        y: 8 + Math.floor(i / 8),
        facing: "N",
      })
    );

    units.push(
      new Unit({
        id: id++,
        owner: 1,
        type,
        x: i % 8,
        y: Math.floor(i / 8),
        facing: "S",
      })
    );
  }

  return units;
};

function roll() {
  return Math.floor(Math.random() * 6) + 1;
}

export default function App() {
  const [units, setUnits] = useState(createUnits());
  const [selected, setSelected] = useState(null);
  const [turn, setTurn] = useState(0);

  const currentPlayer = turn % 2;

  const getUnit = (x, y) => units.find(u => u.x === x && u.y === y);

  const canMove = (unit, x, y) => {
    const dx = Math.abs(unit.x - x);
    const dy = Math.abs(unit.y - y);
    const dist = dx + dy;

    return dist <= unit.moveLeft && !getUnit(x, y);
  };

  const handleRotate = (unit) => {
    const success = unit.rotate(unit.facing);
    if (success) setUnits([...units]);
  };

  const handleClick = (x, y) => {
    const unit = getUnit(x, y);

    if (selected !== null) {
      const sel = units.find(u => u.id === selected);
      if (!sel) return;

      if (unit && unit.owner !== currentPlayer) {
        const atk = roll();
        const def = roll();

        if (atk > def) {
          setUnits(prev => prev.filter(u => u.id !== unit.id));
        }

        setSelected(null);
        return;
      }

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
    setTurn(t => t + 1);
  };

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <Board
        units={units}
        selected={selected}
        currentPlayer={currentPlayer}
        onCellClick={handleClick}
        onRotate={handleRotate}
      />

      <div>
        <button onClick={endTurn}>End Turn</button>
        <p>Turn: {turn} | Player {currentPlayer}</p>
      </div>
    </div>
  );
}