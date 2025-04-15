import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootStackParamList, DrawerParamList, AuthStackParamList, AppStackParamList } from "../types/navigationTypes";
import { globalStyles } from "../styles/globalStyles";
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { ListProvider } from "../context/Lists/ListContext";

//Importar pantallas
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CustomDrawer from './Drawer/CustomDrawer';
import SettingsScreen from "../screens/SettingsScreen";

//importar navegadores
import CreateListNavigator from "./CreateListNavigator";
import FooterNavigator from "./FooterNavigator";

//Crear navegadores
const AuthStack = createStackNavigator<AuthStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();
const RootStack = createStackNavigator<RootStackParamList>();


//Pantallas Stack autenticación - sin Drawer
const AuthStackNav = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

//pantallas Stack con Drawer
const AppStackNav = () => {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Drawer" component={DrawerNav} />
      {/* agregar subpantallas navegables desde el home */}
    </AppStack.Navigator>
  );
};

//Navegador Drawer
const DrawerNav = () => {
  const { theme } = useTheme();
  const headerStyles = createHeaderStyles(theme);
  const gStyles = globalStyles(theme);

  return (
    <Drawer.Navigator
      screenOptions={{
        ...headerStyles,
        headerStyle: {
          ...headerStyles.headerStyle,
          ...gStyles.shadow,
        },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Main" component={FooterNavigator} options={{ headerTitle: "" }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ headerTitle: "Perfil" }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} options={{ headerTitle: "Configuración" }} />
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
        <RootStack.Screen name="CreateList" component={CreateListNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );

};

const AppNavigator = () => {
  return (
    <ThemeProvider>
      <ListProvider>
        <RootStackNav />
      </ListProvider>
    </ThemeProvider>
  );
};


//Estilos encabezado Drawer.
const createHeaderStyles = (theme: any) => ({
  headerStyle: {
    backgroundColor: theme.colors.backgroundTop,
    height: 60,
  },
  headerTintColor: theme.colors.text,
});

export default AppNavigator;