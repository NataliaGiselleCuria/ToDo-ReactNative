import React, { use, useMemo, useState } from 'react'
import { StyleSheet, View, } from 'react-native'
import { RouteProp, useNavigation } from '@react-navigation/native';
import { categoryItemName, List } from '../../types/types';
import { useListContext } from '../../context/lists/ListContext';
import { useTheme } from '../../context/ThemeContext';
import StyledContainer from '../../components/styledComponets/StyledContainer';
import StyledText from '../../components/styledComponets/StyledText';
import ItemPreview from '../../components/Item/ItemPreview';
import CreateItemModal from '../../components/list/viewList/CreateItemModal';
import EditListModal from './EditListScreen';
import StyledContainerView from '../../components/styledComponets/StyledContainerView';
import { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../types/navigationTypes';

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

   const { decrementModalCount } = useTheme();
   const [creatItemOpen, setCreatItemOpen] = useState(false);


const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();


   if (!listData) {
      return (
         <StyledContainer>
            <StyledText>No se encontró la lista.</StyledText>
         </StyledContainer>
      );
   }

   const item = categoryItemName[listData.category];

   const handleEdit = () => {
      navigation.navigate('EditList', { list: listData });
   }

   return (
      <StyledContainerView
         data={listData}
         onPressHeader={handleEdit}
         onPressButtonAdd={() => setCreatItemOpen(true)}
      >
         <View style={styles.ContainerListItems}>
            {listData.items.map((item) => (
               <ItemPreview key={item.id} item={item} />
            ))}
         </View>
         {creatItemOpen && (
            <CreateItemModal
               type='create'
               list={listData}
               item={item}
               visible={creatItemOpen}
               onClose={() => { setCreatItemOpen(false); decrementModalCount() }}
            />
         )}
      </StyledContainerView>
   )
}

export default ViewListScreen

const styles = StyleSheet.create({

   ContainerListItems: {
      gap: 10,
      paddingBottom: 100
   }
})