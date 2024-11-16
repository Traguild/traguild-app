import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

const RequestDetail = ({ navigation, route }) => {
  const { item } = route.params;
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerBackTitle: "",
      title: item.request_title,
      headerStyle: { backgroundColor: theme["tab-active"] },
      headerTintColor: "white",
    });
  });

  return (
    <View style={styles.container}>
      <Text>{ item.request_content }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme["default-bg"],
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default RequestDetail