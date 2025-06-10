import absCircle from "./../assets/absolute-circle.png";

function DFAbsolutePlot({ dfHasData, dfHeading, cmpsHeading }) {
  const dfAbsValue = dfHasData ? (360 + dfHeading + cmpsHeading) % 360 : 0;
  return (
    <div style={styles.container}>
      <div style={styles.circle}>
        <div
          style={{
            ...styles.angle,
            display: dfHasData ? "block" : "none",
            transform: `rotate(${dfAbsValue}deg)`,
            // transition: "transform 0.2s ease",
          }}
        >
          <div style={styles.arrow}></div>
        </div>
        <div style={styles.angleText}>{dfHasData ? dfAbsValue : "-"}</div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    height: "300px",
    width: "300px",
    borderRadius: "50%",
  },
  circle: {
    display: "flex",
    width: "280px",
    height: "280px",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundImage: `url(${absCircle})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  angle: {
    backgroundColor: "transparent",
    height: "200px",
    width: "200px",
    borderRadius: "50%",
  },
  arrow: {
    height: "50%",
    width: "10px",
    backgroundColor: "white",
    margin: "auto",
    borderRadius: "3px",
  },
  angleText: {
    width: "70px",
    height: "70px",
    backgroundColor: "black",
    position: "absolute",
    borderRadius: "50%",
    border: "2px solid white",
    zIndex: 2,
    display: "flex",
    color: "yellow",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18pt",
  },
};

export default DFAbsolutePlot;
