import { useEffect, useRef } from "react";

function CompassTab({
  writeCmpsOffsetCfg,
  cmpsOffsetCor,
  setCmpsOffsetCor,
  cmpsHeading,
}) {
  const cmpsOffsetRef = useRef(null);

  const setCmpsOffsetCorrection = () => {
    const newOffsetCor = cmpsOffsetRef.current.value;

    if (newOffsetCor === "") {
      //ganti ke error
      // alert("Please enter a valid correction value.");
      return;
    }

    setCmpsOffsetCor(Number(newOffsetCor));
  };

  const saveCmpsOffsetCfg = () => {
    const newOffsetCor = cmpsOffsetRef.current.value;

    if (newOffsetCor === "") {
      // alert("Please enter a valid correction value.");
      return;
    }

    writeCmpsOffsetCfg(Number(newOffsetCor));
  };

  return (
    <div style={styles.compassTab}>
      <div style={{ borderBottom: "2px solid gray" }}>
        <span style={{ marginLeft: "8px", fontWeight: "500" }}>Compass</span>
      </div>
      <div style={styles.compassContainer}>
        <div style={styles.compassCircle}>
          <div style={styles.circle}>
            <div
              style={{
                ...styles.circleAngle,
                transform: `rotate(${cmpsHeading}deg)`,
                transition: "transform 0.2s ease",
              }}
            >
              <div style={styles.circleArrow}>
                <span style={styles.northText}>N</span>
              </div>
            </div>
          </div>
          <div style={styles.angleValue}>{cmpsHeading}</div>
        </div>
        <div style={styles.compassSetting}>
          <div>Compass Correction</div>
          <input
            style={styles.cmpsCorrInput}
            type="number"
            defaultValue={cmpsOffsetCor}
            ref={cmpsOffsetRef}
          />
          <button style={styles.cmpsSetBtn} onClick={setCmpsOffsetCorrection}>
            Set
          </button>
          <button style={styles.cmpsSetBtn} onClick={saveCmpsOffsetCfg}>
            Save Config
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  compassTab: {
    padding: "4px 2px",
    backgroundColor: "white",
    height: "100%",
  },
  compassContainer: {
    display: "grid",
    gridTemplateColumns: "2fr 3fr",
  },
  compassCircle: {},
  compassSetting: {
    display: "flex",
    flexDirection: "column",
    padding: "30px 10px 10px",
    alignItems: "center",
    gap: "10px",
  },
  circle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: "50%",
    height: "110px",
    width: "110px",
    margin: "20px auto 8px",
  },
  circleAngle: {
    height: "70px",
    width: "70px",
    borderRadius: "50%",
    backgroundColor: "black",
  },
  circleArrow: {
    height: "50%",
    width: "6px",
    backgroundColor: "white",
    margin: "auto",
    borderRadius: "3px",
  },
  northText: {
    fontSize: "17pt",
    fontWeight: "600",
    color: "yellow",
    position: "relative",
    top: "-21px",
    textAlign: "center",
    right: "4px",
  },
  angleValue: {
    textAlign: "center",
    fontSize: "18pt",
    backgroundColor: "black",
    padding: "6px",
    width: "90px",
    margin: "auto",
    fontWeight: "500",
    color: "white",
    borderRadius: "10px",
  },
  cmpsCorrInput: {
    width: "100px",
    padding: "2px 8px",
  },
  cmpsSetBtn: {
    padding: "2px 10px",
  },
};

export default CompassTab;
