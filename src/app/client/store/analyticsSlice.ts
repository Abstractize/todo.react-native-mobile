import { createSlice } from '@reduxjs/toolkit';
import { AnalyticsSummary, WeeklyAnalytics } from '../models';
import { fetchAnalyticsSummary, fetchWeeklyAnalytics } from './analyticsThunk';

type AnalyticsState = {
    summary: AnalyticsSummary | null;
    weekly: WeeklyAnalytics | null;
    loading: boolean;
    error: string | null;
};

const initialState: AnalyticsState = {
    summary: null,
    weekly: null,
    loading: false,
    error: null,
};

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnalyticsSummary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAnalyticsSummary.fulfilled, (state, action) => {
                state.summary = action.payload;
                state.loading = false;
            })
            .addCase(fetchAnalyticsSummary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch analytics summary';
            })
            .addCase(fetchWeeklyAnalytics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeeklyAnalytics.fulfilled, (state, action) => {
                state.weekly = action.payload;
                state.loading = false;
            })
            .addCase(fetchWeeklyAnalytics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch weekly analytics';
            });
    },
});

export default analyticsSlice.reducer;