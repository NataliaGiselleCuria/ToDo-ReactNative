import { StyleSheet } from "react-native";
import { DefaultTheme } from "./theme";

export const globalStyles = (theme = DefaultTheme) => StyleSheet.create({
  shadow: {
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  }
});
