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

const rotationMap = {
  N: "0deg",
  E: "90deg",
  S: "180deg",
  W: "270deg",
};

export default function Box({
  unit,
  currentPlayer,
  onClick,
  isMoveTarget,
  isAttackTarget
}) {
  const getColor = () => {
    if (!unit) return "white";
    if (unit.owner !== currentPlayer) return "white";

    if (unit.moveLeft > 0) return "#4ade80";
    if (unit.moveLeft === 0 && !unit.hasRotated) return "#facc15";
    if (unit.moveLeft === 0 && unit.hasRotated) return "#9ca3af";

    return "white";
  };

  return (
    <div
      onClick={onClick}
      style={{
        width: 40,
        height: 40,
        border: "1px solid black",
        backgroundColor: getColor(),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        cursor: "pointer",
      }}
    >
      {isMoveTarget && (
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor: "green",
            borderRadius: "50%",
            position: "absolute",
          }}
        />
      )}

      {isAttackTarget && (
        <div
          style={{
            width: 12,
            height: 12,
            backgroundColor: "red",
            borderRadius: "50%",
            position: "absolute",
            opacity: 0.7,
          }}
        />
      )}

      {unit && (
        <img
          src={iconMap[unit.type]}
          alt={unit.type}
          style={{
            width: "70%",
            height: "70%",
            objectFit: "contain",
            transform: `rotate(${rotationMap[unit.facing]})`,
          }}
        />
      )}
    </div>
  );
}