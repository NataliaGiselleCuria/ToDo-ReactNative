import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Item, Note } from '../../../types/types'
import StyledText from '../../styledComponets/StyledText'
import AudioVisualizer from './AudioVisualizer'
import { useTheme } from '../../../context/ThemeContext'
import { globalStyles } from '../../../styles/globalStyles'
import ModalImg from '../../ModalImg'

type Prop = {
    dataNote: Note
    isOwnNote: boolean,
    position: 'single' | 'first' | 'middle' | 'last';
}


const BubbleNote = ({ dataNote, position, isOwnNote }: Prop) => {
    const { theme } = useTheme();
    const gStyles = globalStyles(theme);
    const [modalImgOpen, setModalImgOpen] = useState(false);
    const [imgToShow, setImgToShow] = useState('');

    const renderBubbleTip = (isOwn: boolean) => {

        const alignmentStyle = isOwn ? styles.tipRight : styles.tipLeft;

        return (
            <View style={[styles.bubbleTip, alignmentStyle, { borderTopColor:theme.colors.line,}]} />
        );
    };



    const getBubbleRadiusStyle = (position: string, isOwn: boolean) => {
        const radius = 16;
        const flat = 4;

        const left = isOwn ? 'Right' : 'Left';
        const right = isOwn ? 'Left' : 'Right';

        switch (position) {
            case 'single':
                return {
                    borderTopLeftRadius: radius,
                    borderTopRightRadius: radius,
                    borderBottomLeftRadius: radius,
                    borderBottomRightRadius: radius,
                };
            case 'first':
                return {
                    [`borderTopLeftRadius`]: radius,
                    [`borderTopRightRadius`]: radius,
                    [`borderBottom${left}Radius`]: flat,
                    [`borderBottom${right}Radius`]: radius,
                };
            case 'middle':
                return {
                    [`borderTop${left}Radius`]: flat,
                    [`borderBottom${left}Radius`]: flat,
                    [`borderTop${right}Radius`]: radius,
                    [`borderBottom${right}Radius`]: radius,
                };
            case 'last':
                return {
                    [`borderTop${left}Radius`]: flat,
                    [`borderBottom${left}Radius`]: radius,
                    [`borderTop${right}Radius`]: radius,
                    [`borderBottom${right}Radius`]: radius,
                };
            default:
                return {};
        }
    };

    return (
        <View style={styles.noteContainer}>
            {(position === 'first' || position === 'single') && renderBubbleTip(isOwnNote)}
            <View
                style={[
                    styles.bubbleNote,
                    isOwnNote ? styles.own : styles.other,
                    getBubbleRadiusStyle(position, isOwnNote),
                    { backgroundColor: theme.colors.line },
                ]}
            >
                {dataNote.content.map((item, idx) => (
                    <View key={idx} style={{ gap: 5 }}>
                        {item.type === 'text' && <StyledText style={{}}>{item.value}</StyledText>}
                        {item.type === 'image' && (
                            <TouchableOpacity
                                onPress={() => {
                                    setImgToShow(item.value);
                                    setModalImgOpen(true)
                                }}>
                                <Image source={{ uri: item.value }} style={styles.imagePreview} />
                            </TouchableOpacity>
                        )}
                        {item.type === 'audio' && (
                            <AudioVisualizer audio={item.value} />
                        )}
                    </View>
                ))}
            </View>
            <ModalImg
                img={imgToShow}
                isVisible={modalImgOpen}
                onClose={() => { setImgToShow(''); setModalImgOpen(false) }}
            />
        </View>
    )
}

export default BubbleNote

const styles = StyleSheet.create({
    noteContainer: {
        width: '83%',
    },
    bubbleNote: {
        width: '100%',
        minHeight: 50,
        height: 'auto',
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'center',
        borderWidth: 0,
    },
    own: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        alignSelf: 'flex-end',
    },
    other: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        alignSelf: 'flex-start',
    },

    bubbleTip: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: 'dashed',
       
        transform: [{ rotate: '0deg' }],
        position: 'absolute',
        top: 0
    },
    tipLeft: {
        left: -8,
        borderLeftColor: "transparent",
        borderLeftWidth: 25,
        borderTopWidth: 50,
    },
    tipRight: {
        right: -8,
        borderRightColor: "transparent",
        borderRightWidth: 25,
        borderTopWidth: 50,
    },

    imagePreview: {
        width: '100%',
        height: 150,
        borderRadius: 5,
    },
})