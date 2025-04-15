import { View } from 'react-native'
import React, { useEffect, useState } from 'react'

import StyledInput from '../styledComponets/StyledInput';
import StyledText from '../styledComponets/StyledText';

import { CategoriesList } from '../../types/types';
import OptionsListLayout from './OptionsListLayout';

type StepOneProps = {
  onChange: (data: { name: string; description: string; category: CategoriesList }) => void;
  defaultValues: {
    name: string;
    description: string;
    category: CategoriesList;
  };
};

const FormStepOne: React.FC<StepOneProps> = ({ onChange, defaultValues }) => {
  const [name, setName] = useState(defaultValues.name || "Nueva Lista");
  const [category, setCategory] = useState<CategoriesList>(defaultValues.category || CategoriesList.others);
  const [description, setDescription] = useState(defaultValues.description || "");

  useEffect(() => {
    onChange({ name, description, category });
  }, [name, description, category]);

  return (
    <View style={{gap:15}}>
      <View>
        <StyledText>Nombre de la lista</StyledText>
        <StyledInput value={name} onChangeText={setName} placeholder="Mi lista" />
      </View>
      <View>
        <StyledText>Categoría</StyledText>
        <View>
          <OptionsListLayout selectedCategory={category} onSelectCategory={setCategory} />
        </View>
      </View>
      <View>
        <StyledText>Descripción</StyledText>
        <StyledInput value={description} onChangeText={setDescription} placeholder="Opcional" />
      </View>
    </View>
  )
}

export default FormStepOne;


