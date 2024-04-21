// Account.jsx
import React, { useRef, useEffect } from "react";

const Account = ({ onCloseAccount, onClickOutside  }) => {
  const accountRef = useRef();

  const handleClick = (event) => {
    event.stopPropagation();
  };

  const handleCloseAccount = () => {
    onCloseAccount();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        onClickOutside();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onClickOutside, onCloseAccount]);

  return (
    <div
      className="absolute top-0 max-h-615 min-w-96 overflow-y-auto"
      ref={accountRef}
      onClick={handleClick}
    >
      <div className="bg-282e33 p-5 font-bold rounded-lg">
        <div className="account-title">
          <h2 className="text-lg text-b6c2cf">Account</h2>
          <div className="account-details flex gap-3 items-center mt-4">
            <div className="avt bg-white w-10 h-10 rounded-full"></div>
            <div className="details-account">
                <div className="name text-b6c2cf">Le Ha</div>
                <div className="email text-9fadbc text-sm">shanks30508@gmail.com</div>
            </div>
          </div>

        </div>
        <div className="content flex flex-col items-center">
          <p className="pt-5 text-b6c2cf text-xl">No unread notifications</p>
        </div>
      </div>
    </div>
  );
};

export default Account;
