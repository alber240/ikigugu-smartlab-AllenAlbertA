import React, { useState, useEffect } from "react";
import mqtt from "mqtt";
import Navbar from "./components/Navbar";
import SensorCard from "./components/SensorCard";
import StatusIndicator from "./components/StatusIndicator";
import SensorChart from "./components/SensorChart";
import DeviceControl from "./components/DeviceControl";
import { Container, Grid } from "@mui/material";
import { db, ref, set, onValue } from "./firebase"; // ✅ Firebase added correctly
import { db, ref, onValue } from "./firebase"; 
import { useState, useEffect } from "react";

const fetchSensorData = (setSensorData) => {
  Object.keys(TOPICS).forEach((topic) => {
    const sensorRef = ref(db, `sensors/${topic}`);
    onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        setSensorData((prev) => ({
          ...prev,
          [topic]: snapshot.val().value,
        }));
        console.log("✅ Data retrieved from Firebase:", topic, snapshot.val().value);
      }
    }, (error) => {
      console.error("⚠️ Error retrieving data:", error);
    });
  });
};

useEffect(() => {
  fetchSensorData(setSensorData);
}, []);

const MQTT_BROKER = "mqtt://localhost:1883";
const TOPICS = {
  temperature: "smartlab/temperature",
  humidity: "smartlab/humidity",
  device1: "smartlab/device1",
  device2: "smartlab/device2",
  device3: "smartlab/device3",
  device4: "smartlab/device4",
};

const Dashboard = () => {
  const [sensorData, setSensorData] = useState({
    temperature: null,
    humidity: null,
    device1: false,
    device2: false,
    device3: false,
    device4: false,
  });

  const [isConnected, setIsConnected] = useState(false);

  // ✅ Store MQTT sensor data in Firebase
  const saveSensorData = (topic, value) => {
    set(ref(db, `sensors/${topic}`), {
      value,
      timestamp: Date.now(),
    }).then(() => {
      console.log("✅ Data saved to Firebase:", topic, value);
    }).catch((error) => {
      console.error("⚠️ Error saving data to Firebase:", error);
    });
  };

  useEffect(() => {
    const client = mqtt.connect(MQTT_BROKER);

    client.on("connect", () => {
      console.log("✅ Connected to MQTT Broker");
      setIsConnected(true);
      Object.values(TOPICS).forEach((topic) => client.subscribe(topic));
    });

    client.on("message", (topic, message) => {
      const value = message.toString();
      saveSensorData(topic, value); // ✅ Store MQTT sensor data in Firebase

      setSensorData((prev) => ({
        ...prev,
        [topic]: topic.includes("device") ? value === "on" : parseFloat(value),
      }));
    });

    client.on("error", (error) => {
      console.error("⚠️ MQTT Connection Error:", error);
      setIsConnected(false);
      setTimeout(() => client.reconnect(), 5000);
    });

    client.on("close", () => {
      console.warn("🔌 MQTT Disconnected! Reconnecting...");
      setIsConnected(false);
      setTimeout(() => client.reconnect(), 5000);
    });

    return () => {
      client.end();
    };
  }, []);

  // ✅ Fetch data from Firebase in real-time
  useEffect(() => {
    Object.keys(TOPICS).forEach((topic) => {
      const sensorRef = ref(db, `sensors/${topic}`);
      onValue(sensorRef, (snapshot) => {
        if (snapshot.exists()) {
          setSensorData((prev) => ({
            ...prev,
            [topic]: snapshot.val().value,
          }));
        }
      });
    });
  }, []);

  return (
    <Container>
      <Navbar />
      {isConnected ? (
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} md={6}>
            {sensorData.temperature !== null ? (
              <SensorCard title="Temperature" value={sensorData.temperature.toFixed(1)} unit="°C" />
            ) : (
              <p>⏳ Waiting for temperature data...</p>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {sensorData.humidity !== null ? (
              <SensorCard title="Humidity" value={sensorData.humidity.toFixed(1)} unit="%" />
            ) : (
              <p>⏳ Waiting for humidity data...</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <StatusIndicator title="Device 1" isOnline={sensorData.device1} />
            <StatusIndicator title="Device 2" isOnline={sensorData.device2} />
            <StatusIndicator title="Device 3" isOnline={sensorData.device3} />
            <StatusIndicator title="Device 4" isOnline={sensorData.device4} />
          </Grid>
          <Grid item xs={12}>
            <SensorChart />
          </Grid>
          <Grid item xs={12}>
            <DeviceControl />
          </Grid>
        </Grid>
      ) : (
        <p style={{ textAlign: "center", fontSize: "18px", color: "red" }}>🔴 MQTT Disconnected! Attempting to reconnect...</p>
      )}
    </Container>
  );
};

export default Dashboard;
