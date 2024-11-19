import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

// IMPORT RESOURCES
import { defaultImg } from "resources/img/defaultImg";
import { theme } from "resources/theme/common";
import { FontAwesome5, Ionicons } from "react-native-vector-icons";

const FavoriteItem = ({ item }) => {
  // 하트 상태 관리 (기본값은 true로 설정하여 채워진 하트 표시)
  const [isFavorite, setIsFavorite] = useState(true);

  // 하트 버튼 클릭 시 상태 변경 함수
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite); // 현재 상태 반전
    //현재 상태에 따라 db 업데이트 해야되나?
  };

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
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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

            <TouchableOpacity onPress={toggleFavorite}>
              <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={"red"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.regionBox}>
            <FontAwesome5 style={styles.region} name="map-marker-alt" size={24} color="black" />
            <Text style={styles.region}>
              &nbsp;{item.request_state_region}&nbsp;
            </Text>
            <Text style={styles.region}>
              {item.request_city_region}&nbsp;
            </Text>
            <Text style={styles.region}>
              {item.created_time}
            </Text>
          </View>

          <View style={styles.itemCostBox}>
            <Text style={styles.itemCost}>{item.request_cost} 원</Text>
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
    flex: 1, // 텍스트 영역이 충분히 늘어나도록 설정
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
    height: 30,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  itemCost: {
    fontSize: 18,
  },
});

export default FavoriteItem;