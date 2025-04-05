

// AppNavigator -> Autenticación y el resto de la app
export type RootStackParamList = {
    Auth: undefined;
    App: undefined;
    Drawer: undefined;
};

// AuthStack (pantallas de autenticación)
export type AuthStackParamList = {
    Login: undefined;
};

// AppStack (stack interno con Home y subpantallas)
export type AppStackParamList = {
    Home: undefined;

};

// Navegación lateral (Drawer)
export type DrawerParamList = {
    Home: undefined;
    Profile: undefined;
};

