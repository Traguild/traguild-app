import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

// IMPORT RESOURCES
import { defaultImg } from "resources/img/defaultImg";
import { theme } from "resources/theme/common";
import { FontAwesome5 } from "react-native-vector-icons";
import { getTitle, getCost } from "resources/js/common";

const RequestItem = ({ item }) => {
  const movDetail = () => navGo.to("RequestDetail", { item });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.listItem}
        activeOpacity={0.5}
        onPress={movDetail}
      >
        <Image
          source={item.request_img ? item.request_img : defaultImg.logo}
          style={styles.itemImg}
        />
        <View style={styles.itemText}>
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
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.itemTitle}>
              {getTitle(item.request_title, 18)}
            </Text>
          </View>
          {/*지역 text*/}
          <View style={styles.regionBox}>
            <FontAwesome5
              style={styles.region}
              name="map-marker-alt"
              size={24}
              color="black"
            />
            <Text style={styles.region}>
              &nbsp;{item.request_state_region}&nbsp;
            </Text>
            <Text style={styles.region}>{item.request_city_region}&nbsp;</Text>
            <Text style={styles.region}>{item.created_time}</Text>
          </View>

          <View style={styles.itemCostBox}>
            <Text style={styles.itemCost}>{getCost(item.request_cost)} 원</Text>
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
    fontSize: 20,
    fontWeight: "600",
  },
  itemStateBox: {
    width: 60,
    borderRadius: 15,
    padding: 3,

    alignItems: "center",
    justifyContent: "center",
  },
  itemState: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  regionBox: {
    height: 30,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  region: {
    height: 30,
    fontSize: 13,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  itemCostBox: {
    flexDirection: "row",
  },
  itemCost: {
    fontSize: 16,
  },
});

export default RequestItem;
