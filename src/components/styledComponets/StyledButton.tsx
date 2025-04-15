import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { globalStyles } from "../../styles/globalStyles";

type Props = {
    title: string;
    onPress?: () => void;
    style?: ViewStyle;
    background?: string
};

const StyledButton: React.FC<Props> = ({ background, title, onPress, style }) => {
    const { theme } = useTheme();
    const gStyles = globalStyles(theme);

    return (
        <TouchableOpacity 
            onPress={onPress}
            style={[styles.button, {backgroundColor: background ? background : theme.colors.buttonColor }, gStyles.shadow, style] }
        >
            <Text style={[styles.buttonText, { color: theme.colors.cardText }]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        textAlign: "center",
    },
});

export default StyledButton;

// ,