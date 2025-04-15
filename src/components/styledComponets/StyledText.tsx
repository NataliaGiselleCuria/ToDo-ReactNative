import React from "react";
import { Text, TextStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";

type Props = {
    children: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xlg";
    weight?: "light" | "regular" | "medium" | "bold";
    style?: TextStyle;
};

const StyledText = ({ children, size = "md", weight = "regular", style }: Props) => {
    const { theme } = useTheme();

    const fontSizeMap = {
        sm: 16,
        md: 18,
        lg: 24,
        xlg:32
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
                color: theme.colors.text,
                fontSize: fontSizeMap[size],
                fontFamily: fontFamilyMap[weight],
                ...style,
            }}
        >
            {children}
        </Text>
    );
};

export default StyledText;