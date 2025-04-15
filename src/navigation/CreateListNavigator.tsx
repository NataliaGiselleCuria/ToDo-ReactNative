import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateListScreen from "../screens/CreateList/CreateListScreen";
import StepOneScreen from "../components/ListComponents/FormStepOne";
import StepTwoScreen from "../components/ListComponents/FormStepTwo";
import StepThreeScreen from "../components/ListComponents/FormStepThree";
import { CreateListProvider } from "../context/Lists/CreateListContext";

const Stack = createStackNavigator();

export default function CreateListNavigator() {
    return (
        <CreateListProvider>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false, // o true si querés mostrar tu propio header
                    gestureEnabled: false, // evita swipe back en iOS
                }}>
                <Stack.Screen name="CreateList" component={CreateListScreen} />
                <Stack.Screen name="StepOne" component={StepOneScreen} />
                <Stack.Screen name="StepTwo" component={StepTwoScreen} />
                <Stack.Screen name="StepThree" component={StepThreeScreen} />
            </Stack.Navigator>
        </CreateListProvider>
    )
}