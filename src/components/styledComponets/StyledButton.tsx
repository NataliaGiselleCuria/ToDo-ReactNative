import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { globalStyles } from "../../styles/globalStyles";
import StyledText from "./StyledText";

type Props = {
    title: string;
    onPress?: () => void;
    style?: ViewStyle;
};

const StyledButton: React.FC<Props> = ({ title, onPress, style }) => {
    const { theme } = useTheme();
    const gStyles = globalStyles(theme);

    const type = title === 'Cancelar' ? 'secondary' : 'button';

    return (
        <TouchableOpacity 
            onPress={onPress}
            style={[title!=='Cancelar' ?  gStyles.generalButton : gStyles.cancelButton , style]}
        >
            <StyledText size="sm" type={type}>
                {title}
            </StyledText>
        </TouchableOpacity>
    );
};

export default StyledButton;

const styles = StyleSheet.create({ 
});


