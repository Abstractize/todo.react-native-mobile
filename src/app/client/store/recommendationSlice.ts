import { createSlice } from '@reduxjs/toolkit';
import { TaskList } from '../models';
import {
    fetchRecommendations,
    addRecommendedListThunk,
    removeRecommendationThunk,
} from './recommendationThunk';

interface RecommendationsState {
    recommendations: TaskList[];
    loading: boolean;
    error: string | null;
}

const initialState: RecommendationsState = {
    recommendations: [],
    loading: false,
    error: null,
};

const recommendationsSlice = createSlice({
    name: 'recommendations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchRecommendations
            .addCase(fetchRecommendations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecommendations.fulfilled, (state, action) => {
                state.recommendations = action.payload;
                state.loading = false;
            })
            .addCase(fetchRecommendations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to load recommendations';
            })

            // addRecommendedListThunk
            .addCase(addRecommendedListThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRecommendedListThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addRecommendedListThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to add recommended list';
            })

            // removeRecommendationThunk
            .addCase(removeRecommendationThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeRecommendationThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(removeRecommendationThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to remove recommendation';
            });
    },
});

export default recommendationsSlice.reducer;