import { MenuIcon } from "@heroicons/react/solid";
import AccountAndNotification from "./header/AccountAndNotification";
import FormSearch from "./header/FormSearch";
import DayNightToggle from "react-day-and-night-toggle";
import { useState } from "react";
import { actSelectDarkMode } from "../actions";
import { connect } from "react-redux";
import Logo from "../assets/images/logo.png";
import About from "../assets/images/about-me.gif";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("data-theme") === "dark" ? true : false
  );
  const [darkMode, setDarkMode] = useState("bg-white");
  const handleChangeTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      setDarkMode("bg-9a9a9a");
      props.setDarkMode("active dark mode");
      // localStorage.setItem("data-theme", "dark");
      // document.body.setAttribute("data-theme", "dark");
    } else {
      setDarkMode("bg-white");
      props.setDarkMode("active light mode");
      // localStorage.setItem("data-theme", "light");
      // document.body.setAttribute("data-theme", "light");
    }
  };
  return (
    <div
      className={`flex flex-row container relative mx-auto max-w-screen-xl justify-center items-center p-5 ${darkMode}`}
    >
      {!props.isSidebarOpen && (
        <button className="absolute z-10 left-0" onClick={props.toggleSidebar}>
          <MenuIcon className="h-8 w-8" />
        </button>
      )}
      <div
        className={`w-1/4 flex items-center gap-4 ${
          !props.isSidebarOpen && "ml-5"
        }`}
      >
        <Link to={"/"}>
          <img src={Logo} alt="Logo" style={{ maxWidth: "150px" }} />
        </Link>
        <DayNightToggle
          size={20}
          onChange={handleChangeTheme}
          checked={isDarkMode}
          onClick={props.onChangeMode}
        />
        <Link to={"/about"}>
          <img
            src={About}
            alt="about"
            style={{
              maxWidth: "50px",
              marginRight: "10px",
              borderRadius: "50%",
            }}
          />
        </Link>
      </div>
      <div className="w-2/4">
        <FormSearch />
      </div>
      <div className="w-1/4">
        <AccountAndNotification user={props.user} />
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    setDarkMode: (data) => {
      dispatch(actSelectDarkMode(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(Header);
