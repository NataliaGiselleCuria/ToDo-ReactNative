import React from "react";
import { StatusBar, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { globalStyles } from "../styles/globalStyles";
import StyledText from "../components/styledComponets/StyledText";
import StyledContainer from "../components/styledComponets/StyledContainer";
import { useListContext } from "../context/Lists/ListContext";

const HomeScreen = () => {
  const { lists } = useListContext();
  const { theme } = useTheme();
  const globalStyle = globalStyles(theme);

  return (
    <StyledContainer>
      <StatusBar barStyle={theme.id === "default" ? "dark-content" : "light-content"} />
      <StyledText weight="medium" size="lg">Bienvenido a la App🎉</StyledText>

      <View>
        {lists.map((list) => (
          <View key={list.id}>
            <StyledText>{list.name}</StyledText>
            <StyledText>{list.description}</StyledText>
          </View>
        ))}
      </View>

    </StyledContainer>
  );
};

export default HomeScreen;