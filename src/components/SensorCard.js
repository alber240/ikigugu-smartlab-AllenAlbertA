import React from "react";
<<<<<<< HEAD
import { Card, CardContent, Typography } from "@mui/material";

const SensorCard = ({ title, value, unit }) => {
  return (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="h4">{value} {unit}</Typography>
      </CardContent>
    </Card>
=======

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
>>>>>>> day-2-branch
  );
};

export default SensorCard;
