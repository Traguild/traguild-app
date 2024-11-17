import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'

// IMPORT RESOURCES
import { defaultImg } from "resources/img/defaultImg";
import { theme } from "resources/theme/common";

const RequestDetail = ({ navigation, route }) => {
  const { item } = route.params;
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerBackTitle: null,
      title: null,
      headerStyle: { backgroundColor: "transparent" },
      headerTransparent: true,
      // headerStyle: { backgroundColor: theme["tab-active"] },
      headerTintColor: theme["default-btn"],
    });
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image srouce={item.request_img ? null : defaultImg.logo } />
      <Text>{ item.request_content }</Text>
    </ScrollView>
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