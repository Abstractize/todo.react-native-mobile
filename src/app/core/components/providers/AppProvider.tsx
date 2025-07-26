import React, { PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { createAppContext } from '@core/context/createAppContext';
import { AuthRepository } from '@auth/repositories';
import { AuthService } from '@auth/services';
import { createAppStore } from '@core/store';
import { AnalyticsRepository, RecommendationsRepository, TaskItemRepository, TaskListRepository } from '@client/repositories';
import { ApiService } from '@shared/api';
import { ModalHost, ModalService } from '@shared/modal';


interface AppDependencies {
    apiService: ApiService;
    authService: AuthService;
    analyticsRepository: AnalyticsRepository;
    authRepository: AuthRepository;
    recommendationsRepository: RecommendationsRepository;
    taskListRepository: TaskListRepository;
    taskItemRepository: TaskItemRepository;
    modalService: ModalService;
}

export const AppContext = createAppContext<AppDependencies>();

export const AppProvider = ({ children }: PropsWithChildren) => {
    const apiService = new ApiService();
    const modalService = new ModalService();

    const analyticsRepository = new AnalyticsRepository(apiService);
    const authRepository = new AuthRepository(apiService);
    const authService = new AuthService(apiService, authRepository);
    const recommendationsRepository = new RecommendationsRepository(apiService);
    const taskListRepository = new TaskListRepository(apiService);
    const taskItemRepository = new TaskItemRepository(apiService);

    authService.initializeAuth().then(() => {

    }).catch((error) => {

    });

    const store = createAppStore({
        apiService,
        authService,
        authRepository,
        recommendationsRepository,
        taskListRepository,
        taskItemRepository,
        modalService,
        analyticsRepository,
    })

    return (
        < ReduxProvider store={store} >
            <AppContext.Provider
                value={{
                    apiService,
                    authService,
                    authRepository,
                    recommendationsRepository,
                    taskListRepository,
                    taskItemRepository,
                    modalService,
                    analyticsRepository,
                }}
            >
                {children}
                <ModalHost modalService={modalService} />
            </AppContext.Provider>
        </ReduxProvider >
    );
};