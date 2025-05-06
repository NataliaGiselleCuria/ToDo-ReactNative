import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateListScreen from "../screens/list/CreateListScreen";
import { CreateListProvider } from "../context/lists/CreateListContext";

const Stack = createStackNavigator();

export default function CreateListNavigator() {
    return (
        <CreateListProvider>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false,
                }}>
                <Stack.Screen name="CreateList" component={CreateListScreen} />
            </Stack.Navigator>
        </CreateListProvider>
    )
}