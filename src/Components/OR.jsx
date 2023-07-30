import React from "react";

function OR({ color, opacity }) {
  return (
    <div className="or-line">
      <hr style={{ opacity: opacity }} />
      <p style={{ color: color }}>OR</p>
      <hr style={{ opacity: opacity }} />
    </div>
  );
}

export default OR;
