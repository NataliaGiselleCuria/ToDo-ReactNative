import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { HistoryChanges, Note } from '../../types/types'
import { useTheme } from '../../context/ThemeContext'
import { globalStyles } from '../../styles/globalStyles'
import StyledText from '../styledComponets/StyledText'
import DatePreview from '../DatePreview'
import { StyledModal } from '../styledComponets/StyledModal'
import AudioVisualizer from './AudioVisualizer'

type Props = {
    show: Note[] | HistoryChanges[],
    visible: boolean,
    onClose: () => void;
}

const ItemModal = ({ show, onClose, visible }: Props) => {

    const { theme } = useTheme();
    const gStyles = globalStyles(theme);

    const isHistory = (item: Note | HistoryChanges): item is HistoryChanges => {
        return 'type' in item && 'content' in item;
      };

    return (
        <StyledModal visible={visible} onClose={onClose}>
            {show.map((show, index) => (
                <View key={index} style={[styles.container, { borderBottomColor: theme.colors.buttonColor }]}>
                    <View style={gStyles.rowBetween}>
                        <StyledText size='sm'>{show.user.name}</StyledText>
                        <DatePreview startDate={show.date} showTime={true} />
                    </View>

                    {isHistory(show) 
                        ? (<View>
                            <StyledText size='sm'>{show.type}</StyledText>
                            <StyledText size='sm'>{show.content}</StyledText>
                        </View>)
                        : <View>
                            {!!show.text && <Text>{show.text}</Text>}
                            {!!show.image && <Image source={{ uri: show.image }} style={styles.imagePreview} />}
                            {!!show.audio && <AudioVisualizer audio={show.audio} />}
                        </View>
                    }
                </View>
            ))}
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
    imagePreview:{
        width: '100%',
        height: 300,
        marginBottom: 20,
    }
    

})