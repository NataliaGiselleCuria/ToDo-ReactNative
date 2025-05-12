import { StyleSheet, TouchableOpacity, View, } from 'react-native'
import React, { useMemo, useState } from 'react'
import { RouteProp } from '@react-navigation/native';
import { useItemContext } from '../../context/items/ItemContext';
import { useListContext } from '../../context/lists/ListContext';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import { categoryItemName, Item } from '../../types/types';
import StyledContainer from '../../components/styledComponets/StyledContainer';
import StyledText from '../../components/styledComponets/StyledText';
import StyledIcon from '../../components/styledComponets/StyledIcon';
import ItemModal from '../../components/Item/viewItem/ItemModal';
import AddNoteModal from '../../components/Item/viewItem/AddNoteModal';
import StyledContainerView from '../../components/styledComponets/StyledContainerView';
import CreateItemModal from '../../components/list/viewList/CreateItemModal';
import ItemForm from '../../components/Item/ItemForm';
import EditItemModal from '../../components/Item/EditItemModal';

type RootStackParamList = {
    ViewItem: { item: Item };
};

type ViewItemRouteProp = RouteProp<RootStackParamList, 'ViewItem'>;

type Props = {
    route: ViewItemRouteProp;
};

const ViewItemScreen: React.FC<Props> = ({ route }) => {
    const [openRecords, setOpenRecords] = useState(false);
    const [openNotes, setOpenNotes] = useState(false);
    const [editItemOpen, setEditItemOpen] = useState(false);
    const [addNote, setAddNote] = useState(false);

    //Item actualizado desde el contexto
    const { getListById, lists } = useListContext();
    const { getItemById } = useItemContext();
    const { item: routeItem } = route.params;




    const listData = useMemo(() => {
        return getListById(routeItem.idList);
    }, [lists, routeItem.idList]);

    const itemData = useMemo(() => {
        return getItemById(routeItem.idList, routeItem.id);
    }, [listData?.items, routeItem.idList, routeItem.id]);

    const { theme, decrementModalCount } = useTheme();
    const gStyles = globalStyles(theme);

    const itemName = listData ? categoryItemName[listData.category] : 'ítem';

    if (!itemData) {
        return (
            <StyledContainer>
                <StyledText>No se encontró el item.</StyledText>
            </StyledContainer>
        );
    }

    const list = getListById(itemData.idList)

    return (
        <StyledContainerView
            data={itemData}
            onPressHeader={() => setEditItemOpen(true)}
            onPressButtonAdd={() => setAddNote(true)}
            list={list}
        >
            <View style={[gStyles.rowBetween, { paddingHorizontal: 10 }]}>

                <TouchableOpacity
                    onPress={() => itemData.record.length > 0 && setOpenRecords(true)}
                    style={[styles.button, gStyles.shadow, { backgroundColor: theme.colors.buttonColor }]}
                >
                    <StyledIcon src={require('../../assets/icons-general/record.png')} width='xl' height='xl' type='button' />
                    <StyledText size='sm'>Historial</StyledText>
                    <View style={styles.recordCount}>
                        <StyledText size='sm'>{itemData.record.length}</StyledText>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => itemData.record.length > 0 && setOpenNotes(true)}
                    style={[styles.button, gStyles.shadow, { backgroundColor: theme.colors.buttonColor }]}
                >
                    <StyledIcon src={require('../../assets/icons-general/record.png')} width='xl' height='xl' type='button' />
                    <StyledText size='sm'>Notas</StyledText>
                    <View style={styles.recordCount}>
                        <StyledText size='sm'>{itemData.note?.length}</StyledText>
                    </View>
                </TouchableOpacity>
            </View>
            {addNote && (
                <AddNoteModal
                    item={itemData}
                    visible={addNote}
                    onClose={() => { setAddNote(false); decrementModalCount() }} />
            )}
            {itemData.record && (
                <ItemModal
                    visible={openRecords}
                    show={itemData.record}
                    onClose={() => { setOpenRecords(false); decrementModalCount() }} />
            )}
            {itemData.note && (
                <ItemModal
                    visible={openNotes}
                    show={itemData.note}
                    onClose={() => { setOpenNotes(false); decrementModalCount() }} />
            )}
            {(editItemOpen && listData) && (
                <EditItemModal
                    list={listData}
                    itemToEdit={itemData}
                    visible={editItemOpen}
                    onClose={() => { setEditItemOpen(false); decrementModalCount() }}                  
                />  
            )}

        </StyledContainerView>
    )
}

export default ViewItemScreen

const styles = StyleSheet.create({

    recordCount: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        backgroundColor: 'grey',
        marginRight: 3
    },

    button: {
        width: '48%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    }
})