import React from "react";
import Box from "../engine/Box";

const SIZE = 10;

export default function Board({
  units,
  selected,
  currentPlayer,
  onCellClick,
  onRotate
}) {
  const getUnit = (x, y) => units.find(u => u.x === x && u.y === y);

  const getValidMoves = () => {
    if (!selected) return [];

    const sel = units.find(u => u.id === selected);
    if (!sel) return [];

    const moves = [];

    for (let x = 0; x < SIZE; x++) {
      for (let y = 0; y < SIZE; y++) {
        const dx = Math.abs(sel.x - x);
        const dy = Math.abs(sel.y - y);
        const dist = dx + dy;

        if (dist <= sel.moveLeft && !getUnit(x, y)) {
          moves.push({ x, y });
        }
      }
    }

    return moves;
  };

  const validMoves = getValidMoves();

  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${SIZE}, 40px)` }}>
      {Array.from({ length: SIZE }).map((_, y) =>
        Array.from({ length: SIZE }).map((_, x) => {
          const unit = getUnit(x, y);

          return (
            <Box
              key={`${x}-${y}`}
              unit={unit}
              currentPlayer={currentPlayer}
              isMoveTarget={validMoves.some(m => m.x === x && m.y === y)}
              onClick={() => onCellClick(x, y)}
              onRotate={(u) => onRotate(u)}
            />
          );
        })
      )}
    </div>
  );
}