import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../redux/actions';
import { CalendarClock, FilePenLine, Trash } from "lucide-react";

const TaskDetails = ({ task, handleOpenEditModal }) => {
  const dispatch = useDispatch();

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <li className="relative flex flex-col justify-between border bg-white bg-opacity-50 shadow-lg backdrop-blur border-white border-opacity-70 hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 p-8 gap-2">
      <div className="flex items-center">
        {task.completed ? (
          <div className="text-green-600 bg-green-200 border border-green-600 text-sm px-[8px] rounded-full p-2 text-center">
            Completed
          </div>
        ) : (
          <div className="text-red-600 bg-red-200 border border-red-600 text-sm px-[10px] py-1 rounded-full text-center">
            ToDo
          </div>
        )}
      </div>
      <h2 className="text-xl font-bold text-[#4B5563]">{task.title}</h2>
      <p>{task.description}</p>
      <hr />
      <div className="flex justify-between items-center">
        <div className="mb-2 flex items-center gap-2">
          <CalendarClock color="#4B5563" size={20} />
          <span className="text-[#4B5563]">
            {new Date(task.deadline).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex justify-end gap-2">
          <FilePenLine
            className="text-[#4B5563] cursor-pointer"
            onClick={() => handleOpenEditModal(task)}
            size={20}
          />
          <Trash
            className="text-[#4B5563] cursor-pointer"
            onClick={() => handleDeleteTask(task.id)}
            size={20}
          />
        </div>
      </div>
    </li>
  );
};

export default TaskDetails;
