import React, { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import PlusIcon from "./icons/PlusIcon";
import ColumnContainer from "./ColumnContainer";
import TaskCard from "./TaskCard";
import PopupComponent from "./PopupComponent";
import { connect } from "react-redux";
import { getInforUser, setInforUser } from "../../untils/functions";
import axios from "axios";
import { actUserInfor } from "../../actions";

const defaultCols = [
  {
    id: "todo",
    title: "Todo",
  },
  {
    id: "doing",
    title: "Work in progress",
  },
  {
    id: "done",
    title: "Done",
  },
];

const defaultTasks = [
  {
    id: "1",
    columnId: "todo",
    title: "List admin APIs for dashboard",
    date: "2024-03-20",
    description: 'Lorem'
  },
  {
    id: "2",
    columnId: "todo",
    title: "Develop user registration functionality with OTP delivered on SMS",
    date: '2024-03-20',
    description: 'Lorem'
  },
  {
    id: "3",
    columnId: "doing",
    title: "Conduct security testing",
    date: '2024-03-20',
    description: 'Lorem'
  },
  {
    id: "4",
    columnId: "doing",
    title: "Analyze competitors",
    date: '2024-03-20',
    description: 'Lorem'
  },
  {
    id: "5",
    columnId: "done",
    title: "Create UI kit documentation",
    date: '2024-03-20',
    description: 'Lorem'
  },
  {
    id: "6",
    columnId: "done",
    title: "Dev meeting",
    date: '2024-03-20',
    description: 'Lorem'
  },
];

function Dashboard(props) {
  const [columns, setColumns] = useState(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [tasks, setTasks] = useState(defaultTasks);
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [editable, setEditable] = useState(false);
  const [updateDataTask, setUpdateDataTask] = useState();
  const [updateDataTaskId, setUpdateDataTaskId] = useState();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  const [bg, setBg] = useState("bg-white");
  const [color, setColor] = useState("text-black");
  const [colorBorder, setColorBorder] = useState("black");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [columnId, setColumnId] = useState("");
  const [statusChange, setStatusChange] = useState(false);
  const handleSubmission = (data) => {
    // Xử lý dữ liệu được trả về từ PopupComponent
    // setSubmittedData(data);
    if (data) {
      // console.log(data);
      const newTask = {
        id: generateId(),
        columnId,
        title: `${data && data.title}`,
        description: `${data && data.description}`,
        date: `${data && data.selectedDate}`,
        link: `${data && data.link}`,
        // comment: `${data && data.comment}`,
      };
      if (data.updateDataTaskId) {
        const updatedTasks = tasks.map((task) =>
          task.id === data.updateDataTaskId
            ? {
              ...task,
              title: data.title || task.title,
              description: data.description || task.description,
              date: data.selectedDate || task.date,
              link: data.link || task.link,
              // comment: data.comment || task.comment,
            }
            : task
        );
        setTasks(updatedTasks);
      } else {
        setTasks([...tasks, newTask]);
      }
    }
    // const newTasks = tasks.map((task, index) => {
    //   if (index !== id) return task;
    //   return { ...task, content };
    // });
    // console.log(newTasks);
    // setTasks(newTasks);
    setIsPopupOpen(false); // Đóng PopupComponent sau khi xử lý dữ liệu
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  useEffect(() => {
    if (props.darkmode === "active dark mode") {
      setColor("text-white");
      setBg("bg-white");
      setColorBorder("white");
    } else {
      setColor("text-black");
      setBg("bg-white");
      setColorBorder("black");
    }
  }, [props.darkmode]);
  const user = getInforUser();
  useEffect(() => {
    if (user && user !== null) {
      // if(user.dashboard)
      if (user.dashboard) {
        if (user.dashboard.length > 0) {
          setColumns(user.dashboard[0].column);
          const taskRes = user.dashboard[0].listTask;
          const tasksWithId = taskRes.map((task, index) => ({
            ...task,
            id: index, // Thêm trường id là chỉ số của mảng
          }));
          setTasks(tasksWithId);
        }
      }
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user !== null) {
          const response = await axios.post("http://localhost:3001/auth/me", {
            email: user.email,
          });
          setInforUser(response.data);
        }
      } catch (error) {
        if (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [statusChange]);
  const handleUpdateTask = async () => {
    try {
      const url = "http://localhost:3001/action/edit";
      const data = {
        _id: user._id,
        dashboard: [
          {
            column: columns,
            listTask: tasks,
          },
        ],
      };

      const response = await axios.post(url, data);
      if (response.data.msg === "OK") {
        const response = await axios.post("http://localhost:3001/auth/me", {
          email: user.email,
        });
        setInforUser(response.data);
        props.dispatchUserInfor(response.data);
        setStatusChange(true);
        alert("Update Success!");
      }
    } catch (error) {
      console.error("Error editing data:", error);
    }
  };
  // useEffect(()=>{
  //   const fetchData = async () => {

  //   fetchData();
  // },[tasks, columns]);

  // if(user && user !== null){
  //   setTasks(user.)
  // }
  return (
    <div
      className={`
      mx-auto
      flex
      mt-20
      w-full
      items-center
      overflow-x-auto
      overflow-y-hidden
      px-[40px]
      `}
    >
      {isPopupOpen && (
        <PopupComponent
          onClose={closePopup}
          updateDataTask={updateDataTask}
          updateDataTaskId={updateDataTaskId}
          onSubmit={handleSubmission}
        />
      )}
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  color={color}
                  bg={bg}
                  colorBorder={colorBorder}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => {
              createNewColumn();
            }}
            className={`h-[60px]
            w-[350px]
            min-w-[350px]
            cursor-pointer
            rounded-lg
            bg-mainBackgroundColor
            border-2
            border-${colorBorder}
            p-4
            bd-black
            ring-rose-500
            hover:ring-2
            flex
            gap-2
            ${color}`}
          >
            <PlusIcon />
            Add Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                color={color}
                bg={bg}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
      <div
        onClick={handleUpdateTask}
        className="cursor-pointer left-[50%] translate-y-2/4 absolute bottom-[80px] rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      >
        <button>Update</button>
      </div>
    </div>
  );

  function createTask(columnId) {
    setColumnId(columnId);
    setIsPopupOpen(true);
    setUpdateDataTask();
    setUpdateDataTaskId();
  }

  function deleteTask(id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id, title, description, date) {
    tasks.map((task) => {
      if (task.id === id) {
        setUpdateDataTask(task);
      }
    })
    setIsPopupOpen(true);
    setUpdateDataTaskId(id);
    console.log(updateDataTask);
    // const newTasks = tasks.map((task, index) => {
    //   if (index !== id) return task;
    //   return { ...task, content };
    // });
    // console.log(newTasks);
    // setTasks(newTasks);
  }

  function createNewColumn() {
    const columnToAdd = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  }

  function updateColumn(id, title) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  }

  function onDragStart(event) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);
        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
}

function generateId() {
  return Math.floor(Math.random() * 10001);
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchUserInfor: (data) => {
      dispatch(actUserInfor(data));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    darkmode: state.darkmode,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
