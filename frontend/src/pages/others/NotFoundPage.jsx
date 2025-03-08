import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Not Found</h1>
    </div>
  );
};

export default NotFoundPage;
