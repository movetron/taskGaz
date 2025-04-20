// src/components/MetricsChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
import "../../styles/metrics.scss"

interface MetricsChartProps {
  labels: string[];
  cpuData: number[];
  memoryData: number[];
  diskData: number[];
}

const MetricsChart: React.FC<MetricsChartProps> = ({
  labels,
  cpuData,
  memoryData,
  diskData,
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: "CPU Utilization (%)",
        data: cpuData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
      {
        label: "Memory Utilization (%)",
        data: memoryData,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
      {
        label: "Disk Utilization (%)",
        data: diskData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: false },
      legend: { position: "bottom" as const },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default MetricsChart;
