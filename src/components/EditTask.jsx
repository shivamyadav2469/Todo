import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../redux/actions';
import { useFormik } from 'formik';

const EditTask = ({ task, onClose }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      completed: task.completed,
      important: task.important,
    },
    onSubmit: (values) => {
      dispatch(updateTask(task.id, values));
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
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
              onClick={onClose}
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
  );
};

export default EditTask;
