import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { RootState } from '@core/store';
import { logoutThunk } from '@auth/store/authThunks';

import AuthStack from './stacks/AuthStack';
import MainTabs from './MainTabs';

const Stack = createStackNavigator();

const mapStateToProps = (state: RootState) => ({
    loggedIn: state.auth.isAuthenticated,
});
const mapDispatchToProps = {
    logout: logoutThunk,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const RootNavigator = (props: PropsFromRedux) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {props.loggedIn ? (
                <Stack.Screen name="MainTabs" component={MainTabs} />
            ) : (
                <Stack.Screen name="AuthStack" component={AuthStack} />
            )}
        </Stack.Navigator>
    );
};

export default connector(RootNavigator);