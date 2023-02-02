import { createSlice } from '@reduxjs/toolkit';

interface TasksProps {
  tasksList: { name: string; checked: boolean; id: number }[];
  tasksDoneList: { name: string; checked: boolean; id: number }[];
}

const initialState: TasksProps = {
  tasksList: [],
  tasksDoneList: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTasks: (state, action) => {
      state.tasksList.push(action.payload);
    },
    addCheckedTasks: (state, action) => {
      const index = state.tasksList.findIndex((tasks) => tasks.id === action.payload.id);
      state.tasksList[index].checked = action.payload.checked;
    },
    addDoneTasks: (state, action) => {
      state.tasksDoneList.push(action.payload);
    },
    deleteTasks: (state, action) => {
      state.tasksList = state.tasksList.filter((state) => state.id !== action.payload);
    },
    deleteDoneTasks: (state, action) => {
      state.tasksDoneList = state.tasksDoneList.filter((state) => state.id !== action.payload);
    },
  },
});

export const { addTasks, deleteTasks, addCheckedTasks, addDoneTasks, deleteDoneTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
