import { StyleSheet } from "react-native";
import { DefaultTheme } from "./theme";

export const globalStyles = (theme = DefaultTheme) => StyleSheet.create({

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

  itemForm: {
    width: '100%',
    gap: 5,
  },

  modalBack: {
    flex: 1,
    position: 'absolute',
    zIndex: 1,
    height: '200%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(18, 20, 20, 0.86)',
  },

  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth:5,
    width: '100%',
    height: '100%',
  },

  modalContent: {
    width: '95%',
    height:'85%',
    padding: 20,
    borderWidth:1
  },

  containerHeader: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
  },

  headerDrawer:{
    position:'absulute',
    top:-25,
    left:-25,
    width:'150%',
    height:60,
    paddingLeft: 10,
    flexDirection:'row',
    alignItems:'center',
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

  title:{
    fontSize:35,
  },

  lineHeightSm: {
    lineHeight: 18
  }
});
