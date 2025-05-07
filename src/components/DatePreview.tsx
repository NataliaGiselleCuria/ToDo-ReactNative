import { StyleSheet, View } from 'react-native'
import React from 'react'
import StyledIcon from './styledComponets/StyledIcon'
import StyledText from './styledComponets/StyledText'
import { useTheme } from '../context/ThemeContext'
import { globalStyles } from '../styles/globalStyles'

type Props = {
    type: 'startDate' | 'startTime' | 'endDate' | 'endTime',
    value: Date | undefined;
    justify?: 'flex-start' | 'flex-end' | 'center'
    color?: 'text' | 'buttonColor'
    showIcon?: boolean
}

const DatePreview = ({ type, value, justify = 'flex-end', color = 'text', showIcon = true }: Props) => {
    const { theme } = useTheme();
    const gStyles = globalStyles(theme);

    const formatDate = (date: Date) => { return date.toLocaleDateString('es-AR') };
    const formatTime = (date: Date) => { return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) };
    const typeText = color === 'text' ? 'primary' : 'button';
    const typeIcon = color === 'text' ? 'icon' : 'button';

    const isDate = type.includes('Date') ?? true;

    if (value === undefined) {
        return (
            <View style={[styles.date, { justifyContent: justify }]}>
                {showIcon && (
                    isDate 
                    ? (<StyledIcon src={require('../assets/icons-general/calendar.png')} width='sm' height='sm' type={typeIcon} />) 
                    : (<StyledIcon src={require('../assets/icons-general/clock.png')} width='sm' height='sm' type={typeIcon} />)   
                )}
                <StyledText size='sm' type={typeText} style={gStyles.lineHeightSm}>-</StyledText>
            </View>
        );
    }

    const content = isDate ? (
        <>
            {showIcon && <StyledIcon src={require('../assets/icons-general/calendar.png')} width='sm' height='sm' type={typeIcon} />}
            <StyledText size='sm' type={typeText} style={gStyles.lineHeightSm}>{formatDate(value)}</StyledText>
        </>
    ) : (
        <>
            {showIcon && <StyledIcon src={require('../assets/icons-general/clock.png')} width='sm' height='sm' type={typeIcon} />}
            <StyledText size='sm' type={typeText} style={gStyles.lineHeightSm}>{formatTime(value)}</StyledText>
        </>
    );

    return (
        <View style={[styles.date, { justifyContent: justify }]}>
            {content}
        </View>
    );
}

export default DatePreview

const styles = StyleSheet.create({
    date: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
})