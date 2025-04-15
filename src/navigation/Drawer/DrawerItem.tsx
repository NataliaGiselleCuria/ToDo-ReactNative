import React from "react";
import { View, Pressable, Image, StyleSheet } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";
import StyledText from "../../components/styledComponets/StyledText";
import { useTheme } from "../../context/ThemeContext";
import { DrawerParamList } from "../../types/navigationTypes";

export interface DrawerItemProps {
    icon: any;
    label: string;
    navigateTo: keyof DrawerParamList;
    navigation?: any; // opcional si no lo tienen todos
}
// Componente reutilizable para cada ítem del Drawer
const DrawerItem: React.FC<DrawerItemProps> = ({ icon, label, navigateTo, navigation }) => {
  const { theme } = useTheme();

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    opacity.value = withTiming(1, { duration: 200 });
    scale.value = withTiming(1, { duration: 200 });
  };

  const handlePressOut = () => {
    opacity.value = withTiming(0, { duration: 200 });
    scale.value = withTiming(0.95, { duration: 200 });
  };

  return (
    <Pressable
      style={styles.itemContainer}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => navigation.navigate(navigateTo)}
    >
      <Animated.View
        style={[
          styles.ovalBackground,
          {
            backgroundColor: theme.colors.buttonColor + "33",
          },
          animatedStyle,
        ]}
      />
      <View style={styles.content}>
        <Image
          source={icon}
          style={{
            width: 24,
            height: 24,
            tintColor: theme.colors.text,
            marginRight: 10,
          }}
        />
        <StyledText size="md">{label}</StyledText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 60,
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 25,
    zIndex: 2, // Para que quede por delante del óvalo
  },
  ovalBackground: {
    position: "absolute",
    top: 5,
    left: 10,
    right: 10,
    bottom: 5,
    borderRadius: 999, // Hacemos el fondo ovalado
    zIndex: 1,
  },
});

export default DrawerItem;