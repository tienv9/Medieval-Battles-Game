import React from "react";

import arrow from "../icons/arrow.svg";
import sword from "../icons/sword.svg";
import spear from "../icons/spear.svg";
import horse from "../icons/horse.svg";

const iconMap = {
  archer: arrow,
  swordsman: sword,
  spearman: spear,
  cavalry: horse,
};

export default function Box({ unit, currentPlayer, onClick, onRotate }) {
  const getColor = () => {
    if (!unit) return "white";

    if (unit.owner !== currentPlayer) return "white";

    if (!unit.hasMoved) return "#4ade80"; // green
    if (unit.hasMoved && !unit.hasRotated) return "#facc15"; // yellow
    if (unit.hasMoved && unit.hasRotated) return "#9ca3af"; // gray

    return "white";
  };

  return (
    <div
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        if (unit) onRotate(unit);
      }}
      style={{
        width: 40,
        height: 40,
        border: "1px solid black",
        backgroundColor: getColor(),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      {unit && (
        <img
          src={iconMap[unit.type]}
          alt={unit.type}
          style={{
            width: "70%",
            height: "70%",
            objectFit: "contain",
          }}
        />
      )}
    </div>
  );
}
