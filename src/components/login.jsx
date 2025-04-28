import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

const Login_API = "http://127.0.0.1:5000/login"; // Ensure Flask server is running

function LoginCredential() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess("");

        try {
            console.log('Attempting login with:', { email: username, password: setPassword });
            const response = await fetch(Login_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            console.log('Login response status:', response.status);
            console.log('Login response data:', data);

            if (response.ok && data.access_token) {
                setSuccess("Login Successful!");

                // Store the JWT token
                localStorage.setItem("token", `${data.access_token}`);
                localStorage.setItem("refresh_token", data.refresh_token);
                console.log('Token stored successfully');

                // Optionally, initiate a test API call
                makeAuthenticatedApiCall();

                document.querySelector('.form_container').classList.add('slide-up');
                setTimeout(() => {
                    navigate('/');
                }, 800);
            } else {
                const errorMessage = data.error || data.message || "Invalid credentials";
                console.error("Login failed:", errorMessage);
                setError(errorMessage);
            }
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || "Error connecting to server. Check API status.");
        }
    };

    // New function to make an authenticated API call using the stored JWT
    const makeAuthenticatedApiCall = async () => {
        const token = localStorage.getItem("token");  // Retrieve the stored token
        if (!token) {
            console.error("No token found. User is not authenticated.");
            return;
        }

        try {
            const response = await fetch('YOUR_API_URL', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Attach the JWT token
                },
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Data received:', data);
            } else {
                console.error('API call failed:', data.error);
            }
        } catch (error) {
            console.error('Error during API call:', error);
        }
    };

    return (
        <div className="form_container">
            <div className="title_container">
                <p className="title">Connect to Your DeamandX Account</p>
                <span className="subtitle">
                    Get started with our app, just create an account and enjoy the experience.
                </span>
            </div>
            <br />
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="input_container">
                    <label className="input_label" htmlFor="email_field">
                        Email
                    </label>
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        height="24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                    >
                        {/* SVG path here */}
                    </svg>
                    <input
                        placeholder="name@mail.com"
                        title="Input title"
                        name="input-name"
                        type="text"
                        className="input_field"
                        id="email_field"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input_container">
                    <label className="input_label" htmlFor="password_field">
                        Password
                    </label>
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        height="24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                    >
                        {/* SVG path here */}
                    </svg>
                    <input
                        placeholder="Password"
                        title="Input title"
                        name="input-name"
                        type="password"
                        className="input_field"
                        id="password_field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button title="Sign In" type="submit" className="sign-in_btn">
                    <span>Sign In</span>
                </button>
            </form>
            <div className="separator">
                <hr className="line" />
                <span>Or</span>
                <hr className="line" />
            </div>
           
            <p className="note">Terms of use &amp; Conditions</p>
            <div className="signup-link">
                <p>Don't have an account? <Link to="/Register" className="create-account-link">Create Account</Link></p>
            </div>
        </div>
    );
}

export default LoginCredential;
