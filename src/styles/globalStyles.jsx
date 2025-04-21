import { StyleSheet } from "react-native";
import { DefaultTheme } from "./theme";

export const globalStyles = (theme = DefaultTheme) => StyleSheet.create({
  shadow: {
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  modalOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
},

modalContent: {
    width: '95%',
    height: '95%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    gap: 10,
},
});
