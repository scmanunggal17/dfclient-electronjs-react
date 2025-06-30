import { useRef, useState, useEffect } from "react";
import {
  readGPS,
  decimalToDMS,
  isDmsRegexMatch,
  dmsToDecimal,
} from "../../utils/apiHandler";

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

  const saveCoord = () => {
    const newLat = latRef.current.value;
    const newLon = lonRef.current.value;
    const newZone = zoneRef.current.value;
    const newEasting = eastingRef.current.value;
    const newNorthing = northingRef.current.value;
    const newCo = coRef.current.value;

    writeSavedCoord(newLat, newLon, newZone, newEasting, newNorthing, newCo);
  };

  const startFetchIntervalGPS = () => {
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
  };

  const stopFetchIntervalGPS = () => {
    if (intervalFetchGPS.current) {
      clearInterval(intervalFetchGPS.current);
      intervalFetchGPS.current = null;
      setIsReadingGPS(false);
      console.log("stop read gps");
    }
  };

  const convertToUTM = () => {
    const lat = latRef.current.value;
    const lon = lonRef.current.value;

    if (!lat || !lon) {
      setErrMsg("Field tidak boleh kosong");
      setTimeout(() => {
        setErrMsg("");
      }, 2000);
      return;
    }

    if (!isDmsRegexMatch(lat)) {
      setErrMsg("Format latitude salah");
      setTimeout(() => {
        setErrMsg("");
      }, 2000);
      return;
    }

    if (!isDmsRegexMatch(lon)) {
      setErrMsg("Format longitude salah");
      setTimeout(() => {
        setErrMsg("");
      }, 2000);
      return;
    }

    const latitude = dmsToDecimal(lat);
    const longitude = dmsToDecimal(lon);

    const utmCoord = window.NodeFn.convertUtm(latitude, longitude);
    zoneRef.current.value = utmCoord.zoneNum + utmCoord.zoneLetter;
    eastingRef.current.value = utmCoord.easting.toFixed(2);
    northingRef.current.value = utmCoord.northing.toFixed(2);

    const strCOE = Math.round(utmCoord.easting).toString();
    const strCON = Math.round(utmCoord.northing).toString();

    coRef.current.value = `${strCOE.substring(
      1,
      strCOE.length - 1
    )}, ${strCON.substring(2, strCON.length - 1)}`;
  };

  useEffect(() => {
    return () => stopFetchIntervalGPS();
  }, []);

  return (
    <div style={styles.locationTab}>
      {errMsg ? (
        <div
          style={{
            borderBottom: "2px solid gray",
            backgroundColor: "darkred",
            color: "white",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Error, {errMsg}
        </div>
      ) : (
        <div style={{ borderBottom: "2px solid gray" }}>
          <span style={{ marginLeft: "8px", fontWeight: "500" }}>
            Locations
          </span>
        </div>
      )}
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
      <div style={styles.buttonPanel}>
        <button
          style={styles.actButton}
          onClick={startFetchIntervalGPS}
          disabled={isReadingGPS}
        >
          Read gps
        </button>
        <button
          style={styles.actButton}
          onClick={convertToUTM}
          disabled={isReadingGPS}
        >
          Convert to utm
        </button>
        <button style={styles.actButton} onClick={saveCoord}>
          Save All
        </button>
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
