import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:3000/api/admins/verify-admin-token", {
          withCredentials: true, // Ensures cookies are sent
        });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div className="text-center text-lg p-6">Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/403" />;
};

export default AdminProtectedRoute;
