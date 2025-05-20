import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DriverDetailsScreen from '../screens/DriverDetails';
import DriverListScreen from '../screens/DriverList';

export type RootStackParamList = {
    DriverList: undefined;
    DriverDetails: { driverId: string; driverName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="DriverList">
                <Stack.Screen
                    name="DriverList"
                    component={DriverListScreen}
                    options={{ title: 'F1 Drivers' }}
                />
                <Stack.Screen
                    name="DriverDetails"
                    component={DriverDetailsScreen}
                    options={({ route }) => ({ title: route.params.driverName || 'Driver Details' })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;