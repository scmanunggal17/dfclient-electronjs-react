import { useState } from "react";
import DFRelativePlot from "./DFRelativePlot";
import DFAbsolutePlot from "./DFAbsolutePlot";

function PlotContainer({ dfHeading }) {
  const [activeTab, setActiveTab] = useState("relativeTab");

  return (
    <div style={styles.container}>
      <div style={styles.title}>
        <div>DF</div>
        <div style={styles.buttonContainer}>
          <div>Plot: </div>
          <div style={styles.radioContainer}>
            <label>
              <div style={{ display: "flex" }}>
                <input
                  type="radio"
                  value={"relativeTab"}
                  checked={activeTab === "relativeTab"}
                  onChange={(e) => setActiveTab(e.target.value)}
                />
                <div style={{ maxWidth: "80px" }}>Relative</div>
              </div>
            </label>
            <label>
              <div style={{ display: "flex" }}>
                <input
                  type="radio"
                  value={"absoluteTab"}
                  checked={activeTab === "absoluteTab"}
                  onChange={(e) => setActiveTab(e.target.value)}
                />
                <div style={{ maxWidth: "80px" }}>Absolute</div>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div style={styles.plotContainer}>
        {activeTab === "relativeTab" && (
          <DFRelativePlot dfHeading={dfHeading} />
        )}
        {activeTab === "absoluteTab" && <DFAbsolutePlot />}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    position: "relative",
  },
  title: {
    position: "absolute",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: "2px 4px",
  },
  buttonContainer: {
    display: "flex",
  },
  radioContainer: {
    display: "flex",
    flexDirection: "column",
  },
  plotContainer: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },
};

export default PlotContainer;
