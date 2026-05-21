import React from "react";

export default function CombatLog({ logs }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 10,
        right: 10,
        width: 220,
        minHeight: 80,
        backgroundColor: "#111",
        color: "white",
        padding: 10,
        borderRadius: 8,
        fontSize: 12,
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      }}
    >
      <strong>Combat Log</strong>
      <div style={{ marginTop: 5 }}>
        {logs.length === 0 ? (
          <div>No actions yet</div>
        ) : (
          logs.map((line, i) => <div key={i}>{line}</div>)
        )}
      </div>
    </div>
  );
}
