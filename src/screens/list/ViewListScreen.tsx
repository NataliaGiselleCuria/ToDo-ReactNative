import React, { useMemo } from 'react'
import type { RootStackParamList } from '../../types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, View, } from 'react-native'
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useListContext } from '../../context/lists/ListContext';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import StyledContainer from '../../components/styledComponets/StyledContainer';
import StyledText from '../../components/styledComponets/StyledText';
import ItemPreview from '../../components/Item/ItemPreview';
import StyledContainerView from '../../components/styledComponets/StyledContainerView';
import usePreventGoBack from '../../hooks/usePreventGoBack';

type ViewListRouteProp = RouteProp<RootStackParamList, 'ViewList'>;

type Props = {
   route: ViewListRouteProp;
};

const ViewListScreen: React.FC<Props> = ({ route }) => {
   const { theme } = useTheme();
   const gStyles = globalStyles(theme);
   const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

   //Lista actualizada desde el contexto
   const { getListById, lists } = useListContext();
   const { list: routeList } = route.params;

   usePreventGoBack();

   const listData = useMemo(() => {
      return getListById(routeList.id);
   }, [lists, routeList.id]);

   if (!listData) {
      return (
         <StyledContainer>
            <StyledText>No se encontró la lista.</StyledText>
         </StyledContainer>
      );
   }

   const handleEdit = () => {
      navigation.navigate('EditList', { listId: listData.id });
   }

   return (
      <StyledContainerView
         data={listData}
         onPressHeader={handleEdit}
         onPressButtonAdd={() => navigation.navigate('CreateItem', { listId: listData.id })}
      >
         <View style={styles.ContainerListItems}>
            {listData.items.map((item) => (
               <ItemPreview key={item.id} item={item} />
            ))}
         </View>
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