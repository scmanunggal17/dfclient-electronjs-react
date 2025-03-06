import StatusWebv from "./components/StatusWebv";
import TopPanel from "./components/TopPanel";
import DFView from "./components/DFView";
import ControlPanel from "./components/ControlPanel";

function App() {
  return (
    <div style={styles.container}>
      <TopPanel />
      <StatusWebv />
      <DFView />
      <ControlPanel />
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateRows: "40px 3fr 5fr 3fr",
    height: "100vh",
    minHeight: "500px",
    minWidth: "300px",
    fontSize: "16pt",
  },
};

export default App;
