import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

const Report = ({ navigation, route }) => {
  const req = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerBackTitle: null,
      title: "신고하기",
      headerStyle: { backgroundColor: theme["default-bg"] },
      headerTintColor: theme["default-btn"],
    });
  });

  return (
    <View style={styles.container}>
      <Text>Report</Text>
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
