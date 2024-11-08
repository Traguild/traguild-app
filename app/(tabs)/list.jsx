import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default list = () => {
  return (
    <View style={styles.listView}>
      <Link href="/list/1">News One</Link>
      <Link href="/list/2">News Two</Link>
      <Link href="/list/3">News Three</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  listView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});