import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

// IMPORT RESOURCES
import { theme } from "../../resources/theme/common";

const RequestItem = ({ item }) => {
  const Logo = require("../../../assets/icon.png");

  return (
    <View style={styles.container}>
      <TouchableOpacity style={ styles.listItem } activeOpacity={0.8}>
        <Image 
          source={item.thumb_img ? item.thumb_img : Logo}
          style={ styles.itemImg } />
        <Text style={ styles.itemTitle }>{ item.post_name }</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    width: "100%",
  },

  listItem: {
    backgroundColor: theme['home-bg'],
    borderColor: theme['home-border'],
    borderTopWidth: 1,

    width: "100%",
    padding: 10,
    flexDirection: "row",
  },
  itemImg: {
    width: 100,
    height: 100,
    marginRight: 20,
    
    borderRadius: 15,
  },
  itemTitle: {
    marginTop: 5,

    fontSize: 18,
    fontWeight: "500",
  },
});

export default RequestItem