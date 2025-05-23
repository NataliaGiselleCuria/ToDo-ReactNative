import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Item } from '../../../types/types'
import BubbleNote from './BubbleNote'
import UsersPreview from '../../participants/UsersPreview';
import { useTheme } from '../../../context/ThemeContext';
import { globalStyles } from '../../../styles/globalStyles';
import { loggedUser } from '../../../services/mockUsers';

type Prop = {
   data: Item
}

const MapNote = ({ data }: Prop) => {
   const { theme } = useTheme();
   const gStyles = globalStyles(theme);

   if (!data.note) return null;

   return (
      <>
         {data.note.map((note, index) => {
            const isOwnNote = note.user.id === loggedUser.id;

            const prevNote = data.note?.[index - 1];
            const nextNote = data.note?.[index + 1];

            const isSameUserAsPrev = prevNote?.user?.id === note.user.id;
            const isSameUserAsNext = nextNote?.user?.id === note.user.id;

            let bubblePosition: 'single' | 'first' | 'middle' | 'last';
            if (!isSameUserAsPrev && !isSameUserAsNext) {
               bubblePosition = 'single';
            } else if (!isSameUserAsPrev && isSameUserAsNext) {
               bubblePosition = 'first';
            } else if (isSameUserAsPrev && isSameUserAsNext) {
               bubblePosition = 'middle';
            } else {
               bubblePosition = 'last';
            }

            const showAvatar = !isSameUserAsPrev;

            return (
               <View
                  key={note.id}
                  style={[
                     gStyles.row,
                     styles.bubbleNote,
                     {
                        flexDirection: isOwnNote ? 'row' : 'row-reverse', // esto va al final
                     },
                  ]}
               >
                  <BubbleNote dataNote={note} position={bubblePosition} isOwnNote={isOwnNote} />
                  {showAvatar
                     ? <View style={styles.avatarContainer}>
                        <UsersPreview user={note.user} userInfo={false} size='sm' width={40} />
                     </View>
                     : <View style={styles.avatarContainer}></View>
                  }
               </View>
            );
         })}
      </>
   );
}

export default MapNote

const styles = StyleSheet.create({
   bubbleNote: {
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      marginVertical: 2.5,
   },
   avatarContainer: {
      width: 40,
      height: 40,
      paddingTop: 10
   },
  
})