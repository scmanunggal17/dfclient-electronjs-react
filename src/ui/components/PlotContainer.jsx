import { act, useState } from "react";
import DFRelativePlot from "./DFRelativePlot";
import DFAbsolutePlot from "./DFAbsolutePlot";
import DFDetailPlot from "./DFDetailPlot";

function PlotContainer({ dfHasData, dfHeading, cmpsHeading }) {
  const [activeTab, setActiveTab] = useState("relativeTab");

  return (
    <div style={styles.container}>
      <div style={styles.title}>
        <div>DF</div>
        <div style={styles.buttonContainer}>
          <div style={{ marginRight: "10px" }}>Plot:</div>
          <div style={styles.radioContainer}>
            <label>
              <div style={{ display: "flex" }}>
                <input
                  type="radio"
                  value={"relativeTab"}
                  checked={activeTab === "relativeTab"}
                  onChange={(e) => setActiveTab(e.target.value)}
                />
                <div>Relative</div>
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
                <div>North Cmps</div>
              </div>
            </label>
            <label>
              <div style={{ display: "flex" }}>
                <input
                  type="radio"
                  value={"detailPlotTab"}
                  checked={activeTab === "detailPlotTab"}
                  onChange={(e) => setActiveTab(e.target.value)}
                />
                <div>Detail</div>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div style={styles.plotContainer}>
        {activeTab === "relativeTab" && (
          <DFRelativePlot dfHasData={dfHasData} dfHeading={dfHeading} />
        )}
        {activeTab === "absoluteTab" && (
          <DFAbsolutePlot
            dfHasData={dfHasData}
            dfHeading={dfHeading}
            cmpsHeading={cmpsHeading}
          />
        )}
        {activeTab === "detailPlotTab" && <DFDetailPlot />}
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
    // alignItems: "center",
    // marginLeft: "50px",
    justifyContent: "center",
    marginTop: "40px",
  },
};

export default PlotContainer;
