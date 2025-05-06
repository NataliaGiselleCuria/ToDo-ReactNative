import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import StyledText from "./styledComponets/StyledText";
import { globalStyles } from '../styles/globalStyles';
import { useTheme } from '../context/ThemeContext';
import { CategoriesList } from "../types/types";

type OptionBlockProps<T> = {
   options: T[];
   selected: T | null | undefined;
   onSelect: (item: T) => void;
   colorSet?: 'categoryColors' | 'permissionsColors';
};

function OptionBlock<T extends string>({ options, selected, onSelect, colorSet }: OptionBlockProps<T>) {
   const { theme } = useTheme();
   const gStyles = globalStyles(theme);
   const colorMap = colorSet ? theme.colors[colorSet] : theme.colors.buttonColor;

   return (
      <View style={[gStyles.rowWrap]}>
      {options.map((option) => {
        const isSelected = selected === option;
        const color = colorMap[option as keyof typeof colorMap] || theme.colors.buttonColor;

        return (
          <TouchableOpacity
            key={option}
            onPress={() => onSelect(option)}
            style={[
              styles.categoryItem,
              gStyles.shadow,
              {
                borderColor: isSelected ? color : theme.colors.line,
                backgroundColor: isSelected ? color : theme.colors.background,
              },
            ]}
          >
            <StyledText
              size="xsm"
              style={{
                color: isSelected ? theme.colors.cardText : theme.colors.text,
              }}
            >
              {option}
            </StyledText>
          </TouchableOpacity>
        );
      })}
    </View>
   );
}

export default OptionBlock;

const styles = StyleSheet.create({
   categoryItem: {
      minWidth: 80,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
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