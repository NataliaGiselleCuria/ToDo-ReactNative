import { View, TouchableOpacity, TextInput, Text, StyleSheet, Image, Alert, Platform } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useState } from 'react';
import { Item, } from '../../../types/types';
import { loggedUser } from '../../../services/mockUsers';
import { useItemContext } from '../../../context/items/ItemContext';
import { StyledModal } from '../../styledComponets/StyledModal';
import { useTheme } from '../../../context/ThemeContext';
import { globalStyles } from '../../../styles/globalStyles';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import AudioVisualizer from './AudioVisualizer';
import StyledText from '../../styledComponets/StyledText';
import StyledIcon from '../../styledComponets/StyledIcon';


type Props = {
   item: Item;
   visible: boolean;
   onClose: () => void;
};

const audioRecorderPlayer = new AudioRecorderPlayer();

const AddNoteModal = ({ item, visible, onClose }: Props) => {

   const { theme } = useTheme();
   const gStyles = globalStyles(theme);

   const { updateItem } = useItemContext();
   const [text, setText] = useState('');
   const [imageUri, setImageUri] = useState<string | null>(null);
   const [audioUri, setAudioUri] = useState<string | null>(null);
   const [recording, setRecording] = useState(false);

   const handlePickImage = async () => {
      const permission = await request(
         Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.CAMERA
            : PERMISSIONS.IOS.CAMERA
      );

      if (permission !== RESULTS.GRANTED) {
         Alert.alert('Permiso denegado', 'Se necesita acceso a la cámara.');
         return;
      }

      const result = await launchCamera({
         mediaType: 'photo',
         quality: 0.7,
         saveToPhotos: true,
      });

      if (result.didCancel) return;

      if (result.assets?.[0]?.uri) {
         setImageUri(result.assets[0].uri);
      }

   };

   const handleRecordAudio = async () => {
      const permission = await request(
         Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.RECORD_AUDIO
            : PERMISSIONS.IOS.MICROPHONE
      );

      if (permission !== RESULTS.GRANTED) {
         Alert.alert('Permiso denegado', 'Se necesita acceso al micrófono.');
         return;
      }

      try {
         const uri = await audioRecorderPlayer.startRecorder();
         console.log('Grabando en:', uri);
         setRecording(true);
      } catch (err) {
         console.error('Error al iniciar grabación', err);
      }
   };

   const handleStopRecording = async () => {
      try {
         const uri = await audioRecorderPlayer.stopRecorder();
         console.log('Audio grabado en:', uri);
         setAudioUri(uri);
         setRecording(false);
      } catch (err) {
         console.error('Error al detener la grabación', err);
      }
   };

   const handleSave = () => {
      if (!text && !imageUri && !audioUri) return;

      const newNote = {
         id: Date.now(),
         user: loggedUser,
         date: new Date(),
         text: text || undefined,
         image: imageUri || undefined,
         audio: audioUri || undefined,
      };

      updateItem(item.idList, item.id, {
         note: [...(item.note ?? []), newNote],
      })

      setText('');
      setImageUri(null);
      setAudioUri(null);
      setRecording(false);
      onClose();
   };

   return (
      <StyledModal visible={visible} onSave={handleSave} onClose={onClose}>
         <View style={styles.container}>
            <View>
               <TextInput
                  placeholder="Escribe tu nota"
                  value={text}
                  onChangeText={setText}
                  style={styles.input}
                  multiline
               />
            </View>

            <View>
               <TouchableOpacity onPress={handlePickImage} style={gStyles.row}>
                  <StyledIcon src={require('../../../assets/icons-general/camera.png')} />
                  <StyledText>Subir imagen</StyledText>
               </TouchableOpacity>
               {imageUri && (
                  <Image source={{ uri: imageUri }} style={styles.imagePreview} />
               )}
            </View>
            <View>
               <TouchableOpacity onPress={handleRecordAudio} style={gStyles.row}>
                  <StyledIcon src={require('../../../assets/icons-general/microphone.png')} />
                  <StyledText>Subir audio</StyledText>
               </TouchableOpacity>
               <View style={styles.footer}>
                  {recording && (
                     <TouchableOpacity onPress={handleStopRecording}>
                        <Text>Detener grabación</Text>
                     </TouchableOpacity>
                  )}
               </View>
               {audioUri &&
                  <View>
                     <AudioVisualizer audio={audioUri} />
                  </View>
               }
            </View>
         </View>
      </StyledModal>
   );
};

export default AddNoteModal;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
   },
   buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
   },
   input: {
      borderColor: '#ccc',
      borderWidth: 1,
      padding: 10,
      minHeight: 100,
      marginBottom: 20,
      textAlignVertical: 'top',
   },
   imagePreview: {
      width: '100%',
      height: 300,
      marginBottom: 20,
   },
   footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
   },
});