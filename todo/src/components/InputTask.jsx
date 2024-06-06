import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, updateTask } from "../redux/actions";

import TaskDetails from "./TaskDetails";
import EditTask from "./EditTask";
import { useFormik } from "formik";
import { CircleCheckBig, Clock3, LayoutList, NotebookPen, Plus } from "lucide-react";

const InputTask = () => {
  const reduxTasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [nextId, setNextId] = useState(1);
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      deadline: "",
      completed: false,
      important: false,
    },
    onSubmit: (values) => {
      const newTask = { id: nextId, ...values };
      dispatch(addTask(newTask));
      setNextId(nextId + 1);
      setShowModal(false);
      formik.resetForm();
    },
  });

  const handleOpenEditModal = (task) => {
    setEditTask(task);
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId)); 
  };

  const handleUpdateTask = (taskId, updatedTask) => {
    dispatch(updateTask(taskId, updatedTask)); 
    setEditTask(null);
  };

  const handleCloseModal = () => {
    formik.resetForm();
    setShowModal(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowMenu(false);
  };

  const filteredTasks = reduxTasks.filter((task) => {
    if (activeTab === "All") {
      return true;
    } else if (activeTab === "Important") {
      return task.important;
    } else if (activeTab === "Completed") {
      return task.completed;
    } else if (activeTab === "Todo") {
      return !task.completed;
    }
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-r from-blue-300 to-red-400">
    {/* Sidebar */}
    <div className="w-full md:w-1/4 p-4 flex flex-col sm:block">
      <div className="md:p-4 sm:p-0">
      <div className="md:hidden flex justify-end">
      <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 border rounded-md text-gray-600 hover:bg-indigo-50"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div
         className={`${
            showMenu ? "block" : "hidden"
          }  sm:bg-transparent md:static md:bg-transparent md:flex md:flex-col flex flex-col w-full`}
        >
          <button
            className={`p-2 rounded-md mt-1 ${
              activeTab === "All"
                ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                : "hover:bg-indigo-50 text-gray-600"
            }`}
            onClick={() => handleTabClick("All")}
          >
            <div className="flex items-center gap-[3rem]">
              <LayoutList />
              <div>All</div>
            </div>
          </button>
          <button
            className={`p-2 rounded-md mt-1 ${
              activeTab === "Important"
                ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                : "hover:bg-indigo-50 text-gray-600"
            }`}
            onClick={() => handleTabClick("Important")}
          >
            <div className="flex items-center gap-[3rem] w-[200px]">
              <Clock3 />
              <div>Important</div>
            </div>
          </button>
          <button
            className={`p-2 rounded-md mt-1 ${
              activeTab === "Completed"
                ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                : "hover:bg-indigo-50 text-gray-600"
            }`}
            onClick={() => handleTabClick("Completed")}
          >
            <div className="flex items-center gap-[3rem] w-[200px]">
              <CircleCheckBig />
              <div>Completed</div>
            </div>
          </button>
          <button
            className={`p-2 rounded-md mt-1 ${
              activeTab === "Todo"
                ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                : "hover:bg-indigo-50 text-gray-600"
            }`}
            onClick={() => handleTabClick("Todo")}
          >
            <div className="flex items-center gap-[3rem] ">
              <NotebookPen />
              <div>Todo</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  
    {/* Main Content */}
    <div className="w-full md:w-3/4  p-4 overflow-auto">
      <button
        className="py-2 px-3 my-1 font-medium rounded-md cursor-pointer bg-cyan-200 ml-auto flex"
        onClick={() => setShowModal(true)}
      >
      <div className="flex items-center gap-2">
      <Plus />
      <div>Add Task</div>
      </div>
        
      </button>
  
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl font-bold mb-4">Add Task</h2>
            <form onSubmit={formik.handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
              />
              <textarea
                name="description"
                cols={8}
                rows={5}
                placeholder="Description"
                onChange={formik.handleChange}
                value={formik.values.description}
                className="border border-gray-300 rounded-md px-2 py-1 mb-[3px] w-full"
              />
              <input
                type="date"
                name="deadline"
                placeholder="Deadline"
                onChange={formik.handleChange}
                value={formik.values.deadline}
                className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
              />
              <div className="mb-2">
                <input
                  type="checkbox"
                  name="completed"
                  className="mr-2"
                  onChange={formik.handleChange}
                  checked={formik.values.completed}
                />
                <span>Completed</span>
              </div>
  
              <div className="mb-4">
                <input
                  type="checkbox"
                  name="important"
                  className="mr-2"
                  onChange={formik.handleChange}
                  checked={formik.values.important}
                />
                <span>Important</span>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-300 rounded-md mr-2"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
  
      <div className="grid md:grid-cols-2 lg:grid-cols-3 my-5 gap-3">
        {filteredTasks.length === 0 ? (
          <p className="text-2xl font-bold flex justify-center items-center h-screen text-gray-700">No tasks to show</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskDetails
              key={task.id}
              task={task}
              handleOpenEditModal={handleOpenEditModal}
              handleDeleteTask={handleDeleteTask}
            />
          ))
        )}
      </div>
  
      {editTask && (
        <EditTask
          task={editTask}
          onClose={() => setEditTask(null)}
          onUpdate={handleUpdateTask}
        />
      )}
    </div>
  </div>
  
  );
};

export default InputTask;
