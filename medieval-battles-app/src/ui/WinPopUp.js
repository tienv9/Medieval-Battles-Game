import React from "react";

export default function WinPopUp({ winner }) {
  if (winner === null) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 20000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: "48px 56px",
          textAlign: "center",
          boxShadow: "0 0 30px rgba(0,0,0,0.5)",
        }}
      >
        <h2 style={{ margin: "0 0 24px", fontSize: 28 }}>
          Player {winner + 1} Wins!
        </h2>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: "10px 28px",
            backgroundColor: "#facc15",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
