import React from 'react';
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import StyledIcon from './StyledIcon';

type Props = {
  routeName: string;
  focused: boolean;
};

const getIcon = (routeName: string) => {
  const icons = {
    Home: require("../../assets/icons-dashboard/home.png"),
    Calendar: require("../../assets/icons-dashboard/calendar.png"),
    CreateListRedirect: require("../../assets/icons-dashboard/add.png"),
    Notifications: require("../../assets/icons-dashboard/notification.png"),
    Contacts: require("../../assets/icons-dashboard/contacts.png"),
  };

  return icons[routeName as keyof typeof icons];
};

const TabBarIcons = ({ routeName, focused }: Props) => {
  const { theme } = useTheme();

  const isAddButton = routeName === "CreateListRedirect";

  const containerStyle = [
    styles.iconContainer,
    isAddButton
      ? [styles.addButtonStyle, { backgroundColor: theme.colors.buttonColor }]
      : focused
        ? [{ backgroundColor: theme.colors.buttonColor + "55" }]
        : styles.defaultStyle,
  ];

  return (
    <View style={containerStyle}>    
      <StyledIcon src={getIcon(routeName)} width='lg' height='lg' style={{ tintColor: isAddButton ? "#fff" : theme.colors.text }}/>
    </View>
  )
}

export default TabBarIcons

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  defaultStyle: {
    backgroundColor: "transparent",
  },

  addButtonStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    bottom: 0,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
});