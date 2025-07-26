import React from 'react';

export function createAppContext<TAppDependencies>() {
    const AppContext = React.createContext<TAppDependencies | null>(null);
    return AppContext;
}
