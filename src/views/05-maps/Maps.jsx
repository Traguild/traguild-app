import { StyleSheet, Text, View } from "react-native";
import React from "react";

// IMPORT LAYOUTS
import defaultLayout from "layouts/hoc/defaultLayout";

const Maps = () => {
  return (
    <View style={styles.container}>
      <Text>Maps</Text>
    </View>
  );
};

export default defaultLayout(Maps);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
