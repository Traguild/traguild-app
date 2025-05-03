import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

import { theme } from "resources/theme/common";

const RequestComment = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerBackTitle: null,
      title: null,
      headerStyle: { backgroundColor: "transparent" },
      headerTransparent: true,
      headerTintColor: theme["default-btn"],
    });
  }, []);

  return (
    <View style={[styles.container]}>
      <Text>RequestComment</Text>
    </View>
  );
};

export default RequestComment;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
