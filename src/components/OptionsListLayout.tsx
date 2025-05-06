import React from 'react'
import { ViewStyle, View } from 'react-native';
import { CategoriesList, PermissionsOptions, SubcategoriesByCategory } from '../types/types'
import OptionBlock from './OptionBlock';


type Props = {
  selectedCategory?: CategoriesList | null;
  onSelectCategory?: (category: CategoriesList) => void;

  selectedSubcategory?: string | null;
  onSelectSubcategory?: (subcategory: string) => void;

  selectedPermissions?: PermissionsOptions | null;
  onSelectPermissions?: (permissions: PermissionsOptions) => void;

   styles?: ViewStyle;
};

const OptionsListLayout = ({
  selectedCategory,
  onSelectCategory,
  selectedSubcategory,
  onSelectSubcategory,
  selectedPermissions,
  onSelectPermissions,
  styles
}: Props) => {

  const categories = Object.values(CategoriesList);
  const subcategories = selectedCategory ? SubcategoriesByCategory[selectedCategory] : [];
  const permissionsOptions = Object.values(PermissionsOptions);

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
    </View>
  );
}

export default OptionsListLayout

