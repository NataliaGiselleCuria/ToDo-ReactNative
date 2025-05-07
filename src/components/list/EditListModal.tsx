import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import StyledText from '../styledComponets/StyledText';
import FormStepOne from './FormStepOne';
import FormStepTwo from './FormStepTwo';
import { List } from '../../types/types';
import { useListContext } from '../../context/lists/ListContext';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import { StyledModal } from '../styledComponets/StyledModal';

type EditListModalProps = {
    visible: boolean;
    onClose: () => void;
    list: List; // el tipo que usás para las listas
};

const EditListModal: React.FC<EditListModalProps> = ({ visible, onClose, list }) => {
    const { theme } = useTheme();
    const gStyles = globalStyles(theme);

    const { updateList } = useListContext();
    const [formData, setFormData] = useState(list);

    const handleUpdate = (data: Partial<List>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const handleSave = () => {
        updateList(formData.id, formData);
        onClose();
    };

    return (
        <StyledModal visible={visible} onSave={handleSave} onClose={onClose}>
            <View style={[gStyles.gapContainer]}>
            <StyledText size='xlg'>EDITAR LISTA</StyledText>

            <FormStepOne
                defaultValues={formData}
                onChange={data => handleUpdate(data)}
            />

            <FormStepTwo
                defaultValues={formData}
                onChange={data => handleUpdate(data)}
            />
            </View>
        </StyledModal>
    );
};

export default EditListModal

const styles = StyleSheet.create({})