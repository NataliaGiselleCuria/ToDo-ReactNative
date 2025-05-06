import React from "react";
import { Text, TextStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";

type Props = {
    children: React.ReactNode;
    size?: "xsm" | "sm" | "md" | "lg" | "xlg";
    weight?: "light" | "regular" | "medium" | "bold";
    type?: "primary" | "secondary" | "button"
    style?: TextStyle;
};

const StyledText = ({ children, size = "md", weight = "regular", type = "primary", style }: Props) => {
    const { theme } = useTheme();

    const fontTypeMap = {
        primary: theme.colors.text,
        secondary: theme.colors.textSecondary,
        button: theme.colors.cardText
    };

    const fontSizeMap = {
        xsm: 14,
        sm: 16,
        md: 18,
        lg: 24,
        xlg:35
    };

    const fontFamilyMap = {
        light: "Roboto-Light",
        regular: "Roboto-Regular",
        medium: "Roboto-Medium",
        bold: "Roboto-Bold"
    }

    return (
        <Text
            style={{
                color: fontTypeMap[type],
                fontSize: fontSizeMap[size],
                fontFamily: fontFamilyMap[weight],
                letterSpacing: 0.5,
                ...style,
            }}
        >
            {children}
        </Text>
    );
};

export default StyledText;