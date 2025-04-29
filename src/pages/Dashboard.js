import React, { useState, useEffect } from "react";
import mqtt from "mqtt";
import Navbar from "../components/Navbar";
import SensorCard from "../components/SensorCard";
import StatusIndicator from "../components/StatusIndicator";
import SensorChart from "../components/SensorChart";
import { Container, Grid } from "@mui/material";

const MQTT_BROKER = "mqtt://localhost:1883"; // Local broker
const TOPICS = {
  temperature: "smartlab/temperature",
  humidity: "smartlab/humidity",
  status: "smartlab/status",
};

const Dashboard = () => {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    status: false,
  });

  useEffect(() => {
    const client = mqtt.connect(MQTT_BROKER);

    client.on("connect", () => {
      console.log("✅ Connected to Local MQTT Broker!");
      Object.values(TOPICS).forEach((topic) => client.subscribe(topic));
    });

    client.on("message", (topic, message) => {
      console.log(`📩 Received message on topic ${topic}: ${message.toString()}`);
      const value = message.toString();
      setSensorData((prev) => ({
        ...prev,
        [topic.includes("temperature") ? "temperature" : topic.includes("humidity") ? "humidity" : "status"]:
          topic.includes("status") ? value === "online" : parseFloat(value),
      }));
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <Container>
      <Navbar />
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} md={6}>
          <SensorCard title="Temperature" value={sensorData.temperature.toFixed(1)} unit="°C" />
        </Grid>
        <Grid item xs={12} md={6}>
          <SensorCard title="Humidity" value={sensorData.humidity.toFixed(1)} unit="%" />
        </Grid>
        <Grid item xs={12}>
          <StatusIndicator isOnline={sensorData.status} />
        </Grid>
        <Grid item xs={12}>
          <SensorChart />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
