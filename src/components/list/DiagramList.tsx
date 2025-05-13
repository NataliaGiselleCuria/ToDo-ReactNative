import { StyleSheet, View } from 'react-native'
import React from 'react'
import Svg, { Circle } from "react-native-svg";
import { Item, ItemState } from '../../types/types'
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import StyledText from '../styledComponets/StyledText';

type Props = {
    items: Item[] | []
}

const DiagramList = ({ items }: Props) => {
    const { theme } = useTheme();
    const gStyles = globalStyles(theme);
    const total = items.length;

    const completed = items.filter(item => item.state === ItemState.completed).length;
    const inProgress = items.filter(item => item.state === ItemState.inProsses).length;

    const progress = total === 0 ? 0 : ((completed + inProgress * 0.5) / total);

    const color = theme.colors.line + 33;

    const radius = 55;
    const stroke = 10;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;

    const strokeDashoffset = circumference - progress * circumference;

    return (
        <View style={styles.container}>
            <Svg height={radius * 2} width={radius * 2}>
                <Circle
                    stroke={color}
                    fill="none"
                    cx={radius}
                    cy={radius}
                    r={normalizedRadius}
                    strokeWidth={stroke}
                />
                <Circle
                    stroke='#eee'
                    fill="none"
                    cx={radius}
                    cy={radius}
                    r={normalizedRadius}
                    strokeWidth={stroke}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${radius} ${radius})`}
                />
            </Svg>
            <View style={styles.label}>
                <StyledText weight='bold'>{Math.round(progress * 100)}%</StyledText>
            </View>
        </View>
    );
};

export default DiagramList

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    label: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
});