import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

// IMPORT RESOURCES
import { defaultImg } from "resources/img/defaultImg";
import { theme } from "resources/theme/common";
import { FontAwesome5 } from "@expo/vector-icons";
import { getTitle, getCost } from "resources/js/common";

const QuestListItem = ({ item }) => {
  const movDetail = () => {
    if (navGo) {
      navGo.to("RequestDetail", { item });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.listItem}
        activeOpacity={0.5}
        onPress={movDetail}
      >
        <Image
          source={
            item?.request_img ? { uri: item.request_img } : defaultImg.logo
          }
          style={styles.itemImg}
        />
        <View style={styles.itemText}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.itemTitle}>
              {getTitle(item.request_title, 14)}
            </Text>
            <View
              style={{
                ...styles.itemStateBox,
                backgroundColor:
                  item.request_state === "모집"
                    ? theme["request-proceed"]
                    : theme["request-done"],
              }}
            >
              <Text style={styles.itemState}>
                {item?.request_state ?? "없음"}
              </Text>
            </View>
          </View>

          <View style={styles.regionBox}>
            <FontAwesome5
              style={styles.region}
              name="map-marker-alt"
              size={20}
              color="black"
            />
            <Text style={styles.region}>
              {item.request_region ?? "지역 없음"}
            </Text>
          </View>

          <View style={styles.dateBox}>
            <Text style={styles.dateText}>
              {new Date(item.created_date).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }) ?? ""}
            </Text>
          </View>

          <View style={styles.itemCostBox}>
            <Text style={styles.itemCost}>
              {`${getCost(item.request_cost)} 원`}
            </Text>
          </View>
        </View>
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
    flexDirection: "row",
    paddingVertical: 13,
    position: "relative",
  },
  itemImg: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 15,
  },
  itemText: {
    flexDirection: "column",
    flex: 1,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "600",
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
  regionBox: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 5,
  },
  region: {
    fontSize: 13,
    marginLeft: 5,
  },
  dateBox: {
    marginBottom: 5,
  },
  dateText: {
    fontSize: 12,
    color: "#999",
  },
  itemCostBox: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  itemCost: {
    fontSize: 16,
  },
});

export default QuestListItem;
