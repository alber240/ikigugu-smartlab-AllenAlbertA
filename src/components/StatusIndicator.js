import React from "react";

const StatusIndicator = ({ title, isOnline }) => {
  return (
    <div style={{ textAlign: "center", padding: "10px", fontSize: "18px", color: isOnline ? "green" : "red" }}>
      <h2>{title}: {isOnline ? "Online 🟢" : "Offline 🔴"}</h2>
    </div>
  );
};

export default StatusIndicator;
