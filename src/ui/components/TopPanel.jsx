import btnAlignRight from "./../assets/btn-align-right.png";
import btnAlignBottom from "./../assets/btn-align-bottom.png";
import btnAlignLeft from "./../assets/btn-align-left.png";

function TopPanel() {
  return (
    <div style={styles.topPanel}>
      <button style={{ ...styles.topButton, ...styles.btnAlignLeft }}></button>
      <button
        style={{ ...styles.topButton, ...styles.btnAlignBottom }}
      ></button>
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
    cursor: "pointer",
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
};

export default TopPanel;
