import React from 'react';
import './SidePanel.css';

const Message = ({ onClose }) => {
  return (
    <div className="side-panel">
      <div className="side-panel-header">
        <h2>Messages</h2>
        <button className="close-btn" onClick={onClose}>&times;</button>
      </div>
      <div className="side-panel-content">
        {/* Example chat UI */}
        <div className="chat-message received">Hello! How can I help you?</div>
        <div className="chat-message sent">I have a question about my shipment.</div>
        <div className="chat-input-container">
          <input type="text" className="chat-input" placeholder="Type a message..." />
          <button className="send-btn">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Message; 