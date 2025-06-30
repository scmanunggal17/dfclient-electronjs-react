import { useState, useEffect } from "react";

import { setAntena, setFreqApi, readSettings } from "../../utils/apiHandler";
import SetFreqTab from "./SetFreqTab";
import CompassTab from "./CompassTab";
import LocationTab from "./LocationTab";
import OptionTab from "./OptionTab";

function ControlPanel({ cmpsHeading, cmpsOffsetCor, setCmpsOffsetCor }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("SetFreq");
  const [freq, setFreq] = useState(null);
  const [gain, setGain] = useState(null);

  const [unitName, setUnitName] = useState("");

  const [savedCoord, setSavedCoord] = useState({
    latDms: "0",
    lonDms: "",
    zone: "0",
    easting: "0",
    northing: "0",
    co: "0",
    compassOffset: 0,
  });

  useEffect(() => {
    fetchInitData();
    readSavedCoords();
  }, []);

  async function fetchInitData() {
    setLoading(true);
    setError(null);

    try {
      const data = await readSettings();
      setFreq(data.center_freq);
      setGain(data.uniform_gain);
      setUnitName(data.station_id);
    } catch (error) {
      console.error("Error fetching initial data on start: ", error);
      setError("Error: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  }

  function setFreqGain(newFreq, newGain) {
    setFreq(newFreq);
    setGain(newGain);

    const antSpace = newFreq >= 250 ? 0.25 : 0.45;
    setAntena(antSpace);

    const data = {
      center_freq: newFreq,
      uniform_gain: newGain,
      ant_spacing_meters: antSpace,
    };
    setFreqApi(data);
  }

  function readSavedCoords() {
    window.NodeFn.readFile("data-coord.json", "utf8")
      .then((data) => {
        const jsonData = JSON.parse(data);
        setSavedCoord((prev) => ({
          ...prev,
          latDms: jsonData.latDms,
          lonDms: jsonData.lonDms,
          zone: jsonData.zone,
          easting: jsonData.easting,
          northing: jsonData.northing,
          co: jsonData.co,
          compassOffset: jsonData.compassOffset,
        }));

        setCmpsOffsetCor(Number(jsonData.compassOffset));

        console.log("Read saved coords: ", JSON.stringify(jsonData));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function writeCmpsOffsetCfg(offsetValue) {
    setSavedCoord((prev) => ({
      ...prev,
      compassOffset: offsetValue,
    }));

    const dataToSave = {
      ...savedCoord,
      compassOffset: offsetValue,
    };
    console.log(dataToSave);

    const strDataToSave = JSON.stringify(dataToSave, null, 2);

    window.NodeFn.writeFile("data-coord.json", strDataToSave, "utf8")
      .then(() => {
        console.log("write success");
      })
      .catch((err) => {
        console.error("write error", err);
      });
  }

  function writeSavedCoord(latDms, lonDms, zone, easting, northing, co) {
    setSavedCoord((prev) => ({
      ...prev,
      latDms: latDms,
      lonDms: lonDms,
      zone: zone,
      easting: easting,
      northing: northing,
      co: co,
    }));

    const dataToSave = {
      ...savedCoord,
      latDms,
      lonDms,
      zone,
      easting,
      northing,
      co,
    };
    console.log(dataToSave);

    const strDataToSave = JSON.stringify(dataToSave, null, 2);

    window.NodeFn.writeFile("data-coord.json", strDataToSave, "utf8")
      .then(() => {
        console.log("write success");
      })
      .catch((err) => {
        console.error("write error", err);
      });
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {activeTab === "SetFreq" &&
          (loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div style={{ color: "red" }}>
              <div>{error}</div>
              <div>Periksa kabel & koneksi Unit DF</div>
              <div>
                kemudian klik Refresh atau <br />
                tutup & buka kembali aplikasi
              </div>
            </div>
          ) : (
            <SetFreqTab
              setFreqGain={setFreqGain}
              freq={freq}
              gain={gain}
              unitName={unitName}
            />
          ))}

        {activeTab === "Compass" && (
          <CompassTab
            writeCmpsOffsetCfg={writeCmpsOffsetCfg}
            cmpsOffsetCor={cmpsOffsetCor}
            setCmpsOffsetCor={setCmpsOffsetCor}
            cmpsHeading={cmpsHeading}
          />
        )}
        {activeTab === "Location" && (
          <LocationTab
            writeSavedCoord={writeSavedCoord}
            savedCoord={savedCoord}
          />
        )}
        {activeTab === "Options" && (
          <OptionTab setUnitName={setUnitName} unitName={unitName} />
        )}
      </div>
      <div style={styles.tabContainer}>
        <button
          type="button"
          style={activeTab === "SetFreq" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("SetFreq")}
        >
          Frequency
        </button>
        <button
          type="button"
          style={activeTab === "Compass" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("Compass")}
        >
          Compass
        </button>
        <button
          type="button"
          style={activeTab === "Location" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("Location")}
        >
          Location
        </button>
        <button
          type="button"
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
  },
};

export default ControlPanel;
