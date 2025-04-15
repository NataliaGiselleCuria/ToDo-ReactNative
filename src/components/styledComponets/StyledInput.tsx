import React from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { globalStyles } from "../../styles/globalStyles";

const StyledInput: React.FC<TextInputProps> = (props) => {
  const { theme } = useTheme();
  const gStyles = globalStyles(theme);

  return (
    <TextInput
      {...props}
      style={[styles.input, { 
        color: theme.colors.text,
        backgroundColor: theme.colors.background,
        shadowColor: theme.colors.text,
        boxShadow: '5 2 2' + theme.colors.text,
        borderColor: theme.colors.line,
      }, props.style, gStyles.shadow]}
      placeholderTextColor={theme.colors.text + "88"}
      autoFocus={true}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,  
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});

export default StyledInput;