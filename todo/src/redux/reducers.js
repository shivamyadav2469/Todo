import { combineReducers } from 'redux';
import { ADD_TASK, DELETE_TASK, UPDATE_TASK } from './actions';

const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];
    case DELETE_TASK:
      return state.filter(task => task.id !== action.payload);
    case UPDATE_TASK:
      return state.map(task =>
        task.id === action.payload.taskId ? action.payload.updatedTask : task
      );
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export default rootReducer;
