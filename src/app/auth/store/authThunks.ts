import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../services/AuthService';
import { setAuthenticated } from './authActions';
import { LoginRequest, RegisterRequest } from '@auth/models';

export const loginThunk = createAsyncThunk<
    Awaited<ReturnType<AuthService['login']>>,
    LoginRequest,
    {
        extra: { authService: AuthService }
    }
>(
    'auth/login',
    async (credentials, { dispatch, extra }) => {
        const authService = extra.authService;
        const result = await authService.login(credentials)
            .then(() => {
                dispatch(setAuthenticated(true));
            })
            .catch((error) => {
                dispatch(setAuthenticated(false));
                return Promise.reject(error);
            }).finally(() => {

            });
        return result;
    }
);

export const logoutThunk = createAsyncThunk<
    Awaited<ReturnType<AuthService['logout']>>,
    void,
    {
        extra: { authService: AuthService }
    }
>(
    'auth/logout',
    async (_, { dispatch, extra }) => {
        const authService = extra.authService;
        const result = await authService.logout();
        dispatch(setAuthenticated(false));
        return result;
    }
);

export const registerThunk = createAsyncThunk<
    Awaited<ReturnType<AuthService['register']>>,
    RegisterRequest,
    {
        extra: { authService: AuthService }
    }
>(
    'auth/register',
    async (registerData, { dispatch, extra }) => {
        const authService = extra.authService;
        const result = await authService.register(registerData)
            .then(() => {
                dispatch(setAuthenticated(true));
            })
            .catch((error) => {
                dispatch(setAuthenticated(false));
                return Promise.reject(error);
            });
        return result;
    }
);