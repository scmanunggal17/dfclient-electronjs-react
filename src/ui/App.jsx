import StatusWebv from "./components/StatusWebv";
import TopPanel from "./components/TopPanel";
import DFView from "./components/DFView";
import ControlPanel from "./components/ControlPanel";
import { readCompass, readDF } from "../utils/apiHandler";
import { useRef, useEffect, useState } from "react";

function App() {
  const intervalFetchCmps = useRef(null);
  const intervalFetchDF = useRef(null);
  const [cmpsHeading, setCmpsHeading] = useState(0);

  function startFetchIntervalCmps() {
    if (intervalFetchCmps.current) return;

    intervalFetchCmps.current = setInterval(() => {
      console.log("start read compass");
      readCompass()
        .then((cmpsData) => {
          setCmpsHeading(cmpsData.heading);
        })
        .catch((err) => {
          console.error(err);
        });
    }, 1000);
  }

  function stopFetchIntervalCmps() {
    if (intervalFetchCmps.current) {
      clearInterval(intervalFetchCmps.current);
      intervalFetchCmps.current = null;
      console.log("stop read compass");
    }
  }

  function startFetchIntervalDF() {
    if (intervalFetchDF.current) return;

    intervalFetchDF.current = setInterval(() => {
      console.log("start read DF");
      readDF()
        .then((dfData) => {
          console.log("df data: ", JSON.stringify(dfData));
        })
        .catch((err) => {
          console.error(err);
        });
    }, 1000);
  }

  function stopFetchIntervalDF() {
    if (intervalFetchDF.current) {
      clearInterval(intervalFetchDF.current);
      intervalFetchDF.current = null;
      console.log("stop read DF");
    }
  }

  useEffect(() => {
    startFetchIntervalCmps();
    startFetchIntervalDF();
    return () => {
      stopFetchIntervalCmps();
      startFetchIntervalDF();
    }; // Cleanup function to stop intervals on unmount
  }, []);

  return (
    <div style={styles.container}>
      <TopPanel />
      <StatusWebv />
      <DFView />
      <ControlPanel cmpsHeading={cmpsHeading} />
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateRows: "40px 3fr 4fr 3fr",
    height: "100vh",
    minHeight: "500px",
    minWidth: "300px",
    fontSize: "14pt",
  },
};

export default App;
