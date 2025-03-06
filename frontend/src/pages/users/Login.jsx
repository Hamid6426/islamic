import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!formData.email || !formData.password) {
      setMessage("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await axios.post(
        `${API_URL}/api/users/login`,
        formData,
        { withCredentials: true } // Important to send cookies with requests
      );

      setMessage(response.data.message);
      setFormData({ email: "", password: "" });

      // Redirect to /gallery after successful login
      navigate("/gallery");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background flex justify-center items-center min-h-screen">
      <div className="w-full flex flex-col gap-4 max-w-sm p-6 border-2 border-orange-400 h-fit rounded-sm shadow-md">
        <h2 className="text-2xl font-bold text-center">Account Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-sm focus:ring focus:ring-blue-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-sm focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-sm hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        {message && <p className="text-center text-red-500">{message}</p>}
        <div className="text-center">
          Don't have an Account?{" "}
          <a href="/register"
           className="font-bold hover:text-orange-400 cursor-pointer"
           >
          
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
