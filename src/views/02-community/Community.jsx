import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// IMPORT LAYOUTS
import defaultLayout from "../../layouts/hoc/defaultLayout";

const Community = () => {
  return (
    <View style={styles.container}>
      <Text>Community</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
});

export default defaultLayout(Community);