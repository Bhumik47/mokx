import { format } from "date-fns";
import React from "react";

function CustomMessage({ model }) {
  const isOutgoing = model.direction === "outgoing";

  const messageStyle = {
    background: isOutgoing ? "#fbbc04" : "#69235b",
    padding: "10px",
    borderRadius: "12px",
    borderTopLeftRadius: isOutgoing ? "12px" : "0px",
    borderTopRightRadius: isOutgoing ? "0px" : "12px",
    margin: "0 0 10px", // Move margin setting here
    wordWrap: "break-word",
    maxWidth: "70%",
  };

  const textStyle = {
    color: "#fff",
    fontFamily: "Inter",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "16px",
    letterSpacing: "0.12px",
    flexShrink: 0,
  };

  const containerStyle = {
    display: "flex",
    alignItems: "flex-start", // Align items to the top of the container
    justifyContent: isOutgoing ? "flex-end" : "flex-start", // Align outgoing messages to the right, incoming messages to the left
  };

  const profilePhotoStyle = {
    width: "40px",
    height: "40px",
    flexShrink: 0,
    borderRadius: "50%",
    marginRight: "10px",
    marginLeft: "10px", // Add margin to the profile photo to separate it from the message content
  };

  const formatTimestamp = (timestamp) => {
    return format(timestamp, "hh:mm a"); // Example format: "02:30 PM"
  };

  return (
    <div
      className={`message ${isOutgoing ? "outgoing" : "incoming"}`}
      style={containerStyle}
    >
      {model.direction === "incoming" && model.profilePhoto && (
        <img
          className="profile-photo"
          src={model.profilePhoto}
          alt="Arya"
          style={profilePhotoStyle}
        />
      )}
      <div className="message-content" style={messageStyle}>
        <div className="message-text" style={textStyle}>
          {model.message}
        </div>
        {/* Display timestamp for outgoing messages */}
        {isOutgoing && (
          <div style={{ fontSize: "10px", marginTop: "5px" }}>
            {formatTimestamp(new Date())}
          </div>
        )}
      </div>
      {/* Display timestamp for incoming messages */}
      {!isOutgoing && (
        <div style={{ fontSize: "10px", marginLeft: "5px" }}>
          {formatTimestamp(new Date())}
        </div>
      )}
    </div>
  );
}

export default CustomMessage;
