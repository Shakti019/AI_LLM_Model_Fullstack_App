import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Transportpost.css";
import Confetti from 'react-confetti';
import { FaShare, FaBookmark, FaEllipsisH } from 'react-icons/fa';

const Transportpost = () => {
    const [transports, setTransports] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [celebrating, setCelebrating] = useState(false);
    const [celebratedItem, setCelebratedItem] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTransports();
    }, []);

    const fetchTransports = async () => {
        try {
            const response = await fetch("http://localhost:5000/transportpost", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            setTransports(data);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch transport posts");
            setLoading(false);
        }
    };

    const handleDeal = (transportId) => {
        // Set celebrating state and which item is being celebrated
        setCelebratedItem(transportId);
        setCelebrating(true);
        
        // After 6 seconds, stop the celebration
        setTimeout(() => {
            setCelebrating(false);
            setCelebratedItem(null);
        }, 6000);
        
        // Your original deal functionality
        console.log("Making deal for transport:", transportId);
    };

    return (
        <div className="import-container">
            {/* Confetti effect for celebration */}
            {celebrating && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={500}
                    gravity={0.2}
                    tweenDuration={6000}
                />
            )}
            
            <div className="scrollable-wrapper">
                {loading && <div className="loading">Loading...</div>}
                {error && <div className="error">{error}</div>}
                <div className="posts-grid">
                    {transports.map((transport) => (
                        <div key={transport.id} className="post-card">
                            <div className="post-header">
                                <div className="user-info">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${transport.user_name}`}
                                        alt="User"
                                        className="user-avatar"
                                    />
                                    <span className="username">{transport.user_name}</span>
                                </div>
                                <span className="post-date">
                                    {new Date(transport.transport_date).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="post-content">
                                <h3>{transport.vehicle_type}</h3>
                                <div className="product-details">
                                    <span className="tag">Mode: {transport.transport_mode}</span>
                                    <span className="tag">Capacity: {transport.vehicle_capacity}</span>
                                    <span className="price">Cost: ${transport.transport_cost}</span>
                                </div>
                                <div className="location-details">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>
                                        {`${transport.pickup_city}, ${transport.pickup_state} to ${transport.delivery_city}, ${transport.delivery_state}`}
                                    </span>
                                </div>
                                <div className="market-details">
                                    <p>
                                        <strong>Estimated Time:</strong> {transport.estimated_time}
                                    </p>
                                </div>
                            </div>

                            <div className="post-actions">
                                <button 
                                    className={`deal-button ${celebratedItem === transport.id ? 'celebrating' : ''}`}
                                    onClick={() => handleDeal(transport.id)}
                                    disabled={celebrating && celebratedItem === transport.id}
                                >
                                    {celebratedItem === transport.id ? (
                                        <>
                                            🚛 Deal Confirmed! 🚛
                                            <div className="emoji-celebration">
                                                <span className="emoji">🚛</span>
                                                <span className="emoji">📦</span>
                                                <span className="emoji">🚚</span>
                                                <span className="emoji">💰</span>
                                                <span className="emoji">✈️</span>
                                            </div>
                                        </>
                                    ) : (
                                        "Make Deal"
                                    )}
                                </button>
                                <div className="action-buttons">
                                    <button className="action-btn">
                                        <FaShare /> Share
                                    </button>
                                    <button className="action-btn">
                                        <FaBookmark /> Save
                                    </button>
                                    <button className="action-btn">
                                        <FaEllipsisH /> More
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Transportpost;