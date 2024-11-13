import { View, Text } from 'react-native'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>

      </View> 
      <View style={styles.body}>
        { children }
      </View> 
      <View style={styles.footer}>

      </View> 
    </View>
  )
}

const styles = const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: "#fff",
    },
    header: {
      flex: 2,
      justifyContent: "center",
      alignItems: "center",
      backgroundcolor: "#fff",
    },
    body: {
      flex: 6,
      padding: 16,
    },
    footer: {
      flex: 2,
      justifyContent: "center",
      alignItems: "center",
      backgroundcolor: "#fff",
    },
});


export default Layout
