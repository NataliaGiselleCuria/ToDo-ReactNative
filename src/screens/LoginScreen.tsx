import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import StyledText from "../components/styledComponets/StyledText";
import StyledContainer from "../components/styledComponets/StyledContainer";
import StyledInput from "../components/styledComponets/StyledInput";
import StyledButton from "../components/styledComponets/StyledButton";

export type LoginScreenProps = {
  navigation: any;
};

const LoginScreen = ({ navigation }: LoginScreenProps) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Simulamos un login exitoso y navegamos a Home
    //Reemplazar por autenticación con backend
    navigation.replace("App");
  };

  return (
    <StyledContainer centered>
      <Image source={require("../assets/logo.webp")} style={styles.logo} />

      <StyledText>Bienvenidos</StyledText>

      <StyledInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <StyledInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <StyledButton title="Iniciar sesión" onPress={handleLogin}/>
      
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },

});

export default LoginScreen;