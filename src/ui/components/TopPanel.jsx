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
    backgroundColor: "linear-gradient(145deg, #e6e6e6, #ffffff)",
    boxShadow: "5px 5px 10px #c5c5c5, -5px -5px 10px #ffffff",
    border: "1px solid #d1d1d1",
    alignItems: "center",
    justifyContent: "right",
    paddingLeft: "8px",
    paddingRight: "8px",
    gap: "6px",
  },
  topButton: {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
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
