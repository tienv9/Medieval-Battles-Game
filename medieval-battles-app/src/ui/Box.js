import React from "react";
import arrow from "../icons/arrow.svg";
import sword from "../icons/sword.svg";
import spear from "../icons/spear.svg";
import horse from "../icons/horse.svg";
import reload from "../icons/reload.svg";

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

export default function Box({ unit, currentPlayer, onClick, isMoveTarget, isAttackTarget, isSelected }) {
  const getColor = () => {
    if (!unit) return "#f8f9fa";
    if (unit.owner !== currentPlayer) return "#f8f9fa";
    if (unit.moveLeft > 0) return "#4ade80";
    if (!unit.hasAttacked) return "#facc15";
    return "#adb5bd";
  };

  return (
    <div
      onClick={onClick}
      style={{
        width: 44,
        height: 44,
        border: "1px solid #dee2e6",
        backgroundColor: getColor(),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        cursor: "pointer",
        boxSizing: "border-box",
      }}
    >
      {isSelected && (
        <div
          style={{
            width: 20,
            height: 20,
            backgroundColor: "#cc5de8",
            borderRadius: "50%",
            position: "absolute",
            opacity: 0.85,
          }}
        />
      )}
      {isMoveTarget && (
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor: "#2f9e44",
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
            backgroundColor: "#e03131",
            borderRadius: "50%",
            position: "absolute",
            opacity: 0.75,
          }}
        />
      )}
      {unit && (
        <>
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
          {unit.reloadTurnsLeft > 0 && (
            <img
              src={reload}
              alt="reloading"
              style={{
                position: "absolute",
                width: "55%",
                height: "55%",
                objectFit: "contain",
                opacity: 0.85,
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
