import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

const RequestItem = ({ item }) => {
  const Logo = require("resources/img/icon.png");

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.listItem} activeOpacity={0.8}>
        <Image
          source={item.thumb_img ? item.thumb_img : Logo}
          style={styles.itemImg}
        />
        <View style={styles.itemText}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.itemTitle}>{item.request_title}</Text>

            <View
              style={{
                ...styles.itemStateBox,
                backgroundColor:
                  item.request_state === "완료"
                    ? theme["request-done"]
                    : theme["request-proceed"],
              }}
            >
              <Text style={styles.itemState}>{item.request_state}</Text>
            </View>
          </View>

          <View style={styles.itemCostBox}>
            <Text style={styles.itemCost}>{item.request_cost} 원</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  listItem: {
    backgroundColor: theme["home-bg"],
    borderColor: theme["home-border"],
    borderTopWidth: 1,

    width: "100%",
    padding: 10,
    flexDirection: "row",
  },
  itemImg: {
    width: 100,
    height: 100,
    marginRight: 10,

    borderRadius: 15,
  },
  itemText: {
    flexDirection: "column",
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: "800",
  },
  itemStateBox: {
    width: 60,
    borderRadius: 15,
    padding: 3,

    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
  },
  itemState: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  itemCostBox: {
    height: 60,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  itemCost: {
    fontSize: 18,
  },
});

export default RequestItem