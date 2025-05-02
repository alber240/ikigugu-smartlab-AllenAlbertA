import React from "react";
<<<<<<< HEAD
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
=======

const SensorChart = () => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "5px", textAlign: "center" }}>
      <h2>Sensor Data Visualization 📊</h2>
      <p>Graph coming soon...</p>
    </div>
>>>>>>> day-2-branch
  );
};

export default SensorChart;
<<<<<<< HEAD
=======
 
>>>>>>> day-2-branch
