import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  { time: "10:00 AM", temp: 22 },
  { time: "10:30 AM", temp: 24 },
  { time: "11:00 AM", temp: 23 },
];

const SensorChart = () => {
  return (
    <LineChart width={400} height={300} data={data}>
      <XAxis dataKey="time" />
      <YAxis />
      <CartesianGrid stroke="#eee" />
      <Tooltip />
      <Line type="monotone" dataKey="temp" stroke="#8884d8" />
    </LineChart>
  );
};

export default SensorChart;
