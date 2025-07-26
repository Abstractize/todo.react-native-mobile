import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TasksStack from './stacks/TasksStack';
import StatsStack from './stacks/StatsStack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName: string;

                    if (route.name === 'Tasks') {
                        iconName = 'checkbox-marked-outline';
                    } else if (route.name === 'Stats') {
                        iconName = 'chart-bar';
                    }

                    return (
                        <MaterialCommunityIcons
                            name={iconName}
                            color={color}
                            size={size}
                        />
                    );
                },
            })}
        >
            <Tab.Screen name="Tasks" component={TasksStack} />
            <Tab.Screen name="Stats" component={StatsStack} />
        </Tab.Navigator>
    );
}