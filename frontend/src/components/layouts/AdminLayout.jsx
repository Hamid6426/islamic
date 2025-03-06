import { Outlet } from "react-router-dom";
import AdminSidebar from "../AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex justify-between items-start">
      <AdminSidebar />
      <main className="ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
