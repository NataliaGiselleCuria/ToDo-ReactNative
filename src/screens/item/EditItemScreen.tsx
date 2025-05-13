import { useEffect } from "react";
import { Alert, TouchableOpacity, View, StyleSheet} from "react-native";
import { useCreateItem } from "../../context/items/CreateItemContext";
import { useItemContext } from "../../context/items/ItemContext";
import { categoryItemName } from "../../types/types";
import { RootStackParamList } from "../../types/navigationTypes";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeContext";
import { globalStyles } from "../../styles/globalStyles";
import StyledContainer from "../../components/styledComponets/StyledContainer";
import ConfirmCancelButtons from "../../components/ConfirmCancelButtons";
import ItemForm from "../../components/Item/ItemForm";
import StyledText from "../../components/styledComponets/StyledText";

type EditItemRouteProp = RouteProp<RootStackParamList, 'EditItem'>;

type Props = {
   route: EditItemRouteProp;
};

const EditItemScreen: React.FC<Props> = ({ route }) => {
   const { theme, decrementModalCount, modalCount } = useTheme();
   const gStyles = globalStyles(theme);

   const { item, list } = route.params;
   const { updateItem, deleteItem } = useItemContext();
   const { updateItemData, resetItemData, itemData } = useCreateItem();
   const navigation = useNavigation();

   useEffect(() => {
      updateItemData(item);
   }, [list, item]);

   const handleSave = () => {
      updateItem(list.id, item.id, itemData);
      handleCancel()
   };

   const handleCancel = () => {
      resetItemData();
      decrementModalCount();
      navigation.goBack();
   };

   const handleDelete = () => {
      Alert.alert(
         `¿Eliminar ${categoryItemName[list.category]}?`,
         'Esta acción no se puede deshacer.',
         [
            {
               text: 'Cancelar',
               style: 'cancel',
            },
            {
               text: 'Eliminar',
               style: 'destructive',
               onPress: () => {
                  deleteItem(list.id, item.id);
                  handleCancel();
               },
            },
         ],
         { cancelable: true }
      );
   };

   return (
      <>
         <StyledContainer scroll={true} style={{}}>
            <ItemForm type="edit" list={list} item={categoryItemName[list.category]} />
            <TouchableOpacity style={gStyles.deleteButton} onPress={handleDelete}>
               <StyledText size='sm' weight='bold' style={{ color: 'red' }}>ELIMINAR</StyledText>
            </TouchableOpacity>
         </StyledContainer>
         <ConfirmCancelButtons
            handleSave={handleSave}
            handleCancel={handleCancel}
         />
          {modalCount > 0 && <View style={gStyles.modalBack}></View>}
      </>
   );
};


export default EditItemScreen;

const styles = StyleSheet.create({
  
})