import React from "react";
import { Chip } from "@mui/material";

const StatusIndicator = ({ isOnline }) => {
  return (
    <Chip
      label={isOnline ? "Online" : "Offline"}
      color={isOnline ? "success" : "error"}
      variant="outlined"
    />
  );
};

export default StatusIndicator;
