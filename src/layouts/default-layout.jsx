import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

// IMPORT RESOURCES
import { theme } from "../resources/theme/common";

const HEIGHT = Dimensions.get("window").height;

const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Header</Text>
      </View> 
      <View style={styles.body}>
        { children }
      </View> 
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: theme["home-bg"],
    },
    header: {
      height: HEIGHT * 0.15,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme["home-bg"],
    },
    body: {
      height: HEIGHT * 0.75,
    },
});


export default Layout;