import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { globalStyles } from "../../styles/globalStyles";

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  centered?: boolean;
  modal?: boolean;
}

const StyledContainer: React.FC<Props> = ({ modal, children, style, centered = false }) => {
    const { theme } = useTheme();
    const gStyles = globalStyles(theme);
  
    return (
      <View
        style={[
          gStyles.gapContainer,
          styles.base,
          { backgroundColor: theme.colors.background },
          centered && styles.centered,
          style,
        ]}
      >
        {children}
        {modal && <View style={gStyles.modalBack}></View> } 
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    base: {
      flex: 1,
      padding: 20,
      paddingTop: 25,
    },

    centered: {
      justifyContent: "center",
      alignItems: "center",
    },
  });
  
  export default StyledContainer;