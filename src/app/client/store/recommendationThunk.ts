import { RecommendationsRepository, TaskListRepository } from '@client/repositories';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskList } from '../models';

export const fetchRecommendations = createAsyncThunk<
    TaskList[],
    void,
    { extra: { recommendationsRepository: RecommendationsRepository } }
>(
    'recommendations/fetch',
    async (_arg, { extra }) => {
        const recs = await extra.recommendationsRepository.get();
        recs.sort((a, b) => a.priority - b.priority);
        return recs;
    }
);

export const addRecommendedListThunk = createAsyncThunk<
    void,
    TaskList,
    {
        extra: {
            recommendationsRepository: RecommendationsRepository;
            taskListRepository: TaskListRepository;
        };
    }
>(
    'recommendations/addRecommendedList',
    async (rec, { extra }) => {
        await extra.taskListRepository.add(rec);
        await extra.recommendationsRepository.patch(rec.id!, true);
    }
);

export const removeRecommendationThunk = createAsyncThunk<
    void,
    string,
    { extra: { recommendationsRepository: RecommendationsRepository } }
>(
    'recommendations/removeRecommendation',
    async (id, { extra }) => {
        await extra.recommendationsRepository.patch(id, false);
    }
);