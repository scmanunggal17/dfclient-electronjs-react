import { Chart as ChartJS } from "chart.js/auto";
import { Radar } from "react-chartjs-2";

function DFDetailPlot() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        color: "darkred",
        backgroundColor: "darkgray",
      }}
    >
      <Radar
        data={{
          labels: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"],
          datasets: [
            {
              label: "Car A",
              data: [65, 59, 90, 81, 56],
              backgroundColor: "rgba(34, 202, 236, 0.2)",
              borderColor: "rgba(34, 202, 236, 1)",
              borderWidth: 2,
              pointBackgroundColor: "rgba(34, 202, 236, 1)",
            },
            {
              label: "Car B",
              data: [28, 48, 40, 19, 96],
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
              pointBackgroundColor: "rgba(255, 99, 132, 1)",
            },
          ],
        }}
      />
    </div>
  );
}

export default DFDetailPlot;
