import { StyleSheet, View } from 'react-native'
import React from 'react'
import { ItemState } from '../../../types/types'
import { useItemContext } from '../../../context/items/ItemContext'
import { loggedUser } from '../../../services/mockUsers'; //user de prueba
import ItemProgressBar from '../ItemProgressBar'

type Props = {
   idList: number;
   id: number;
};

const ChangeState: React.FC<Props> = ({ idList, id }) => {
   const { getItemById, updateItem } = useItemContext();
   const item = getItemById(idList, id);

   const userCanEdit = !item?.assignment || item.assignment.some(u => u.id === loggedUser.id);

   const handleChangeState = (newState: ItemState) => {
      if (!userCanEdit) return;

      const newRecord = {
         id: Number(new Date()),
         type: 'Estado actualizado',
         user: loggedUser,
         date: new Date(),
         content: `Estado cambiado: ${newState}`,
      };

      updateItem(idList, id, {
         state: newState,
         record: [...(item?.record ?? []), newRecord],
      });
   };

   if (!item) return null;

   return (
      <View >
         <ItemProgressBar
            state={item.state}
            onChange={handleChangeState}
            editable={userCanEdit} />
      </View>
   )
}

export default ChangeState

const styles = StyleSheet.create({})