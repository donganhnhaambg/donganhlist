// Notifications.jsx
import React, { useRef, useEffect, useState } from "react";
import ImgNotification from "../../../assets/images/notification.svg";
import OnTime from "../../../assets/images/giphy.gif";

const Notifications = ({ onCloseNotification, onClickOutside, listTask }) => {
  const notificationsRef = useRef();

  const handleClick = (event) => {
    event.stopPropagation();
  };

  const handleCloseNotification = () => {
    onCloseNotification();
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        onClickOutside();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onClickOutside, onCloseNotification]);

  return (
    <div
      className="absolute right-0 z-10 top-11 max-h-615 min-w-96 overflow-y-auto"
      ref={notificationsRef}
      onClick={handleClick}
    >
      <div className="bg-282e33 p-10 rounded-lg">
        <div className="title">
          <h2 className="text-lg font-bold text-b6c2cf mb-3 border-b border-b6c2cf border-solid pb-4">
            Notifications
          </h2>
        </div>
        <div className="content">
          {listTask && Array.isArray(listTask) && listTask.length > 0 ? (
            listTask.map((task, index) => (
              <div className="item-task mb-5 flex text-amber-500 pt-2 items-center bg-gray-600 items-center flex text-left rounded-xl cursor-pointer relative" key={index}>
                <img src={OnTime} style={{width: "65px", height: "65px", marginRight: "15px"}} alt="ontime" />
                <div className="content-notification">
                  <p>{task.date}</p>
                  <h4 className="text-xl font-bold text-b6c2cf pb-2">
                    {task.title}
                  </h4>
                  <p className="text-sm mb-5">{`${task.description.slice(
                    0,
                    50
                  )}...`}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="none-notification flex flex-col items-center">
              <img src={ImgNotification} className="max-w-28" alt="img" />
              <p className="pt-5 text-b6c2cf text-xl">
                No unread notifications
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
