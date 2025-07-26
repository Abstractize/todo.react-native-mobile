import { createAction } from '@reduxjs/toolkit';

export const setAuthenticated = createAction<boolean>('auth/setAuthenticated');
export const setUser = createAction<any>('auth/setUser');
export const clearUser = createAction('auth/clearUser');