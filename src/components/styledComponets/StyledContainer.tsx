import React from "react";
import { View, StyleSheet, ViewStyle, ScrollView } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { globalStyles } from "../../styles/globalStyles";

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  centered?: boolean;
  modal?: boolean;
  scroll?: boolean
}

const StyledContainer: React.FC<Props> = ({ modal, children, style, centered = false, scroll = false }) => {
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
      {scroll
        ? (
          <ScrollView>
            {children}
          </ScrollView>
        )
        : (
          children
        )}
      {modal && <View style={gStyles.modalBack}></View>}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    paddingHorizontal: 20,
    overflow: 'visible',
  },

  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StyledContainer;