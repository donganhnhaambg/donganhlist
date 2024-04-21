import React, { useState } from "react";
import Modal from "react-modal";
import { saveAs } from "file-saver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faCalendarDays,
  faPaperclip,
  faBarsStaggered,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

function PopupComponent({
  onClose,
  onSubmit,
  updateDataTask,
  updateDataTaskId,
}) {
  const [title, setTitle] = useState(
    updateDataTask ? updateDataTask.title : ""
  );
  const [description, setDescription] = useState(
    updateDataTask ? updateDataTask.description : ""
  );
  const [selectedDate, setSelectedDate] = useState(
    updateDataTask ? updateDataTask.date : ""
  );
  const [link, setLink] = useState(updateDataTask ? updateDataTask.link : "");
  // const [comment, setComment] = useState(updateDataTask ? updateDataTask.comment : "");

  const handleCloseModal = () => {
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      link,
      selectedDate,
      // comment,
      updateDataTaskId,
    });
    // Tạo một đối tượng FileReader để đọc file
    // const reader = new FileReader();
    // reader.onload = () => {
    //   // Lưu hình ảnh xuống hệ thống tệp của người dùng
    //   saveAs(reader.result, `${title}.jpg`);
    // };
    // reader.readAsDataURL(image);

    // Reset state
    setTitle("");
    setDescription("");
    // setComment("");
    setSelectedDate("");
    setLink("");
    handleCloseModal();
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
          <label htmlFor="title" className="text-l mb-6 text-left">
            <FontAwesomeIcon icon={faCreditCard} />
            <span className="pl-2 font-bold">Title</span>
            <input
              className="border rounded py-2 px-3 mb-6 w-full bg-ededed mt-2"
              type="text"
              id="title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label htmlFor="date" className="text-l mb-6 text-left">
            <FontAwesomeIcon icon={faCalendarDays} />
            <span className="pl-2 font-bold">Select Date</span>
            <input
              className="border rounded py-2 px-3 mb-6 w-full bg-ededed mt-2"
              type="date"
              id="date"
              required
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </label>

          <label htmlFor="image" className="text-l mb-6 text-left">
            <FontAwesomeIcon icon={faPaperclip} />
            <span className="pl-2 font-bold">Link file</span>
            <input
              className="border rounded py-2 px-3 mb-6 w-full bg-ededed mt-2"
              type="text"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </label>

          <label htmlFor="description" className="text-l mb-6 text-left">
            <FontAwesomeIcon icon={faBarsStaggered} />
            <span className="pl-2 font-bold">Description</span>
            <textarea
              className="border rounded py-2 px-3 mb-6 w-full bg-ededed mt-2"
              value={description}
              placeholder="Add a more detailed description…"
              rows="5"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          {/* <label
            htmlFor="comment"
            className="flex items-center justify-between text-l mb-6 text-left"
          >
            <div className="bg-black w-8 h-8 rounded-full"></div>
            <input
              className="border rounded-full py-2 w-11/12 px-3 bg-ededed mt-2"
              type="text"
              id="comment"
              placeholder="Write a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label> */}

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default PopupComponent;
