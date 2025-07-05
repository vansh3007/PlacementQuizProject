import { NavLink } from "react-router-dom";
import { FaHome, FaBolt, FaStore, FaBrain } from "react-icons/fa";

type SidebarProps = {
  closeSidebar: () => void;
};

const Sidebar = ({  closeSidebar }: SidebarProps) => {
  const links = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/quiz", label: "Quiz", icon: <FaBrain /> },
    { to: "/hiring", label: "Hirings", icon: <FaBolt /> },
    { to: "/developer", label: "Developers", icon: <FaStore /> },
  ];

  return (
    <div className="bg-white shadow-md p-4 pt-6 space-y-4 w-64 h-full">
      <nav className="flex flex-col gap-2 text-md">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "text-blue-700 font-semibold bg-blue-100 shadow-md"
                  : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
              }`
            }
            onClick={closeSidebar}
          >
            <span className="text-lg">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
