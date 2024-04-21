import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TrashIcon from "./icons/TrashIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faComment,
  faPaperclip,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import Link from '../../assets/images/link.png';
import Clock from '../../assets/images/clock.gif';

function formatDate(dateString) {
  const dateObj = new Date(dateString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return dateObj.toLocaleDateString("en-US", options);
}

function TaskCard({ task, deleteTask, updateTask, color, bg }) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 bg-mainBackgroundColor p-2.5 items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative"
      />
    );
  }
  if (bg === "bg-white") {
    bg = "bg-slate-200";
  } else {
    bg = "bg-9a9a9a";
  }
  const handleClick = () => {
    updateTask(task.id);
    toggleEditMode();
  };
  if (!editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onMouseEnter={() => {
          setMouseIsOver(true);
        }}
        onMouseLeave={() => {
          setMouseIsOver(false);
        }}
        className={`${bg} p-2.5 items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset text-black hover:ring-rose-500 cursor-grab relative`}
      >
        <div className="content-col-custom" onClick={handleClick}>
          <div className="img"></div>
          <div className="content-col">
            <div className="title-col my-2">
              <a href="#" className="text-xl font-bold mb-2">{task.title}</a>
            </div>
            <div className="content flex gap-3">
              <div className="date flex gap-1 items-center">
                {/* <FontAwesomeIcon icon={faClock} /> */}
                <img style={{ maxWidth: "25px", borderRadius: "100%" }} src={Clock} alt="Clock" />
                <span className="text-lg">{formatDate(task.date)}</span>
              </div>
              {/* <div className="comment flex gap-1 items-center">
              <FontAwesomeIcon icon={faComment} />1
            </div> */}
            </div>
            <div className="link mt-2">
              {task.link &&
                <a href={task.link} className="hover:text-red-500 flex items-center" target="_blank">
                  <img src={Link} alt="link" style={{ maxWidth: "25px" }} />
                  <span className="text-lg"> {task.link}</span>
                </a>
              }
            </div>
          </div>
        </div>
        {mouseIsOver && (
          <button
            onClick={() => {
              deleteTask(task.id);
            }}
            className={`stroke-gray-500
          hover:bg-columnBackgroundColor z-5 absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100 ${color}`}
          >
            <TrashIcon />
          </button>
        )}
        {/* <textarea
          className={`h-[90%]
          w-full resize-none border-none rounded bg-transparent ${color} focus:outline-none`}
          value={task.content}
          autoFocus
          placeholder="Task content here"
          // onBlur={toggleEditMode}
          // onKeyDown={(e) => {
          //   if (e.key === "Enter" && e.shiftKey) {
          //     toggleEditMode();
          //   }
          // }}
          // onChange={(e) => updateTask(task.id, e.target.value)}
        /> */}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className="bg-gray-300 p-2.5 h-[100px] min-h-[100px] items-center flex flex-col text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <p
        className={`my-auto h-[100%] w-full overflow-y-auto text-lg overflow-x-hidden whitespace-pre-wrap text-black`}
      >
        {task.description}
      </p>
      <p
        className={`my-auto h-[100%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap text-black`}
      >
        {task.link}
      </p>
      {/* <button
        onClick={() => {
          updateTask(task.id);
        }}
        className={`stroke-gray-500
          hover:bg-columnBackgroundColor absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100 ${color}`}
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </button> */}
    </div>
  );
}

export default TaskCard;
