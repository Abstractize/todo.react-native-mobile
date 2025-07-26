import { createSlice } from '@reduxjs/toolkit';
import { TaskList } from '../models';
import { fetchTaskListByIdThunk } from './taskListDetailThunk';

interface TaskListDetailState {
    taskList?: TaskList;
    loading: boolean;
    error?: string;
}

const initialState: TaskListDetailState = {
    taskList: undefined,
    loading: false,
};

const taskListDetailSlice = createSlice({
    name: 'taskListDetail',
    initialState,
    reducers: {
        clearTaskListDetail: (state) => {
            state.taskList = undefined;
            state.error = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTaskListByIdThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchTaskListByIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.taskList = action.payload;
            })
            .addCase(fetchTaskListByIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearTaskListDetail } = taskListDetailSlice.actions;
export default taskListDetailSlice.reducer;