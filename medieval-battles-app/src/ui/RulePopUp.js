import React from "react";

export default function RulePopUp({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 60,
        right: 20,
        width: 320,
        backgroundColor: "#facc15",
        color: "#111",
        padding: 15,
        borderRadius: 10,
        boxShadow: "0 0 15px rgba(0,0,0,0.4)",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <strong>Rules</strong>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "#111",
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      </div>
      <div style={{ fontSize: 12, lineHeight: 1.5 }}>
        <p>• Move by selecting a unit and clicking a tile</p>
        <p>• Attack uses dice roll comparison</p>
        <p>• Back attacks give -6 defense penalty</p>
        <p>• Archers take -6 defense vs non-archers</p>
        <p>• Spearmen {">"} Cavalry (+2)</p>
        <p>• Swordsmen {">"} Spearmen (+2)</p>
        <p>• Swordsmen {">"} Cavalry (+1)</p>
        <p>• Swordsmen {">"} Archers (+1)</p>
        <p>• Attack toggles movement lock</p>
        <p>• Archers must reload after attacking (skip 1 turn)</p>
      </div>
    </div>
  );
}
