import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import Loading from '../assets/images/loading.gif';

Modal.setAppElement("#root");

function PopupForgotPassword({ onClose }) {
  const handleCloseModal = () => {
    onClose();
  };
  const [email, setEmail] = useState();
  const [messageCallback, setMessageCallback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    setMessageCallback("");
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/sendmailpassword",
        {
          email: email,
        }
      );
      if (response.data.status === "send_mail_success") {
        setMessageCallback("Sent mail success");
        // onClose();
      } else {
        setMessageCallback("Reset password error");
      }
      setIsLoading(false);
      // if (response.data.msg !== "Fail!") {
      //   navigate("/login");
      // } else {
      //   setMessageCallback("Account already exists");
      // }
    } catch (error) {
      setIsLoading(false);
      if(error){
        setMessageCallback("Reset password error");
      }
      //   if (error.response.data) {
      //     setMessageCallback(error.response.data.errors[0].msg);
      //   }
    }
  };
  return (
    <Modal
      className="popup-modal"
      isOpen={true}
      onRequestClose={onClose}
      style={{
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          width: "600px",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          borderRadius: "0",
          border: "none",
        },
      }}
    >
      <div className="flex relative flex-col text-left p-8 bg-white rounded-lg">
        <button
          className="absolute top-0 right-0 m-4 text-xl cursor-pointer"
          onClick={handleCloseModal}
        >
          x
        </button>

        <form method="post" onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-l mb-6 text-left">
            <span className="pl-2 font-bold">Your Email</span>
            <input
              className="border rounded py-2 px-3 mb-4 w-full bg-ededed mt-2"
              type="email"
              id="email"
              required
              onChange={handleChangeEmail}
            />
            <p
              style={{
                fontSize: "0.8rem",
                color: "#b1b1b1",
                fontWeight: "400",
                marginBottom: "10px",
              }}
            >
              * Add your email and get code
            </p>
          </label>
          {messageCallback !== "" && (
            <p
              style={{
                fontSize: "1rem",
                color: "#ff0000",
                fontWeight: "700",
                marginBottom: "10px",
              }}
              component={"p"}
            >
              {messageCallback}
            </p>
          )}

          {isLoading ? <p
            className="bg-blue-500 hover:bg-blue-700 text-white inline-block font-bold py-2 px-4 rounded"
          >
            <img src={Loading} width={"25px"} alt="loading" />
          </p> : <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Send
          </button>}
        </form>
      </div>
    </Modal>
  );
}

export default PopupForgotPassword;
