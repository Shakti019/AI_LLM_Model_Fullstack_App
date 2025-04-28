import React, { useState } from "react"; 
import "./Dashboard.css";
import Navbar from "./components/Navbar"; 
import UserProfile from "./components/UserProfile";
import Importpost from "./components/Importpost";
import Exportpost from "./components/Exportpost";
import Transportpost from "./components/Transportpost";
import PostController from "./components/postNav";
import TradingList from "./components/TradingList";
import { FaShip, FaFileAlt, FaChartLine, FaPlus, FaUpload, FaSearchLocation, FaCalendarAlt } from "react-icons/fa";

const Dashboard = () => {
  const [blurBackground, setBlurBackground] = useState(false);

  return (
    <div className={`dashboard-container ${blurBackground ? 'background-blur' : ''}`}>
      {/* Navbar at the top */}
      <div className="navbar-container">
        <Navbar />
      </div>

      {/* Main dashboard content */}
      <div className="dashboard-content">
        {/* Left sidebar - User profile and quick stats */}
        <div className="sidebar-left">
          <div className="profile-card">
          </div>
          <div className="quick-links">
            <h4>Quick Links</h4>
            <ul>
              <li><FaPlus className="icon" /><a href="#">Create Shipment</a></li>
              <li><FaUpload className="icon" /><a href="#">Upload Document</a></li>
              <li><FaSearchLocation className="icon" /><a href="#">Track Vessel</a></li>
            </ul>
          </div>
          <div className="quick-stats">
            <div className="stat-card blue">
              <FaShip className="stat-icon" />
              <div>
                <h4>Active Shipments</h4>
                <p className="stat-value">24</p>
                <p className="stat-change">+5% from last week</p>
              </div>
            </div>
            <div className="stat-card orange">
              <FaFileAlt className="stat-icon" />
              <div>
                <h4>Pending Documents</h4>
                <p className="stat-value">8</p>
                <p className="stat-change urgent">3 require attention</p>
              </div>
            </div>
            <div className="stat-card green">
              <FaChartLine className="stat-icon" />
              <div>
                <h4>Revenue (MTD)</h4>
                <p className="stat-value">$124,850</p>
                <p className="stat-change">+12% from last month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area - Shipments and operations */}
        <div className="main-content">
          <div className="dashboard-summary summary-card">
            <h2>Welcome back!</h2>
            <p>Here's a quick overview of your logistics operations today.</p>
          </div>
          {/* Operations controller */}
          <PostController />

          {/* Shipments dashboard */}
          <div className="operations-dashboard">
            <div className="operations-tabs">
              <Importpost />
              <Exportpost />
              <Transportpost />
            </div>
          </div>

          {/* Analytics chart example */}
          <div className="main-analytics">
            <h3>Shipment Volume (Last 6 Months)</h3>
            <div className="chart-placeholder large">
              {/* Replace with real chart */}
              <div className="mock-chart-bar"></div>
            </div>
          </div>

          {/* Recent activity */}
          <div className="recent-activity">
            <h3>Recent Activity</h3>
            <TradingList />
            <table className="recent-shipments-table">
              <thead>
                <tr>
                  <th>Shipment ID</th>
                  <th>Status</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>ETA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#45892</td>
                  <td className="delayed">Delayed</td>
                  <td>Shanghai</td>
                  <td>Rotterdam</td>
                  <td>2024-06-15</td>
                </tr>
                <tr>
                  <td>#45910</td>
                  <td className="in-transit">In Transit</td>
                  <td>LA</td>
                  <td>Tokyo</td>
                  <td>2024-06-18</td>
                </tr>
                <tr>
                  <td>#45922</td>
                  <td className="delivered">Delivered</td>
                  <td>NYC</td>
                  <td>Hamburg</td>
                  <td>2024-06-10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right sidebar - Analytics and notifications */}
        <div className="sidebar-right">
          <div className="analytics-section">
            <h3>Market Analytics</h3>
            <div className="analytics-card">
              <h4>Freight Rates</h4>
              <div className="chart-placeholder">
                <div className="mock-chart">
                  <div className="trend-line up"></div>
                </div>
              </div>
              <p className="analytics-summary">Rates up 3.2% this week</p>
            </div>
            <div className="analytics-card">
              <h4>Port Congestion</h4>
              <div className="chart-placeholder">
                <div className="mock-chart">
                  <div className="trend-line down"></div>
                </div>
              </div>
              <p className="analytics-summary">Improving in Asia, worsening in Europe</p>
            </div>
            <div className="analytics-card">
              <h4>Upcoming Holidays</h4>
              <ul>
                <li>Jun 17: Dragon Boat Festival (China)</li>
                <li>Jul 4: Independence Day (USA)</li>
              </ul>
            </div>
          </div>

          <div className="calendar-section">
            <h3><FaCalendarAlt className="icon" /> Calendar</h3>
            <div className="calendar-placeholder">
              {/* Replace with real calendar */}
              <p>June 2024</p>
            </div>
          </div>

          <div className="notifications-section">
            <h3>Alerts & Notifications</h3>
            <div className="notification urgent">
              <p>Customs clearance delayed for shipment #45892</p>
              <span className="notification-time">2 hours ago</span>
            </div>
            <div className="notification">
              <p>New booking request from ABC Corp</p>
              <span className="notification-time">5 hours ago</span>
            </div>
            <div className="notification">
              <p>Vessel schedule change: MSC Diana</p>
              <span className="notification-time">1 day ago</span>
            </div>
            <div className="notification">
              <p>Reminder: Update insurance documents</p>
              <span className="notification-time">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;