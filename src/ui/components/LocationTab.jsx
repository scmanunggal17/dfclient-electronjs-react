import { useRef, useState, useEffect } from "react";
import { readGPS, decimalToDMS, isDmsRegexMatch } from "../../utils/apiHandler";

function Location({ writeSavedCoord, savedCoord }) {
  const [errMsg, setErrMsg] = useState("");
  const [isReadingGPS, setIsReadingGPS] = useState(false);
  const latRef = useRef(null);
  const lonRef = useRef(null);
  const zoneRef = useRef(null);
  const eastingRef = useRef(null);
  const northingRef = useRef(null);
  const coRef = useRef(null);

  const intervalFetchGPS = useRef(null);
  const counterIntervalGPS = useRef(0);

  console.log("location tab loaded");

  //apply this
  function startFetchIntervalGPS() {
    if (intervalFetchGPS.current) return;
    setIsReadingGPS(true);
    intervalFetchGPS.current = setInterval(() => {
      console.log("start read gps, counter: ", counterIntervalGPS.current);
      readGPS()
        .then((gpsData) => {
          latRef.current.value = decimalToDMS(gpsData.data.lat, true);
          lonRef.current.value = decimalToDMS(gpsData.data.lng, false);
          console.log("gps data: ", JSON.stringify(gpsData));
        })
        .catch((err) => {
          console.error(err);
          latRef.current.value = decimalToDMS(0.0, true);
          lonRef.current.value = decimalToDMS(0.0, false);
        });
      counterIntervalGPS.current++;
      if (counterIntervalGPS.current > 3) {
        stopFetchIntervalGPS();
      }
    }, 3000);
  }

  function stopFetchIntervalGPS() {
    setIsReadingGPS(false);
    console.log("stop read gps");
    if (intervalFetchGPS.current) {
      clearInterval(intervalFetchGPS.current);
      intervalFetchGPS.current = null;
    }
  }

  function convertToUTM() {
    const latDms = latRef.current.value;
    const lonDms = lonRef.current.value;
  }

  useEffect(() => {
    return () => stopFetchIntervalGPS();
  }, []);

  return (
    <div style={styles.locationTab}>
      <div style={{ borderBottom: "2px solid gray" }}>
        <span style={{ marginLeft: "8px", fontWeight: "500" }}>Compass</span>
      </div>
      {errMsg ? (
        <div
          style={{
            backgroundColor: "red",
          }}
        >
          {errMsg}
        </div>
      ) : (
        <div style={styles.locationContent}>
          <div style={styles.latlongPanel}>
            <div style={styles.latlongField}>
              <div>Latitude:</div>
              <input
                style={styles.latlongInput}
                type="text"
                defaultValue={savedCoord.latDms}
                ref={latRef}
              />
            </div>
            <div style={styles.latlongField}>
              <div>Longitude:</div>
              <input
                style={styles.latlongInput}
                type="text"
                defaultValue={savedCoord.lonDms}
                ref={lonRef}
              />
            </div>
          </div>
          <div style={styles.utmPanel}>
            <div>
              <div style={styles.utmField}>
                <div style={styles.utmLabel}>Zone:</div>
                <input
                  style={styles.utmInput}
                  type="text"
                  defaultValue={savedCoord.zone}
                  ref={zoneRef}
                />
              </div>
              <div style={styles.utmField}>
                <div style={styles.utmLabel}>Easting:</div>
                <input
                  style={styles.utmInput}
                  type="text"
                  defaultValue={savedCoord.easting}
                  ref={eastingRef}
                />
              </div>
              <div style={styles.utmField}>
                <div style={styles.utmLabel}>Northing:</div>
                <input
                  style={styles.utmInput}
                  type="text"
                  defaultValue={savedCoord.northing}
                  ref={northingRef}
                />
              </div>
              <div style={styles.utmField}>
                <div style={styles.utmLabel}>CO:</div>
                <input
                  style={styles.utmInput}
                  type="text"
                  defaultValue={savedCoord.co}
                  ref={coRef}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div style={styles.buttonPanel}>
        <button
          style={styles.actButton}
          onClick={startFetchIntervalGPS}
          disabled={isReadingGPS}
        >
          Read gps
        </button>
        <button style={styles.actButton} disabled={isReadingGPS}>
          Convert to utm
        </button>
        <button style={styles.actButton}>Save All</button>
      </div>
    </div>
  );
}

const styles = {
  locationTab: {
    padding: "4px 2px",
    backgroundColor: "white",
    height: "100%",
  },
  locationContent: {
    display: "grid",
    gridTemplateColumns: "5fr 6fr",
  },
  latlongPanel: {
    display: "Flex",
    flexDirection: "column",
    alignItems: "center",
  },
  latlongField: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    marginTop: "6px",
  },
  latlongInput: {
    maxWidth: "140px",
    padding: "2px 4px",
  },
  utmPanel: {
    borderLeft: "2px solid gray",
  },
  utmLabel: {
    minWidth: "76px",
  },
  utmField: {
    display: "Flex",
    margin: "3px 4px",
    alignItems: "center",
    justifyContent: "center",
  },
  utmInput: {
    maxWidth: "110px",
    padding: "2px 4px",
  },
  buttonPanel: {
    display: "Flex",
    borderTop: "2px solid gray",
    gap: "16px",
    paddingTop: "8px",
    justifyContent: "center",
  },
  actButton: {
    padding: "4px 10px",
  },
};

export default Location;
