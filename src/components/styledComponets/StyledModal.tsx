import React, { useRef, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import StyledButton from './StyledButton';
import LinearGradient from 'react-native-linear-gradient';


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

   const buttons = (
      <LinearGradient
         colors={[theme.colors.backgroundTop, 'transparent',]}
         start={{ x: 0, y: 0.5 }}
         end={{ x: 0, y: 0 }}
         style={styles.gradientButtons}
      >
         <View style={styles.containerButtons}>
            {onSave && <StyledButton title="Confirmar" onPress={onSave} style={{marginTop:5}}/>}
            <StyledButton title="Cancelar" onPress={onClose} />
         </View>
      </LinearGradient>
   )

   return (

      <View style={gStyles.modal}>
         <Modal
            isVisible={visible}
            onBackdropPress={onClose}
            customBackdrop={<View style={{ flex: 1 }} />}
            animationIn="slideInDown"
            avoidKeyboard={false}
         >
            <View style={[gStyles.modalOverlay, gStyles.shadow, { backgroundColor: theme.colors.backgroundTop }]}>
               {scrollView
                  ? (
                     <ScrollView
                        ref={scrollViewRef}
                        style={[gStyles.modalContent, { flex: 1 }]}
                        contentContainerStyle={{

                           flexGrow: 1,
                           justifyContent: 'flex-start',
                        }}
                     >
                        <View style={styles.containerChildren}>
                           {children}
                        </View>
                        {buttons}
                     </ScrollView>
                  )
                  : (
                     <View
                        style={[gStyles.modalContent, { flexGrow: 1 }]}
                     >
                        <View style={styles.containerChildren}>
                           {children}
                        </View>
                        {buttons}
                     </View>
                  )
               }

            </View>
         </Modal >
      </View >

   );
};

export const styles = StyleSheet.create({
   containerChildren: {
      flex: 1,
      flexGrow: 1,
      marginBottom: 37,
  
   },
   containerButtons: {
      width: '100%',
      height: 120,
      justifyContent:'flex-end',
      gap: 5,
   },
   gradientButtons: {
      height: 140,
      width: '103%',
      position: 'absolute',
      zIndex: 1,
      bottom: 0,
      paddingHorizontal: 5,
      justifyContent: 'flex-end',
   },
})
