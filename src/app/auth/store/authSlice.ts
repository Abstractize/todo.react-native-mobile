import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, logoutThunk } from './authThunks';
import { setAuthenticated, setUser, clearUser } from './authActions';

interface State {
    isAuthenticated: boolean,
    user: any,
    isLoading: boolean,
    error: string | null
}

const initialState: State = {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setAuthenticated, (state, action) => {
                state.isAuthenticated = action.payload;
            })
            .addCase(setUser, (state, action) => {
                state.user = action.payload;
            })
            .addCase(clearUser, (state) => {
                state.user = null;
            })
            .addCase(loginThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action: any) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user || null;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string) || '';
            }).addCase(logoutThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(logoutThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string) || '';
            });
    },
});

export default authSlice.reducer;