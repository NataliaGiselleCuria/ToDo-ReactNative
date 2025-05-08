import { StyleSheet, TouchableOpacity, View, } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { RouteProp } from '@react-navigation/native';
import { useCancelToHome } from '../../hooks/useCancelToHome';
import { categoryItemName, List } from '../../types/types';
import { useListContext } from '../../context/lists/ListContext';
import { globalStyles } from '../../styles/globalStyles';
import { useTheme } from '../../context/ThemeContext';
import StyledContainer from '../../components/styledComponets/StyledContainer';
import StyledText from '../../components/styledComponets/StyledText';
import StyledIcon from '../../components/styledComponets/StyledIcon';
import InfoList from '../../components/viewList/InfoList';
import ItemPreview from '../../components/viewList/ItemPreview';
import CreateItemModal from '../../components/viewItem/CreateItemModal';
import EditListModal from '../../components/list/EditListModal';

import HeaderView from '../../components/HeaderView';
import { ScrollView } from 'react-native-gesture-handler';
import ButtonAdd from '../../components/ButtonAdd';

type RootStackParamList = {
   ViewList: { list: List };
};

type ViewListRouteProp = RouteProp<RootStackParamList, 'ViewList'>;

type Props = {
   route: ViewListRouteProp;
};

const ViewListScreen: React.FC<Props> = ({ route }) => {
   //Lista actualizada desde el contexto
   const { getListById, lists } = useListContext();
   const { list: routeList } = route.params;

   const listData = useMemo(() => {
      return getListById(routeList.id);
   }, [lists, routeList.id]);

   const { theme, incrementModalCount, decrementModalCount, modalCount } = useTheme();
   const gStyles = globalStyles(theme);
   const cancelToHome = useCancelToHome();
   const [creatItemOpen, setCreatItemOpen] = useState(false);
   const [editListOpen, setEditListOpen] = useState(false);

   if (!listData) {
      return (
         <StyledContainer>
            <StyledText>No se encontró la lista.</StyledText>
         </StyledContainer>
      );
   }

   const item = categoryItemName[listData.category];

   return (
      <ScrollView style={{ flex: 1, minHeight: '100%', backgroundColor: theme.colors.background, position:'relative'}}>
         <View style={[gStyles.shadow, gStyles.containerHeader, { backgroundColor: theme.colors.backgroundTop }]}>
            <HeaderView
               onPressBack={cancelToHome}
               onPressEdit={() => { setEditListOpen(true); incrementModalCount() }}
               name={listData.name}
               editedObject={'lista'}
               allowedUsers={listData.allowedUsers}
            />
            <View style={[gStyles.gapContainer, { paddingHorizontal: 10 }]}>
               <View style={[gStyles.row, { paddingLeft: 20 }]}>
                  <StyledIcon width='sm' height='sm' src={require('../../assets/icons-general/category.png')} />
                  {listData.category
                     ? <StyledText size='sm'>{listData.category}</StyledText>
                     : <StyledText size='sm'>Sin categoría</StyledText>}
               </View>
               <InfoList list={listData} />
            </View>
         </View>
         <View style={[gStyles.paddingContainer, gStyles.gapContainer, {paddingTop:15}]}>
            <View>
               <ButtonAdd onPress={() => { setCreatItemOpen(true); incrementModalCount() }} elementoToAdd={item} />
            </View>
            <View style={styles.ContainerListItems}>
               {listData.items.map((item) => (
                  <ItemPreview key={item.id} item={item} />
               ))}
            </View>

            {creatItemOpen && (
               <CreateItemModal
                  list={listData}
                  item={item}
                  visible={creatItemOpen}
                  onClose={() => { setCreatItemOpen(false); decrementModalCount() }}
               />
            )}
            {editListOpen && (
               <EditListModal
                  visible={editListOpen}
                  onClose={() => { setEditListOpen(false); decrementModalCount() }}
                  list={listData}
               />
            )}   
         </View>
         {modalCount > 0 && <View style={gStyles.modalBack}></View>}
      </ScrollView>
   )
}

export default ViewListScreen

const styles = StyleSheet.create({

   ContainerListItems: {
      gap: 10,
      paddingBottom: 100
   }
})