import React from 'react';
import './SidePanel.css';

const Notificate = ({ onClose }) => {
  return (
    <div className="side-panel">
      <div className="side-panel-header">
        <h2>Notifications</h2>
        <button className="close-btn" onClick={onClose}>&times;</button>
      </div>
      <div className="side-panel-content">
        <div className="notification-item urgent">Customs clearance delayed for shipment #45892</div>
        <div className="notification-item">New booking request from ABC Corp</div>
        <div className="notification-item">Vessel schedule change: MSC Diana</div>
        <div className="notification-item">Reminder: Update insurance documents</div>
      </div>
    </div>
  );
};

export default Notificate; 