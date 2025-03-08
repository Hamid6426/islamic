import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/users/Register";
import Login from "./pages/users/Login";
import Home from "./pages/users/Home";
import Gallery from "./pages/users/Gallery";
import SearchResults from "./pages/users/SearchResults";
import ForbiddenPage from "./pages/others/ForbiddenPage";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminSignup from "./pages/admin/AdminRegister";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ImageUpload from "./pages/admin/ImageUpload";
import ImageUpdatePage from "./pages/admin/ImageUpdate";
import AdminManagement from "./pages/admin/AdminManagement";
import UserManagement from "./pages/admin/UserManagement";

import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminLayout from "./components/layouts/AdminLayout";
import Analytics from "./pages/admin/Analytics";
import ImageManagement from "./pages/admin/ImageManagement";
import Settings from "./pages/admin/Settings";
import CategoryPage from "./pages/users/CategoryPage";
import ImagePreview from "./pages/users/ImagePreview";
import NotFoundPage from "./pages/others/NotFoundPage";

const App = () => {
  return (
    <Router basename="/">
      <Routes>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/preview/:slug" element={<ImagePreview />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin Authentication Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminSignup />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="manage-admins" element={<AdminManagement />} />
            <Route path="manage-users" element={<UserManagement />} />
            <Route path="manage-images" element={<ImageManagement />} />
            <Route path="manage-images/upload-image" element={<ImageUpload />} />
            <Route path="manage-images/update-image/:_id" element={<ImageUpdatePage />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="manage-settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Error Handling */}
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
