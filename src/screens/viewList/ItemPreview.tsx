import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Item } from '../../types/types'
import StyledText from '../../components/styledComponets/StyledText'
import ParticipantsList from '../../components/participants/ParticipantsList'
import StyledIcon from '../../components/styledComponets/StyledIcon'

import { globalStyles } from '../../styles/globalStyles'
import { useTheme } from '../../context/ThemeContext'
import ItemProgressBar from './ItemProgressBar'

type Props = {
    item: Item,
}


const ItemPreview = ({ item }: Props) => {
    const { theme } = useTheme();
    const gStyles = globalStyles(theme);


    return (
        <View key={item.id} style={[styles.itemContainer, { borderColor: theme.colors.cardColors[0] }]}>
            <View style={styles.date}>
                <StyledIcon src={require('../../assets/icons-general/calendar.png')} width='sm' height='sm' />
                <StyledText size='sm'>{item.startDate ? item.startDate.toLocaleDateString('es-AR') : ''}</StyledText>
                <StyledText size='sm'>  {item.endDate ? `- ${item.endDate.toLocaleDateString('es-AR')}` : ''}</StyledText>
            </View>
            <View>
                <StyledText>{item.name}</StyledText>
            </View>
            <View style={styles.container}>
                <View>
                    <StyledText size='sm'>{item.subcategory}</StyledText>
                    <ItemProgressBar state={item.state} />
                    <StyledText size='sm'>{item.priority}</StyledText>
                </View>
                <View style={styles.container}>
                    <ParticipantsList
                        participants={item.assignment}
                        simplified={true}
                        showUserInfo={false}
                    />
                    <StyledIcon src={require('../../assets/icons-general/goNext.png')} />
                </View>
            </View>


        </View>
    )
}

export default ItemPreview

const styles = StyleSheet.create({
    date: {
        flexDirection: 'row',
        alignItems: 'center',
       justifyContent: 'flex-end'
    },
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    itemContainer: {
        borderWidth: 1,
        borderRadius: 10,

        padding: 10,
    }
})