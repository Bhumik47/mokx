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
    maxWidth: "15rem",
    position: "relative", // Add relative positioning
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
     margin: "0 0 10px",
  };

  const profilePhotoStyle = {
    width: "40px",
    height: "40px",
    flexShrink: 0,
    borderRadius: "50%",
    marginRight: "10px",
    marginLeft: "10px", // Add margin to the profile photo to separate it from the message content
  };

  const timestampStyle = {
    color: "#797C7B",
fontFamily: "Inter",

fontStyle: "normal",
fontWeight: "100",
lineHeight: "10px",
  fontSize: "10px",
  position: "absolute",
  bottom: "-8px",
  left: isOutgoing ? "auto" : "0",
  right: isOutgoing ? "0" : "auto",
  whiteSpace: "nowrap", // Prevent timestamp from wrapping to the next line
  overflow: "hidden",   // Hide any overflowed content (if any)
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
      <div style={{ position: "relative", maxWidth: "100%", margin:"0 0 30px" }}>
        <div className="message-content" style={messageStyle}>
          <div className="message-text" style={textStyle}>
            {model.message}
          </div>
        </div>
        {/* Display timestamp for outgoing messages */}
        {isOutgoing && <div style={timestampStyle}>{formatTimestamp(new Date())}</div>}
        {/* Display timestamp for incoming messages */}
        {!isOutgoing && <div style={timestampStyle}>{formatTimestamp(new Date())}</div>}
      </div>
    </div>
  );
}

export default CustomMessage;
