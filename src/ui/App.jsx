import StatusWebv from "./components/StatusWebv";
import TopPanel from "./components/TopPanel";
import ControlPanel from "./components/ControlPanel";
import { readCompass, readDF } from "../utils/apiHandler";
import { useRef, useEffect, useState } from "react";
import PlotContainer from "./components/PlotContainer";

function App() {
  const intervalFetchCmps = useRef(null);
  const intervalFetchDF = useRef(null);
  const timeStamp = useRef(0);
  const [cmpsHeading, setCmpsHeading] = useState(0);
  const [cmpsOffsetCor, setCmpsOffsetCor] = useState(0);
  const cmpsOffsetCorRef = useRef(0);
  const [dfHeading, setDfHeading] = useState(0);
  const [dfHasData, setDfHasData] = useState(false);
  const [polarData, setPolarData] = useState([]);
  const [udpListening, setUdpListening] = useState(false);
  const [udpFreqData, setUdpFreqData] = useState(null);

  const startFetchIntervalCmps = () => {
    if (intervalFetchCmps.current) return;
    console.log("start read compass");

    intervalFetchCmps.current = setInterval(() => {
      readCompass()
        .then((cmpsData) => {
          const cmpsHead =
            (Math.round(cmpsData.heading) - cmpsOffsetCorRef.current) % 360;
          setCmpsHeading(cmpsHead);
        })
        .catch((err) => {
          console.error(err);
        });
    }, 1000);
  };

  const stopFetchIntervalCmps = () => {
    if (intervalFetchCmps.current) {
      clearInterval(intervalFetchCmps.current);
      intervalFetchCmps.current = null;
      console.log("stop read compass");
    }
  };

  const startFetchIntervalDF = () => {
    if (intervalFetchDF.current) return;

    console.log("Start reading DF");

    intervalFetchDF.current = setInterval(async () => {
      try {
        const dfData = await readDF();
        const isNewData = timeStamp.current !== dfData.time;

        if (isNewData) {
          const heading = (360 - parseFloat(dfData.heading)) % 360;
          setDfHasData(true);
          setDfHeading(Math.round(heading));
          setPolarData(dfData.polar);
          timeStamp.current = dfData.time;
        } else {
          setDfHasData(false);
        }
      } catch (error) {
        console.error(error);
        setDfHasData(false);
      }
    }, 1000);
  };

  const stopFetchIntervalDF = () => {
    if (intervalFetchDF.current) {
      clearInterval(intervalFetchDF.current);
      intervalFetchDF.current = null;
      console.log("stop read DF");
    }
  };

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

  if (udpListening) {
    const handler = (data) => {
      setUdpFreqData(data);
    };
    window.NodeFn.startUdpListener(handler);

    return () => {
      window.NodeFn.stopUdpListener();
    };
  } else {
    window.NodeFn.stopUdpListener();
  }
}, [cmpsOffsetCor, udpListening]);

  return (
    <div style={styles.container}>
      <TopPanel />
      <StatusWebv />
      <PlotContainer
        dfHasData={dfHasData}
        dfHeading={dfHeading}
        cmpsHeading={cmpsHeading}
        dfPolarData={polarData}
      />
      <ControlPanel
        cmpsHeading={cmpsHeading}
        cmpsOffsetCor={cmpsOffsetCor}
        setCmpsOffsetCor={setCmpsOffsetCor}
        udpListening={udpListening}
        setUdpListening={setUdpListening}
        udpFreqData={udpFreqData}
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
