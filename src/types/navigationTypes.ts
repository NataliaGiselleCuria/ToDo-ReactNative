import { List } from "./types";


// AppNavigator -> Autenticación y el resto de la app
export type RootStackParamList = {
    Auth: undefined;
    App: undefined;
    CreateList: undefined;
    ViewList: {list: List};
};

// AuthStack (pantallas de autenticación)
export type AuthStackParamList = {
    Login: undefined;
};

// AppStack (stack interno con Home y subpantallas)
export type AppStackParamList = {   
    Drawer: undefined;
};

// Navegación lateral (Drawer)
export type DrawerParamList = {
    Main: undefined;
    Profile: undefined;
    Settings: undefined;
    // Home:undefined;
};

// Navegación del footer
export type FooterTabParamList = {
    Home: undefined;
    Calendar: undefined;
    CreateListRedirect: undefined;
    Notifications: undefined;
    Contacts: undefined;
};

// Navegación del footer
export type CreateListParamList = {
    CreateList: undefined;
    StepOne: undefined ;
    StepTwo: undefined;
};
