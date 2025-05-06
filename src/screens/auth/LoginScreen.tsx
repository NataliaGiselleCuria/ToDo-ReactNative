import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import StyledContainer from "../../components/styledComponets/StyledContainer";
import StyledInput from "../../components/styledComponets/StyledInput";
import StyledButton from "../../components/styledComponets/StyledButton";
import { useTheme } from "../../context/ThemeContext";
import { globalStyles } from "../../styles/globalStyles";

export type LoginScreenProps = {
  navigation: any;
};

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { theme } = useTheme();
  const gStyles = globalStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Simulamos un login exitoso y navegamos a Home
    //Reemplazar por autenticación con backend
    navigation.replace("App");
  };

  return (
    <StyledContainer centered style={{ borderWidth: 1 }}>
      <Image source={require("../../assets/logo.webp")} style={styles.logo} />
      <View style={gStyles.itemForm}>
        <StyledInput
          centered
          width={'80%'}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <StyledInput
          centered
          width={'80%'}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <StyledButton title="Iniciar sesión" onPress={handleLogin} />
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
  },

});

export default LoginScreen;