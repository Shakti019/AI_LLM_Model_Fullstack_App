import { useState, useEffect } from 'react';
import './CreateAccount.css';
import { useNavigate } from 'react-router-dom';

const Register_API = "http://127.0.0.1:5000/register";
const countries = [
    'India', 'United States', 'China', 'United Kingdom',
    'Germany', 'France', 'Japan', 'Canada', 'Australia'
];

const states = ['Uttar Pradesh', 'Madhya Pradesh', 'Uttarakhand'];

function CreateAccount() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        number: "",
        address: "",
        agencyName: "",
        agencyNumber: "",
        agencyAddress: "",
        country: "",
        stateName: "",
        region: "",
        category: ""
    });
    const [currentStep, setCurrentStep] = useState(1);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateStep = (step) => {
        switch (step) {
            case 1:
                return formData.name && formData.email && formData.number;
            case 2:
                return formData.address && formData.password && formData.confirmPassword;
            case 3:
                return formData.agencyName && formData.agencyNumber && formData.agencyAddress;
            case 4:
                return formData.country && formData.stateName && formData.region;
            case 5:
                return formData.category;
            default:
                return false;
        }
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
            setError("");
        } else {
            setError("Please fill all fields before proceeding");
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => prev - 1);
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        
        setIsSubmitting(true);
        try {
            const response = await fetch(Register_API, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            
            if (response.ok) {
                setSuccess("Account created successfully");
                setError("");
                document.querySelector('.form-container').classList.add('slide-up');
                setTimeout(() => navigate('/'), 800);
            } else {
                setError(data.message || "Account Creation Failed");
            }
        } catch (error) {
            setError("Server error. Please try again later");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Progress bar calculation
    const progressPercentage = ((currentStep - 1) / 4) * 100;

    return (
        <div className="form-container">
            <div className="form-header">
                <h1 className="Account">Create Account with Demand<span className="magic">X</span></h1>
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <div className="step-indicator">Step {currentStep} of 5</div>
            </div>
            
            {error && <div className="alert error">{error}</div>}
            {success && <div className="alert success">{success}</div>}

            <form onSubmit={handleSubmit}>
                {/* Step 1: Basic Info */}
                <div className={`form-step ${currentStep === 1 ? 'active' : ''}`}>
                    <div className="form-group">
                        <label>
                            Name
                            <input className="input-box" type="text" name="name" value={formData.name} 
                                   onChange={handleChange} required />
                        </label>
                        <label>
                            Email
                            <input className="input-box" type="email" name="email" value={formData.email} 
                                   onChange={handleChange} required />
                        </label>
                        <label>
                            Phone Number
                            <input className="input-box" type="tel" name="number" value={formData.number} 
                                   onChange={handleChange} required />
                        </label>
                    </div>
                    <div className="step-actions">
                        <button type="button" className="next-btn" onClick={nextStep}>Next</button>
                    </div>
                </div>

                {/* Step 2: Address & Password */}
                <div className={`form-step ${currentStep === 2 ? 'active' : ''}`}>
                    <div className="form-group">
                        <label>
                            Personal Address
                            <input className="input-box" type="text" name="address" value={formData.address} 
                                   onChange={handleChange} required />
                        </label>
                        <label>
                            Password
                            <input className="input-box" type="password" name="password" value={formData.password} 
                                   onChange={handleChange} required />
                        </label>
                        <label>
                            Confirm Password
                            <input className="input-box" type="password" name="confirmPassword" 
                                   value={formData.confirmPassword} onChange={handleChange} required />
                        </label>
                    </div>
                    <div className="step-actions">
                        <button type="button" className="prev-btn" onClick={prevStep}>Back</button>
                        <button type="button" className="next-btn" onClick={nextStep}>Next</button>
                    </div>
                </div>

                {/* Step 3: Agency Info */}
                <div className={`form-step ${currentStep === 3 ? 'active' : ''}`}>
                    <div className="form-group">
                        <label>
                            Agency Name
                            <input className="input-box" type="text" name="agencyName" value={formData.agencyName} 
                                   onChange={handleChange} required />
                        </label>
                        <label>
                            Agency Registration Number
                            <input className="input-box" type="text" name="agencyNumber" value={formData.agencyNumber} 
                                   onChange={handleChange} required />
                        </label>
                        <label>
                            Agency Address
                            <input className="input-box" type="text" name="agencyAddress" value={formData.agencyAddress} 
                                   onChange={handleChange} required />
                        </label>
                    </div>
                    <div className="step-actions">
                        <button type="button" className="prev-btn" onClick={prevStep}>Back</button>
                        <button type="button" className="next-btn" onClick={nextStep}>Next</button>
                    </div>
                </div>

                {/* Step 4: Location */}
                <div className={`form-step ${currentStep === 4 ? 'active' : ''}`}>
                    <div className="form-group">
                        <label>
                            Country
                            <select className="select-input" name="country" value={formData.country} 
                                    onChange={handleChange} required>
                                <option value="">Select Country</option>
                                {countries.map((country) => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            State
                            <select className="select-input" name="stateName" value={formData.stateName} 
                                    onChange={handleChange} required>
                                <option value="">Select State</option>
                                {states.map((state) => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Region
                            <select className="select-input" name="region" value={formData.region} 
                                    onChange={handleChange} required>
                                <option value="">Select Region</option>
                                <option value="North">North</option>
                                <option value="South">South</option>
                                <option value="East">East</option>
                                <option value="West">West</option>
                            </select>
                        </label>
                    </div>
                    <div className="step-actions">
                        <button type="button" className="prev-btn" onClick={prevStep}>Back</button>
                        <button type="button" className="next-btn" onClick={nextStep}>Next</button>
                    </div>
                </div>

                {/* Step 5: Category */}
                <div className={`form-step ${currentStep === 5 ? 'active' : ''}`}>
                    <div className="form-group">
                        <label>
                            Category
                            <select className="select-input" name="category" value={formData.category} 
                                    onChange={handleChange} required>
                                <option value="">Select Category</option>
                                <option value="Importer">Importer</option>
                                <option value="Exporter">Exporter</option>
                                <option value="Transporter">Transporter</option>
                            </select>
                        </label>
                    </div>
                    <div className="step-actions">
                        <button type="button" className="prev-btn" onClick={prevStep}>Back</button>
                        <button type="submit" className="submit-bt" disabled={isSubmitting}>
                            {isSubmitting ? 'Creating...' : 'Create Account'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateAccount;