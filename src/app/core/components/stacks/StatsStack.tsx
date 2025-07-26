import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatsScreen } from '@client/views';
import { logoutThunk } from '@auth/store/authThunks';
import { RootState } from '@core/store';
import { connect, ConnectedProps } from 'react-redux';

const Stack = createStackNavigator();

const mapStateToProps = (state: RootState) => ({

});

const mapDispatchToProps = {
    logout: logoutThunk,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function StatsStack(props: PropsFromRedux) {
    return (
        <Stack.Navigator
            screenOptions={({ navigation }) => ({
                headerLeft: () =>
                    navigation.canGoBack() ? (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
                            <MaterialCommunityIcons name="chevron-left" size={24} color="#2563eb" />
                        </TouchableOpacity>
                    ) : null,
                headerRight: () => (
                    <TouchableOpacity onPress={() => props.logout()} style={{ marginRight: 15 }}>
                        <MaterialCommunityIcons name="logout" size={24} color="#2563eb" />
                    </TouchableOpacity>
                ),
            })}
        >
            <Stack.Screen name="StatsMain" component={StatsScreen} options={{ title: 'Stats' }} />
        </Stack.Navigator>
    );
}

export default connector(StatsStack);