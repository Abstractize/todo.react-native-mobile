import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@auth/store/authSlice';
import taskListsReducer from '@client/store/taskListSlice';
import recommendationsReducer from '@client/store/recommendationSlice';
import taskListDetailReducer from '@client/store/taskListDetailSlice';
import taskItemReducer from '@client/store/taskItemSlice';
import analyticsReducer from '@client/store/analyticsSlice';

export const createAppStore = <TExtraArg extends Record<string, unknown>>(deps: TExtraArg) => {
    return configureStore({
        reducer: {
            auth: authReducer,
            taskLists: taskListsReducer,
            recommendations: recommendationsReducer,
            taskListDetail: taskListDetailReducer,
            taskItems: taskItemReducer,
            analytics: analyticsReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: deps,
                },
            }),
    });
};

export type RootState = ReturnType<ReturnType<typeof createAppStore>['getState']>;
export type AppDispatch = ReturnType<typeof createAppStore>['dispatch'];