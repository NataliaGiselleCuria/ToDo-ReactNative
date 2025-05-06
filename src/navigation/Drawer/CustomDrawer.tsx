import React from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer"
import { useTheme } from "../../context/ThemeContext";
import DrawerItem from "./DrawerItem";

//importar navegaciones
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList, DrawerParamList, RootStackParamList } from "../../types/navigationTypes";
import StyledText from "../../components/styledComponets/StyledText";
import StyledButton from "../../components/styledComponets/StyledButton";
import { globalStyles } from "../../styles/globalStyles";
import Avatar from "../../components/participants/Avatar";

export interface DrawerItemProps {
    icon: any;
    label: string;
    navigateTo: keyof DrawerParamList;
    navigation?: any; // opcional si no lo tienen todos
}

// Lista de opciones del Drawer
const DrawerList: DrawerItemProps[] = [
    { icon: require("../../assets/icons-drawer/home.png"), label: "Inicio", navigateTo: "Main" },
    { icon: require("../../assets/icons-drawer/user.png"), label: "Perfil", navigateTo: "Profile" },
    { icon: require("../../assets/icons-drawer/settings.png"), label: "Configuración", navigateTo: "Settings" },
];

const CustomDrawer: React.FC<DrawerContentComponentProps> = (props) => {
    const navigation = useNavigation<CompositeNavigationProp<
        StackNavigationProp<RootStackParamList>,
        StackNavigationProp<AppStackParamList>
    >>();

    const { theme } = useTheme();
    const gStyles = globalStyles(theme);

    //Traer la info del context de autenticación
    const mockUser = {
        name: "Natalia Curia",
        id: "#1234",
        avatar: require("../../assets/avatars/superwoman.png"),
    };

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={[styles.contentContainerStyle,{backgroundColor:theme.colors.background}]}>
            <View style={{ zIndex: 1 }}>
                {/* Header usuario */}
                <View style={[styles.headerContainer]}>
                    <View style={[styles.headerBackground, gStyles.shadow, { backgroundColor: theme.colors.backgroundTop }]}></View>
                    <Avatar avatarUser={mockUser.avatar} />
                    <View>
                        <StyledText size="lg">{mockUser.name}</StyledText>
                        <StyledText size="md" style={{ color: theme.colors.buttonColor }}>{mockUser.id}</StyledText>
                    </View>
                </View>
                <View style={styles.containerDrawerItems}>
                    {/* Lista de navegación */}
                    {DrawerList.map((item, index) => (
                        <DrawerItem key={index} {...item} navigation={props.navigation} />
                    ))}
                </View>
            </View>
            {/* Botón de Cerrar Sesión */}

            <StyledButton
                title='Cerrar Sesión'
                onPress={() => navigation.replace("Auth")}
                style={{ width: '100%' }}
            />
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainerStyle: {
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
       
    },
    headerBackground: {
        position: 'absolute',
        bottom: 0,
        right: -100,
        width: '230%',
        height: '250%',
    },
    headerContainer: {
        position: 'relative',
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        gap: 5,

    },
    containerDrawerItems:{
        marginTop: 10
    }
})

export default CustomDrawer;