import { Dimensions, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const getLayout = () => {
  const HEIGHT = Dimensions.get("window").height;
  const WIDTH = Dimensions.get("window").width;

  return ({ insets }) => {
    const fullHeight =
      HEIGHT + (Platform.OS === "android" ? insets.top + insets.bottom : 0);
    const fullWidth = WIDTH;

    return {
      height: fullHeight,
      width: fullWidth,
    };
  };
};

export const layout = () => {
  const insets = useSafeAreaInsets();
  const layout = getLayout();

  return layout({ insets });
};
