import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import { RouteProp } from '@react-navigation/native';
import StyledContainer from '../../components/styledComponets/StyledContainer';
import ButtonBack from '../../components/ButtonBack';
import { useCancelToHome } from '../../hooks/useCancelToHome';
import { categoryItemName, List } from '../../types/types';
import StyledText from '../../components/styledComponets/StyledText';
import { globalStyles } from '../../styles/globalStyles';
import { useTheme } from '../../context/ThemeContext';
import InfoList from './InfoList';
import StyledIcon from '../../components/styledComponets/StyledIcon';
import CreateItemModal from '../createItem/CreateItemModal';
import ParticipantsList from '../../components/participants/ParticipantsList';
import ItemPreview from './ItemPreview';


type RootStackParamList = {
   ViewList: { list: List };
};

type ViewListRouteProp = RouteProp<RootStackParamList, 'ViewList'>;

type Props = {
   route: ViewListRouteProp;
};

const ViewList: React.FC<Props> = ({ route }) => {
   const { theme } = useTheme();
   const gStyles = globalStyles(theme);
   const cancelToHome = useCancelToHome();
   const { list } = route.params;
   const [modalVisible, setModalVisible] = useState(false);
   const [items, setItems] = useState(list.items);


   const item = categoryItemName[list.category];

   return (
      <StyledContainer>
         <View style={[gStyles.shadow, styles.container, { backgroundColor: theme.colors.backgroundTop }]}>

            <View style={styles.header}>
               <ButtonBack onPress={cancelToHome} />
               <StyledText size='lg'>{list.name}</StyledText>
            </View>

            <StyledText>{list.category}</StyledText>

            <InfoList list={list} />
         </View>
         <View style={styles.container}>
            <TouchableOpacity style={styles.buttonAdd} onPress={() => setModalVisible(true)}>
               <StyledText>Agregar {item}</StyledText>
               <View style={[styles.buttonAddIcon, { backgroundColor: theme.colors.buttonColor }]}>
                  <StyledIcon src={require('../../assets/icons-general/add.png')} width='sm' height='sm' type='button' />
               </View>
            </TouchableOpacity>

            <View>
               {items.map((item, index) => (
                  <ItemPreview key={index} item={item} />
               ))}
            </View>
         </View>
         <CreateItemModal
            list={list}
            item={item}
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onAddItem={(newItem) => setItems(prev => [...prev, newItem])}
         />
      </StyledContainer>
   )
}

export default ViewList

const styles = StyleSheet.create({
   container: {
      width: '100%',
      borderRadius: 10,
      padding: 10,
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 5
   },
   buttonAddIcon: {
      padding: 5,
      borderRadius: 40,
   },
   buttonAdd: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,

   },
})