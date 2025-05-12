import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootStackParamList, DrawerParamList, AuthStackParamList, AppStackParamList } from "../types/navigationTypes";
import { globalStyles } from "../styles/globalStyles";
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { ListProvider } from "../context/lists/ListContext";
import { ItemProvider } from "../context/items/ItemContext";

//Importar pantallas
import LoginScreen from "../screens/auth/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CustomDrawer from './drawer/CustomDrawer';
import SettingsScreen from "../screens/SettingsScreen";
import ViewListScreen from "../screens/list/ViewListScreen";
import ViewItemScreen from "../screens/item/ViewItemScreen";

//importar navegadores
import CreateListNavigator from "./CreateListNavigator";
import FooterNavigator from "./FooterNavigator";

import { CreateItemProvider } from "../context/items/CreateItemContext";
import EditItemModal from "../components/Item/EditItemModal";
import EditListModal from "../screens/list/EditListScreen";


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
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false, }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false, }} />
      {/* agregar pantallas accesibles desde el menu */}
    </Drawer.Navigator>
  );
}

// Navegación principal
const RootStackNav = () => {
  return (
    <NavigationContainer>
      <CreateItemProvider>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Auth" component={AuthStackNav} />
          <RootStack.Screen name="App" component={AppStackNav} />
          <RootStack.Screen name="CreateList" component={CreateListNavigator} />
          <RootStack.Screen name="EditList" component={EditListModal} />
          <RootStack.Screen name="ViewList" component={ViewListScreen} />
          <RootStack.Screen name="ViewItem" component={ViewItemScreen} />
        </RootStack.Navigator>
      </CreateItemProvider>
    </NavigationContainer>
  );

};

const AppNavigator = () => {
  return (
    <ThemeProvider>
      <ListProvider>
        <ItemProvider>
        <RootStackNav />
        </ItemProvider>
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