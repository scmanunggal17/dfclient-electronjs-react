import { Chart as ChartJS } from "chart.js/auto";
import { color } from "chart.js/helpers";
import { Radar } from "react-chartjs-2";

function DFDetailPlot({ dfPolarData }) {
  const labels = dfPolarData.map(() => "");

  const data = {
    labels,
    datasets: [
      {
        label: "dB",
        data: dfPolarData,
        backgroundColor: "rgba(0, 50, 255, 0.3)", // semi-transparent fill
        borderWidth: 0,
        pointBackgroundColor: "rgba(0, 50, 255, 1)", // color of the points
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
          color: "white",
          lineWidth: 1, // Width of the grid lines
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
        borderRadius: "50px",
        color: "darkred",
        backgroundColor: "whitesmoke",
      }}
    >
      <div
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: "black",
        }}
      >
        <Radar data={data} options={options} />
      </div>
    </div>
  );
}

export default DFDetailPlot;
