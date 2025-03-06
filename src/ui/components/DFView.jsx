import circleAngle from "./../assets/circle-angle.png";

function DFView() {
  return (
    <div style={styles.container}>
      <div style={styles.dfLabel}>DF</div>
      <div style={styles.dfView}>
        <div style={styles.dfCircle}>
          <div style={styles.dfAngle}>
            <div style={styles.dfArrow}></div>
          </div>
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
    backgroundColor: "whitesmoke",
    position: "relative",
  },
  dfLabel: {
    position: "absolute",
    left: "0",
    paddingLeft: "12px",
    top: "6px",
    width: "100px",
    fontWeight: "500",
    fontSize: "17pt",
    borderBottom: "2px solid gray",
  },
  dfView: {
    height: "430px",
    width: "430px",
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "44%",
  },
  dfCircle: {
    display: "flex",
    height: "400px",
    width: "400px",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${circleAngle})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  dfAngle: {
    height: "350px",
    width: "350px",
    borderRadius: "50%",
    alignSelf: "center",
    margin: "0",
    rotate: "0deg",
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
