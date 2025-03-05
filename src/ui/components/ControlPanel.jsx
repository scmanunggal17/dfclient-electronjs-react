import { useState } from "react";

import SetFreqTab from "./SetFreqTab";
import CompassTab from "./CompassTab";
import LocationTab from "./LocationTab";
import PropertiesTab from "./PropertiesTab";

function ControlPanel() {
  const [activeTab, setActiveTab] = useState("SetFreq");
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {activeTab === "SetFreq" && <SetFreqTab />}
        {activeTab === "Compass" && <CompassTab />}
        {activeTab === "Location" && <LocationTab />}
        {activeTab === "Properties" && <PropertiesTab />}
      </div>
      <div style={styles.tabContainer}>
        <button
          style={activeTab === "SetFreq" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("SetFreq")}
        >
          Frequency
        </button>
        <button
          style={activeTab === "Compass" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("Compass")}
        >
          Compass
        </button>
        <button
          style={activeTab === "Location" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("Location")}
        >
          Location
        </button>
        <button
          style={activeTab === "Properties" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("Properties")}
        >
          Location
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  content: {
    width: "100%",
    margin: "0",
    padding: "0",
    flexGrow: 1,
    borderBottom: "1px solid #ccc",
  },
  tabContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "start",
    gap: "2px",
    padding: "1px 2px",
  },
  tab: {
    fontSize: "16pt",
    padding: "6px 10px",
    cursor: "pointer",
    border: "2px solid #ccc",
    background: "#ccc",
    // borderRadius: "5px",
  },
  activeTab: {
    fontSize: "16pt",
    padding: "6px 10px",
    cursor: "pointer",
    borderTop: "0",
    borderRight: "2px solid darkgray",
    borderLeft: "2px solid darkgray",
    borderBottom: "2px solid darkgray",
    background: "whitesmoke",
    // borderRadius: "5px",
  },
};

export default ControlPanel;
