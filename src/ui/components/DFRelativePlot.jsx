import circleAngle from "./../assets/circle-angle.png";

function DFRelativePlot({ dfHeading }) {
  return (
    <div style={styles.container}>
      <div style={styles.circle}>
        <div
          style={{
            ...styles.angle,
            transform: `rotate(${dfHeading}deg)`,
            transition: "transform 0.2s ease",
          }}
        >
          <div style={styles.arrow}></div>
        </div>
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
    height: "280px",
    width: "280px",
    borderRadius: "50%",
  },
  circle: {
    display: "flex",
    width: "270px",
    height: "270px",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundImage: `url(${circleAngle})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  angle: {
    backgroundColor: "transparent",
    height: "170px",
    width: "170px",
    borderRadius: "50%",
  },
  arrow: {
    height: "50%",
    width: "6px",
    backgroundColor: "white",
    margin: "auto",
    borderRadius: "3px",
  },
};

export default DFRelativePlot;
