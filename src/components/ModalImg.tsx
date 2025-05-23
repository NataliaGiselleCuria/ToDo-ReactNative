import React from 'react'
import { Modal, StyleSheet } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import { globalStyles } from '../styles/globalStyles'
import ImageViewer from 'react-native-image-zoom-viewer';

type Prop = {
    img: string
    isVisible: boolean
    onClose: () => void
}

const ModalImg = ({ img, isVisible, onClose }: Prop) => {
    const { theme } = useTheme();
    const gStyles = globalStyles(theme);
    const images = [{ url: img }];

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
            style={[styles.modalImg]}
        >
            <ImageViewer
                imageUrls={images}
                enableSwipeDown
                onSwipeDown={onClose}
                onCancel={onClose}
            />
        </Modal>
    )
}

export default ModalImg

const styles = StyleSheet.create({
    modalImg: {
        position: 'absolute',
        zIndex: 1,
        flex: 1,
    },
})
