import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex relative">
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white dark:bg-gray-900 p-2 rounded-md shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[250px] sm:w-[300px] z-40 p-5
          bg-white dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:relative lg:block
        `}
      >
        <div className="space-y-4 pt-16 lg:pt-0">
          <Link to="dashboard" className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-blue-600">
            <ChartNoAxesColumn size={22} />
            <h1 className="text-base font-medium">Dashboard</h1>
          </Link>
          <Link to="course" className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-blue-600">
            <SquareLibrary size={22} />
            <h1 className="text-base font-medium">Courses</h1>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-10 ml-0 lg:ml-[250px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;


