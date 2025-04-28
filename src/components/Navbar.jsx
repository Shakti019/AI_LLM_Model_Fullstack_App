import React, { useState } from "react";
import './Navbar.css';
import {
  FaHome,
  FaDownload,
  FaUpload,
  FaTruck,
  FaUser,
  FaChartLine,
  FaBell,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaRobot,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ExportForm from "./ExportForm"; // Import the ExportForm component
import ImportForm from "./ImportForm"; // Import the ImportForm component
import TransportForm from "./TransportForm"; // Import the TransportForm component
import Message from "./Message";
import Notificate from "./Notificate";
// Import the SettingsForm component

const Navbar = () => {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState(null); // Track which form is active
  const [showMessage, setShowMessage] = useState(false);
  const [showNotificate, setShowNotificate] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleButtonClick = (formType) => {
    if (formType === "trends") {
      navigate("/charts"); // Navigate to charts page
    } else if (formType === "profile") {
      navigate("/profile"); // Navigate to profile page
    } else if (formType === "ai-chat") {
      navigate("/ai-chat");
    } else if (formType === "messages") {
      setShowMessage(true);
    } else if (formType === "notifications") {
      setShowNotificate(true);
    } else {
      setActiveForm(formType);
    }
  };

  const handleCloseForm = () => {
    setActiveForm(null); // Close the form by resetting the active form type
  };

  return (
    <>
      <nav className="navbar">
        {/* Dashboard Button */}
        <button className="nav-button" onClick={() => handleButtonClick("dashboard")}>
          <FaHome className="nav-icon" />
          <span className="nav-label">Dashboard</span>
        </button>

        {/* AI Chat Button */}
        <button className="nav-button" onClick={() => handleButtonClick("ai-chat")}>
          <FaRobot className="nav-icon" />
          <span className="nav-label">AI Assistant</span>
        </button>

        {/* Import Button */}
        <button className="nav-button" onClick={() => handleButtonClick("import")}>
          <FaDownload className="nav-icon" />
          <span className="nav-label">Import</span>
        </button>

        {/* Export Button */}
        <button className="nav-button" onClick={() => handleButtonClick("export")}>
          <FaUpload className="nav-icon" />
          <span className="nav-label">Export</span>
        </button>

        {/* Transport Button */}
        <button className="nav-button" onClick={() => handleButtonClick("transport")}>
          <FaTruck className="nav-icon" />
          <span className="nav-label">Transport</span>
        </button>

        {/* Trends Button */}
        <button className="nav-button" onClick={() => handleButtonClick("trends")}>
          <FaChartLine className="nav-icon" />
          <span className="nav-label">Trends</span>
        </button>

        {/* Notifications Button */}
        <button className="nav-button" onClick={() => handleButtonClick("notifications")}>
          <FaBell className="nav-icon" />
          <span className="nav-label">Notifications</span>
        </button>

        {/* Messages Button */}
        <button className="nav-button" onClick={() => handleButtonClick("messages")}>
          <FaEnvelope className="nav-icon" />
          <span className="nav-label">Messages</span>
        </button>

        {/* Profile Button */}
        <button className="nav-button" onClick={() => handleButtonClick("profile")}>
          <FaUser className="nav-icon" />
          <span className="nav-label">Profile</span>
        </button>

        {/* Settings Button */}
        <button className="nav-button" onClick={() => handleButtonClick("settings")}>
          <FaCog className="nav-icon" />
          <span className="nav-label">Settings</span>
        </button>

        {/* Logout Button */}
        <button className="nav-button" onClick={handleLogout}>
          <FaSignOutAlt className="nav-icon" />
          <span className="nav-label">Logout</span>
        </button>
      </nav>

      {/* Render the appropriate form based on activeForm */}
      {activeForm === "import" && <ImportForm onClose={handleCloseForm} />}
      {activeForm === "export" && <ExportForm onClose={handleCloseForm} />}
      {activeForm === "transport" && <TransportForm onClose={handleCloseForm} />}
      {showMessage && <Message onClose={() => setShowMessage(false)} />}
      {showNotificate && <Notificate onClose={() => setShowNotificate(false)} />}
    </>
  );
};

export default Navbar;