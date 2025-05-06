import { StyleSheet, TouchableOpacity, View, } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { categoryItemName, Item, List } from '../../types/types';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useItemContext } from '../../context/items/ItemContext';
import { useListContext } from '../../context/lists/ListContext';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import StyledContainer from '../../components/styledComponets/StyledContainer';
import StyledText from '../../components/styledComponets/StyledText';
import HeaderView from '../../components/HeaderView';
import StyledIcon from '../../components/styledComponets/StyledIcon';
import ChangeState from '../../components/viewItem/ChangeState';
import InfoItem from '../../components/viewItem/InfoItem';
import ButtonAdd from '../../components/ButtonAdd';
import ItemModal from '../../components/viewItem/ItemModal';
import AddNoteModal from '../../components/viewItem/AddNoteModal';


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

    const { theme } = useTheme();
    const gStyles = globalStyles(theme);
    const navigate = useNavigation()

    if (!itemData) {
        return (
            <StyledContainer>
                <StyledText>No se encontró el item.</StyledText>
            </StyledContainer>
        );
    }

    const list = getListById(itemData.idList)
    const itemLabel = list && categoryItemName[list.category] || 'item';

    return (
        <StyledContainer>
            <View style={[gStyles.shadow, gStyles.containerHeader, { backgroundColor: theme.colors.backgroundTop }]}>
                <HeaderView
                    onPressBack={() => navigate.goBack()}
                    onPressEdit={() => setEditItemOpen(true)}
                    name={itemData.name}
                    editedObject={itemLabel}
                    allowedUsers={list?.allowedUsers}
                />
                <InfoItem item={itemData} />
            </View>
            <View >
                <ChangeState idList={itemData.idList} id={itemData.id} />
            </View>
            <View>
                <ButtonAdd onPress={() => setAddNote(true)} elementoToAdd='Nota' />
            </View>
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
                <AddNoteModal item={itemData} visible={addNote} onClose={() => setAddNote(false)} />
            )}
            {itemData.record && (
                <ItemModal visible={openRecords} onClose={() => setOpenRecords(false)} show={itemData.record} />
            )}
            {itemData.note && (
                <ItemModal visible={openNotes} onClose={() => setOpenNotes(false)} show={itemData.note} />
            )}
            {editItemOpen && (
                <></>
            )}

        </StyledContainer>
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