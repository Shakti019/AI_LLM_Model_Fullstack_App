import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Add Bearer prefix for API calls
    const authToken = `Bearer ${token}`;
    
    return <Outlet />;
};

export default PrivateRoute;
