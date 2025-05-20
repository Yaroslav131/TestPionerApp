import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DriverDetailsScreen from '../screens/DriverDetails';
import DriverListScreen from '../screens/DriverList';

export const DRIVER_LIST_ROUTE = 'DriverList';
export const DRIVER_DETAILS_ROUTE = 'DriverDetails';

export type RootStackParamList = {
    [DRIVER_LIST_ROUTE]: undefined;
    [DRIVER_DETAILS_ROUTE]: { driverId: string; driverName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={DRIVER_LIST_ROUTE}>
                <Stack.Screen
                    name={DRIVER_LIST_ROUTE}
                    component={DriverListScreen}
                    options={{ title: 'F1 Drivers' }}
                />
                <Stack.Screen
                    name={DRIVER_DETAILS_ROUTE}
                    component={DriverDetailsScreen}
                    options={({ route }) => ({ title: route.params.driverName || 'Driver Details' })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;