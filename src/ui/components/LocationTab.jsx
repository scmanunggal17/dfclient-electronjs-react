function Location() {
  return (
    <div style={styles.locationTab}>
      <div style={{ borderBottom: "2px solid gray" }}>
        <span style={{ marginLeft: "8px", fontWeight: "500" }}>Compass</span>
      </div>
      <div style={styles.locationContent}>
        <div style={styles.latlongPanel}>
          <div style={styles.latlongField}>
            <div>Latitude:</div>
            <input style={styles.latlongInput} type="text" />
          </div>
          <div style={styles.latlongField}>
            <div>Longitude:</div>
            <input style={styles.latlongInput} type="text" />
          </div>
        </div>
        <div style={styles.utmPanel}>
          <div>
            <div style={styles.utmField}>
              <div style={styles.utmLabel}>Zone:</div>
              <input style={styles.utmInput} type="text" />
            </div>
            <div style={styles.utmField}>
              <div style={styles.utmLabel}>Easting:</div>
              <input style={styles.utmInput} type="text" />
            </div>
            <div style={styles.utmField}>
              <div style={styles.utmLabel}>Northing:</div>
              <input style={styles.utmInput} type="text" />
            </div>
            <div style={styles.utmField}>
              <div style={styles.utmLabel}>CO:</div>
              <input style={styles.utmInput} type="text" />
            </div>
          </div>
        </div>
      </div>
      <div style={styles.buttonPanel}>
        <button style={styles.actButton}>Read gps</button>
        <button style={styles.actButton}>Convert to utm</button>
        <button style={styles.actButton}>Save All</button>
      </div>
    </div>
  );
}

const styles = {
  locationTab: {
    padding: "4px 2px",
    backgroundColor: "white",
    height: "100%",
  },
  locationContent: {
    display: "grid",
    gridTemplateColumns: "5fr 6fr",
  },
  latlongPanel: {
    display: "Flex",
    flexDirection: "column",
    alignItems: "center",
  },
  latlongField: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    marginTop: "6px",
  },
  latlongInput: {
    maxWidth: "140px",
    padding: "2px 4px",
  },
  utmPanel: {
    borderLeft: "2px solid gray",
  },
  utmLabel: {
    minWidth: "76px",
  },
  utmField: {
    display: "Flex",
    margin: "3px 4px",
    alignItems: "center",
    justifyContent: "center",
  },
  utmInput: {
    maxWidth: "110px",
    padding: "2px 4px",
  },
  buttonPanel: {
    display: "Flex",
    borderTop: "2px solid gray",
    gap: "16px",
    paddingTop: "8px",
    justifyContent: "center",
  },
  actButton: {
    padding: "4px 10px",
  },
};

export default Location;
