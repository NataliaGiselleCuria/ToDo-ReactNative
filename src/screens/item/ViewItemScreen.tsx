import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigationTypes';
import { useItemContext } from '../../context/items/ItemContext';
import { useListContext } from '../../context/lists/ListContext';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import StyledContainer from '../../components/styledComponets/StyledContainer';
import StyledText from '../../components/styledComponets/StyledText';
import StyledIcon from '../../components/styledComponets/StyledIcon';
import ItemModal from '../../components/Item/viewItem/ItemModal';
import AddNoteModal from '../../components/Item/viewItem/AddNoteModal';
import StyledContainerView from '../../components/styledComponets/StyledContainerView';
import usePreventGoBack from '../../hooks/usePreventGoBack';

type ViewItemRouteProp = RouteProp<RootStackParamList, 'ViewItem'>;

type Props = {
    route: ViewItemRouteProp;
};

const ViewItemScreen: React.FC<Props> = ({ route }) => {
    const { theme, decrementModalCount, incrementModalCount } = useTheme();
    const gStyles = globalStyles(theme);
    const [openRecords, setOpenRecords] = useState(false);
    const [openNotes, setOpenNotes] = useState(false);
    const [addNote, setAddNote] = useState(false);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    //Item actualizado desde el contexto
    const { getListById, lists } = useListContext();
    const { getItemById } = useItemContext();
    const { item } = route.params;

    usePreventGoBack();

    const listData = useMemo(() => {
        return getListById(item.idList);
    }, [lists, item.idList]);

    const itemData = useMemo(() => {
        return getItemById(item.idList, item.id);
    }, [listData?.items, item.idList, item.id]);

    if (!itemData) {
        return (
            <StyledContainer>
                <StyledText>No se encontró el item.</StyledText>
            </StyledContainer>
        );
    }

    const list = getListById(itemData.idList)

    const handleEdit = () => {
        listData && itemData && navigation.navigate('EditItem', { list: listData, item: itemData })
    }

    return (
        <StyledContainerView
            data={itemData}
            onPressHeader={handleEdit}
            onPressButtonAdd={() => { setAddNote(true); incrementModalCount() }}
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
                    onPress={() => itemData.note && itemData.note.length > 0 && setOpenNotes(true)}
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
            {/* {itemData.record && (
                <ItemModal
                    visible={openRecords}
                    data={itemData}}
                    show={'history'}
                    onClose={() => { setOpenRecords(false); decrementModalCount() }} />
            )} */}
            {itemData.note && (
                <ItemModal
                    visible={openNotes}
                    data={itemData}
                    show='note'
                    onClose={() => { setOpenNotes(false); decrementModalCount() }} />
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