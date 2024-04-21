import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { XIcon, HomeIcon, UserCircleIcon, UserGroupIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { logout } from "../untils/functions";

const Sidebar = ({ isOpen, onClose, onTabClick, user }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    onTabClick(tabName);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <Transition show={isOpen}>
      <div className="fixed inset-y-0 z-10 left-0 w-64 bg-gray-900 text-white p-4 transform transition-transform duration-300 ease-in-out">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:text-gray-300"
        >
          <XIcon className="h-6 w-6" />
        </button>
        <div className="mt-10">
          <div
            className={`py-2 flex items-center gap-2 px-4 text-lg cursor-pointer transition-colors duration-300 ${activeTab === "Dashboard"
              ? "bg-gray-800 text-gray-300"
              : "hover:bg-gray-800 hover:text-gray-300"
              }`}
            onClick={() => handleTabClick("Dashboard")}
          >
            <HomeIcon className="h-6 w-6" />
            Dashboard
          </div>
          <div
            className={`py-2 px-4 flex items-center gap-2 text-lg cursor-pointer transition-colors duration-300 ${activeTab === "Calendar"
              ? "bg-gray-800 text-gray-300"
              : "hover:bg-gray-800 hover:text-gray-300"
              }`}
            onClick={() => handleTabClick("Calendar")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
            </svg>

            Calendar
          </div>
          <div
            className={`py-2 px-4 flex items-center gap-2 text-lg cursor-pointer transition-colors duration-300 ${activeTab === "Schedule2"
              ? "bg-gray-800 text-gray-300"
              : "hover:bg-gray-800 hover:text-gray-300"
              }`}
            onClick={() => handleTabClick("Schedule2")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
              <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
            </svg>
            Schedule
          </div>
          <div
            className={`py-2 px-4 flex items-center gap-2 text-lg cursor-pointer transition-colors duration-300 ${activeTab === "Statistics"
              ? "bg-gray-800 text-gray-300"
              : "hover:bg-gray-800 hover:text-gray-300"
              }`}
            onClick={() => handleTabClick("Statistics")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z" clipRule="evenodd" />
            </svg>
            Statistics
          </div>
          <div
            className={`py-2 px-4 flex items-center gap-2 text-lg cursor-pointer transition-colors duration-300 ${activeTab === "Profile"
              ? "bg-gray-800 text-gray-300"
              : "hover:bg-gray-800 hover:text-gray-300"
              }`}
            onClick={() => handleTabClick("Profile")}
          >
            <UserCircleIcon className="h-6 w-6" />
            Profile
          </div>
          {user && user.role === "admin" && (
            <div
              className={`py-2 flex items-center gap-2 px-4 text-lg cursor-pointer transition-colors duration-300 ${activeTab === "Admin"
                ? "bg-gray-800 text-gray-300"
                : "hover:bg-gray-800 hover:text-gray-300"
                }`}
              onClick={() => handleTabClick("Admin")}
            >
              <UserGroupIcon className="h-6 w-6" />
              Admin
            </div>
          )}
          <div
            className={`py-2 flex items-center gap-1 absolute px-4 bottom-1.5 text-lg cursor-pointer transition-colors duration-300 ${activeTab === ""
              ? "bg-gray-800 text-gray-300"
              : "hover:text-gray-300"
              }`}
            onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
            Logout
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Sidebar;
