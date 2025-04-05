import { StyleSheet } from "react-native";
import { DefaultTheme } from "./theme";

export const globalStyles = (theme = DefaultTheme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export const globalFonts = {
  regular: "Roboto-Regular",
  bold: "Roboto-Bold",
};
