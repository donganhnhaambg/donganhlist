import React, { useEffect, useMemo, useState } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TrashIcon from "./icons/TrashIcon";
import PlusIcon from "./icons/PlusIcon";
import TaskCard from "./TaskCard";
import { CSS } from "@dnd-kit/utilities";

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
  color,
  bg,
  colorBorder
}) {
  const [editMode, setEditMode] = useState(false);
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
      bg-columnBackgroundColor
      opacity-40
      border-2
      border-pink-500
      w-[350px]
      h-[500px]
      max-h-[500px]
      rounded-md
      flex
      flex-col
      "
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-columnBackgroundColor
      w-[350px]
      h-[500px]
      max-h-[500px]
      rounded-md
      flex
      flex-col
      ${color}
      `}
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className={`
        text-md
        h-[60px]
        cursor-pointer
        rounded-md
        rounded-b-none
        p-3
        font-bold
        border-${colorBorder}
        border-2
        flex
        items-center
        justify-between`}
      >
        <div className="flex gap-2">
          {!editMode && column.title}
          {editMode && (
            <input
              className="rounded bg-transparent outline-none px-2"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id);
          }}
          className="
        stroke-gray-500
        hover:stroke-white
        hover:bg-columnBackgroundColor
        rounded
        px-1
        py-2
        "
        >
          <TrashIcon />
        </button>
      </div>

      {/* Column task container */}
      <div
        className={`flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto border-${colorBorder} border-2 ${color}`}
      >
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              color={color}
              bg={bg}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      {/* Column footer */}
      <button
        className={`flex gap-2 items-center border-${colorBorder} border-2 rounded-md rounded-t-none p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 ${color}`}
        onClick={() => {
          createTask(column.id);
        }}
      >
        <PlusIcon />
        Add task
      </button>
    </div>
  );
}

export default ColumnContainer;
