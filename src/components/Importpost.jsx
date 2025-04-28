import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Importpost.css';
import Confetti from 'react-confetti';

const Importpost = () => {
    const [imports, setImports] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [celebrating, setCelebrating] = useState(false);
    const [celebratedItem, setCelebratedItem] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchImports();
    }, []);

    const fetchImports = async () => {
        try {
            const response = await fetch('http://localhost:5000/importpost', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setImports(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch import posts');
            setLoading(false);
        }
    };

    const handleDeal = (importId) => {
        // Set celebrating state and which item is being celebrated
        setCelebratedItem(importId);
        setCelebrating(true);
        
        // After 3 seconds, stop the celebration
        setTimeout(() => {
            setCelebrating(false);
            setCelebratedItem(null);
        }, 3000);
        
        // Your original deal functionality
        console.log('Making deal for import:', importId);
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
                />
            )}
            
            <div className="import-posts-wrapper">
                {loading && <div className="loading">Loading...</div>}
                {error && <div className="error">{error}</div>}

                <div className="scrollable-container">
                    <div className="posts-grid">
                        {imports.map((importItem) => (
                            <div key={importItem.id} className="post-card">
                                <div className="post-header">
                                    <div className="user-info">
                                        <img 
                                            src={`https://ui-avatars.com/api/?name=${importItem.user_name}`} 
                                            alt="User" 
                                            className="user-avatar"
                                        />
                                        <span className="username">{importItem.user_name}</span>
                                    </div>
                                    <span className="post-date">
                                        {new Date(importItem.import_date).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="post-content">
                                    <h3>{importItem.product_name}</h3>
                                    <div className="product-details">
                                        <span className="tag">Category: {importItem.product_category}</span>
                                        <span className="tag">Quality: {importItem.quality}</span>
                                        <span className="price">Price: ${importItem.product_pricing}</span>
                                    </div>
                                    
                                    <div className="location-details">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <span>{`${importItem.loc_city}, ${importItem.loc_state}`}</span>
                                    </div>

                                    <div className="market-details">
                                        <p><strong>Source Market:</strong> {importItem.source_market}</p>
                                        <p><strong>Required Quantity:</strong> {importItem.required_quantity}</p>
                                        <p className="market-analysis">{importItem.market_analysis}</p>
                                    </div>
                                </div>

                                <div className="post-actions">
                                    <button 
                                        className={`deal-button ${celebratedItem === importItem.id ? 'celebrating' : ''}`}
                                        onClick={() => handleDeal(importItem.id)}
                                        disabled={celebrating && celebratedItem === importItem.id}
                                    >
                                        {celebratedItem === importItem.id ? (
                                            <>
                                                🎉 Deal Made! 🎉
                                                <div className="emoji-celebration">
                                                    <span className="emoji">🎉</span>
                                                    <span className="emoji">✨</span>
                                                    <span className="emoji">🥳</span>
                                                    <span className="emoji">👍</span>
                                                </div>
                                            </>
                                        ) : (
                                            "Make Deal"
                                        )}
                                    </button>
                                    <div className="action-buttons">
                                        <button className="action-btn">
                                            <i className="fas fa-share"></i> Share
                                        </button>
                                        <button className="action-btn">
                                            <i className="fas fa-bookmark"></i> Save
                                        </button>
                                        <button className="action-btn">
                                            <i className="fas fa-ellipsis-h"></i> More
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

export default Importpost;