import React from "react";
<<<<<<< HEAD
import { Chip } from "@mui/material";

const StatusIndicator = ({ isOnline }) => {
  return (
    <Chip
      label={isOnline ? "Online" : "Offline"}
      color={isOnline ? "success" : "error"}
      variant="outlined"
    />
=======

const StatusIndicator = ({ title, isOnline }) => {
  return (
    <div style={{ textAlign: "center", padding: "10px", fontSize: "18px", color: isOnline ? "green" : "red" }}>
      <h2>{title}: {isOnline ? "Online 🟢" : "Offline 🔴"}</h2>
    </div>
>>>>>>> day-2-branch
  );
};

export default StatusIndicator;
