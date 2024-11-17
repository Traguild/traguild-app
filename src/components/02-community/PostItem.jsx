import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

const PostItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.listItem} activeOpacity={0.8}>
        <View style={styles.itemText}>
          <Text style={styles.itemTitle}>{item.post_name}</Text>
          <Text style={styles.itemPreContent}>
            {item.post_detail.substr(0, 35) +
              (item.post_detail.length > 35 ? " ···" : "")}
          </Text>
        </View>
        {item.thumb_img ? (
          <Image source={item.thumb_img} style={styles.itemImg} />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",

    paddingHorizontal: 10,
  },

  listItem: {
    backgroundColor: theme["home-bg"],
    borderColor: theme["home-border"],
    borderTopWidth: 1,

    width: "100%",
    height: 80,

    paddingVertical: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemImg: {
    width: 60,
    height: 60,

    borderRadius: 15,
  },
  itemText: {
    flexDirection: "column",
  },
  itemTitle: {
    marginRight: 20,

    fontSize: 20,
    fontWeight: "500",
  },
  itemPreContent: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default PostItem;
