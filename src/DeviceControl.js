import React, { useState } from "react";
import mqtt from "mqtt";

const devicesList = ["Light", "Fan", "Projector"];

function DeviceControl() {
    const [deviceStates, setDeviceStates] = useState({
        Light: false,
        Fan: false,
        Projector: false,
    });

    const toggleDevice = (device) => {
        setDeviceStates((prevStates) => ({
            ...prevStates,
            [device]: !prevStates[device],
        }));
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px"}}>
           <h1>Smart Lab Manager</h1>
           {devicesList.map((device) => (
            <div key={device} style={{ margin: "20px" }}>
            <p>{device} is {deviceStates[device] ? "ON" : "OFF"} </p>
            <button onClick={() => toggleDevice(device)} style={{ padding: "10px", fontSize: "16px" }}>
                {deviceStates[device] ? "Turn OFF" : "Turn ON"}
            </button>
            </div>
        ))}
        </div>
    );
}

export default DeviceControl;
