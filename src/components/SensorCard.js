import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const SensorCard = ({ title, value, unit }) => {
  return (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="h4">{value} {unit}</Typography>
      </CardContent>
    </Card>
  );
};

export default SensorCard;
