import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskListRepository } from '@client/repositories';
import { TaskList } from '../models';

export const fetchTaskLists = createAsyncThunk<
    TaskList[],
    void,
    { extra: { taskListRepository: TaskListRepository } }
>(
    'taskLists/fetch',
    async (_arg, { extra }) => {
        return await extra.taskListRepository.get();
    }
);

export const addTaskListThunk = createAsyncThunk<
    void,
    TaskList,
    { extra: { taskListRepository: TaskListRepository } }
>(
    'taskLists/add',
    async (taskList, { extra }) => {
        await extra.taskListRepository.add(taskList);
    }
);

export const updateTaskListThunk = createAsyncThunk<
    void,
    TaskList,
    { extra: { taskListRepository: TaskListRepository } }
>(
    'taskLists/update',
    async (taskList, { extra }) => {
        await extra.taskListRepository.update(taskList);
    }
);

export const deleteTaskListThunk = createAsyncThunk<
    void,
    string,
    { extra: { taskListRepository: TaskListRepository } }
>(
    'taskLists/delete',
    async (id, { extra }) => {
        await extra.taskListRepository.delete(id);
    }
);