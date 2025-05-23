import { StyleSheet, View} from 'react-native'
import React from 'react'
import { HistoryChanges, Item, Note } from '../../../types/types'
import { useTheme } from '../../../context/ThemeContext'
import { globalStyles } from '../../../styles/globalStyles'
import { StyledModal } from '../../styledComponets/StyledModal'
import MapNote from './MapNotes'
import { mockItem } from "../../../services/mockNotes";
import { ScrollView } from 'react-native-gesture-handler'

type Props = {
    data: Item,
    show: 'note' | 'history',
    visible: boolean,
    onClose: () => void;
}

const ItemModal = ({ data, show, onClose, visible }: Props) => {

    const { theme } = useTheme();
    const gStyles = globalStyles(theme);

    const isHistory = (item: Note | HistoryChanges): item is HistoryChanges => {
        return 'type' in item && 'content' in item;
    };

    console.log('actualizando item: ' + show)

    return (
        <StyledModal visible={visible} onClose={onClose} scrollView={false}>
            {/* {show.map((show, index) => (
                <View key={index} style={[styles.container, { borderBottomColor: theme.colors.buttonColor }]}>
                    <View style={gStyles.rowBetween}>
                        <StyledText size='sm'>{show.user.name}</StyledText>
                        <View>
                            <DatePreview type='startDate' value={show.date} showIcon={false} color='secondary' />
                            <DatePreview type='startTime' value={show.date} showIcon={false} color='secondary' />
                        </View>
                    </View>

                    {isHistory(show)
                        ? (<View>
                            <StyledText size='sm'>{show.type}</StyledText>
                            <StyledText size='sm'>{show.content}</StyledText>
                        </View>)
                        : <>
                            {show.content.map((item, index) => (
                                <View key={index}>
                                    {item.type === 'text' && <StyledText>{item.value}</StyledText>}
                                    {item.type === 'image' && (
                                        <Image source={{ uri: item.value }} />
                                    )}
                                    {item.type === 'audio' && (
                                        <AudioVisualizer audio={item.value} />
                                    )}
                                </View>
                            ))}
                        </>
                    }
                </View>
            ))} */}
            <ScrollView >
                <View style={{ paddingBottom: 50 }}>
                    {show === 'note' &&
                        <MapNote data={mockItem} />
                    }
                </View>
            </ScrollView>


        </StyledModal>
    )
}

export default ItemModal

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        marginVertical: 5,
        paddingBottom: 10
    },
    imagePreview: {
        width: '100%',
        height: 300,
        marginBottom: 20,
    }


})