import React from "react";

function Button({ title, func }) {
  return (
    <div className="button">
      <button type="submit" onClick={func}>{title}</button>
    </div>
  );
}

export default Button;
