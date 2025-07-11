// components/Sidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

const Sidebar = () => {
  const { pathname } = useLocation();
  const userName = localStorage.getItem("userName") || "User";
  const { logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Calendar", path: "/calendar" },
    { label: "Topic", path: "/topic" },
  ];

  return (
    <>
      {/* 🔘 Nút menu trên mobile */}
      <div className="md:hidden p-2 bg-gray-100 shadow">
        <button onClick={() => setIsOpen(!isOpen)}>
          <FiMenu size={24} />
        </button>
      </div>

      {/* 📦 Sidebar */}
      <aside
        className={`
          bg-gray-200 p-4 z-50 flex flex-col
          w-64 h-screen             
          fixed top-0 left-0          
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static 
        `}
      >
        <h2 className="text-xl font-bold mb-6">My Todo App</h2>

        {/* 🧭 Menu list với flex-1 để đẩy phần dưới cùng xuống */}
        <ul className="space-y-4 flex-1 overflow-y-auto">
          {navItems.map(({ label, path }) => (
            <li key={path}>
              <Link
                to={path}
                onClick={() => setIsOpen(false)}
                className={`block p-2 rounded hover:bg-blue-500 ${
                  pathname === path ? "bg-gray-500 text-white" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* 👇 Phần nằm sát đáy */}
        <div className="pt-4 border-t border-gray-300 text-sm flex justify-between items-center">
          <span>📝 {userName}</span>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* 🔲 Nền mờ khi mở menu trên mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
