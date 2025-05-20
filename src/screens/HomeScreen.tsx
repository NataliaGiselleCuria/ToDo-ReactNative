import React from "react";
import { Pressable, StatusBar, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { globalStyles } from "../styles/globalStyles";
import StyledText from "../components/styledComponets/StyledText";
import StyledContainer from "../components/styledComponets/StyledContainer";
import { useListContext } from "../context/lists/ListContext";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import { List } from "../types/types";

const HomeScreen = () => {
  const { lists } = useListContext();
  const { theme } = useTheme();
  const globalStyle = globalStyles(theme);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = (list: List) =>{
    navigation.navigate('ViewList', { list: list });
  }

  return (
    <StyledContainer>
      <StatusBar barStyle={theme.id === "default" ? "dark-content" : "light-content"} />
      <StyledText weight="medium" size="lg">Bienvenido a la App🎉</StyledText>

      <View>
        {lists.map((list) => (
          <TouchableOpacity key={list.id} onPress = {() => handlePress(list)}>
            <StyledText>{list.id}</StyledText>
            <StyledText>{list.name}</StyledText>
            <StyledText>{list.description}</StyledText>
          </TouchableOpacity>
        ))}
      </View>
    

    </StyledContainer>
  );
};

export default HomeScreen;