import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// IMPORT LAYOUTS
import defaultLayout from "layouts/hoc/defaultLayout";

const MyPage = () => {
  return (
    <View style={styles.container}>
      <Text>MyPage</Text>
    </View>
  )
}

export default defaultLayout(MyPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
})