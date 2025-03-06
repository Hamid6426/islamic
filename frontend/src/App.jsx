import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/users/Register";
import Login from "./pages/users/Login";
import Home from "./pages/users/Home";
import Gallery from "./pages/users/Gallery";
import ThreeDimensional from "./pages/users/ThreeDimensional";
import Calligraphy from "./pages/users/Calligraphy";
import Arts from "./pages/users/Arts";
import IslamicIcons from "./pages/users/IslamicIcons";
import Textures from "./pages/users/Textures";
import SearchResults from "./pages/users/SearchResults";
import ForbiddenPage from "./pages/others/ForbiddenPage";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminSignup from "./pages/admin/AdminRegister";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ImageUpload from "./pages/admin/ImageUpload";
import ImageUpdatePage from "./pages/admin/ImageUpdate";
import ImagePreview from "./pages/admin/ImagePreview";
import AdminManagement from "./pages/admin/AdminManagement";
import UserManagement from "./pages/admin/UserManagement";

import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminLayout from "./components/layouts/AdminLayout";
import Analytics from "./pages/admin/Analytics";
import ImageManagement from "./pages/admin/ImageManagement";
import Settings from "./pages/admin/Settings";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/3D" element={<ThreeDimensional />} />
        <Route path="/calligraphy" element={<Calligraphy />} />
        <Route path="/arts" element={<Arts />} />
        <Route path="/islamic-icons" element={<IslamicIcons />} />
        <Route path="/textures" element={<Textures />} />
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
            <Route path="upload" element={<ImageUpload />} />
            <Route path="update" element={<ImageUpdatePage />} />
            <Route path="preview" element={<ImagePreview />} />
            <Route path="admins" element={<AdminManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="images" element={<ImageManagement />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Catch-All Route (404) */}
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
