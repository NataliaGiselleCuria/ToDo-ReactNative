import { StyleSheet, Text, View, Image, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { User } from '../../types/types'
import StyledText from '../styledComponets/StyledText';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';

type Props = {
   user: User;
   style?: StyleProp<ViewStyle>;
   userInfo?: boolean;
   size?: 'sm' | 'normal'
   width?: number;
};

const UsersPreview = ({ user, userInfo = true, style, size = 'normal', width=120 }: Props) => {

   const { theme } = useTheme();
   const gStyles = globalStyles(theme);

   const sizeMap = {
      sm: 40,
      normal: 60
   };

   return (
      <View style={[styles.container, style, {width: width}]}>
         <Image
            source={user.avatar ? user.avatar : require('../../assets/avatars/ghost.png')}
            style={[
               styles.avatar,
               {
                  backgroundColor: theme.colors.backgroundTop,
                  width: sizeMap[size],
                  height: sizeMap[size]
               }
            ]}
         />
         {userInfo &&
            <>
               <StyledText size='sm' style={{ textAlign: 'center' }}>{user.username}</StyledText>
               <StyledText size='sm' type='secondary'>#{user.id}</StyledText>
            </>
         }
      </View>
   )
}

export default UsersPreview

const styles = StyleSheet.create({
   container: {
      width: 120,
      height: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
   },
   avatar: {
      borderRadius: 40,
      objectFit: 'contain',
   },
})