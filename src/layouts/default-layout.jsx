import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import React from "react";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

const HEIGHT = Dimensions.get("window").height;

const Layout = ({ children }) => {
  const insets = useSafeAreaInsets();
  const fullHeight = HEIGHT + (Platform.OS === "android" ? insets.top + 3 : 0);

  return (
    <View style={styles.container}>
      <View style={{ ...styles.header, height: fullHeight * 0.1 }}>
        <Text>Header</Text>
      </View>
      <View style={{ height: fullHeight * 0.815 }}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme["home-bg"],
  },
  header: {
    // height: HEIGHT * 0.15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme["home-bg"],
  },
  body: {
    // height: Platform.OS === "android" ? HEIGHT * 0.78 : HEIGHT * 0.75,
    height: HEIGHT * 0.75,
  },
});

export default Layout;
