import circleAngle from "./../assets/circle-angle.png";

function DFView() {
  return (
    <div style={styles.dfView}>
      <div style={styles.dfCircle}>
        <div style={styles.dfAngle}>
          <div style={styles.dfArrow}></div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  dfView: {
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dfCircle: {
    display: "flex",
    height: "91%",
    aspectRatio: 1,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${circleAngle})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  dfAngle: {
    height: "86%",
    aspectRatio: 1,
    borderRadius: "50%",
    alignSelf: "center",
    margin: "0",
    rotate: "45deg",
  },
  dfArrow: {
    height: "50%",
    width: "6px",
    backgroundColor: "white",
    margin: "auto",
    position: "relative",
    borderRadius: "3px",
  },
};

export default DFView;
