// Purpose: Header with parameters (GameId, Batch) + Submit / Save / Cancel

import React from "react";

export default function DataFormHeader({
  gameId,
  gameBatch,
  batchList = [],
  onChange,
  onSubmit
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "12px",
        marginBottom: "16px",
        borderBottom: "1px solid #ccc",
        paddingBottom: "10px"
      }}
    >
      {/* Game Id */}
      <div>
        <label style={{ fontSize: "12px" }}>Game Id</label>
        <input value={gameId} disabled style={{ height: "28px" }} />
      </div>

      {/* Batch */}
      <div>
        <label style={{ fontSize: "12px" }}>Game Batch</label>
        <select
          value={gameBatch}
          onChange={(e) => onChange("gameBatch", e.target.value)}
          style={{ height: "28px" }}
        >
          <option value="">Select</option>
          {batchList.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <button
        onClick={onSubmit}
        style={{
          height: "32px",
          minWidth: "80px",
          cursor: "pointer"
        }}
      >
        Submit
      </button>
    </div>
  );
}