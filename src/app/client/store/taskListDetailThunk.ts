import { TaskList } from "@client/models/TaskList";
import { TaskListRepository } from "@client/repositories";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTaskListByIdThunk = createAsyncThunk<
    TaskList,
    string,
    { extra: { taskListRepository: TaskListRepository } }
>(
    'taskListDetail/fetchById',
    async (id, { extra }) => {
        return await extra.taskListRepository.find(id);
    }
);