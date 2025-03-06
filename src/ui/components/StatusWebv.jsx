function StatusWebv() {
  // const url = "http://localhost:3000/config";
  const url = "http://192.168.17.17:8087/config";
  return (
    <div style={styles.status}>
      <div
        style={{
          padding: "4px 2px 0px 12px",
          fontWeight: "500",
          fontSize: "17pt",
          borderBottom: "2px solid gray",
        }}
      >
        Status
      </div>
      <iframe style={styles.webview} src={url}></iframe>
    </div>
  );
}

const styles = {
  status: {
    borderBottom: "2px solid whitesmoke",
    backgroundColor: "whitesmoke",
  },
  webview: {
    backgroundColor: "black",
    width: "100%",
    height: "100%",
  },
};

export default StatusWebv;
