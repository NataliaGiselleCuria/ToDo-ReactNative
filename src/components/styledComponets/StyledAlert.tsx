import { Modal, StyleSheet, Text, TextStyle, View, ViewStyle, TouchableOpacity } from 'react-native'
import React from 'react'

type Props = {
    visible: boolean,
    title?: string,
    message?: string,
    buttons?: Array<{
        text: string,
        onPress: () => void,
        style?: ViewStyle,
        textStyle?: TextStyle,
    }>,
    onClose: () => void,
}

const StyledAlert = ({visible, title, message, buttons, onClose}: Props) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {title && <Text style={styles.modalTitle}>{title}</Text>}
                    {message && <Text style={styles.modalText}>{message}</Text>}
                    <View style={styles.buttonsContainer}>
                        {buttons &&
                            buttons.map((button, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.button,
                                        button.style,
                                    ]}
                                    onPress={button.onPress}
                                >
                                    <Text style={[styles.buttonText, button.textStyle]}>
                                        {button.text}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default StyledAlert

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(18, 20, 20, 0.86)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#2196F3',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})