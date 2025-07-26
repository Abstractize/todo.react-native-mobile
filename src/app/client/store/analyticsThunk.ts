import { createAsyncThunk } from '@reduxjs/toolkit';
import { AnalyticsRepository } from '../repositories';
import { AnalyticsSummary, WeeklyAnalytics } from '../models';

export const fetchAnalyticsSummary = createAsyncThunk<
    AnalyticsSummary,
    void,
    { extra: { analyticsRepository: AnalyticsRepository } }
>(
    'analytics/fetchSummary',
    async (_, { extra }) => {
        return await extra.analyticsRepository.getSummary();
    }
);

export const fetchWeeklyAnalytics = createAsyncThunk<
    WeeklyAnalytics,
    void,
    { extra: { analyticsRepository: AnalyticsRepository } }
>(
    'analytics/fetchWeekly',
    async (_, { extra }) => {
        return await extra.analyticsRepository.getWeekly(new Date());
    }
);