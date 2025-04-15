import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  centered?: boolean;
}

const StyledContainer: React.FC<Props> = ({ children, style, centered = false }) => {
    const { theme } = useTheme();
  
    return (
      <View
        style={[
          styles.base,
          { backgroundColor: theme.colors.background },
          centered && styles.centered,
          style,
        ]}
      >
        {children}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    base: {
      flex: 1,
      padding: 17,
      paddingTop: 25,
    },
    centered: {
      justifyContent: "center",
      alignItems: "center",
    },
  });
  
  export default StyledContainer;