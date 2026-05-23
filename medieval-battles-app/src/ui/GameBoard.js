import React from "react";
import { Paper } from "@mantine/core";
import Box from "./Box";
import { isInFront } from "../utils/CombatUtils";

const SIZE = 10;

export default function Board({ units, selected, currentPlayer, attackMode, onCellClick }) {
  const getUnit = (x, y) => units.find((u) => u.x === x && u.y === y);
  const getSelectedUnit = () => units.find((u) => u.id === selected);

  const getValidMoves = () => {
    const sel = getSelectedUnit();
    if (!sel || attackMode) return [];

    const moves = [];
    for (let x = 0; x < SIZE; x++) {
      for (let y = 0; y < SIZE; y++) {
        const dx = Math.abs(sel.x - x);
        const dy = Math.abs(sel.y - y);
        if (dx + dy <= sel.moveLeft && !getUnit(x, y)) {
          moves.push({ x, y });
        }
      }
    }
    return moves;
  };

  const getAttackTiles = () => {
    const sel = getSelectedUnit();
    if (!sel || !attackMode) return [];

    const tiles = [];
    for (let x = 0; x < SIZE; x++) {
      for (let y = 0; y < SIZE; y++) {
        const dx = Math.abs(sel.x - x);
        const dy = Math.abs(sel.y - y);
        const dist = dx + dy;
        const unitOnTile = getUnit(x, y);
        if (dist > 0 && dist <= sel.stats.range && isInFront(sel, { x, y }) && (!unitOnTile || unitOnTile.owner !== sel.owner)) {
          tiles.push({ x, y });
        }
      }
    }
    return tiles;
  };

  const validMoves = getValidMoves();
  const attackTiles = getAttackTiles();

  return (
    <Paper shadow="md" withBorder p={4} style={{ display: "inline-block" }}>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${SIZE}, 44px)` }}>
        {Array.from({ length: SIZE }).map((_, y) =>
          Array.from({ length: SIZE }).map((_, x) => {
            const unit = getUnit(x, y);
            return (
              <Box
                key={`${x}-${y}`}
                unit={unit}
                currentPlayer={currentPlayer}
                isSelected={!!(unit && unit.id === selected)}
                isMoveTarget={validMoves.some((m) => m.x === x && m.y === y)}
                isAttackTarget={attackTiles.some((t) => t.x === x && t.y === y)}
                onClick={() => onCellClick(x, y)}
              />
            );
          })
        )}
      </div>
    </Paper>
  );
}
