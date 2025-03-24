import { useRef, useState } from "react";

function SetFreqTab({ setFreqGain, freq, gain }) {
  const [errMsg, setErrMsg] = useState("");

  const freqRef = useRef(null);
  const gainRef = useRef(null);

  function handleApply() {
    const newFreq = freqRef.current.value;
    const newGain = gainRef.current.value;

    if (!newFreq) {
      setErrMsg("Frekuensi harus diisi");
      setTimeout(() => {
        setErrMsg("");
      }, 3000);
      return;
    }

    if (newFreq < 24 || newFreq > 1000) {
      setErrMsg("Frekuensi harus diantara 24 - 1000 Mhz");
      setTimeout(() => {
        setErrMsg("");
      }, 3000);
      return;
    }

    setErrMsg("");
    setFreqGain(newFreq, newGain);
  }

  return (
    <div style={styles.setFreqTab}>
      {errMsg ? (
        <div
          style={{
            borderBottom: "2px solid gray",
            backgroundColor: "darkred",
            color: "white",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Error, {errMsg}
        </div>
      ) : (
        <div style={{ borderBottom: "2px solid gray" }}>
          <span style={{ marginLeft: "8px", fontWeight: "500" }}>
            Frequency Settings
          </span>
        </div>
      )}
      <div style={styles.form}>
        <div style={styles.formLabel}>Frequency:</div>
        <input
          style={{ width: "120px", ...styles.formInput }}
          type="number"
          step="0.001"
          defaultValue={freq}
          ref={freqRef}
        />
        <span style={{ marginLeft: "4px" }}>Mhz</span>
      </div>
      <div style={styles.form}>
        <div style={styles.formLabel}>Gain:</div>
        <select style={styles.formInput} defaultValue={gain} ref={gainRef}>
          <option value="0">0.0</option>
          <option value="0.9">0.9</option>
          <option value="1.4">1.4</option>
          <option value="2.7">2.7</option>
          <option value="3.7">3.7</option>
          <option value="7.7">7.7</option>
          <option value="8.7">8.7</option>
          <option value="12.5">12.5</option>
          <option value="14.4">14.4</option>
          <option value="15.7">15.7</option>
          <option value="16.6">16.6</option>
          <option value="19.7">19.7</option>
          <option value="20.7">20.7</option>
          <option value="22.9">22.9</option>
          <option value="25.4">25.4</option>
          <option value="28.0">28.0</option>
          <option value="29.7">29.7</option>
          <option value="33.8">33.8</option>
          <option value="36.4">36.4</option>
          <option value="37.2">37.2</option>
          <option value="38.6">38.6</option>
          <option value="40.2">40.2</option>
          <option value="42.1">42.1</option>
          <option value="43.4">43.4</option>
          <option value="44.5">44.5</option>
          <option value="48.0">48.0</option>
          <option value="49.6">49.6</option>
        </select>
        <span style={{ marginLeft: "4px" }}>dB</span>
      </div>
      <div style={styles.btnContainer}>
        <button type="button" style={styles.applyBtn} onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  );
}

const styles = {
  setFreqTab: {
    padding: "4px 2px",
    display: "block",
  },
  form: {
    display: "flex",
    margin: "4px",
    padding: "2px",
    borderBottom: "2px solid lightgray",
    alignItems: "center",
  },
  formLabel: {
    minWidth: "100px",
    padding: "2px 0",
  },
  formInput: {
    padding: "2px 4px",
  },
  btnContainer: {
    display: "flex",
    padding: "2px 12px",
    justifyContent: "flex-end",
  },
  applyBtn: {
    padding: "4px 8px",
    margin: "8px",
    alignSelf: "flex-end",
  },
};

export default SetFreqTab;
