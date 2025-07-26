import { createSlice } from '@reduxjs/toolkit';
import { TaskList } from '../models';
import {
    fetchTaskLists,
    addTaskListThunk,
    updateTaskListThunk,
    deleteTaskListThunk,
} from './taskListThunk';

interface TaskListsState {
    taskLists: TaskList[];
    loading: boolean;
    error: string | null;
}

const initialState: TaskListsState = {
    taskLists: [],
    loading: false,
    error: null,
};

const taskListsSlice = createSlice({
    name: 'taskLists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchTaskLists
            .addCase(fetchTaskLists.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTaskLists.fulfilled, (state, action) => {
                state.taskLists = action.payload;
                state.loading = false;
            })
            .addCase(fetchTaskLists.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to load task lists';
            })

            // addTaskListThunk
            .addCase(addTaskListThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTaskListThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addTaskListThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to add task list';
            })

            // updateTaskListThunk
            .addCase(updateTaskListThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTaskListThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateTaskListThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to update task list';
            })

            // deleteTaskListThunk
            .addCase(deleteTaskListThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTaskListThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteTaskListThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to delete task list';
            });
    },
});

export default taskListsSlice.reducer;