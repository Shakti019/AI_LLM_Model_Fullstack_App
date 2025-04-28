import React, { useEffect } from "react";
import './ImportForm.css';
import { useState } from "react";

const ImportForm = ({ onClose }) => {
  const [ProductName, setProductName] = useState("");
  const [ProductCategory, setProductCategory] = useState("");
  const [ImportQuality, setImportQuality] = useState("");
  const [ImportProductPricing, setImportProductPricing] = useState("");
  const [locState, setLocState] = useState("");
  const [locCity, setLocCity] = useState("");
  const [ImportLandmark, setImportLandmark] = useState("");
  const [ImportGPS, setImportGPS] = useState("");
  const [ImportAddress, setImportAddress] = useState("");
  const [ImportSource, setImportSource] = useState("");
  const [ImportDate, setImportDate] = useState("");
  const [MarketAnalysis, setMarketAnalysis] = useState("");
  const [RequiredQuantity, setRequiredQuantity] = useState("");
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log('Current token:', localStorage.getItem('token'));
  }, []);

  const handleClose = () => {
    setVisible(false); // Trigger the fade-out transition
    setTimeout(() => {
      onClose(); // Call the onClose prop after the transition completes
    }, 500); // Match the duration of the CSS transition (500ms)
  };

  const handleReset = () => {
    setProductName("");
    setProductCategory("");
    setImportQuality("");
    setImportProductPricing("");
    setLocState("");
    setLocCity("");
    setImportLandmark("");
    setImportGPS("");
    setImportAddress("");
    setImportSource("");
    setImportDate("");
    setMarketAnalysis("");
    setRequiredQuantity("");
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 2));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Get token and check format
      let token = localStorage.getItem('token');
      console.log('Original token:', token); // Debug log

      if (!token) {
        alert("Please login first");
        setSubmitting(false);
        return;
      }

      // Add Bearer prefix for API calls
      const authToken = `Bearer ${token}`;
      console.log('Token being used:', authToken); // Debug log

      // Format the date as YYYY-MM-DD
      const formattedDate = new Date(ImportDate).toISOString().split('T')[0];

      const formData = {
        user_id: 1, // Replace with the actual user ID (retrieve it from the token or context)
        product_name: ProductName,
        product_category: ProductCategory,
        quality: ImportQuality,
        product_pricing: ImportProductPricing,
        loc_state: locState,
        loc_city: locCity,
        landmark: ImportLandmark,
        gps: ImportGPS,
        address: ImportAddress,
        source_market: ImportSource,
        import_date: formattedDate, // Use the formatted date
        market_analysis: MarketAnalysis,
        required_quantity: RequiredQuantity
      };

      console.log('Sending data:', formData); // Debug log

      const response = await fetch("http://127.0.0.1:5000/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authToken
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (response.status === 422 || response.status === 401) {
        // Token issue - clear token and redirect to login
        localStorage.removeItem('token');
        alert("Session expired. Please login again.");
        // Add your login redirect logic here
        setSubmitting(false);
        return;
      }

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to submit form");
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSubmitting(false);
        handleReset();
        handleClose();
      }, 2000);

    } catch (error) {
      setSubmitting(false);
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Add your logout logic here
  };

  // Step indicator
  const steps = ["Product", "Location", "Market"];

  return (
    <div className={`form-overlay ${visible ? "visible" : "hidden"}`}>
      <div className="form-content step-animate">
        <button className="close-btn" onClick={handleClose}>x</button>
        <h1 className="Import-heading">Product Import Information</h1>
        <p className="Import-notation">Enter details about your Product import, market and Supply Requirements</p>
        <div className="step-indicator">
          {steps.map((label, idx) => (
            <div key={label} className={`step-dot${step === idx ? " active" : ""}`}></div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          {step === 0 && (
            <div className="Import-product-details step-animate">
              <h2 className="Import-product">Product Details</h2>
              <label className="Import-label">Product Name*
                <input type="text" className="Import-Input" value={ProductName} onChange={e => setProductName(e.target.value)} required />
              </label>
              <label className="Import-label">Category*
                <select className="Import-Input" value={ProductCategory} onChange={e => setProductCategory(e.target.value)} required>
                  <option value="">Select Category</option>
                  <option value="Raw Materials">Raw Materials</option>
                  <option value="Finished Goods">Finished Goods</option>
                  <option value="Semi-Finished">Semi-Finished</option>
                  <option value="Machinery">Machinery</option>
                </select>
              </label>
              <label className="Import-label">Quality Type*
                <select className="Import-Input" value={ImportQuality} onChange={e => setImportQuality(e.target.value)} required>
                  <option value="">Select quality</option>
                  <option value="Premium">Premium</option>
                  <option value="Standard">Standard</option>
                  <option value="Economy">Economy</option>
                  <option value="Custom">Custom</option>
                </select>
              </label>
              <label className="Import-label">Import Price Per Unit(USD)*
                <input type="number" step="0.01" min="0" className="Import-Input" value={ImportProductPricing} onChange={e => setImportProductPricing(e.target.value)} required />
              </label>
            </div>
          )}
          {step === 1 && (
            <div className="Import-location-details step-animate">
              <h2 className="Import-location">Location Details</h2>
              <label className="Import-label">State/Province*
                <input type="text" className="Import-Input" value={locState} onChange={e => setLocState(e.target.value)} required />
              </label>
              <label className="Import-label">City*
                <input type="text" className="Import-Input" value={locCity} onChange={e => setLocCity(e.target.value)} required />
              </label>
              <label className="Import-label">Import Facility/Landmark*
                <input type="text" className="Import-Input" value={ImportLandmark} onChange={e => setImportLandmark(e.target.value)} required />
              </label>
              <label className="Import-label">GPS Location*
                <input type="text" className="Import-Input" value={ImportGPS} onChange={e => setImportGPS(e.target.value)} required />
              </label>
              <label className="Import-label">Complete Import Address*
                <input type="text" className="Import-Input" value={ImportAddress} onChange={e => setImportAddress(e.target.value)} required />
              </label>
            </div>
          )}
          {step === 2 && (
            <div className="Import-market-information step-animate">
              <h2 className="Import-market-info">Import Market Information</h2>
              <label className="Import-label">Source Market*
                <select className="Import-Input" value={ImportSource} onChange={e => setImportSource(e.target.value)} required>
                  <option value="">Select Source Market</option>
                  <option value="International">International</option>
                  <option value="Domestic">Domestic</option>
                  <option value="Regional">Regional</option>
                </select>
              </label>
              <label className="Import-label">Import Date*
                <input type="date" className="Import-Input" value={ImportDate} onChange={e => setImportDate(e.target.value)} required />
              </label>
              <label className="Import-label">Required Quantity*
                <input type="text" className="Import-Input" value={RequiredQuantity} onChange={e => setRequiredQuantity(e.target.value)} required />
              </label>
              <label className="Import-label">Market Analysis*
                <input type="text" className="Import-Input" value={MarketAnalysis} onChange={e => setMarketAnalysis(e.target.value)} required />
              </label>
            </div>
          )}
          <div className="Import-btn">
            {step > 0 && (
              <button type="button" className="Import-reset-data" onClick={handleBack} disabled={submitting}>Back</button>
            )}
            {step < 2 ? (
              <button type="button" onClick={handleNext} disabled={submitting}>Next</button>
            ) : (
              <>
                <button type="button" className="Import-reset-data" onClick={handleReset} disabled={submitting}>Reset</button>
                <button className="Import-btn" type="submit" disabled={submitting}>Submit</button>
              </>
            )}
          </div>
        </form>
      </div>
      {(submitting || success) && (
        <div className="success-animation">
          <div className="success-box">
            <div className="checkmark"></div>
            <div>{submitting ? "Submitting..." : "Submission Successful!"}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportForm;