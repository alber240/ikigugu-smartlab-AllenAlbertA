import React, { useState, useEffect } from "react";
import mqtt from "mqtt";

const MQTT_BROKER = "mqtt://localhost:1883"; // Local MQTT broker
const TOPICS = {
  device1: "smartlab/device1",
  device2: "smartlab/device2",
  device3: "smartlab/device3",
  device4: "smartlab/device4",
};

const DeviceControl = () => {
  const [devices, setDevices] = useState({
    device1: false,
    device2: false,
    device3: false,
    device4: false,
  });

  useEffect(() => {
    const client = mqtt.connect(MQTT_BROKER);

    client.on("connect", () => {
      console.log("✅ Connected to MQTT Broker");
      Object.values(TOPICS).forEach((topic) => client.subscribe(topic));
    });

    client.on("message", (topic, message) => {
      console.log(`📩 Received message on topic ${topic}: ${message.toString()}`);
      setDevices((prev) => ({
        ...prev,
        [topic]: message.toString() === "on",
      }));
    });

    return () => {
      client.end();
    };
  }, []);

  const toggleDevice = (device) => {
    const newState = !devices[device];

    setDevices((prev) => ({
      ...prev,
      [device]: newState,
    }));

    const client = mqtt.connect(MQTT_BROKER);
    client.publish(TOPICS[device], newState ? "on" : "off");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px", padding: "20px", background: "#f4f4f4", borderRadius: "10px" }}>
      <h2 style={{ marginBottom: "20px", color: "#007BFF" }}>🔹 Device Control Panel 🔹</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", justifyContent: "center" }}>
        {Object.keys(devices).map((device) => (
          <div key={device} style={{ padding: "15px", border: "2px solid #ccc", borderRadius: "8px", background: "#fff", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}>
            <h3>{device.toUpperCase()}</h3>
            <p style={{ fontSize: "18px", fontWeight: "bold", color: devices[device] ? "green" : "red" }}>
              {devices[device] ? "🟢 ON" : "🔴 OFF"}
            </p>
            <button 
              onClick={() => toggleDevice(device)} 
              style={{
                padding: "12px 20px",
                fontSize: "16px",
                fontWeight: "bold",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "0.3s",
                background: devices[device] ? "red" : "green",
                color: "#fff"
              }}
            >
              {devices[device] ? "Turn OFF" : "Turn ON"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceControl;
