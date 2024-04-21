import { useEffect, useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import Header from "./Header";
import Calendar from "./Calendar";
import Dashboard from "./dashboard/Dashboard";
import { connect } from "react-redux";
import About from "./About";
import { getInforUser } from "../untils/functions";
import { useNavigate } from "react-router-dom";
import Admin from "./Admin";
import Schedule2 from "./schedule/Schedule2";
import Statistics from "./Statistics";
import Light from '../assets/images/sang.jpg';
import Dark from '../assets/images/toi.jpg';
const Main = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };
  const [color, setColor] = useState("text-black");
  const [bg, setBg] = useState("bg-white");
  const [darkMode, setDarkMode] = useState("bg-white");
  const user = getInforUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user == null) {
      navigate("/login");
    }
  }, [navigate, user]);
  useEffect(() => {
    if (props.darkmode === "active dark mode") {
      setColor("text-white");
      setBg(Dark);
      setDarkMode("bg-9a9a9a");
    } else {
      setColor("text-black");
      setBg(Light);
      setDarkMode("bg-white");
    }
  }, [props.darkmode]);

  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <div className={`main min-h-screen`} style={{backgroundImage: `url(${bg})`}}>
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        onTabClick={handleTabClick}
        user={user}
      />
      <div className={`main-content  ${isSidebarOpen ? "ml-64" : ""}`}>
        <div
          className={`header ${darkMode} relative border-b border-gray-500 `}
        >
          <Header
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            onChangeColor={setBackgroundColor}
            onChangeMode={toggleTheme}
            user={user}
          />
        </div>
        <div className="content container mx-auto max-w-screen-xl">
          {selectedTab === "Dashboard" && <Dashboard />}
          {selectedTab === "Calendar" && <Calendar />}
          {selectedTab === "Schedule2" && <Schedule2 />}
          {selectedTab === "Profile" && <Profile />}
          {selectedTab === "Statistics" && <Statistics />}
          {selectedTab === "Admin" && <Admin />}
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = () => {
  return {};
};
const mapStateToProps = (state) => {
  return {
    darkmode: state.darkmode,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
