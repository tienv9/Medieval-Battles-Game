import React from "react";
import Box from "../engine/Box";

const SIZE = 10;

export default function Board({ units, selected, currentPlayer, onCellClick, onRotate }) {
  const getUnit = (x, y) => units.find(u => u.x === x && u.y === y);

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
              isSelected={selected === unit?.id}
              onClick={() => onCellClick(x, y)}
              onRotate={(u) => onRotate(u)}
            />
          );
        })
      )}
    </div>
  );
}