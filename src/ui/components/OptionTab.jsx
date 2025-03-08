import { useState } from "react";

function OptionTab() {
  const [showNotifDialog, setShowNotifDialog] = useState(false);

  function handleTurnOff() {
    setShowNotifDialog(true);
    setTimeout(() => {
      setShowNotifDialog(false);
    }, 3000);
  }

  return (
    <div style={styles.OptionTab}>
      <div
        style={{
          borderBottom: "2px solid gray",
          marginBottom: "6px",
        }}
      >
        Options
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
        <button style={styles.button}>Turn OFF</button>
      </div>
    </div>
  );
}

const styles = {
  OptionTab: {
    padding: "8px",
    display: "block",
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
    minWidth: "120px",
  },
  formSet: {
    padding: "2px 4px",
    marginLeft: "12px",
  },
  formInput: {
    paddingLeft: "4px",
    width: "200px",
  },
  button: {
    padding: "3px 6px",
    margin: "2px",
  },
};

export default OptionTab;
