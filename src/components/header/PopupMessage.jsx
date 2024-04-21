import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import ImgNotification from "../../assets/images/notification.svg";
import { format } from "date-fns";
import { setInforUser } from "../../untils/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPencil } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

function PopupMessage({ onClose, user }) {
  const handleCloseModal = () => {
    onClose();
  };

  const [message, setMessage] = useState();
  const [shouldRefesh, setShouldRefesh] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedUserFrom, setSelectedUserFrom] = useState(null);
  const [openMessage, setOpenMessage] = useState(false);
  const [dataApi, setDataApi] = useState();

  const [messageCallback, setMessageCallback] = useState();
  const [toMessage, setToMessage] = useState("");
  const [subjectMessage, setSubjectMessage] = useState("");
  const [messageSend, setMessageSend] = useState("");

  const handleOnChangeToMessage = (event) => {
    setToMessage(event.target.value);
  };
  const handleOnChangeSubjectMessage = (event) => {
    setSubjectMessage(event.target.value);
  };
  const handleOnChangeMessage = (event) => {
    setMessageSend(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user !== null) {
          const response = await axios.post("http://localhost:3001/auth/me", {
            email: user.email,
          });
          setInforUser(response.data);
          setDataApi(response.data);
        }
      } catch (error) {
        if (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [shouldRefesh]);
  const handleItemClick = (subject, userFrom) => {
    setSelectedSubject(subject);
    setSelectedUserFrom(userFrom);
  };
  const currentDate = new Date();
  const formattedDate = format(currentDate, "HH:mm dd/MM/yyyy");
  const handleOnChange = (event) => {
    setMessage(event.target.value);
  };
  const handleSubmitReply = async (e, userFrom, subject) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/action/chat", {
        to: userFrom,
        from: user.email,
        subject: subject,
        message: message,
        time: formattedDate,
      });
      if (response.data.message === "Success!") {
        setMessage("");
        setShouldRefesh(true);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  const handleSendMessage = async (e) => {
    console.log(formattedDate);
    e.preventDefault();
    setMessageCallback("");
    try {
      const response = await axios.post("http://localhost:3001/action/chat", {
        to: toMessage,
        from: user.email,
        subject: subjectMessage,
        message: messageSend,
        time: formattedDate,
      });
      if (response.data.message === "Success!") {
        setToMessage("");
        setSubjectMessage("");
        setMessageSend("");
        setShouldRefesh(true);
        setMessageCallback("Send success!");
      } else {
        setToMessage("");
        setSubjectMessage("");
        setMessageSend("");
        setMessageCallback("Email is not found");
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  const btnNewMessage = () => {
    console.log('dfdf');
    setOpenMessage(true);
  }
  const messages = dataApi
    ? [...dataApi.message_to, ...dataApi.message_from]
    : [...user.message_to, ...user.message_from];
  const sortedMessages = messages.sort((b, a) => {
    if (!a.time || !b.time) {
      return 0; // Trả về 0 để giữ nguyên vị trí ban đầu của tin nhắn
    }
    // Tách giờ và ngày ra khỏi chuỗi thời gian và chuyển đổi thành đối tượng Date
    const [hourA, dateA] = a.time.split(' ');
    const [hourB, dateB] = b.time.split(' ');
    const [hourAHour, hourAMinute] = hourA.split(':').map(Number);
    const [hourBHour, hourBMinute] = hourB.split(':').map(Number);
    const [dateADay, dateAMonth, dateAYear] = dateA.split('/').map(Number);
    const [dateBDay, dateBMonth, dateBYear] = dateB.split('/').map(Number);

    // So sánh ngày
    if (dateAYear !== dateBYear) {
      return dateBYear - dateAYear;
    }
    if (dateAMonth !== dateBMonth) {
      return dateBMonth - dateAMonth;
    }
    if (dateADay !== dateBDay) {
      return dateBDay - dateADay;
    }

    // So sánh giờ
    if (hourAHour !== hourBHour) {
      return hourBHour - hourAHour;
    }
    if (hourAMinute !== hourBMinute) {
      return hourBMinute - hourAMinute;
    }
    return 0;
  });
  return (
    <Modal
      className="popup-modal overflow-y-auto"
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
          width: "60%",
          height: "600px",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          borderRadius: "0",
          border: "none",
          backgroundColor: "#fff",
        },
      }}
    >
      <div className="flex relative w-full h-full flex-col text-left p-8 bg-white">
        {openMessage ?
          (
            <form onSubmit={(e) => handleSendMessage(e)}>
              <div className="input-form flex items-center">
                <label htmlFor="subject" className="font-bold text-xl">Subject: </label>
                <input
                  type="text"
                  className="border border-gray-300 ml-4 p-3 pl-2 w-full rounded-full"
                  placeholder="Subject..."
                  id="subject"
                  required
                  value={subjectMessage}
                  onChange={handleOnChangeSubjectMessage}
                  name="subject"
                />
              </div>
              <div className="input-form mt-5">
                <label htmlFor="email_to" className="font-bold text-xl">Email: </label>
                <input
                  type="email"
                  className="border border-gray-300 p-3 mt-2 pl-2 w-full rounded-full"
                  placeholder="Mail to"
                  required
                  value={toMessage}
                  onChange={handleOnChangeToMessage}
                  id="email_to"
                  name="email_to"
                />
              </div>
              <div className="input-form mt-5">
                <label htmlFor="message_to" className="font-bold text-xl">Message: </label>
                <textarea name="message_to" value={messageSend} id="message_to" className="mt-2 p-3 w-full border" onChange={handleOnChangeMessage} rows="10"></textarea>
              </div>
              <div className="mess">
                {messageCallback && (
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#ff0000",
                      fontWeight: "700",
                    }}
                    component={"p"}
                  >
                    {messageCallback}
                  </p>
                )}
              </div>
              <div class="cursor-pointer z-5 mb-8 w-40 flex items-center justify-center translate-y-2/4 rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                <button type="submit">Send</button>
              </div>
            </form>
          )
          :
          <>
            {selectedSubject ? (
              <div className="message-details">
                <h3 className="font-bold text-xl">Subject: {selectedSubject}</h3>
                <h4>From: {selectedUserFrom}</h4>
                <div className="dashboard-message p-6">
                  <div className="message-from">
                    {sortedMessages
                      .filter((item) => item.subject === selectedSubject)
                      .map((item, index) => (
                        <div
                          key={index}
                          className={`mb-2 ${item.user_from
                            ? "text-left message_from"
                            : item.user_to
                              ? "text-right message_to"
                              : ""
                            }`}
                        >
                          <div className="content">
                            <p>
                              <span className="text-sm">
                                {item.time && item.time}
                              </span>
                            </p>
                            <span className="text-xl">{item.message}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="reply">
                  <form
                    onSubmit={(e) =>
                      handleSubmitReply(e, selectedUserFrom, selectedSubject)
                    }
                  >
                    <textarea
                      className="w-full border-2"
                      name="message"
                      id="message"
                      rows="4"
                      required
                      value={message}
                      onChange={handleOnChange}
                    ></textarea>
                    <div className="flex justify-center">
                      <button className="cursor-pointer rounded bg-primary px-6 mb-2 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                        <FontAwesomeIcon icon={faPaperPlane} />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : user && user.message_from.length > 0 ? (
              <>
                {/* Create a map to store unique items */}
                <div
                  onClick={btnNewMessage}
                  className="cursor-pointer flex items-center justify-center w-40 rounded bg-primary px-2 mb-5 pb-2.5 pt-3 text-sm font-medium uppercase text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  <FontAwesomeIcon className="mr-2" icon={faPencil} />
                  <button>New Message</button>
                </div>
                {Object.values(
                  user.message_from.reduce((uniqueMap, item) => {
                    const key = `${item.user_from}-${item.subject}`;
                    // Add the item to the map if the key doesn't exist yet
                    if (!uniqueMap[key]) {
                      uniqueMap[key] = item;
                    }
                    return uniqueMap;
                  }, {})
                ).map((uniqueItem, index) => (
                  <div
                    key={index}
                    className="item-message mb-5 bg-gray-200 p-2 rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-pointer relative"
                    onClick={() =>
                      handleItemClick(uniqueItem.subject, uniqueItem.user_from)
                    }
                  >
                    <p style={{ color: "rgb(145 145 145)", marginBottom: "-10px" }}>
                      {uniqueItem.user_from}
                    </p>
                    <b className="text-2xl">{uniqueItem.subject}</b>
                    <p style={{ color: "rgb(145 145 145)", marginTop: "-10px" }}>
                      {uniqueItem.message.length > 50
                        ? `${uniqueItem.message.slice(0, 50)}...`
                        : uniqueItem.message}
                    </p>
                  </div>
                ))}
              </>
            ) : (
              <div className="flex justify-center items-center flex-col">
                <div
                  onClick={btnNewMessage}
                  className="cursor-pointer flex items-center justify-center w-40 rounded bg-primary px-2 mb-5 pb-2.5 pt-3 text-sm font-medium uppercase text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  <FontAwesomeIcon className="mr-2" icon={faPencil} />
                  <button>New Message</button>
                </div>
                <h2 className="text-2xl">You don't have message</h2>
                <img src={ImgNotification} className="max-w-28" alt="img" />
              </div>
            )}
          </>
        }

        {/* {user && user.message_from.length > 0 ? (
          user.message_from.map((item, index) => (
            <div className="item-message mb-5 bg-gray-200 p-2 rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-pointer relative">
              <p style={{ color: "rgb(145 145 145)", marginBottom: "-10px" }}>{item.user_from}</p>
              <b className="text-2xl">{item.subject}</b>
              <p style={{ color: "rgb(145 145 145)", marginTop: '-10px' }}>{item.message.length > 50 ? `${item.message.slice(0, 50)}...` : item.message}</p>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center flex-col">
            <h2 className="text-2xl">You don't have message</h2>
            <img src={ImgNotification} className="max-w-28" alt="img" />
          </div>
        )} */}
      </div>
    </Modal>
  );
}

export default PopupMessage;
