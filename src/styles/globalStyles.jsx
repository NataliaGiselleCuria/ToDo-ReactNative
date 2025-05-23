import { StyleSheet } from "react-native";
import { DefaultTheme } from "./theme";

export const globalStyles = (theme = DefaultTheme) => StyleSheet.create({

  paddingContainer: {
    padding: 20
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10
  },

  rowBetween: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  gapContainer: {
    gap: 15,
    // borderWidth:1
  },

  gapItem: {
    gap: 5
  },

  itemForm: {
    width: '100%',
    gap: 5,
  },

  modalBack: {
    flex: 1,
    position: 'absolute',
    zIndex: 99,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(18, 20, 20, 0.86)',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
  },

  modalContent: {
    flex: 1,
    width: '95%',
  },

  containerHeader: {
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,

  },

  headerDrawer: {
    position: 'absulute',
    top: -25,
    left: -25,
    width: '150%',
    height: 60,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.backgroundTop,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },

  generalButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    backgroundColor: theme.colors.buttonColor,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },

  cancelButton: {
    height: 40,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteButton: {
    width: '95%',
    height: 40,
    borderWidth: 1,
    borderColor: 'rgb(255, 23, 7)',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor:theme.colors.background,

    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },

  buttonDisabled: {
    backgroundColor: theme.colors.buttonColor + 55,
  },

  shadow: {
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },

  lineHeightSm: {
    lineHeight: 18
  }
});
