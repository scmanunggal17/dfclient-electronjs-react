import { Chart as ChartJS } from "chart.js/auto";
import { Radar } from "react-chartjs-2";

function DFDetailPlot({ dfPolarData }) {
  console.log("DFDetailPlot, dfPolarData: ", dfPolarData);

  const labels = dfPolarData.map(() => "");

  const data = {
    labels,
    datasets: [
      {
        label: "DF Polar Data",
        data: dfPolarData,
        backgroundColor: "rgba(65, 45, 243, 0.2)", // semi-transparent fill
        borderColor: "yellow", // line color
        borderWidth: 0,
        pointBackgroundColor: "rgb(55, 22, 201)",
        pointRadius: 1, // size of the points
      },
    ],
  };

  const options = {
    animation: false,
    plugins: {
      legend: {
        display: false, // Hide legend label
      },
    },
    scales: {
      r: {
        angleLines: {
          display: false, // Hide radial angle lines
        },
        pointLabels: {
          display: false, // Hide the labels around the radar
        },
        grid: {
          circular: true,
        },
        ticks: {
          display: false, // Hide numeric scale ticks
          beginAtZero: true,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        color: "darkred",
        backgroundColor: "whitesmoke",
      }}
    >
      <Radar
        style={{ backgroundColor: "yellow", boarderRadius: "50px" }}
        data={data}
        options={options}
      />
    </div>
  );
}

export default DFDetailPlot;
