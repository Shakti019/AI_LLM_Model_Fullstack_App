import React, { useState, useEffect } from 'react';
import { FaUser, FaBuilding, FaMapMarkerAlt, FaChartBar, FaFileExport, FaFileImport, FaTruck } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import './UserProfile.css';

const UserProfile = () => {
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
    stats: {  // Ensure stats are initialized with default values
      exports: 0,
      imports: 0,
      transports: 0,
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');  // Get token from localStorage
    if (token) {
      const decodedToken = atob(token.split('.')[1]);  // Decode the payload part of the JWT
      console.log('Decoded Token:', decodedToken);
    }

    if (!token) {
      alert('No token found');
      setLoading(false);
      return;
    }

    // Fetch user profile from the Flask API
    fetch('http://localhost:5000/user/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`  // Add the Bearer token here
      }
    })
      .then(response => {
        if (!response.ok) {
          console.error(`Error: ${response.status} - ${response.statusText}`);
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        if (data.message) {
          setError(data.message);
        } else {
          // Ensure stats is an object before setting it
          setUserData({
            ...data,
            stats: data.stats || { exports: 0, imports: 0, transports: 0 }  // Fallback to default values if stats is missing
          });
        }
        setLoading(false);
      })
      .catch(error => {
        setError(error.message || 'Error fetching user profile');
        setLoading(false);
      });
  }, []);  // Empty dependency array to run effect only once

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <FaUser className="avatar-icon" />
        </div>
        <h2>{userData.name || 'User Name'}</h2>
        
      </div>
      <p className="agency-name">{userData.agency_name || 'Agency N/A'}</p>
      <p className="user-category">{userData.category || 'Category N/A'}</p>
      
      <div className="profile-grid">
        <div className="profile-card">
          <div className="card-header">
            <FaUser className="card-icon" />
            <h3>Contact Info</h3>
          </div>
          <div className="card-content">
            <div className="info-item">
              <MdEmail />
              <span>{userData.email || 'N/A'}</span>
            </div>
            <div className="info-item">
              <MdPhone />
              <span>{userData.phone || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <div className="card-header">
            <FaMapMarkerAlt className="card-icon" />
            <h3>Location</h3>
          </div>
          <div className="card-content">
            <div className="info-item">
              <span>{userData.country || 'N/A'}</span>
              {userData.state && <span> - {userData.state}</span>}
            </div>
            <div className="info-item">
              <span>{userData.region || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <div className="card-header">
            <FaChartBar className="card-icon" />
            <h3>Transaction Stats</h3>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <FaFileExport className="stat-icon" />
              <span className="stat-value">{userData.stats.exports}</span>
              <span className="stat-label">Exports</span>
            </div>
            <div className="stat-item">
              <FaFileImport className="stat-icon" />
              <span className="stat-value">{userData.stats.imports}</span>
              <span className="stat-label">Imports</span>
            </div>
            <div className="stat-item">
              <FaTruck className="stat-icon" />
              <span className="stat-value">{userData.stats.transports}</span>
              <span className="stat-label">Transports</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
