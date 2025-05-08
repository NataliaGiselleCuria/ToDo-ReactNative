import React from 'react'
import { ViewStyle, View } from 'react-native';
import { CategoriesList, PermissionsOptions, Priority, SubcategoriesByCategory } from '../types/types'
import OptionBlock from './OptionBlock';

type Props = {
  selectedCategory?: CategoriesList | null;
  onSelectCategory?: (category: CategoriesList) => void;

  selectedSubcategory?: string | null;
  onSelectSubcategory?: (subcategory: string) => void;

  selectedPermissions?: PermissionsOptions | null;
  onSelectPermissions?: (permissions: PermissionsOptions) => void;

  selectedPriority?: Priority | null;
  onSelectPriority?: (priority: Priority) => void;

   styles?: ViewStyle;
};

const OptionsListLayout = ({
  selectedCategory,
  onSelectCategory,
  selectedSubcategory,
  onSelectSubcategory,
  selectedPermissions,
  onSelectPermissions,
  selectedPriority,
  onSelectPriority,
  styles
}: Props) => {

  const categories = Object.values(CategoriesList);
  const subcategories = selectedCategory ? SubcategoriesByCategory[selectedCategory] : [];
  const permissionsOptions = Object.values(PermissionsOptions);
  const priorities = Object.values(Priority);

  return (
    <View style={{...styles}}>
      {selectedCategory && onSelectCategory && (
        <OptionBlock         
          options={categories}
          selected={selectedCategory}
          onSelect={onSelectCategory}
          colorSet='categoryColors'
        />
      )}
      {onSelectSubcategory && selectedCategory && subcategories.length > 0 && (
        <OptionBlock
          options={subcategories}
          selected={selectedSubcategory}
          onSelect={onSelectSubcategory}
          
        />
      )}
      {selectedPermissions && onSelectPermissions && (
        <OptionBlock
          options={permissionsOptions}
          selected={selectedPermissions}
          onSelect={onSelectPermissions}
          colorSet='permissionsColors'
        />
      )}
      {onSelectPriority && (
        <OptionBlock
          options={priorities}
          selected={selectedPriority}
          onSelect={onSelectPriority}
          colorSet='priorityColors'
        />
      )}
    </View>
  );
}

export default OptionsListLayout

