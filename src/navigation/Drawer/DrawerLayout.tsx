import React from "react";
import { View, Text, Image } from "react-native";
import { useNavigation, NavigatorScreenParams } from "@react-navigation/native";
import { DrawerItem, DrawerNavigationProp } from "@react-navigation/drawer"

//importar tipos de navegación 
import { DrawerParamList, AppStackParamList } from "../../types/navigationTypes";
import { DrawerLayoutProps } from "../../types/drawerTypes";

type CustomDrawerNavigationProp = DrawerNavigationProp<DrawerParamList>

// Componente reutilizable para cada ítem del Drawer
const DrawerLayout: React.FC<DrawerLayoutProps> = ({ icon, label, navigateTo }) => {
    const navigation = useNavigation<CustomDrawerNavigationProp>();

    return (
        <DrawerItem
            icon={({ size }) => (
                <Image source={icon} style={{ width: size, height: size, borderRadius: 5 }} />
            )}
            label={label}
            onPress={()=>navigation.navigate(navigateTo)}
            
        />
    );
};

export default DrawerLayout;