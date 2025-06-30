import btnAlignRight from "./../assets/btn-align-right.png";
import btnAlignBottom from "./../assets/btn-align-bottom.png";
import btnAlignLeft from "./../assets/btn-align-left.png";
import btnRefresh from "./../assets/icons8-refresh-60.png";

function TopPanel() {
  const handleHardRefresh = () => {
    if (window.NodeFn?.reloadWindow) {
      window.NodeFn.reloadWindow();
    } else {
      console.warn("reloadWindow function is not available");
    }
  };

  const handleMoveToLeft = () => {
    if (window.NodeFn?.moveWindow) {
      window.NodeFn.moveWindow(0, 0);
    } else {
      console.warn("moveWindow function is not available");
    }
  };

  return (
    <div style={styles.topPanel}>
      <button
        style={{ ...styles.topButton, ...styles.btnRefresh }}
        onClick={handleHardRefresh}
      ></button>
      <button
        style={{ ...styles.topButton, ...styles.btnAlignLeft }}
        onClick={handleMoveToLeft}
      ></button>
      {/* <button
        style={{ ...styles.topButton, ...styles.btnAlignBottom }}
      ></button> */}
      <button style={{ ...styles.topButton, ...styles.btnAlignRight }}></button>
    </div>
  );
}

const styles = {
  topPanel: {
    display: "flex",
    backgroundColor: "whitesmoke",
    borderBottom: "2px solid gray",
    alignItems: "center",
    justifyContent: "right",
    padding: "2px 8px",
    gap: "6px",
  },
  topButton: {
    width: "32px",
    height: "32px",
    borderRadius: "6px",
    justifyContent: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  btnAlignRight: {
    backgroundImage: `url(${btnAlignRight})`,
  },
  btnAlignBottom: {
    backgroundImage: `url(${btnAlignBottom})`,
  },
  btnAlignLeft: {
    backgroundImage: `url(${btnAlignLeft})`,
  },
  btnRefresh: {
    backgroundImage: `url(${btnRefresh})`,
  },
};

export default TopPanel;
