import React from "react";
import { TextInput, TextInputProps, StyleSheet, DimensionValue } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { globalStyles } from "../../styles/globalStyles";

type Props = {
  width?: DimensionValue,
  centered?: boolean
} & TextInputProps;

const StyledInput: React.FC<Props> = ({ width='100%', centered=false,  ...rest }: Props) => {
  const { theme } = useTheme();
  const gStyles = globalStyles(theme);

  return (
    <TextInput
      {...rest}
      style={[styles.input, { 
        color: theme.colors.text,
        backgroundColor: theme.colors.background,
        shadowColor: theme.colors.text,
        boxShadow: '5 2 2' + theme.colors.text,
        borderColor: theme.colors.line,
        width: width,
        alignSelf: centered ? 'center' : 'flex-start',
      }, rest.style, gStyles.shadow]}
      placeholderTextColor={theme.colors.textSecondary}
      autoFocus={false}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    alignContent:'center',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,  
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});

export default StyledInput;