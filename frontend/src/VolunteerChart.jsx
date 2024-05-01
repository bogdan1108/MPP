import React from "react";
import { Bar } from "react-chartjs-2";

const VolunteerChart = ({ data }) => {
  // Get the count of volunteers by faculty
  const facultyCount = data.reduce((count, volunteer) => {
    count[volunteer.faculty] = (count[volunteer.faculty] || 0) + 1;
    return count;
  }, {});

  // Extract faculty names and counts for chart data
  const facultyNames = Object.keys(facultyCount);
  const facultyCounts = Object.values(facultyCount);

  // Chart data
  const chartData = {
    labels: facultyNames,
    datasets: [
      {
        label: "Number of Volunteers",
        data: facultyCounts,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  // Chart options
  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default VolunteerChart;
