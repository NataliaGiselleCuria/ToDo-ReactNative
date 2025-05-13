import React, { useRef, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import Modal from 'react-native-modal';
import ConfirmCancelButtons from '../ConfirmCancelButtons';

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
      <View>
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
                        {onSave && (
                           <ConfirmCancelButtons handleSave={onSave} handleCancel={onClose} />
                        )}
                     </ScrollView>
                  )
                  : (
                     <View
                        style={[gStyles.modalContent, { flexGrow: 1 }]}
                     >
                        <View style={styles.containerChildren}>
                           {children}
                        </View>
                        {onSave && (
                           <ConfirmCancelButtons handleSave={onSave} handleCancel={onClose} />
                        )}
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
})
