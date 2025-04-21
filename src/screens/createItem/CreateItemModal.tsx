import { ScrollView, StyleSheet, View } from 'react-native'
import Modal from "react-native-modal";
import React, { useEffect, useState } from 'react'
import { Item, ItemState, List, Priority } from '../../types/types';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import { useListContext } from '../../context/lists/ListContext';
import { useDateRangeValidation } from '../../hooks/useDateRangeValidation';
import { useCreateItem } from '../../context/items/CreateItemContext';
import { loggedUser } from '../../services/mockUsers';
import StyledButton from '../../components/styledComponets/StyledButton';
import StyledText from '../../components/styledComponets/StyledText';
import StyledInput from '../../components/styledComponets/StyledInput';
import DateSelector from '../../components/DateSelector';
import ParticipantsList from '../../components/participants/ParticipantsList';
import OptionsListLayout from '../../components/OptionsListLayout';

type Props = {
    list: List;
    item: string;
    visible: boolean;
    onAddItem: (newItem: Item) => void;
    onClose: () => void;
};

const CreateItemModal = ({ list, item, visible, onAddItem, onClose }: Props) => {
    const { theme } = useTheme();
    const gStyles = globalStyles(theme);
    const { updateItemData, itemData, resetItemData } = useCreateItem();
    const { updateList } = useListContext();
    const [scheduleStartDate, setScheduleStartDate] = useState<boolean>(itemData.scheduleStartDate || false);
    const [scheduleEndDate, setScheduleEndDate] = useState<boolean>(itemData.scheduleEndDate || false);
    const [startDate, setStartDate] = useState<Date | undefined>(itemData.startDate || undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(itemData.endDate || undefined);

    const { validateStartDate, validateEndDate } = useDateRangeValidation({
        minDate: list.startDate || undefined,
        maxDate: list.endDate || undefined,
    });

    useEffect(() => {
        if (!visible) {
            resetItemData();
        }
    }, [visible]);

    const handleChange = (field: keyof typeof itemData, value: any) => {
        updateItemData({ [field]: value });
    };

    const handleStartDateChange = (date: Date | undefined) => {
        const { startDate: validatedStart, endDate: validatedEnd } = validateStartDate(date, endDate);
        setStartDate(validatedStart);
        setEndDate(validatedEnd);
        setScheduleStartDate(!!validatedStart);
    };

    const handleEndDateChange = (date: Date | undefined) => {
        const { startDate: validatedStart, endDate: validatedEnd } = validateEndDate(startDate, date);
        setStartDate(validatedStart);
        setEndDate(validatedEnd);
        setScheduleEndDate(!!validatedEnd);
    };

    const AddNewItem = () => {
        const newItem = {
            ...itemData,
            idList: list.id,
            id: Date.now(),
            name: itemData.name || "Nuevo item",
            subcategory: itemData.subcategory || "",
            description: itemData.description || "",
            duration: itemData.duration || "",
            createdBy: loggedUser, // user logueado
            scheduleStartDate: scheduleStartDate || false,
            scheduleEndDate: scheduleEndDate || false,
            startDate: startDate ?? new Date(),
            endDate: endDate ?? undefined,
            assignment: itemData.assignment || undefined,
            state: "no completado" as ItemState,
            note: itemData.note ? itemData.note : [],
            image: itemData.image || "",

        };

        const updatedItems = [...list.items, newItem];

        updateList(list.id, { items: updatedItems as Item[] });
        onAddItem(newItem);
        onClose();
    };

    return (
        <Modal isVisible={visible} onBackdropPress={onClose} customBackdrop={<View style={{ flex: 1 }} />}>
            <View style={[gStyles.modalOverlay, { backgroundColor: theme.colors.backgroundTop }]}>
                <ScrollView style={gStyles.modalContent}>
                    <StyledText size="lg">Crear {item}</StyledText>

                    <StyledText>Nombre</StyledText>
                    <StyledInput value={itemData.name || ""} onChangeText={text => handleChange("name", text)} placeholder={`Nuevo ${item}`} />

                    <StyledText>Subcategoría</StyledText>
                    <View>
                        {list.category === 'otras' ? (
                            <StyledInput
                                value={itemData.subcategory || ""}
                                onChangeText={(text) => handleChange("subcategory", text)}
                                placeholder="Escribí una subcategoría (opcional)"
                            />
                        ) : (
                            <OptionsListLayout
                                selectedCategory={list.category}
                                selectedSubcategory={itemData.subcategory}
                                onSelectSubcategory={(subcategory) => handleChange("subcategory", subcategory)}
                            />
                        )}
                    </View>

                    <StyledText>Descripción</StyledText>
                    <StyledInput value={itemData.description || ""} onChangeText={text => handleChange("description", text)} multiline />

                    <DateSelector
                        label="Fecha de inicio"
                        value={itemData.startDate}
                        onChange={handleStartDateChange}
                        selectedByDefault={scheduleStartDate}
                        defaultValueIfDisabled={new Date()}
                    />

                    <DateSelector
                        label="Fecha límite"
                        value={endDate}
                        onChange={handleEndDateChange}
                        selectedByDefault={scheduleEndDate}
                        defaultValueIfDisabled={undefined}
                    />

                    <StyledText>Prioridad</StyledText>
                    <View style={styles.priorityRow}>
                        {["alta", "media", "baja"].map((p) => (
                            <StyledButton
                                key={p}
                                title={p}
                                onPress={() => handleChange("priority", p as Priority)}
                                style={{
                                    backgroundColor: itemData.priority === p ? theme.colors.buttonColor : theme.colors.text,
                                    marginHorizontal: 4,
                                }}
                            />
                        ))}
                    </View>

                    <View>
                    <StyledText>Asignar:</StyledText>
                        <ParticipantsList 
                            participants={itemData.assignment} 
                            users={list.participants}
                            onSelectParticipants={(selected) => {                            
                                handleChange("assignment", selected);
                            }}
                        />
                    </View>

                    <StyledButton title="Agregar" onPress={AddNewItem} />
                    <StyledButton title="Cerrar" onPress={onClose} />
                </ScrollView>
            </View>
        </Modal>
    );
}

export default CreateItemModal

const styles = StyleSheet.create({
    priorityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
})

// name: string;
// subcategory ?: string;
// description ?: string;
// scheduleStartDate: boolean;
// startDate: Date;
// scheduleEndDate: boolean;
// endDate ?: Date;
// duration ?: string;

// assignment ?: User;

// note ?: string[];
// priority ?: Priority;
// image ?: string;