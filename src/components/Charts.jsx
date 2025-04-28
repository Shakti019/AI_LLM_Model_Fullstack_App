import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Charts.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  // Sample data - replace with your actual data
  const importExportData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Imports',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Exports',
        data: [28, 48, 40, 19, 86, 27],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const regionData = {
    labels: ['Asia', 'Europe', 'North America', 'South America', 'Africa', 'Oceania'],
    datasets: [{
      data: [30, 25, 20, 15, 7, 3],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40'
      ],
    }],
  };

  // Transportation Mode Data
  const transportData = {
    labels: ['Sea', 'Air', 'Road', 'Rail'],
    datasets: [{
      label: 'Transport Distribution (%)',
      data: [45, 25, 20, 10],
      backgroundColor: [
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
      ],
    }],
  };

  // Commodity Types Data
  const commodityData = {
    labels: ['Raw Materials', 'Manufacturing', 'Agriculture', 'Technology', 'Others'],
    datasets: [{
      label: 'Trade Volume by Commodity',
      data: [35, 30, 15, 15, 5],
      backgroundColor: 'rgba(255, 99, 132, 0.7)',
    }],
  };

  // Trade Balance Trends
  const balanceData = {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [{
      label: 'Trade Balance',
      data: [-10, -5, 2, 8, 12],
      borderColor: 'rgb(75, 192, 192)',
      fill: true,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    }],
  };

  // Container Traffic Data
  const containerData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Container Volume (TEUs)',
      data: [500000, 650000, 750000, 850000],
      backgroundColor: 'rgba(153, 102, 255, 0.7)',
    }],
  };

  // Port Performance Data
  const portData = {
    labels: ['Shanghai', 'Singapore', 'Rotterdam', 'Los Angeles', 'Dubai'],
    datasets: [{
      label: 'Annual Throughput (Million Tons)',
      data: [730, 630, 470, 420, 380],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
      ],
    }],
  };

  // Carbon Emissions Data
  const emissionsData = {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [{
      label: 'CO2 Emissions (Million Tons)',
      data: [800, 600, 750, 720, 680],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      tension: 0.4,
    }],
  };

  // New Trade Route Efficiency Data
  const routeEfficiencyData = {
    labels: ['Asia-Europe', 'Asia-NA', 'Europe-NA', 'Asia-ME', 'Europe-Africa'],
    datasets: [{
      label: 'Route Efficiency Score',
      data: [92, 88, 85, 78, 75],
      backgroundColor: [
        'rgba(116, 185, 255, 0.7)',
        'rgba(162, 155, 254, 0.7)',
        'rgba(255, 179, 186, 0.7)',
        'rgba(129, 236, 236, 0.7)',
        'rgba(255, 218, 193, 0.7)',
      ],
      borderWidth: 1,
    }],
  };

  // New Global Market Share Data
  const marketShareData = {
    labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023'],
    datasets: [
      {
        label: 'Emerging Markets',
        data: [35, 38, 42, 45],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
      {
        label: 'Developed Markets',
        data: [65, 62, 58, 55],
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
        borderColor: 'rgba(255, 159, 64, 1)',
      }
    ],
  };

  // Optimized chart options
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          padding: 8,
          font: { size: 11 }
        }
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        padding: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#2c3e50',
        bodyColor: '#2c3e50',
        borderColor: '#e9ecef',
        borderWidth: 1,
      }
    }
  };

  return (
    <div className="charts-container">
      <h1 className="dashboard-title">Global Trade & Transport Analytics</h1>
      <p className="dashboard-description">
        Trade flows, transportation metrics, and environmental impact analysis
      </p>
      
      <div className="charts-grid">
        {/* Main trends - Featured */}
        <div className="chart-section featured">
          <div className="chart-content">
            <h2>Import/Export Trends</h2>
            <p>Monthly comparison of global imports and exports</p>
            <div className="chart-wrapper">
              <Line 
                data={importExportData} 
                options={{
                  ...commonOptions,
                  scales: {
                    y: { beginAtZero: true }
                  }
                }} 
              />
            </div>
          </div>
        </div>

        {/* Regional Distribution */}
        <div className="chart-section">
          <div className="chart-content">
            <h2>Regional Distribution</h2>
            <p>Trade volume by region</p>
            <div className="chart-wrapper">
              <Pie 
                data={regionData} 
                options={{
                  ...commonOptions,
                  plugins: {
                    ...commonOptions.plugins,
                    legend: { position: 'right' }
                  }
                }} 
              />
            </div>
          </div>
        </div>

        {/* Transport Modes */}
        <div className="chart-section">
          <div className="chart-content">
            <h2>Transport Modes</h2>
            <p>Distribution by transport method</p>
            <div className="chart-wrapper">
              <Pie 
                data={transportData} 
                options={{
                  ...commonOptions,
                  plugins: {
                    ...commonOptions.plugins,
                    legend: { position: 'right' }
                  }
                }} 
              />
            </div>
          </div>
        </div>

        {/* Commodity Distribution */}
        <div className="chart-section">
          <div className="chart-content">
            <h2>Commodity Types</h2>
            <p>Trade volume by commodity</p>
            <div className="chart-wrapper">
              <Bar 
                data={commodityData} 
                options={{
                  ...commonOptions,
                  scales: {
                    y: { beginAtZero: true }
                  }
                }} 
              />
            </div>
          </div>
        </div>

        {/* Trade Balance */}
        <div className="chart-section">
          <div className="chart-content">
            <h2>Trade Balance</h2>
            <p>Annual trade balance trends</p>
            <div className="chart-wrapper">
              <Line 
                data={balanceData} 
                options={commonOptions} 
              />
            </div>
          </div>
        </div>

        {/* Container Traffic */}
        

        {/* Bottom Featured - Market Share */}
        <div className="chart-section bottom-featured">
          <div className="chart-content">
            <h2>Market Distribution Trends</h2>
            <p>Emerging vs Developed Markets</p>
            <div className="chart-wrapper">
              <Bar 
                data={marketShareData} 
                options={{
                  ...commonOptions,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      ticks: { callback: value => `${value}%` }
                    }
                  }
                }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts; 