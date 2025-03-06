import { Link } from "react-router-dom";

const ForbiddenPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Forbidden</h1>
        <p className="text-lg mb-6">
          You do not have permission to access this page.
        </p>
        <Link
          to="/admin/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
        >
          Go to Login Page
        </Link>
      </div>
    </div>
  );
};

export default ForbiddenPage;
