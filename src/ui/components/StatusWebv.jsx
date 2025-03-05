function StatusWebv() {
  const url = "http://localhost:3000/config";
  // const url = "http://192.168.17.17:8087/config";
  return (
    <div style={styles.status}>
      <iframe style={styles.webview} src={url} frameborder="0"></iframe>
    </div>
  );
}

const styles = {
  status: {
    borderBottom: "2px solid whitesmoke",
  },
  webview: {
    backgroundColor: "black",
    width: "100%",
    height: "100%",
  },
};

export default StatusWebv;
