// layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/route/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-4 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
