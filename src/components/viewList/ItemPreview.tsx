import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Item } from '../../types/types'
import StyledText from '../styledComponets/StyledText'
import ParticipantsList from '../participants/ParticipantsList'
import StyledIcon from '../styledComponets/StyledIcon'
import { globalStyles } from '../../styles/globalStyles'
import { useTheme } from '../../context/ThemeContext'
import ItemProgressBar from './ItemProgressBar'
import ItemPriority from './ItemPriority'
import DatePreview from '../DatePreview'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../types/navigationTypes'

type Props = {
    item: Item,
}

const ItemPreview = ({ item }: Props) => {
    const { theme } = useTheme();
    const gStyles = globalStyles(theme);

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const goToItem = () => {
        navigation.navigate('ViewItem', { item });
    }

    return (
        <TouchableOpacity onPress={goToItem} style={[styles.itemContainer, gStyles.shadow, { borderColor: theme.colors.cardColors[0] }]}>
            <View style={gStyles.rowBetween}>
                <View>
                    <ItemPriority priority={item.priority} text={false} />
                </View>
                <View style={gStyles.row}>
                    <DatePreview
                        justify='flex-end'
                        type='startDate'
                        value={item.startDate}
                    />
                    <DatePreview
                        justify='flex-end'
                        type='startTime'
                        value={item.startTime}
                    />
                </View>

            </View>
            <View style={[gStyles.row]}>
                <View style={[{ width: '50%', marginBottom: 20 }]}>
                    <StyledText>{item.name}</StyledText>
                    <StyledText size='sm'>{item.subcategory}</StyledText>
                    <ItemProgressBar state={item.state} />
                </View>
                <View style={[gStyles.row, { width: '50%' }]}>
                    <View style={[ { width: '80%' }]}>
                        <ParticipantsList
                            participants={item.assignment}
                            simplified={true}
                            showUserInfo={false}
                            delimit={true}
                            size='sm'
                        />
                    </View>
                    <StyledIcon src={require('../../assets/icons-general/goNext.png')} />
                </View>
            </View>
            <View style={[gStyles.row, { gap: 20 }]}>
                <View style={gStyles.row}>
                    <StyledIcon src={require('../../assets/icons-general/record.png')} />
                    <StyledText size='sm'>{item.record.length}</StyledText>
                </View>
                <View style={gStyles.row}>
                    <StyledIcon src={require('../../assets/icons-general/chat.png')} />
                    <StyledText size='sm'>{item.note?.length}</StyledText>
                </View>
            </View>

        </TouchableOpacity>
    )
}

export default ItemPreview

const styles = StyleSheet.create({
    itemContainer: {
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
    },
    mark: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 10
    }
})