import React from "react";

function Button({ title }) {
  return (
    <div className="button">
      <button type="submit">{title}</button>
    </div>
  );
}

export default Button;
