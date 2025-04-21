import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import CreateListRedirect from "../screens/createList/CreateListRedirect";
import NotificationsScreen from "../screens/NotificationsScreen";
import ContactsScreen from "../screens/ContactsScreen";

import { useTheme } from "../context/ThemeContext";
import TabBarIcons from "../components/styledComponets/TabBarIcons";
import { FooterTabParamList } from "../types/navigationTypes";

const Tab = createBottomTabNavigator<FooterTabParamList>();

const FooterNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator  
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <TabBarIcons routeName={route.name} focused={focused} />
        ),
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          height: 60,
          paddingTop: 7,
          borderTopWidth: 0,
          borderTopColor: theme.colors.backgroundTop, 
          justifyContent: "center",
          alignItems: "center",
          
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="CreateListRedirect" component={CreateListRedirect} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
    </Tab.Navigator>
  );
};

export default FooterNavigator;