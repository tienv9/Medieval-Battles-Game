import React from "react";

export default function ControlPanel({
  selectedUnit,
  attackMode,
  turn,
  currentPlayer,
  onEndTurn,
  onRotate,
  onToggleAttack,
  onEndUnitTurn,
  onShowRules,
}) {
  const unitExhausted = selectedUnit && selectedUnit.moveLeft === 0 && selectedUnit.hasAttacked;

  return (
    <div>
      <button
        onClick={onShowRules}
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

      <button onClick={onEndTurn}>End Turn</button>

      <br />
      <br />

      <button disabled={!selectedUnit} onClick={onRotate}>
        Rotate
      </button>

      <br />
      <br />

      <button
        disabled={!selectedUnit || (selectedUnit && selectedUnit.hasAttacked)}
        onClick={onToggleAttack}
      >
        {attackMode ? "Cancel Attack" : "Attack"}
      </button>

      <br />
      <br />

      <button disabled={!selectedUnit || unitExhausted} onClick={onEndUnitTurn}>
        End Unit Turn
      </button>

      <p>
        Turn: {turn} | Player {currentPlayer}
      </p>
    </div>
  );
}
