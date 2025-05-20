import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import { useCancelToHome } from '../../hooks/useCancelToHome';
import { categoryItemName, Item, List } from '../../types/types';
import { useNavigation } from '@react-navigation/native';
import StyledIcon from './StyledIcon';
import StyledText from './StyledText';
import HeaderView from '../HeaderView';
import InfoHeaderView from '../InfoHeaderView';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
   children: React.ReactNode;
   style?: ViewStyle;
   data: List | Item;
   list?: List;
   onPressHeader: () => void;
   onPressButtonAdd: () => void;
}

const StyledContainerView: React.FC<Props> = ({ data, list, children, style, onPressHeader, onPressButtonAdd }) => {
   const { theme, modalCount } = useTheme();
   const gStyles = globalStyles(theme);
   const cancelToHome = useCancelToHome();

   const listData = (data: List | Item): data is List => {
      return (data as List).participants !== undefined;
   };

   const isList = listData(data);
   const itemLabel = isList ? categoryItemName[data.category] : 'Nota';
   const navigation = useNavigation();
   const handleBack = isList ? cancelToHome : () => navigation.goBack();

   return (
      <>
         <ScrollView style={[styles.container, { backgroundColor: theme.colors.background, }]}>
            <View style={[
               gStyles.shadow, gStyles.containerHeader,
               { backgroundColor: theme.colors.backgroundTop },
            ]}
            >
               <HeaderView
                  onPressBack={handleBack}
                  onPressEdit={() => onPressHeader()}
                  name={data.name}
                  editedObject={isList ? 'lista' : 'item'}
                  allowedUsers={isList ? data.allowedUsers : list?.allowedUsers}
               />
               <View style={[gStyles.gapContainer, { paddingHorizontal: 10 }]}>
                  {isList &&
                     <View style={[gStyles.row, { paddingLeft: 20 }]}>
                        <StyledIcon
                           width='sm' height='sm'
                           src={require('../../assets/icons-general/category.png')}
                           style={{ tintColor: theme.colors.categoryColors[data.category] }}
                        />
                        <StyledText
                           size='sm'
                           style={{ color: theme.colors.categoryColors[data.category] }}>
                           {data.category ?? 'Sin categoría'}
                        </StyledText>
                     </View>
                  }
                  <InfoHeaderView data={data} />
               </View>
            </View>
            <View style={[gStyles.paddingContainer, gStyles.gapContainer, { paddingTop: 15 }]}>
               {children}
            </View>
         </ScrollView>

         <LinearGradient
            colors={[theme.colors.background, 'transparent']}
            start={{ x: 0, y: 0.6 }}
            end={{ x: 0, y: 0 }}
            style={[styles.containerButtonAdd]}
         >
            <TouchableOpacity
               style={[
                  styles.buttonAdd, gStyles.shadow,
                  { backgroundColor: theme.colors.backgroundTop, borderColor: theme.colors.line }
               ]}
               onPress={() => { onPressButtonAdd(); }}
            >
               <StyledText>Agregar {itemLabel}</StyledText>
            </TouchableOpacity>         
         </LinearGradient>

         {modalCount > 0 && <View style={gStyles.modalBack}></View>}
         
      </>
   )
}

export default StyledContainerView

const styles = StyleSheet.create({
   container: {
      flex: 1,
      minHeight: '100%',
      position: 'relative',
   },
   containerButtonAdd: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 120,
      paddingTop: 40,
      alignItems: 'center',
      justifyContent: 'flex-end',
      alignSelf: 'center',
      borderRadius: 10,
      paddingBottom: 15,
   },
   buttonAddIcon: {
      padding: 5,
      borderRadius: 40,
   },
   buttonAdd: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      gap: 15,
      borderWidth: 0.5,
      padding: 10,
      width: '90%'
   },
})