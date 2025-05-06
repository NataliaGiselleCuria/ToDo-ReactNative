import React, { useRef, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import StyledButton from './StyledButton';


type Props = {
   visible: boolean;
   onSave?: () => void;
   onClose: () => void;
   children: React.ReactNode;
   scrollView?: boolean
};

export const StyledModal = ({ visible, onSave, onClose, children, scrollView = true }: Props) => {
   const scrollViewRef = useRef<ScrollView>(null);
   const { theme } = useTheme();
   const gStyles = globalStyles(theme);

   useEffect(() => {
      if (visible) {
         const timeout = setTimeout(() => {
            scrollViewRef.current?.scrollTo({ y: 0, animated: false });
         }, 150); // un poco más de tiempo
         return () => clearTimeout(timeout);
      }
   }, [visible]);

   return (

      <View style={gStyles.modal}>
         <Modal
            isVisible={visible}
            onBackdropPress={onClose}
            customBackdrop={<View style={{ flex: 1 }} />}
            animationIn="slideInDown"
            avoidKeyboard={false}
         >
            <View style={[gStyles.modalOverlay, gStyles.shadow, { backgroundColor: theme.colors.backgroundTop}]}>
               {scrollView
                  ? (
                     <ScrollView
                        ref={scrollViewRef}
                        style={[gStyles.modalContent, { flex: 1 }]}
                        contentContainerStyle={{
                           paddingBottom: 20,
                           flexGrow: 1,
                           justifyContent: 'flex-start',
                        }}
                     >
                        {children}
                        <View style={styles.containerButtonsScroll}>
                           {onSave && <StyledButton title="Confirmar" onPress={onSave} />}
                           <StyledButton title="Cancelar" onPress={onClose} />
                        </View>
                     </ScrollView>
                  )
                  : (
                     <>
                        <View style={gStyles.modalContent} >
                           {children}
                        </View>
                        <View style={styles.containerButtons}>
                           {onSave && <StyledButton title="Confirmar" onPress={onSave} />}
                           <StyledButton title="Cancelar" onPress={onClose} />
                        </View>
                     </>
                  )
               }
            </View>
         </Modal>
      </View>

   );
};

export const styles = StyleSheet.create({
   containerButtons: {
      width: '85%',
      gap: 10,
      borderWidth: 1
   },

   containerButtonsScroll: {
      width: '100%',
      gap: 10,
   },

})
