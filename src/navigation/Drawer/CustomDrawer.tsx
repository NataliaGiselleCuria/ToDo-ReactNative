import React from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerNavigationProp } from "@react-navigation/drawer"
import { useTheme } from "../../context/ThemeContext";
import { globalStyles } from "../../styles/globalStyles";
import { DrawerItemType } from "../../types/drawerTypes";
import DrawerLayout from "./DrawerLayout";
//importar navegaciones
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList, RootStackParamList } from "../../types/navigationTypes";

// Lista de opciones del Drawer
const DrawerList: DrawerItemType[] = [
    { icon: require("../../assets/icons-drawer/user.png"), label: "Inicio", navigateTo: "Home" },
    { icon: require("../../assets/icons-drawer/user.png"), label: "Profile", navigateTo: "Profile" },
];

const CustomDrawer: React.FC<DrawerContentComponentProps> = (props) => {
    const navigation = useNavigation<CompositeNavigationProp<
        StackNavigationProp<RootStackParamList>,
        StackNavigationProp<AppStackParamList>
    >>();

    const { theme, isDarkMode, toggleTheme } = useTheme();
    const globalStyle = globalStyles(theme);

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: theme.colors.background }}>
            {/* Lista de navegación */}
            {DrawerList.map((item, index) => (
                <DrawerLayout key={index} {...item} />
            ))}

            {/* Toggle para cambiar de tema */}
            <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: "row", alignItems: "center" }}>
                <Text style={[globalStyle.text, { color: theme.colors.text }]}>Modo Oscuro</Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={toggleTheme}
                    thumbColor={isDarkMode ? theme.colors.primary : "#ccc"}
                />
            </View>
            {/* Botón de Cerrar Sesión */}
            <View style={globalStyle.container}>
                <TouchableOpacity
                    onPress={() => navigation.replace("Auth")}
                    style={{ padding: 10, alignItems: "center" }}
                >
                    <Text style={globalStyle.text}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
};

export default CustomDrawer;