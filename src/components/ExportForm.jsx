import React, { useState, useEffect } from "react";
import './ExportForm.css';
import { useNavigate } from "react-router-dom";

const ExportForm = ({ onClose }) => {
  const [ProductName, setProductName] = useState("");
  const [ProductCategory, SetProductCategory] = useState("");
  const [Exportquality, SetExportQuality] = useState("");
  const [ExportproductPricing, setExportproductPricing] = useState("");
  const [locState, SetlocState] = useState("");
  const [loccity, setlocity] = useState("");
  const [Exportlandmark, setlandmark] = useState("");
  const [Exportgps, setExportgps] = useState("");
  const [Exportaddress, setExportaddress] = useState("");
  const [ExportMarket, setExportMarket] = useState("");
  const [Exportdate, setExportdate] = useState("");
  const [MarketAnylsis, setMarketAnylsis] = useState("");
  const [AvailableSupply, setAvailableSupply] = useState("");
  const [visible, setVisible] = useState(true);

  // Stepper and animation states
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleReset = () => {
    setProductName("");
    SetProductCategory("");
    SetExportQuality("");
    setExportproductPricing("");
    SetlocState("");
    setlocity("");
    setlandmark("");
    setExportgps("");
    setExportaddress("");
    setExportMarket("");
    setExportdate("");
    setMarketAnylsis("");
    setAvailableSupply("");
  };

  useEffect(() => {
    // Debug: console.log('Current token:', localStorage.getItem('token'));
  }, []);

  const handleNext = () => setStep((s) => Math.min(s + 1, 2));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let token = localStorage.getItem('token');
      if (!token) {
        alert("Please login first");
        setSubmitting(false);
        return;
      }
      const authToken = `Bearer ${token}`;
      const formattedDate = new Date(Exportdate).toISOString().split('T')[0];
      const formData = {
        user_id: 1,
        product_name: ProductName,
        product_category: ProductCategory,
        quality: Exportquality,
        product_pricing: ExportproductPricing,
        loc_state: locState,
        loc_city: loccity,
        landmark: Exportlandmark,
        gps: Exportgps,
        address: Exportaddress,
        market_type: ExportMarket,
        export_date: formattedDate,
        market_analysis: MarketAnylsis,
        available_supply: AvailableSupply
      };
      const response = await fetch("http://127.0.0.1:5000/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authToken
        },
        body: JSON.stringify(formData)
      });
      const responseData = await response.json();
      if (response.status === 422) {
        alert(`Validation error: ${responseData.error}`);
        setSubmitting(false);
        return;
      }
      if (response.status === 401) {
        localStorage.removeItem('token');
        alert("Session expired. Please login again.");
        navigate('/login');
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
      if (error.message.includes("token")) {
        localStorage.removeItem('token');
        alert("Authentication error. Please login again.");
        navigate('/login');
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  const steps = ["Product", "Location", "Market"];

  return (
    <div className={`form-overlay ${visible ? "visible" : "hidden"}`}>
      <div className="form-content step-animate">
        <button className="close-btn" onClick={handleClose}>x</button>
        <h1 className="Export-heading">Product Export Information</h1>
        <p className="Export-notation">Enter details about your Product export, market and Supply Information</p>
        <div className="step-indicator">
          {steps.map((label, idx) => (
            <div key={label} className={`step-dot${step === idx ? " active" : ""}`}></div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          {step === 0 && (
            <div className="Export-product-details step-animate">
              <h2 className="Export-product">Product Details</h2>
              <label className="Export-label">Product Name*
                <input type="text" className="Export-Input" value={ProductName} onChange={e => setProductName(e.target.value)} required />
              </label>
              <label className="Export-label">Category*
                <select className="Export-Input" value={ProductCategory} onChange={e => SetProductCategory(e.target.value)} required>
                  <option value="">Select Category</option>
                  <option value="Agricultural">Agricultural</option>
                  <option value="Manufactured">Manufactured</option>
                  <option value="Raw Materials">Raw Materials</option>
                  <option value="Technology">Technology</option>
                </select>
              </label>
              <label className="Export-label">Quality Type*
                <select className="Export-Input" value={Exportquality} onChange={e => SetExportQuality(e.target.value)} required>
                  <option value="">Select quality</option>
                  <option value="Premium">Premium</option>
                  <option value="Standard">Standard</option>
                  <option value="Economy">Economy</option>
                  <option value="Custom">Custom</option>
                </select>
              </label>
              <label className="Export-label">Export Price Per Kg(USD)*
                <input type="text" className="Export-Input" value={ExportproductPricing} onChange={e => setExportproductPricing(e.target.value)} required />
              </label>
            </div>
          )}
          {step === 1 && (
            <div className="Export-location-details step-animate">
              <h2 className="Export-location">Location Details</h2>
              <label className="Export-label">State/Province*
                <input type="text" className="Export-Input" value={locState} onChange={e => SetlocState(e.target.value)} required />
              </label>
              <label className="Export-label">City*
                <input type="text" className="Export-Input" value={loccity} onChange={e => setlocity(e.target.value)} required />
              </label>
              <label className="Export-label">Export Facility/Landmark*
                <input type="text" className="Export-Input" value={Exportlandmark} onChange={e => setlandmark(e.target.value)} required />
              </label>
              <label className="Export-label">GPS Location*
                <input type="text" className="Export-Input" value={Exportgps} onChange={e => setExportgps(e.target.value)} required />
              </label>
              <label className="Export-label">Complete Export Address*
                <input type="text" className="Export-Input" value={Exportaddress} onChange={e => setExportaddress(e.target.value)} required />
              </label>
            </div>
          )}
          {step === 2 && (
            <div className="Export-market-information step-animate">
              <h2 className="Export-market-info">Export Market Information</h2>
              <label className="Export-label">Target Market Type*
                <select className="Export-Input" value={ExportMarket} onChange={e => setExportMarket(e.target.value)} required>
                  <option value="">Select Market Type</option>
                  <option value="Wholesale">Wholesale Market</option>
                  <option value="Retail">Retail Market</option>
                  <option value="Direct">Direct to Consumer</option>
                  <option value="International">International Market</option>
                </select>
              </label>
              <label className="Export-label">Export Date*
                <input type="date" className="Export-Input" value={Exportdate} onChange={e => setExportdate(e.target.value)} required />
              </label>
              <label className="Export-label">Available Supply*
                <input type="text" className="Export-Input" value={AvailableSupply} onChange={e => setAvailableSupply(e.target.value)} required />
              </label>
              <label className="Export-label">Export Market Analysis*
                <input type="text" className="Export-Input" value={MarketAnylsis} onChange={e => setMarketAnylsis(e.target.value)} required />
              </label>
            </div>
          )}
          <div className="Export-btn">
            {step > 0 && (
              <button type="button" className="Export-reset-data" onClick={handleBack} disabled={submitting}>Back</button>
            )}
            {step < 2 ? (
              <button type="button" onClick={handleNext} disabled={submitting}>Next</button>
            ) : (
              <>
                <button type="button" className="Export-reset-data" onClick={handleReset} disabled={submitting}>Reset</button>
                <button className="Export-btn" type="submit" disabled={submitting}>Submit</button>
              </>
            )}
          </div>
        </form>
        {(submitting || success) && (
          <div className="success-animation">
            <div className="success-box">
              <div className="checkmark"></div>
              <div>{submitting ? "Submitting..." : "Submission Successful!"}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportForm;