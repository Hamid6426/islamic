import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!formData.name || !formData.email || !formData.password) {
      setMessage("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        formData
      );
      setMessage(response.data.message);
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error registering user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background flex justify-center items-center min-h-screen">
      <div className="bg-white  w-full flex flex-col gap-4 max-w-sm p-6 border-2 border-orange-400 h-fit rounded-sm shadow-md">
        <h2 className="text-2xl font-bold text-center">Register an Account</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm focus:outline-none bg-white  focus:ring focus:ring-blue-300"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm focus:outline-none bg-white focus:ring focus:ring-blue-300"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm focus:outline-none bg-white focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-sm hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          {message && (
            <p className="text-center text-red-500 mb-4">{message}</p>
          )}
        </form>
        <div className="text-center">
          Already have an Account?{" "}
          <a
            href="/login"
            className="font-bold hover:text-orange-400 cursor-pointer"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
