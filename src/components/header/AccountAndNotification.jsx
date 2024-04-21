// AccountAndNotification.jsx
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser, faMessage } from "@fortawesome/free-solid-svg-icons";
import Notifications from "./notifications/Notifications";
import Avatar from "../../assets/images/avatar.webp";
import Account from "./account/Account";
import PopupMessage from "./PopupMessage";
import { useSelector } from "react-redux";

const AccountAndNotification = ({ user }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const [showAccount, setShowAccount] = useState(false);
  const handleBellClick = (event) => {
    event.stopPropagation();
    setShowNotifications((prev) => !prev);
  };
  const userinfor = useSelector(state => state.userinfor);
  // const handleAccountClick = (event) => {
  //   event.stopPropagation();
  //   setShowAccount((prev) => !prev);
  // };
  const handleCloseComponents = () => {
    setShowNotifications(false);
    // setShowAccount(false);
  };

  const handleClickMessage = () => {
    setIsPopupOpen(true);
  }
  const [listTask, setListTask] = useState();
  useEffect(() => {
    if (user && user !== null) {
      if (user.dashboard) {
        if (user.dashboard.length > 0) {
          // Lấy ngày hiện tại
          const currentDate = new Date();

          // Tạo ngày 3 ngày sau
          const threeDaysLater = new Date(currentDate);
          threeDaysLater.setDate(currentDate.getDate() + 3);

          // Lọc ra những task có date trong khoảng từ ngày hiện tại đến 3 ngày sau
          const filteredTasks = user.dashboard[0].listTask.filter((task) => {
            const taskDate = new Date(task.date);
            return taskDate >= currentDate && taskDate <= threeDaysLater;
          });
          setListTask(filteredTasks);
        }
      }
    }
    if (userinfor && userinfor !== null) {
      if (userinfor.dashboard) {
        if (userinfor.dashboard.length > 0) {
          // Lấy ngày hiện tại
          const currentDate = new Date();

          // Tạo ngày 3 ngày sau
          const threeDaysLater = new Date(currentDate);
          threeDaysLater.setDate(currentDate.getDate() + 3);

          // Lọc ra những task có date trong khoảng từ ngày hiện tại đến 3 ngày sau
          const filteredTasks = userinfor.dashboard[0].listTask.filter((task) => {
            const taskDate = new Date(task.date);
            return taskDate >= currentDate && taskDate <= threeDaysLater;
          });
          setListTask(filteredTasks);
        }
      }
    }
    // setTomorrowItems(filteredItems);
  }, [user, userinfor]);
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  console.log();
  return (
    <div className="flex flex-row justify-end gap-2 items-center">
      <div
        className="bg-a6c5e229 border flex flex-row justify-center items-center p-4 w-6 h-6 rounded-full cursor-pointer"
      // onClick={handleAccountClick}
      >
        <div
          className="bg-a6c5e229 border relative flex flex-row justify-center items-center p-4 w-6 h-6 rounded-full cursor-pointer"
          onClick={handleClickMessage}
        >
          <FontAwesomeIcon icon={faMessage} />
        </div>
        {/* {showAccount && (
          <Account
            onCloseAccount={() => setShowAccount(false)}
            onClickOutside={handleCloseComponents}
          />
        )} */}
      </div>
      {isPopupOpen && <PopupMessage onClose={closePopup} user={user} />}
      <div
        className="bg-a6c5e229 border relative flex flex-row justify-center items-center p-4 w-6 h-6 rounded-full cursor-pointer"
        onClick={handleBellClick}
      >
        <div className="icon-bell">
          <FontAwesomeIcon icon={faBell} />
          <span className="absolute right-[-8px] top-[-8px] text-white w-5 h-5 flex items-center justify-center bg-red-600 rounded-full border-[1px]">
            {listTask && Array.isArray(listTask) ? listTask.length : 0}
          </span>
        </div>
        {showNotifications && (
          <Notifications
            onCloseNotification={() => setShowNotifications(false)}
            onClickOutside={handleCloseComponents}
            listTask={listTask}
          />
        )}
      </div>
      {/* <p className={`text-${mode}`}>test1@gmail.com</p> */}
      <img
        src={user && user.avatar ? user.avatar : Avatar}
        style={{ width: 35, height: 35, borderRadius: "100%" }}
        alt="avt"
      />
      {/* <div
        className="bg-a6c5e229 border flex flex-row justify-center items-center p-4 w-6 h-6 rounded-full cursor-pointer"
        onClick={handleAccountClick}
      >
        <FontAwesomeIcon icon={faUser} />
        {showAccount && (
          <Account
            onCloseAccount={() => setShowAccount(false)}
            onClickOutside={handleCloseComponents}
          />
        )}
      </div> */}
    </div>
  );
};

export default AccountAndNotification;
