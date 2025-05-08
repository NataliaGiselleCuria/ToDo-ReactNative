import { StyleSheet, View } from 'react-native'
import React from 'react'
import StyledIcon from '../styledComponets/StyledIcon'
import { Priority, colorMapPriority } from '../../types/types';
import StyledText from '../styledComponets/StyledText';

type Props = {
   priority: Priority | undefined;
   text?: boolean
};

const ItemPriority: React.FC<Props> = ({ priority, text }) => {

   const color = priority != undefined ? colorMapPriority[priority] : 'grey';

   return (
      <View style={styles.container}>
         <StyledIcon src={require('../../assets/icons-general/mark.png')} width='lg' height='lg' style={{ tintColor: color }} />
         {(!priority && text) && <StyledText size='sm'>Sin prioridad</StyledText>}
         {text && <StyledText size='sm'>{priority}</StyledText>}
      </View>
   )
}

export default ItemPriority

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      top: -25,
      left: -4
   }
})