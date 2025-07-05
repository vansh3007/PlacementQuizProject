import { useState } from "react";
import Navbar from "./NavBar";
import Sidebar from "./SideBar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="h-screen overflow-hidden">
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex pt-16 h-full">
        {/* Desktop Sidebar */}
        <div className="hidden md:block fixed top-16 left-0 h-[calc(100%-4rem)] w-64 z-40">
          <Sidebar  closeSidebar={closeSidebar} />
        </div>

        {/* Mobile Sidebar with animation and backdrop */}
        <div
          className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
            isOpen
              ? "bg-transparent bg-opacity-40 pointer-events-auto mt-16"
              : "pointer-events-none"
          }`}
          onClick={closeSidebar}
        >
          <div
            className={`transform transition-transform duration-300 ease-in-out w-64 h-full bg-white shadow-md ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar closeSidebar={closeSidebar} />
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 ml-0 md:ml-64 h-[calc(100vh-4rem)] overflow-y-auto hide-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
