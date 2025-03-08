import { useState } from "react";

import SetFreqTab from "./SetFreqTab";
import CompassTab from "./CompassTab";
import LocationTab from "./LocationTab";
import OptionTab from "./OptionTab";

function ControlPanel() {
  const [activeTab, setActiveTab] = useState("SetFreq");
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {activeTab === "SetFreq" && <SetFreqTab />}
        {activeTab === "Compass" && <CompassTab />}
        {activeTab === "Location" && <LocationTab />}
        {activeTab === "Options" && <OptionTab />}
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
          style={activeTab === "Options" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("Options")}
        >
          Options
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
    paddingBottom: "4px",
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
    padding: "3px 4px",
    border: "2px solid #ccc",
    background: "#ccc",
  },
  activeTab: {
    padding: "3px 4px",
    borderTop: "0",
    borderRight: "2px solid darkgray",
    borderLeft: "2px solid darkgray",
    borderBottom: "2px solid darkgray",
    background: "whitesmoke",
    // borderRadius: "5px",
  },
};

export default ControlPanel;
