import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { globalStyles } from "../styles/globalStyles";

const HomeScreen = () => {
  const { theme } = useTheme();
  const globalStyle = globalStyles(theme);

  return (
    <View style={globalStyle.container}>
      <Text style={globalStyle.text}>Bienvenido a la App🎉</Text>
    </View>
  );
};

export default HomeScreen;