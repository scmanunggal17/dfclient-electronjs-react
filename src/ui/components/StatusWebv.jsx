import { API_URL } from "../../utils/apiHandler";

function StatusWebv() {
  const url = `${API_URL}/config`;
  return (
    <div style={styles.status}>
      <div
        style={{
          padding: "4px 2px 2px 12px",
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
    backgroundColor: "whitesmoke",
    width: "100%",
    height: "100%",
    padding: "8px 0px",
  },
};

export default StatusWebv;
