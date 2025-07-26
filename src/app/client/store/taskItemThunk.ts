import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskItem } from '../models';
import { TaskItemRepository } from '@client/repositories';

export const fetchTasksByListIdThunk = createAsyncThunk<
    TaskItem[],
    string,
    { extra: { taskItemRepository: TaskItemRepository } }
>('taskItem/fetchByListId', async (listId, { extra }) => {
    return await extra.taskItemRepository.getByTaskListId(listId);
});

export const addTaskThunk = createAsyncThunk<
    void,
    Partial<TaskItem>,
    { extra: { taskItemRepository: TaskItemRepository } }
>('taskItem/add', async (task, { extra }) => {
    const result: TaskItem = {
        id: null,
        title: task.title || '',
        isCompleted: false,

        taskListId: task.taskListId || null,
    }

    return await extra.taskItemRepository.add(result);
});

export const updateTaskThunk = createAsyncThunk<
    void,
    TaskItem,
    { extra: { taskItemRepository: TaskItemRepository } }
>('taskItem/update', async (task, { extra }) => {
    return await extra.taskItemRepository.update(task);
});

export const deleteTaskThunk = createAsyncThunk<
    string,
    string,
    { extra: { taskItemRepository: TaskItemRepository } }
>('taskItem/delete', async (id, { extra }) => {
    await extra.taskItemRepository.delete(id);
    return id;
});