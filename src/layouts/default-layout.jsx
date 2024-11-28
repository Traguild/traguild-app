import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import React from "react";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { layout } from "resources/theme/layout";

const Layout = ({ children }) => {
  const HEIGHT = layout().height;

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.header,
          height: HEIGHT * (0.1 + (Platform.OS === "ios" ? 0.02 : 0)),
        }}
      >
        <Text />
      </View>
      <View
        style={{
          ...styles.body,
          height: HEIGHT * (0.82 - (Platform.OS === "ios" ? 0.04 : 0)),
        }}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme["home-bg"],
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme["home-bg"],
  },
  body: {},
});

export default Layout;
