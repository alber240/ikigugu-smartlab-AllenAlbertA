import React, { useState, useEffect } from "react";
import mqtt from "mqtt";
import Navbar from "./components/Navbar";
import SensorCard from "./components/SensorCard";
import StatusIndicator from "./components/StatusIndicator";
import SensorChart from "./components/SensorChart";
import DeviceControl from "./components/DeviceControl";
import { Container, Grid } from "@mui/material";
import { db, ref, set, onValue } from "./firebase";

const MQTT_BROKER = "ws://localhost:9001";// ✅ WebSocket-compatible port
const TOPICS = {
  temperature: "smartlab/temperature",
  humidity: "smartlab/humidity",
  device1: "smartlab/device1",
  device2: "smartlab/device2",
  device3: "smartlab/device3",
  device4: "smartlab/device4",
};

const Dashboard = () => {
  const [sensorData, setSensorData] = useState({});
  const [isConnected, setIsConnected] = useState(false);

  // ✅ Store MQTT sensor data in Firebase
  const saveSensorData = (topic, value) => {
    set(ref(db, `sensors/${topic}`), {
      value: topic.includes("device") ? value === "on" : parseFloat(value),
      timestamp: Date.now(),
    }).catch((error) => console.error("⚠️ Firebase Write Error:", error));
  };

  // ✅ Connect to MQTT Broker
  useEffect(() => {
    const client = mqtt.connect(MQTT_BROKER);

    client.on("connect", () => {
      console.log("✅ Connected to MQTT Broker");
      setIsConnected(true);
      Object.values(TOPICS).forEach(client.subscribe);
    });

    client.on("message", (topic, message) => {
      const value = message.toString();
      saveSensorData(topic, value);
      setSensorData((prev) => ({
        ...prev,
        [topic]: topic.includes("device") ? value === "on" : parseFloat(value),
      }));
    });

    client.on("error", (error) => {
      console.error("⚠️ MQTT Connection Error:", error);
      setIsConnected(false);
      setTimeout(client.reconnect, 5000);
    });

    client.on("close", () => {
      console.warn("🔌 MQTT Disconnected! Reconnecting...");
      setIsConnected(false);
      setTimeout(client.reconnect, 5000);
    });

    return () => client.end();
  }, []);

  // ✅ Fetch sensor data from Firebase
  useEffect(() => {
    Object.keys(TOPICS).forEach((topic) => {
      const sensorRef = ref(db, `sensors/${topic}`);
      onValue(sensorRef, (snapshot) => {
        if (snapshot.exists()) {
          setSensorData((prev) => ({ ...prev, [topic]: snapshot.val().value }));
        }
      });
    });
  }, []);

  // ✅ Fetch data from backend API
  useEffect(() => {
    fetch("http://localhost:3001/sensors")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Sensor Data from Backend:", data);
        setSensorData((prev) => ({ ...prev, ...data }));
      })
      .catch((error) => console.error("⚠️ Fetch Error:", error));
  }, []);

  return (
    <Container>
      <Navbar />
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {["temperature", "humidity"].map((sensor) => (
          <Grid item xs={12} md={6} key={sensor}>
            {sensorData[sensor] !== undefined ? (
              <SensorCard
                title={sensor.charAt(0).toUpperCase() + sensor.slice(1)}
                value={sensorData[sensor].toFixed(1)}
                unit={sensor === "temperature" ? "°C" : "%"}
              />
            ) : (
              <p>⏳ Waiting for {sensor} data...</p>
            )}
          </Grid>
        ))}
        <Grid item xs={12}>
          {["device1", "device2", "device3", "device4"].map((device) => (
            <StatusIndicator key={device} title={device.replace("device", "Device ")} isOnline={sensorData[device]} />
          ))}
        </Grid>
        <Grid item xs={12}>
          <SensorChart />
        </Grid>
        <Grid item xs={12}>
          <DeviceControl />
        </Grid>
      </Grid>
      {!isConnected && (
        <p style={{ textAlign: "center", fontSize: "18px", color: "red" }}>🔴 MQTT Disconnected! Attempting to reconnect...</p>
      )}
    </Container>
  );
};

export default Dashboard;
