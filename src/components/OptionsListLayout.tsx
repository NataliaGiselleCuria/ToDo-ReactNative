import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CategoriesList, PermissionsOptions, SubcategoriesByCategory } from '../types/types'

type Props = {
  selectedCategory?: CategoriesList | null;
  onSelectCategory?: (category: CategoriesList) => void;

  selectedSubcategory?: string | null;
  onSelectSubcategory?: (subcategory: string) => void;

  selectedPermissions?: PermissionsOptions | null;
  onSelectPermissions?: (permissions: PermissionsOptions) => void;
 
};

const OptionsListLayout = ({
  selectedCategory,
  onSelectCategory,
  selectedSubcategory,
  onSelectSubcategory,
  selectedPermissions,
  onSelectPermissions,
}: Props) => {
  const categories = Object.values(CategoriesList);
  const subcategories = selectedCategory ? SubcategoriesByCategory[selectedCategory] : [];
  const permissionsOptions = Object.values(PermissionsOptions);

  return (
    <>
      { (selectedCategory && onSelectCategory) &&
        <View style={styles.container}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => onSelectCategory(category as CategoriesList)}
              style={[
                styles.categoryItem,
                selectedCategory === category && styles.selectedItem
              ]}>
              <Text style={selectedCategory === category ? styles.selectedText : styles.text}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      }
      {(onSelectSubcategory && selectedCategory && subcategories.length > 0) && (
        <View style={styles.container}>
          {subcategories.map((subcategory) => (
            <TouchableOpacity
              key={subcategory}
              onPress={() => onSelectSubcategory(subcategory)}
              style={[
                styles.categoryItem,
                selectedSubcategory === subcategory && styles.selectedItem
              ]}>
              <Text style={selectedSubcategory === subcategory ? styles.selectedText : styles.text}>{subcategory}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      { (selectedPermissions && onSelectPermissions) &&
        <View style={styles.container}>
          {permissionsOptions.map((permissions) => (
            <TouchableOpacity
              key={permissions}
              onPress={() => onSelectPermissions(permissions as PermissionsOptions)}
              style={[
                styles.categoryItem,
                selectedPermissions === permissions && styles.selectedItem
              ]}>
              <Text style={selectedPermissions === permissions ? styles.selectedText : styles.text}>{permissions}</Text>
            </TouchableOpacity>
          ))}
        </View>
      }
    </>
  )
}

export default OptionsListLayout

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  categoryItem: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  selectedItem: {
    backgroundColor: '#c4a5ff',
  },
  text: {
    color: '#333',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});