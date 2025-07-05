import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  Briefcase,
  HelpCircle,
  UserCircle,
  GitBranch,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { useNavigate, NavLink } from "react-router-dom";

interface UseAuthStore {
  logout: () => Promise<boolean>;
}

const sidebarLinks = [
  { label: "Dashboard", href: "/dashboard", icon: <Home size={18} /> },
  { label: "Jobs", href: "/jobs", icon: <Briefcase size={18} /> },
  { label: "Questions", href: "/questions", icon: <HelpCircle size={18} /> },
  { label: "Students", href: "/students", icon: <UserCircle size={18} /> },
  {label:"Branches",href:"/branches",icon:<GitBranch size={18}/>},
];

const CustomSidebar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const logout = useAuthStore((state) => state as UseAuthStore).logout;

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate("/login");
      toast.success("Logged out successfully");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden overflow-x-hidden bg-gray-50">
      {/* Sidebar */}
      <div
        className={`relative z-30 border-r border-gray-200 bg-white transition-all duration-300 ease-in-out ${
          open ? "w-64" : "w-16"
        } flex-shrink-0 h-screen`}
      >
        <div className="flex flex-col h-screen">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            {open ? (
              <span className="text-lg font-bold text-gray-800">
                Admin Panel
              </span>
            ) : (
              <span className="text-sm text-gray-400 font-semibold">AP</span>
            )}
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-500 hover:text-gray-700"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="flex-1 mt-4 flex flex-col gap-1">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    open ? "justify-start" : "justify-center"
                  } ${
                    isActive
                      ? "bg-gray-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <div className="text-gray-500">{link.icon}</div>
                <span
                  className={`ml-3 transition-all whitespace-nowrap ${
                    open ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                  }`}
                >
                  {link.label}
                </span>
              </NavLink>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className={`w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 border-t border-gray-100 transition-all ${
              open ? "justify-start" : "justify-center"
            }`}
          >
            <LogOut size={18} className="mr-3" />
            <span
              className={`transition-all whitespace-nowrap ${
                open ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
              }`}
            >
              Logout
            </span>
          </button>

          <div className="text-xs text-gray-400 px-4 py-2 border-t border-gray-100 mt-auto">
            {open && "© 2024 Your Company"}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default CustomSidebar;
