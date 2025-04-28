import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const barData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Market Volume",
      data: [120, 190, 300, 500, 200],
      backgroundColor: [
        "#2563eb", "#14b8a6", "#f59e42", "#22c55e", "#7c3aed"
      ],
      borderRadius: 10,
      borderSkipped: false,
    },
  ],
};

const pieData = {
  labels: ["Import", "Export", "Transport"],
  datasets: [
    {
      data: [40, 35, 25],
      backgroundColor: [
        "#2563eb", "#14b8a6", "#f59e42"
      ],
      borderColor: "#fff",
      borderWidth: 2,
    },
  ],
};

export default function AnalyticsCharts() {
  return (
    <div className="charts-wrapper">
      <div className="chart-card animate-fadein">
        <h4>Market Volume</h4>
        <Bar data={barData} options={{
          plugins: { legend: { display: false } },
          scales: { 
            x: { grid: { color: "#e5e7eb" }, ticks: { color: "#6b7280" } }, 
            y: { grid: { color: "#e5e7eb" }, ticks: { color: "#6b7280" } } 
          }
        }} />
      </div>
      <div className="chart-card animate-fadein">
        <h4>Trade Distribution</h4>
        <Pie data={pieData} options={{
          plugins: { legend: { labels: { color: "#22223b", font: { size: 14 } } } }
        }} />
      </div>
    </div>
  );
}
