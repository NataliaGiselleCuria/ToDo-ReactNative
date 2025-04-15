import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";

export const useCancelToHome = () => {
  const navigation = useNavigation();

  const cancelToHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "App" }],
      })
    );
  };

  return cancelToHome;
};