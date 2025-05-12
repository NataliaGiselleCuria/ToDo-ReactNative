import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '../../../context/ThemeContext';
import { globalStyles } from '../../../styles/globalStyles';
import { Item } from '../../../types/types';
import ItemPriority from '../ItemPriority';
import StyledIcon from '../../styledComponets/StyledIcon';
import StyledText from '../../styledComponets/StyledText';
import DatePreview from '../../DatePreview';
import ParticipantsList from '../../participants/ParticipantsList';

type Props = {
    item: Item
}
const InfoItem = ({ item }: Props) => {
    const { theme } = useTheme();
    const gStyles = globalStyles(theme);
    return (
        <View>
            <View style={[gStyles.rowBetween, { height: 30, marginLeft: -5, }]}>
                <ItemPriority priority={item.priority} text={true} topPosition={-5} />
                <View style={[gStyles.row]}>
                    <StyledIcon
                        src={require('../../assets/icons-general/category.png')}
                        width='sm' height='sm'
                    />
                    {item.subcategory
                        ? <StyledText size='sm'>{item.subcategory}</StyledText>
                        : <StyledText size='sm'>Sin categoría</StyledText>}
                </View>
            </View>
            <View style={{gap:2}}>
                <View style={gStyles.rowBetween}>
                    <StyledText size='sm' weight='medium'>Fecha de inicio</StyledText>
                    <View style={gStyles.row}>
                        <DatePreview value={item.startDate} type='startDate' />
                        <DatePreview value={item.startTime} type='startTime' />
                    </View>
                </View>
                <View style={gStyles.rowBetween}>
                    <StyledText size='sm' weight='medium'>Fecha límite</StyledText>
                    <View style={gStyles.row}>
                        <DatePreview value={item.endDate} type='endDate' />
                        <DatePreview value={item.endTime} type='endTime' />
                    </View>
                </View>
                <View style={gStyles.rowBetween}>
                    <StyledText size='sm' weight='medium'>Creado por:</StyledText>
                    <StyledText size='sm'>{item.createdBy.name}</StyledText>
                </View>
                <View style={!item.description && gStyles.rowBetween}>
                    <StyledText size='sm' weight='medium'>Dascripción:</StyledText>
                    {item.description
                        ? <StyledText size='sm'>{item.description}</StyledText>
                        : <StyledText size='sm'>-</StyledText>}
                </View>
                <View >
                    <StyledText size='sm' weight='medium' style={ {marginBottom:15}}>Asignado a:</StyledText>
                    {(item.assignment && item.assignment.length > 0)
                        ? <ParticipantsList
                            participants={item.assignment}
                            simplified={true}
                            showUserInfo={false}
                            size='sm'
                            delimit={true}
                        />
                        : <StyledText size='sm'>-</StyledText>
                    }
                </View>
            </View>

        </View>
    )
}

export default InfoItem

const styles = StyleSheet.create({
})