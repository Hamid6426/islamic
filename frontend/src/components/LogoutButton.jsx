import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:3000/api/users/logout", {}, { withCredentials: true });

            // Redirect to Sign In page after logout
            navigate("/signin");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
            Logout
        </button>
    );
};

export default LogoutButton;