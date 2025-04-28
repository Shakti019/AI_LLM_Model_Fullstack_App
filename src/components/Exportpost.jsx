import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Exportpost.css';
import Confetti from 'react-confetti';
import { FaShare, FaBookmark, FaEllipsisH } from 'react-icons/fa';

const Exportpost = () => {
    const [exports, setExports] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [celebrating, setCelebrating] = useState(false);
    const [celebratedItem, setCelebratedItem] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchExports();
    }, []);

    const fetchExports = async () => {
        try {
            const response = await fetch('http://localhost:5000/exportpost', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setExports(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch export posts');
            setLoading(false);
        }
    };

    const handleDeal = (exportId) => {
        // Set celebrating state and which item is being celebrated
        setCelebratedItem(exportId);
        setCelebrating(true);
        
        // After 6 seconds, stop the celebration
        setTimeout(() => {
            setCelebrating(false);
            setCelebratedItem(null);
        }, 6000);
        
        // Your original deal functionality
        console.log('Making deal for export:', exportId);
    };

    return (
        <div className="export-container">
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
            
            <div className="export-posts-wrapper">
                {loading && <div className="loading">Loading...</div>}
                {error && <div className="error">{error}</div>}

                <div className="scrollable-container">
                    <div className="posts-grid">
                        {exports.map((exportItem) => (
                            <div key={exportItem.id} className="post-card">
                                <div className="post-header">
                                    <div className="user-info">
                                        <img 
                                            src={`https://ui-avatars.com/api/?name=${exportItem.user_name}`} 
                                            alt="User" 
                                            className="user-avatar"
                                        />
                                        <span className="username">{exportItem.user_name}</span>
                                    </div>
                                    <span className="post-date">
                                        {new Date(exportItem.export_date).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="post-content">
                                    <h3>{exportItem.product_name}</h3>
                                    <div className="product-details">
                                        <span className="tag">Category: {exportItem.product_category}</span>
                                        <span className="tag">Quality: {exportItem.quality}</span>
                                        <span className="price">Price: ${exportItem.product_pricing}</span>
                                    </div>
                                    
                                    <div className="location-details">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <span>{`${exportItem.loc_city}, ${exportItem.loc_state}`}</span>
                                    </div>

                                    <div className="market-details">
                                        <p><strong>Market Type:</strong> {exportItem.market_type}</p>
                                        <p><strong>Available Supply:</strong> {exportItem.available_supply}</p>
                                    </div>
                                </div>

                                <div className="post-actions">
                                    <button 
                                        className={`deal-button ${celebratedItem === exportItem.id ? 'celebrating' : ''}`}
                                        onClick={() => handleDeal(exportItem.id)}
                                        disabled={celebrating && celebratedItem === exportItem.id}
                                    >
                                        {celebratedItem === exportItem.id ? (
                                            <>
                                                🎉 Deal Successful! 🎉
                                                <div className="emoji-celebration">
                                                    <span className="emoji">🚀</span>
                                                    <span className="emoji">💰</span>
                                                    <span className="emoji">🤝</span>
                                                    <span className="emoji">🎊</span>
                                                    <span className="emoji">💸</span>
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
        </div>
    );
};

export default Exportpost;