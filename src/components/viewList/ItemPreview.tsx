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
            <View>
                <ItemPriority priority={item.priority} text={false} />
                <DatePreview startDate={item.startDate} endDate={item.endDate} />
            </View>
            <View style={styles.container}>
                <View>
                    <StyledText>{item.name}</StyledText>
                    <StyledText size='sm'>{item.subcategory}</StyledText>
                    <ItemProgressBar state={item.state} />
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

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
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