import { useState } from "react";
import { turnOffDF, restartDF, setStationId } from "../../utils/apiHandler";

function OptionTab() {
  const [showNotifDialog, setShowNotifDialog] = useState(false);
  const [msgDialog, setMsgDialog] = useState("");
  const [unitName, setUnitName] = useState("");

  function handleTurnOff() {
    turnOffDF();
    setMsgDialog(
      "System akan mati dalam ± 15 detik.\nJangan langsung matikan sumber power!"
    );
    setShowNotifDialog(true);
    setTimeout(() => {
      setShowNotifDialog(false);
    }, 5000);
  }

  function handleRestart() {
    restartDF();
    setMsgDialog(
      "System akan restart dalam ± 1 menit. \nBuka Aplikasi kembali setelah 1 menit!"
    );
    setShowNotifDialog(true);
    setTimeout(() => {
      setShowNotifDialog(false);
    }, 5000);
  }

  function handleSetName() {
    if (!unitName) {
      return;
    }

    setStationId(unitName);
  }

  return (
    <div style={styles.OptionTab}>
      {showNotifDialog ? (
        <div style={styles.msgDialog}>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "600",
              padding: "2px 10px",
              marginBottom: "2px",
              borderBottom: "1px solid red",
            }}
          >
            Power System
          </div>
          <div style={{ fontWeight: "500", fontSize: "16pt" }}>{msgDialog}</div>
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
            <input
              style={styles.formInput}
              type="text"
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
            />
            <button style={styles.formSet} onClick={handleSetName}>
              Set
            </button>
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
            <button style={styles.button} onClick={handleRestart}>
              Restart
            </button>
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
    border: "3px solid red",
    borderRadius: "8px",
    margin: "30px 10px",
    padding: "10px",
  },
};

export default OptionTab;
