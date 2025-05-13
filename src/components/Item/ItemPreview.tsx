import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Item } from '../../types/types'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../types/navigationTypes'
import { getColorForOthersItem } from '../../styles/theme'
import { globalStyles } from '../../styles/globalStyles'
import { useTheme } from '../../context/ThemeContext'
import StyledText from '../styledComponets/StyledText'
import ParticipantsList from '../participants/ParticipantsList'
import StyledIcon from '../styledComponets/StyledIcon'
import ItemProgressBar from './ItemProgressBar'
import ItemPriority from './ItemPriority'
import DatePreview from '../DatePreview'

type Props = {
    item: Item,
}

const ItemPreview = ({ item }: Props) => {
    const { theme } = useTheme();
    const gStyles = globalStyles(theme);

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const goToItem = () => {
        navigation.navigate('ViewItem', { item: { id: item.id, idList: item.idList } });
    }

    const subCategoryColor =
        item.subcategory
            ? theme.colors.subCategoryColors[item.subcategory] ?? getColorForOthersItem(item.subcategory, theme)
            : theme.colors.textSecondary;

    return (
        <TouchableOpacity
            onPress={goToItem}
            style={[
                styles.itemContainer,
                gStyles.shadow,
                {
                    borderColor: subCategoryColor,
                    backgroundColor:subCategoryColor
                },
            ]}
        >
            <View style={[gStyles.rowBetween,]}>
                <ItemPriority priority={item.priority} text={false} color='button' topPosition={-18} />
                <View style={gStyles.row}>
                    <DatePreview
                        justify='flex-end'
                        type='startDate'
                        value={item.startDate}
                        color='buttonColor'
                    />
                    <DatePreview
                        justify='flex-end'
                        type='startTime'
                        value={item.startTime}
                        color='buttonColor'
                    />
                </View>
            </View>
            <View style={[gStyles.row]}>
                <View style={styles.containerColumn}>
                    <StyledText>{item.name}</StyledText>
                    <View style={[gStyles.row]}>
                        <StyledIcon width='sm' height='sm'
                            src={require('../../assets/icons-general/category.png')}

                        />
                        {item.subcategory &&
                            <StyledText size='sm'  >{item.subcategory}</StyledText>
                        }
                    </View>
                    <ItemProgressBar state={item.state} />
                </View>
                <View style={[gStyles.row, styles.containerColumn]}>
                    <View style={[{ width: '80%' }]}>
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
                    <StyledIcon src={require('../../assets/icons-general/record.png')} type='secondary' />
                    <StyledText size='sm' type='secondary'>{item.record.length}</StyledText>
                </View>
                <View style={gStyles.row}>
                    <StyledIcon src={require('../../assets/icons-general/chat.png')} type='secondary' />
                    <StyledText size='sm' type='secondary'>{item.note?.length}</StyledText>
                </View>
            </View>

        </TouchableOpacity >
    )
}

export default ItemPreview

const styles = StyleSheet.create({
    itemContainer: {
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
        gap: 5
    },
    mark: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 10
    },
    containerColumn: {
        width: '50%'
    },
})