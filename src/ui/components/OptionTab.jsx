import { useState } from "react";
import { turnOffDF, restartDF } from "../../utils/apiHandler";

function OptionTab() {
  const [showNotifDialog, setShowNotifDialog] = useState(false);
  const [msgDialog, setMsgDialog] = useState("");

  //"System", "System akan restart dalam ± 2 menit"

  function handleTurnOff() {
    setMsgDialog(
      "System akan mati dalam 1 menit.\nJangan langsung matikan sumber power!"
    );
    setShowNotifDialog(true);
    setTimeout(() => {
      setShowNotifDialog(false);
    }, 3000);
  }

  return (
    <div style={styles.OptionTab}>
      {showNotifDialog ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "darkred",
            height: "200px",
          }}
        >
          <div>System</div>
          <div style={styles.msgDialog}>{msgDialog}</div>
        </div>
      ) : (
        <>
          <div style={{ borderBottom: "2px solid gray" }}>
            <span style={{ marginLeft: "8px", fontWeight: "500" }}>
              Options
            </span>
          </div>
          <div style={styles.form}>
            <span style={styles.formLabel}>Unit Name: </span>
            <input style={styles.formInput} type="text" />
            <button style={styles.formSet}>Set</button>
          </div>
          <div>
            <span
              style={{
                borderBottom: "2px solid lightgray",
                marginBottom: "8px",
              }}
            >
              Power Option
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "50px",
              marginTop: "20px",
            }}
          >
            <button style={styles.button}>Restart</button>
            <button style={styles.button} onClick={handleTurnOff}>
              Turn OFF
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  OptionTab: {
    display: "block",
    padding: "4px 2px",
  },
  form: {
    display: "flex",
    alignItems: "center",
    margin: "2px",
    paddingTop: "2px",
    paddingBottom: "4px",
    borderBottom: "2px solid lightgray",
  },
  formLabel: {
    minWidth: "100px",
  },
  formSet: {
    padding: "4px 8px",
    marginLeft: "12px",
  },
  formInput: {
    padding: "2px 4px",
    width: "150px",
  },
  button: {
    padding: "3px 6px",
    margin: "2px",
  },
  msgDialog: {
    whiteSpace: "pre-line",
    textAlign: "center",
  },
};

export default OptionTab;
