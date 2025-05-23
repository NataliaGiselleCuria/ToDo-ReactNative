import { View, TouchableOpacity, TextInput, Text, StyleSheet, Image, Alert, Platform } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useEffect, useRef, useState } from 'react';
import { Item, Note, NoteItem, } from '../../../types/types';
import { loggedUser } from '../../../services/mockUsers';
import { useItemContext } from '../../../context/items/ItemContext';
import { StyledModal } from '../../styledComponets/StyledModal';
import { useTheme } from '../../../context/ThemeContext';
import { globalStyles } from '../../../styles/globalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { useAlert } from '../../../hooks/calendar/useAlert';
import AudioRecorderPlayer, { AudioEncoderAndroidType, OutputFormatAndroidType } from 'react-native-audio-recorder-player';
import AudioVisualizer from './AudioVisualizer';
import StyledText from '../../styledComponets/StyledText';
import StyledIcon from '../../styledComponets/StyledIcon';
import StyledAlert from '../../styledComponets/StyledAlert';
import UsersPreview from '../../participants/UsersPreview';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
   item: Item;
   visible: boolean;
   onClose: () => void;
};

const audioRecorderPlayer = new AudioRecorderPlayer();

const AddNoteModal = ({ item, visible, onClose }: Props) => {
   const { theme } = useTheme();
   const gStyles = globalStyles(theme);
   const { alertVisible, alertMessage, alertType, showAlert, hideAlert } = useAlert();
   const { updateItem } = useItemContext();
   const [noteItems, setNoteItems] = useState<NoteItem[]>([]);
   const [text, setText] = useState('');
   const [recording, setRecording] = useState(false);

   //Tamaño de la burbuja de la nota
   const [contentHeight, setContentHeight] = useState(0);
   const [inputHeight, setInputHeight] = useState(0);
   const maxVisibleHeight = 470 - inputHeight;

   //Scroll bottom al agregar elemento nuevo
   const scrollRef = useRef<ScrollView>(null);
   const prevNoteItemsLength = useRef(0);
   useEffect(() => {
      if (noteItems.length > prevNoteItemsLength.current) {
         scrollRef.current?.scrollToEnd({ animated: true });
      }
      prevNoteItemsLength.current = noteItems.length;
   }, [noteItems]);

   //color de la categoría del item.
   const colorCategory = item.subcategory ? theme.colors.subCategoryColors[item.subcategory] : theme.colors.line + 33

   const handlePickImage = async () => {
      const permission = await request(
         Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.CAMERA
            : PERMISSIONS.IOS.CAMERA
      );

      if (permission !== RESULTS.GRANTED) {
         showAlert('Permiso denegado.\nSe necesita acceso a la cámara.', 'Error');
         return;
      }

      const result = await launchCamera({
         mediaType: 'photo',
         quality: 0.7,
         saveToPhotos: true,
      });

      if (result.errorCode) {
         showAlert('Error al cargar la imagen.' + result.errorCode, 'Error');
      }

      if (result.didCancel) return;

      if (result.assets && result.assets[0]?.uri) {
         const uri = result.assets[0].uri;
         if (uri) {
            setNoteItems(prev => [...prev, { type: 'image', value: uri }]);
         }
      }

   };

   const handleRecordAudio = async () => {
      const permission = await request(
         Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.RECORD_AUDIO
            : PERMISSIONS.IOS.MICROPHONE
      );

      if (permission !== RESULTS.GRANTED) {
         showAlert('Permiso denegado.\nSe necesita acceso al micrófono.', 'Error');
         return;
      }

      try {
         const uri = await audioRecorderPlayer.startRecorder(undefined, {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            OutputFormatAndroid: OutputFormatAndroidType.MPEG_4,
            AudioSourceAndroid: 6, // MIC
         });
         setRecording(true);

         if (!uri) {
            showAlert('Error al iniciar la grabación de audio.', 'Error');
         }

      } catch (err) {
         showAlert('Error al iniciar la grabación de audio.' + err, 'Error');
      }
   };

   const handleStopRecording = async () => {
      try {
         const uri = await audioRecorderPlayer.stopRecorder();

         if (!uri) {
            showAlert('Error al detener la grabación de audio.', 'Error');
         }

         setRecording(false);
         setNoteItems(prev => [...prev, { type: 'audio', value: uri }]);
      } catch (err) {
         showAlert('Error al detener la grabación de audio.' + err, 'Error');
      }
   };

   const handleSendText = () => {
      if (text.trim()) {
         addText(text);
         setText('');
      }
   };

   const addText = (newText: string) => {
      if (newText.trim()) {
         setNoteItems(prev => [...prev, { type: 'text', value: newText.trim() }]);
         setText('');
      }
   };

   const handleSave = () => {

      if (noteItems.length === 0) return;

      const newNote: Note = {
         id: Date.now(),
         user: loggedUser,
         date: new Date(),
         content: noteItems,
      };

      updateItem(item.idList, item.id, {
         note: [...(item.note ?? []), newNote],

      });

      setNoteItems([]);
      setText('');
      onClose();
   };

   const buttonDelete = ({ el, type }: { el: string; type: 'audio' | 'image' | 'text' }) => (
      <TouchableOpacity
         onPress={() => {
            setNoteItems(prev => prev.filter(item => !(item.value === el && item.type === type)));
         }}
      >
         <StyledIcon src={require('../../../assets/icons-general/trash.png')} width='sm' height='sm' />
      </TouchableOpacity>
   );

   return (
      <StyledModal visible={visible} onSave={handleSave} onClose={onClose} scrollView={false} gradient={false} styleChildren={{marginBottom:0}}>
         <LinearGradient
            colors={[theme.colors.backgroundTop, theme.colors.backgroundTop, 'transparent',]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradientTop}
         >
            <StyledText size='xlg' style={{ paddingLeft: 10 }}>NUEVA NOTA</StyledText>
         </LinearGradient>
         <View style={styles.container}>
            <View style={[styles.contentNote,]}>
               <View style={[gStyles.row, { alignItems: 'flex-end' }]}>
                  <ScrollView
                     ref={scrollRef}
                     contentContainerStyle={{ flexGrow: 1 }}
                     scrollEnabled={contentHeight > maxVisibleHeight}
                     style={[styles.bubbleNote, { backgroundColor: colorCategory, maxHeight: maxVisibleHeight }]}
                  >
                     <View
                        onLayout={(event) => {
                           const { height } = event.nativeEvent.layout;
                           setContentHeight(height);
                        }}
                     >
                        {noteItems.map((item, index) => (
                           <View key={index} style={[gStyles.row, styles.contentMedia, { borderBottomColor: theme.colors.background, }]}>
                              {item.type === 'audio' && (
                                 <>
                                    <View style={styles.mediaPreview}>
                                       <AudioVisualizer audio={item.value} />
                                    </View>
                                    {buttonDelete({ el: item.value, type: 'audio' })}
                                 </>
                              )}
                              {item.type === 'image' && (
                                 <>
                                    <View style={styles.mediaPreview}>
                                       <Image source={{ uri: item.value }} style={styles.imagePreview} />
                                    </View>
                                    {buttonDelete({ el: item.value, type: 'image' })}
                                 </>
                              )}
                              {item.type === 'text' && (
                                 <>
                                    <View style={styles.mediaPreview}>
                                       <StyledText>{item.value}</StyledText>
                                    </View>
                                    {buttonDelete({ el: item.value, type: 'text' })}
                                 </>
                              )}
                           </View>
                        ))}
                     </View>
                  </ScrollView>
                  <UsersPreview user={loggedUser} userInfo={false} size='sm' width={40} />
               </View>
            </View>

            <View style={[gStyles.row, styles.contentEntry]}>
               <View style={[gStyles.row, gStyles.shadow, styles.bubbleMesagge, { backgroundColor: theme.colors.background }]}>
                  <TextInput
                     placeholder="Escribe tu nota"
                     placeholderTextColor={theme.colors.textSecondary}
                     value={text}
                     onChangeText={setText}
                     style={styles.input}
                     multiline
                     onContentSizeChange={(e) => {
                        const height = e.nativeEvent.contentSize.height;
                        setInputHeight(height);
                     }}
                  />
                  <TouchableOpacity
                     onPress={handlePickImage}
                     style={[{ backgroundColor: theme.colors.background, }]}>
                     <StyledIcon src={require('../../../assets/icons-general/camera.png')} width='lg' height='lg' />
                  </TouchableOpacity>
               </View>
               <View>
                  {text.trim().length > 0 ? (
                     <TouchableOpacity
                        onPress={handleSendText}
                        style={[
                           styles.buttonAudio,
                           gStyles.shadow,
                           { backgroundColor: theme.colors.background, borderColor: theme.colors.background }
                        ]}
                     >
                        <StyledIcon src={require('../../../assets/icons-general/send.png')} width="lg" height="lg" />
                     </TouchableOpacity>
                  ) : (
                     <TouchableOpacity
                        onPressIn={handleRecordAudio}
                        onPressOut={handleStopRecording}
                        style={[
                           styles.buttonAudio,
                           !recording && gStyles.shadow,
                           {
                              backgroundColor: recording ? 'red' : theme.colors.background,
                              borderColor: recording ? 'red' : theme.colors.background
                           }
                        ]}
                     >
                        <StyledIcon src={require('../../../assets/icons-general/microphone.png')} width="lg" height="lg" />
                     </TouchableOpacity>
                  )}
               </View>
            </View>

         </View>

         <StyledAlert
            visible={alertVisible}
            onClose={hideAlert}
            title={alertType}
            message={alertMessage}
            buttons={[{ text: 'Ok', onPress: hideAlert }]}
         />
      </StyledModal>
   );
};

export default AddNoteModal;

const styles = StyleSheet.create({
   gradientTop: {
      height: 100,
      width: '100%',
      position: 'absolute',
      paddingTop: 10,
      zIndex: 99,
      top: -10,
      left: 0,
   },
   container: {
      flex: 1,
      height: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
      overflow: 'hidden',
   },
   contentNote: {
      width: '95%',
      justifyContent: 'flex-end',
      paddingBottom: 15,

   },
   contentWrapper: {
      flexGrow: 1,
      justifyContent: 'flex-start',
   },
   bubbleNote: {
      width: '83%',
      paddingHorizontal: 10,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 0,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      borderWidth: 0,
   },
   contentMedia: {
      minHeight: 'auto',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingVertical: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
   },
   mediaPreview: {
      width: '90%',
   },
   imagePreview: {
      width: '100%',
      height: 150,
      borderRadius: 5,
   },


   contentEntry: {
      width: '95%',
      minHeight: '10%',
      height: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom:10
   },
   bubbleMesagge: {
      width: '83%',
      minHeight: 45,
      height: 'auto',
      borderRadius: 15,
      alignItems: 'flex-end',
      justifyContent: 'center',
      padding: 7,
      borderWidth: 0
   },
   buttonAudio: {
      width: 45,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 40,
      borderWidth: 0
   },
   input: {
      padding: 5,
      width: '85%',
      height: 'auto',
      textAlignVertical: 'top',
   },



});