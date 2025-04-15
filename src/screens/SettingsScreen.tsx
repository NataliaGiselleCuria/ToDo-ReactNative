import React from "react";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { globalStyles } from "../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { themes } from "../styles/theme";
import { ThemeId } from "../types/types";
import StyledText from "../components/styledComponets/StyledText";
import StyledContainer from "../components/styledComponets/StyledContainer";
import StyledInput from "../components/styledComponets/StyledInput";
import StyledButton from "../components/styledComponets/StyledButton";

const SettingsScreen = () => {
  const { theme, setThemeById } = useTheme();
  const globalStyle = globalStyles(theme);

  return (
    <StyledContainer>
      <StatusBar barStyle={theme.id === "default" ? "dark-content" : "light-content"} />
      <StyledText>Configuración</StyledText>

      <View>
        <StyledText style={{ marginTop: 20 }}>Temas</StyledText>
        <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
          {Object.keys(themes).map((key) => {
            const themeKey = key as ThemeId;
            return (
              <TouchableOpacity key={key} onPress={() => setThemeById(themeKey)} style={{ marginBottom: 10 }}>
                <StyledText>
                  {themes[themeKey].name}
                </StyledText>
              </TouchableOpacity>
            );
          })}
        </View>
       <StyledButton title='prueba'/>
      </View>
    </StyledContainer>
  );
};

export default SettingsScreen;