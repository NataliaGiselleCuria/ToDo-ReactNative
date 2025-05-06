import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import ItemPriority from '../viewList/ItemPriority';
import { Item } from '../../types/types';
import StyledIcon from '../styledComponets/StyledIcon';
import StyledText from '../styledComponets/StyledText';
import DatePreview from '../DatePreview';
import ParticipantsList from '../participants/ParticipantsList';

type Props = {
    item: Item
}
const InfoItem = ({ item }: Props) => {
    const { theme } = useTheme();
    const gStyles = globalStyles(theme);
    return (
        <View style={{ gap: 10, paddingHorizontal:10 }}>
            <View style={gStyles.rowBetween}>
                <View><ItemPriority priority={item.priority} text={true} /></View>
                <View style={gStyles.row}>

                    <StyledIcon width='sm' height='sm' src={require('../../assets/icons-general/category.png')} />
                    {item.subcategory
                        ? <StyledText size='sm'>{item.subcategory}</StyledText>
                        : <StyledText size='sm'>Sin categoría</StyledText>}
                </View>
            </View>
            <View>
                <View style={gStyles.rowBetween}>
                    <StyledText size='sm'>Fecha de inicio</StyledText>
                    <DatePreview startDate={item.startDate} showTime={true} />
                </View>
                <View style={gStyles.rowBetween}>
                    <StyledText size='sm'>Fecha límite</StyledText>
                    <DatePreview startDate={item.endDate} showTime={true} />
                </View>
                <View style={gStyles.rowBetween}>
                    <StyledText size='sm'>Creado por:</StyledText>
                    <StyledText size='sm'>{item.createdBy.name}</StyledText>
                </View>
                <View>
                    <StyledText size='sm'>Dascripción:</StyledText>
                    {item.description
                        ? <StyledText size='sm'>{item.description}</StyledText>
                        : <StyledText size='sm'>-</StyledText>}
                </View>
            </View>
            <View style={gStyles.rowBetween}>
                <StyledText size='sm'>Asignado a:</StyledText>
                {(item.assignment && item.assignment.length > 0)
                    ? <ParticipantsList
                        participants={item.assignment}
                        simplified={true}
                        showUserInfo={false}
                    />
                    : <StyledText size='sm'>-</StyledText>
                }
            </View>
        </View>
    )
}

export default InfoItem

const styles = StyleSheet.create({})