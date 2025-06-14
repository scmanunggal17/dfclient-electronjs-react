import StatusWebv from "./components/StatusWebv";
import TopPanel from "./components/TopPanel";
import ControlPanel from "./components/ControlPanel";
import { readCompass, readDF } from "../utils/apiHandler";
import { useRef, useEffect, useState } from "react";
import PlotContainer from "./components/PlotContainer";

function App() {
  const intervalFetchCmps = useRef(null);
  const intervalFetchDF = useRef(null);
  const [cmpsHeading, setCmpsHeading] = useState(0);
  const [cmpsOffsetCor, setCmpsOffsetCor] = useState(0);
  const cmpsOffsetCorRef = useRef(0);
  const [dfHeading, setDfHeading] = useState(0);
  const [dfHasData, setDfHasData] = useState(false);

  function startFetchIntervalCmps() {
    if (intervalFetchCmps.current) return;
    console.log("start read compass");

    intervalFetchCmps.current = setInterval(() => {
      readCompass()
        .then((cmpsData) => {
          const cmpsHead =
            Math.round(cmpsData.heading) - cmpsOffsetCorRef.current;
          setCmpsHeading(cmpsHead);
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
    console.log("start read DF");
    intervalFetchDF.current = setInterval(() => {
      readDF()
        .then((dfData) => {
          setDfHasData(true);
          setDfHeading(Number(dfData.heading));
        })
        .catch((err) => {
          setDfHasData(false);
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
      stopFetchIntervalDF();
    };
  }, []);

  useEffect(() => {
    cmpsOffsetCorRef.current = cmpsOffsetCor;
  }, [cmpsOffsetCor]);

  return (
    <div style={styles.container}>
      <TopPanel />
      <StatusWebv />
      <PlotContainer
        dfHasData={dfHasData}
        dfHeading={dfHeading}
        cmpsHeading={cmpsHeading}
      />
      <ControlPanel
        cmpsHeading={cmpsHeading}
        cmpsOffsetCor={cmpsOffsetCor}
        setCmpsOffsetCor={setCmpsOffsetCor}
      />
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
