import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootStackParamList, DrawerParamList, AuthStackParamList, AppStackParamList } from "../types/navigationTypes";

//Importar pantallas
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CustomDrawer from './Drawer/CustomDrawer';
import { ThemeProvider } from '../context/ThemeContext';

//Crear navegadores
const AuthStack = createStackNavigator<AuthStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

//Pantallas Stack autenticación - sin Drawer
const AuthStackNav = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

//pantallas Stack con Drawer
const AppStackNav = () => {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Drawer" component={DrawerNav} />
      <AppStack.Screen name="Home" component={HomeScreen} />
      {/* agregar subpantallas navegables desde el home */}
    </AppStack.Navigator>
  );
};

//Navegador Drawer
const DrawerNav = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
       {/* agregar pantallas accesibles desde el menu */}
    </Drawer.Navigator>
  );
}

// Navegación principal
const RootStackNav = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Auth" component={AuthStackNav} />
        <RootStack.Screen name="App" component={AppStackNav} />       
      </RootStack.Navigator>
    </NavigationContainer>
  );

};

const AppNavigator = () => {
  return (
    <ThemeProvider>
      <RootStackNav />
    </ThemeProvider>
  );
};

export default AppNavigator;