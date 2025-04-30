import React from "react";

const SensorCard = ({ title, value, unit }) => {
  return (
    <div style={{
      border: "2px solid #007BFF",
      padding: "15px",
      borderRadius: "8px",
      textAlign: "center",
      background: "#f4f4f4"
    }}>
      <h2>{title}</h2>
      <p style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>
        {value} {unit}
      </p>
    </div>
  );
};

export default SensorCard;
