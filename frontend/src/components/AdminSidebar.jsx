import { FaTachometerAlt, FaUsers, FaImage, FaClipboardCheck, FaChartBar, FaCogs, FaUserShield, FaSignOutAlt } from "react-icons/fa";
import AdminLogoutButton from "./AdminLogout";

const menuItems = [
  { name: "Dashboard Overview", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
  { name: "User Management", icon: <FaUsers />, path: "/admin/manage-users" },
  { name: "Admin Management", icon: <FaUserShield />, path: "/admin/manage-admins" },
  { name: "Image Management", icon: <FaImage />, path: "/admin/manage-images" },
  { name: "Analytics & Reports", icon: <FaChartBar />, path: "/admin/analytics" },
  { name: "Settings", icon: <FaCogs />, path: "/admin/manage-settings" },
];

const AdminSidebar = () => {
  return (
    <div className="fixed h-screen w-64 bg-gray-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-5 text-xl font-bold border-b border-gray-700">Admin Dashboard</div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a 
                href={item.path} 
                className="flex items-center p-2 hover:bg-gray-800 rounded cursor-pointer"
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <AdminLogoutButton />
    </div>
  );
};

export default AdminSidebar;
