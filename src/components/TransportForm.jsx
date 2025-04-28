import React, { useState } from "react";
import './TransportForm.css';

const TransportForm = ({ onClose }) => {
  const [VehicleType, setVehicleType] = useState("");
  const [VehicleCapacity, setVehicleCapacity] = useState("");
  const [TransportMode, setTransportMode] = useState("");
  const [TransportCost, setTransportCost] = useState("");
  const [PickupState, setPickupState] = useState("");
  const [PickupCity, setPickupCity] = useState("");
  const [PickupLandmark, setPickupLandmark] = useState("");
  const [PickupGPS, setPickupGPS] = useState("");
  const [PickupAddress, setPickupAddress] = useState("");
  const [DeliveryState, setDeliveryState] = useState("");
  const [DeliveryCity, setDeliveryCity] = useState("");
  const [DeliveryLandmark, setDeliveryLandmark] = useState("");
  const [DeliveryGPS, setDeliveryGPS] = useState("");
  const [DeliveryAddress, setDeliveryAddress] = useState("");
  const [EstimatedTime, setEstimatedTime] = useState("");
  const [TransportDate, setTransportDate] = useState("");
  const [AdditionalNotes, setAdditionalNotes] = useState("");
  const [visible, setVisible] = useState(true);

  // Stepper and animation states
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleReset = () => {
    setVehicleType("");
    setVehicleCapacity("");
    setTransportMode("");
    setTransportCost("");
    setPickupState("");
    setPickupCity("");
    setPickupLandmark("");
    setPickupGPS("");
    setPickupAddress("");
    setDeliveryState("");
    setDeliveryCity("");
    setDeliveryLandmark("");
    setDeliveryGPS("");
    setDeliveryAddress("");
    setEstimatedTime("");
    setTransportDate("");
    setAdditionalNotes("");
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const formData = {
        user_id: 1,
        VehicleType,
        VehicleCapacity,
        TransportMode,
        TransportCost,
        PickupState,
        PickupCity,
        PickupLandmark,
        PickupGPS,
        PickupAddress,
        DeliveryState,
        DeliveryCity,
        DeliveryLandmark,
        DeliveryGPS,
        DeliveryAddress,
        EstimatedTime,
        TransportDate,
        AdditionalNotes
      };

      const response = await fetch("http://127.0.0.1:5000/transport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      await response.json();
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSubmitting(false);
        handleReset();
        handleClose();
      }, 2000);
    } catch (error) {
      setSubmitting(false);
      console.error("Error submitting form:", error);
    }
  };

  const steps = ["Vehicle", "Pickup", "Delivery", "Additional"];

  return (
    <div className={`form-overlay ${visible ? "visible" : "hidden"}`}>
      <div className="form-content step-animate">
        <button className="close-btn" onClick={handleClose}>x</button>
        <h1 className="Transport-heading">Transport Information</h1>
        <p className="Transport-notation">Enter details about your transport requirements and delivery information</p>
        <div className="step-indicator">
          {steps.map((label, idx) => (
            <div key={label} className={`step-dot${step === idx ? " active" : ""}`}></div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          {step === 0 && (
            <div className="Transport-vehicle-details step-animate">
              <h2 className="Transport-vehicle">Vehicle Details</h2>
              <label className="Transport-label">Vehicle Type*
                <select className="Transport-Input" value={VehicleType} onChange={e => setVehicleType(e.target.value)} required>
                  <option value="">Select Vehicle Type</option>
                  <option value="Truck">Truck</option>
                  <option value="Van">Van</option>
                  <option value="Container">Container</option>
                  <option value="Refrigerated">Refrigerated</option>
                </select>
              </label>
              <label className="Transport-label">Vehicle Capacity*
                <input type="text" placeholder="Enter capacity in tons" className="Transport-Input" value={VehicleCapacity} onChange={e => setVehicleCapacity(e.target.value)} required />
              </label>
              <label className="Transport-label">Transport Mode*
                <select className="Transport-Input" value={TransportMode} onChange={e => setTransportMode(e.target.value)} required>
                  <option value="">Select Mode</option>
                  <option value="Road">Road</option>
                  <option value="Rail">Rail</option>
                  <option value="Air">Air</option>
                  <option value="Sea">Sea</option>
                </select>
              </label>
              <label className="Transport-label">Transport Cost (USD)*
                <input type="text" placeholder="$ 0.00" className="Transport-Input" value={TransportCost} onChange={e => setTransportCost(e.target.value)} required />
              </label>
            </div>
          )}
          {step === 1 && (
            <div className="Transport-pickup-details step-animate">
              <h2 className="Transport-pickup">Pickup Details</h2>
              <label className="Transport-label">State/Province*
                <input type="text" placeholder="Enter pickup state/province" className="Transport-Input" value={PickupState} onChange={e => setPickupState(e.target.value)} required />
              </label>
              <label className="Transport-label">City*
                <input type="text" placeholder="Enter pickup city" className="Transport-Input" value={PickupCity} onChange={e => setPickupCity(e.target.value)} required />
              </label>
              <label className="Transport-label">Landmark*
                <input type="text" placeholder="Enter pickup landmark" className="Transport-Input" value={PickupLandmark} onChange={e => setPickupLandmark(e.target.value)} required />
              </label>
              <label className="Transport-label">GPS Location
                <input type="text" placeholder="Latitude,Longitude" className="Transport-Input" value={PickupGPS} onChange={e => setPickupGPS(e.target.value)} />
              </label>
              <label className="Transport-label">Complete Pickup Address*
                <input type="text" placeholder="Enter complete pickup address" className="Transport-Input" value={PickupAddress} onChange={e => setPickupAddress(e.target.value)} required />
              </label>
            </div>
          )}
          {step === 2 && (
            <div className="Transport-delivery-details step-animate">
              <h2 className="Transport-delivery">Delivery Details</h2>
              <label className="Transport-label">State/Province*
                <input type="text" placeholder="Enter delivery state/province" className="Transport-Input" value={DeliveryState} onChange={e => setDeliveryState(e.target.value)} required />
              </label>
              <label className="Transport-label">City*
                <input type="text" placeholder="Enter delivery city" className="Transport-Input" value={DeliveryCity} onChange={e => setDeliveryCity(e.target.value)} required />
              </label>
              <label className="Transport-label">Landmark*
                <input type="text" placeholder="Enter delivery landmark" className="Transport-Input" value={DeliveryLandmark} onChange={e => setDeliveryLandmark(e.target.value)} required />
              </label>
              <label className="Transport-label">GPS Location
                <input type="text" placeholder="Latitude,Longitude" className="Transport-Input" value={DeliveryGPS} onChange={e => setDeliveryGPS(e.target.value)} />
              </label>
              <label className="Transport-label">Complete Delivery Address*
                <input type="text" placeholder="Enter complete delivery address" className="Transport-Input" value={DeliveryAddress} onChange={e => setDeliveryAddress(e.target.value)} required />
              </label>
            </div>
          )}
          {step === 3 && (
            <div className="Transport-additional-details step-animate">
              <h2 className="Transport-additional">Additional Information</h2>
              <label className="Transport-label">Estimated Transit Time*
                <input type="text" placeholder="Enter estimated transit time" className="Transport-Input" value={EstimatedTime} onChange={e => setEstimatedTime(e.target.value)} required />
              </label>
              <label className="Transport-label">Transport Date*
                <input type="date" className="Transport-Input" value={TransportDate} onChange={e => setTransportDate(e.target.value)} required />
              </label>
              <label className="Transport-label">Additional Notes
                <textarea className="Transport-Input" placeholder="Enter any additional requirements or notes" value={AdditionalNotes} onChange={e => setAdditionalNotes(e.target.value)} rows="3" />
              </label>
            </div>
          )}
          <div className="Transport-btn">
            {step > 0 && (
              <button type="button" className="Transport-reset-data" onClick={handleBack} disabled={submitting}>Back</button>
            )}
            {step < 3 ? (
              <button type="button" onClick={handleNext} disabled={submitting}>Next</button>
            ) : (
              <>
                <button type="button" className="Transport-reset-data" onClick={handleReset} disabled={submitting}>Reset</button>
                <button className="Transport-btn" type="submit" disabled={submitting}>Submit</button>
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

export default TransportForm;