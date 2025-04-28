import React, { useState, useEffect } from 'react';

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaIdCard,
  FaGlobe,
  FaFlag,
  FaMapPin,
  FaTags,
  FaBoxOpen,
  FaShippingFast,
  FaTruck
} from 'react-icons/fa';
import { Line, Bar, Pie, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './EnhancedProfile.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const EnhancedProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    agency_name: '',
    agency_number: '',
    agency_address: '',
    country: '',
    state: '',
    region: '',
    category: '',
    stats: {
      exports: 0,
      imports: 0,
      transports: 0,
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample data for the growth chart
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Account Activity',
        data: [10, 25, 45, 30, 60, 80],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  // Add missing chart data
  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Daily Activity',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    }]
  };

  const pieChartData = {
    labels: ['Completed', 'Pending', 'Failed'],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
        'rgba(75, 192, 192, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(255, 99, 132, 0.5)',
      ],
    }]
  };

  const radarChartData = {
    labels: ['Speed', 'Reliability', 'Quality', 'Response', 'Accuracy'],
    datasets: [{
      label: 'Performance',
      data: [85, 75, 90, 80, 85],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
    }]
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found');
      setLoading(false);
      return;
    }

    fetch('http://localhost:5000/user/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch data');
        return response.json();
      })
      .then(data => {
        setUserData({
          ...data,
          stats: data.stats || { exports: 0, imports: 0, transports: 0 }
        });
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );
  
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <FaUser />
          </div>
          <div className="profile-title">
            <h2>{userData.name || 'N/A'}</h2>
            <p>{userData.email || 'N/A'}</p>
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="info-cards-grid">
          {/* Personal Information Card */}
          <div className="info-card">
            <h3><FaUser className="icon" />Personal Details</h3>
            <div className="info-content">
              <p><FaUser className="icon" />{userData.name || 'N/A'}</p>
              <p><FaEnvelope className="icon" />{userData.email || 'N/A'}</p>
              <p><FaPhone className="icon" />{userData.phone || 'N/A'}</p>
              <p><FaMapMarkerAlt className="icon" />{userData.address || 'N/A'}</p>
            </div>
          </div>

          {/* Agency Information Card */}
          <div className="info-card">
            <h3><FaBuilding className="icon" />Agency Information</h3>
            <div className="info-content">
              <p><FaBuilding className="icon" />{userData.agency_name || 'N/A'}</p>
              <p><FaIdCard className="icon" />{userData.agency_number || 'N/A'}</p>
              <p><FaMapMarkerAlt className="icon" />{userData.agency_address || 'N/A'}</p>
            </div>
          </div>

          {/* Location Details Card */}
          <div className="info-card">
            <h3><FaGlobe className="icon" />Location Details</h3>
            <div className="info-content">
              <p><FaGlobe className="icon" />{userData.country || 'N/A'}</p>
              <p><FaFlag className="icon" />{userData.state || 'N/A'}</p>
              <p><FaMapPin className="icon" />{userData.region || 'N/A'}</p>
              <p><FaTags className="icon" />{userData.category || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="stats-grid">
          <div className="stats-card exports">
            <FaBoxOpen className="stats-icon" />
            <p className="stats-value">{userData.stats.exports}</p>
            <p className="stats-label">Exports</p>
          </div>
          <div className="stats-card imports">
            <FaShippingFast className="stats-icon" />
            <p className="stats-value">{userData.stats.imports}</p>
            <p className="stats-label">Imports</p>
          </div>
          <div className="stats-card transports">
            <FaTruck className="stats-icon" />
            <p className="stats-value">{userData.stats.transports}</p>
            <p className="stats-label">Transports</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Account Growth</h3>
            <Line data={chartData} options={{ responsive: true }} />
          </div>
          <div className="chart-card">
            <h3>Daily Activity</h3>
            <Bar data={barChartData} options={{ responsive: true }} />
          </div>
          <div className="chart-card">
            <h3>Transaction Status</h3>
            <Pie data={pieChartData} options={{ responsive: true }} />
          </div>
          <div className="chart-card">
            <h3>Performance Analysis</h3>
            <Radar data={radarChartData} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProfile; 