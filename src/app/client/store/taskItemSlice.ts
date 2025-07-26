import { createSlice } from '@reduxjs/toolkit';
import { TaskItem } from '../models';
import {
    fetchTasksByListIdThunk,
    addTaskThunk,
    updateTaskThunk,
    deleteTaskThunk,
} from './taskItemThunk';

interface TaskItemsState {
    taskItems: TaskItem[];
    loading: boolean;
    error: string | null;
}

const initialState: TaskItemsState = {
    taskItems: [],
    loading: false,
    error: null,
};

const taskItemsSlice = createSlice({
    name: 'taskItems',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchTasksByListIdThunk
            .addCase(fetchTasksByListIdThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasksByListIdThunk.fulfilled, (state, action) => {
                state.taskItems = action.payload;
                state.loading = false;
            })
            .addCase(fetchTasksByListIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Error loading tasks';
            })

            // addTaskThunk
            .addCase(addTaskThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTaskThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addTaskThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Error adding task';
            })

            // updateTaskThunk
            .addCase(updateTaskThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTaskThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateTaskThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Error updating task';
            })

            // deleteTaskThunk
            .addCase(deleteTaskThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTaskThunk.fulfilled, (state, action) => {
                state.taskItems = state.taskItems.filter(task => task.id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteTaskThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Error deleting task';
            });
    },
});

export default taskItemsSlice.reducer;