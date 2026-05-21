import React, { useState } from "react";
import Board from "./ui/GameBoard";
import ControlPanel from "./ui/ControlPanel";
import CombatLog from "./ui/CombatLog";
import RulePopUp from "./ui/RulePopUp";
import WinPopUp from "./ui/WinPopUp";
import { createUnits } from "./engine/setupUnits";
import { resolveCombat } from "./utils/CombatUtils";
import { rotateClockwise } from "./utils/directions";

export default function App() {
  const [units, setUnits] = useState(createUnits);
  const [selected, setSelected] = useState(null);
  const [turn, setTurn] = useState(0);
  const [attackMode, setAttackMode] = useState(false);
  const [combatLog, setCombatLog] = useState([]);
  const [showRules, setShowRules] = useState(false);
  const [winner, setWinner] = useState(null);

  const currentPlayer = turn % 2;
  const getUnit = (x, y) => units.find((u) => u.x === x && u.y === y);
  const selectedUnit = units.find((u) => u.id === selected) ?? null;

  const switchUnit = (newUnit) => {
    if (attackMode && selectedUnit) {
      selectedUnit.moveLeft = selectedUnit.savedMoveLeft ?? selectedUnit.moveLeft;
      setAttackMode(false);
    }
    setSelected(newUnit.id);
  };

  const handleClick = (x, y) => {
    const unit = getUnit(x, y);

    if (unit && unit.owner === currentPlayer && unit.id !== selected) {
      switchUnit(unit);
      return;
    }

    if (attackMode) {
      if (!selectedUnit || selectedUnit.hasAttacked) return;

      const dist = Math.abs(selectedUnit.x - x) + Math.abs(selectedUnit.y - y);
      if (dist > selectedUnit.stats.range) return;

      if (unit && unit.owner !== currentPlayer) {
        const { killed, logs } = resolveCombat(selectedUnit, unit);
        setCombatLog(logs);
        if (killed) {
          const remaining = units.filter((u) => u.id !== unit.id);
          setUnits(remaining);
          if (!remaining.some((u) => u.owner === unit.owner)) {
            setWinner(currentPlayer);
          }
        }
      } else {
        setCombatLog([]);
      }

      selectedUnit.attack();
      setAttackMode(false);
      setSelected(null);
      return;
    }

    if (selectedUnit && !unit) {
      const dx = Math.abs(selectedUnit.x - x);
      const dy = Math.abs(selectedUnit.y - y);
      const cost = dx + dy;
      if (selectedUnit.canMove(cost)) {
        selectedUnit.moveTo(x, y, cost);
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

  const handleRotate = () => {
    if (!selectedUnit) return;
    if (selectedUnit.rotate(rotateClockwise(selectedUnit.facing))) {
      setUnits([...units]);
    }
  };

  const handleToggleAttack = () => {
    if (!selectedUnit || selectedUnit.hasAttacked) return;
    if (!attackMode) {
      selectedUnit.savedMoveLeft = selectedUnit.moveLeft;
      selectedUnit.moveLeft = 0;
      setAttackMode(true);
    } else {
      selectedUnit.moveLeft = selectedUnit.savedMoveLeft ?? selectedUnit.moveLeft;
      setAttackMode(false);
    }
    setUnits([...units]);
  };

  const handleEndUnitTurn = () => {
    if (!selectedUnit) return;
    selectedUnit.moveLeft = 0;
    selectedUnit.hasAttacked = true;
    setAttackMode(false);
    setSelected(null);
    setUnits([...units]);
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
        <ControlPanel
          selectedUnit={selectedUnit}
          attackMode={attackMode}
          turn={turn}
          currentPlayer={currentPlayer}
          onEndTurn={endTurn}
          onRotate={handleRotate}
          onToggleAttack={handleToggleAttack}
          onEndUnitTurn={handleEndUnitTurn}
          onShowRules={() => setShowRules(true)}
        />
      </div>
      <button
        onClick={() => setWinner(currentPlayer)}
        style={{
          position: "fixed",
          bottom: 10,
          left: 10,
          padding: "6px 10px",
          backgroundColor: "#374151",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontSize: 11,
          opacity: 0.6,
        }}
      >
        Test Win
      </button>
      <CombatLog logs={combatLog} />
      <RulePopUp open={showRules} onClose={() => setShowRules(false)} />
      <WinPopUp winner={winner} />
    </div>
  );
}
