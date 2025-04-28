import React, { useState } from "react";

function DeviceControl() {
  const [deviceState, setDeviceState] = useState(false);

  const toggleDevice = () => {
    setDeviceState(!deviceState);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px"}}>
      <h1>Smart Lab Manager</h1>
      <p> Device is {deviceState ? "ON" : "OFF"}</p>
      <button onClick={toggleDevice} style={{ padding: "10px", fontSize: "16px"}}> 
        {deviceState ? "Turn OFF" : "Turn ON"}
      </button>
    </div>
  );
}

export default DeviceControl;
