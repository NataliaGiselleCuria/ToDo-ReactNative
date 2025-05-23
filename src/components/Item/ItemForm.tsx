import React, { useCallback, useEffect } from "react";
import { StyleSheet, View, } from 'react-native'
import { globalStyles } from "../../styles/globalStyles";
import { useCreateItem } from "../../context/items/CreateItemContext";
import { useTheme } from "../../context/ThemeContext";
import { categoryItemName, Item, List } from "../../types/types";
import { useDatesSchedule } from "../../hooks/calendar/useDateScheduler";
import { useDateRangeValidation } from "../../hooks/calendar/useDateRangeValidation";
import StyledText from "../styledComponets/StyledText";
import ParticipantsList from "../participants/ParticipantsList";
import OptionsListLayout from "../OptionsListLayout";
import DateSelector from "../DateSelector";
import StyledInput from "../styledComponets/StyledInput";

type ItemFormProps = {
    type: 'create' | 'edit';
    list: List;
    item: Item;
};

const ItemForm: React.FC<ItemFormProps> = ({ type, list, item }) => {
    const { theme } = useTheme();
    const gStyles = globalStyles(theme);
    const { updateItemData, itemData } = useCreateItem();

    const { validateStartDate, validateEndDate } = useDateRangeValidation({
        minDate: list.startDate || undefined,
        maxDate: list.endDate || undefined,
        isItem: true
    });

    const {
        startDate, startTime, endDate, endTime,
        scheduleStartDate, scheduleStartTime, scheduleEndDate, scheduleEndTime, setScheduleEndTime,
        handleDateChange
    } = useDatesSchedule(item, validateStartDate, validateEndDate)

    const handleStartDateChange = useCallback(
        (date: Date | undefined) => handleDateChange('startDate', date, validateStartDate),
        [handleDateChange, validateStartDate]
    );

    const handleStartTimeChange = useCallback(
        (date: Date | undefined) => handleDateChange('startTime', date, validateEndDate),
        [handleDateChange, validateEndDate]
    );

    const handleEndDateChange = useCallback(
        (date: Date | undefined) => handleDateChange('endDate', date, validateEndDate),
        [handleDateChange, validateEndDate]
    );

    const handleEndTimeChange = useCallback(
        (date: Date | undefined) => handleDateChange('endTime', date, validateEndDate),
        [handleDateChange, validateEndDate]
    );

    const handleChange = (field: keyof typeof itemData, value: any) => {
        updateItemData({ [field]: value });
        if (field === 'scheduleEndDate' && !value) {
            setScheduleEndTime(false);
        }
    };

    const handleUpdate = (data: Partial<typeof itemData>) => {
        updateItemData(data);
    };

    useEffect(() => {
        handleUpdate({ endDate, startDate, scheduleStartDate, scheduleEndDate, scheduleStartTime, scheduleEndTime, startTime, endTime })
    }, [endDate, startDate, scheduleStartDate, scheduleEndDate, scheduleStartTime, scheduleEndTime, startTime, endTime]);

    return (

        <View style={[gStyles.gapContainer, styles.container]}>
            <StyledText size="xlg">
                {type === 'create' ? 'AGREGAR' : 'EDITAR'} {categoryItemName[list.category].toLocaleUpperCase()}
            </StyledText>
            <View style={gStyles.itemForm}>
                <StyledText>Nombre</StyledText>
                <StyledInput value={itemData.name || ""} onChangeText={text => handleChange("name", text)} placeholder={`Nuevo ${categoryItemName[list.category]}`} />
            </View>
            <View style={gStyles.itemForm}>
                <StyledText>Subcategoría</StyledText>
                <View>
                    {list.category === 'Otras' ? (
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
            </View>
            <View style={gStyles.itemForm}>
                <StyledText>Descripción</StyledText>
                <StyledInput value={itemData.description || ""} onChangeText={text => handleChange("description", text)} multiline />
            </View>
            <View style={gStyles.itemForm}>
                <View style={gStyles.rowBetween}>
                    <DateSelector
                        mode="date"
                        type='startDate'
                        label="Fecha inicio"
                        value={startDate}
                        onChange={(handleStartDateChange)}
                        selectedByDefault={scheduleStartDate}
                        defaultValueIfDisabled={undefined}
                    />
                    <DateSelector
                        mode="time"
                        type='startTime'
                        label="Hora"
                        value={startTime}
                        onChange={handleStartTimeChange}
                        selectedByDefault={scheduleStartTime}
                        defaultValueIfDisabled={undefined}
                    />
                </View>
            </View>
            <View style={gStyles.itemForm}>
                <View style={gStyles.rowBetween}>
                    <DateSelector
                        mode="date"
                        type='endDate'
                        label="Fecha límite"
                        value={endDate}
                        onChange={handleEndDateChange}
                        selectedByDefault={scheduleEndDate}
                        defaultValueIfDisabled={undefined}
                    />
                    <DateSelector
                        disabled={!scheduleEndDate}
                        mode="time"
                        type='endTime'
                        label="Hora"
                        value={endTime}
                        onChange={handleEndTimeChange}
                        selectedByDefault={scheduleEndTime}
                        defaultValueIfDisabled={undefined}
                    />
                </View>
            </View>
            <View style={gStyles.itemForm}>
                <StyledText>Prioridad</StyledText>
                <OptionsListLayout
                    selectedPriority={itemData.priority}
                    onSelectPriority={(priority) => handleChange("priority", priority)}
                />

            </View>
            <View>
                <StyledText style={{ marginBottom: 20 }}>Usuarios asignados:</StyledText>
                <ParticipantsList
                    simplified={true}
                    showUserInfo={false}
                    size='sm'
                    participants={itemData.assignment}
                    users={list.participants}
                    onSelectParticipants={(selected) => {
                        handleChange("assignment", selected);
                    }}
                />
            </View>
        </View>

    );
};

export default ItemForm;

const styles = StyleSheet.create({
    container: {
        paddingBottom: 60,
        paddingTop: 20,
    },

})