import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { registerables } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(...registerables);

const SeismicChart = ({ data }) => {
  
  // Pre-defined colors for different seismic event types

  const typeColors = {
    ABG: "rgba(255, 99, 132, 1)",
    BEG: "rgba(75, 192, 192, 1)",
    AIR: "rgba(255, 206, 86, 1)",
    SUB: "rgba(153, 102, 255, 1)",
  };

  // Group data by event type and location for more structured plotting

  const groupedData = data.reduce((acc, entry) => {
    const key = `${entry.type}-${entry.location}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(entry);
    return acc;
  }, {});

  // Convert the grouped data into datasets suitable for Chart.js

  const datasets = Object.entries(groupedData).map(([key, entries]) => {
    const eventType = key.split("-")[0]; // Extract the event type from the key
    return {
      label: key,
      data: entries.map((entry) => ({
        timestamp: entry.timestamp,
        magnitude: entry.magnitude,
      })),
      borderColor: typeColors[eventType],
      backgroundColor: typeColors[eventType].replace("1)", "0.2)"), // Use the same base color but with 0.2 alpha for background
      fill: false,
      parsing: {
        xAxisKey: "timestamp",
        yAxisKey: "magnitude",
      },
    };
  });

  // Configuration options for the chart, including axis scales and labels

  const options = {
    scales: {
      x: {
        type: "time",
        title: {
          display: true,
          text: "Timestamp",
        },
      },
      y: {
        title: {
          display: true,
          text: "Magnitude",
        },
      },
    },
    maintainAspectRatio: false,
  };

  // Render the Line chart component with the prepared datasets and options

  return (
    <div className="chartContainer" style={{ height: "600px" }}>
      <Line data={{ datasets }} options={options} />
    </div>
  );
};

export default SeismicChart;
