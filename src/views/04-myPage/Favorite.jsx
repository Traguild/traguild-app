import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { FontAwesome5 } from "@expo/vector-icons";

// IMPORT COMPONENTS
import FavoriteItem from "components/04-myPage/FavoriteItem";

const dummyData = [];

for (let i = 1; i <= 20; i++) {
  const formattedDate = new Date(Date.now())
    .toLocaleDateString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    })
    .slice(0, -1)
    .replace(/\./g, "-")
    .trim();

  dummyData.push({
    request_idx: i,
    user_idx: 1,
    request_state_region: "경상남도",
    request_city_region: "창원시",
    request_title: `테스트 ${i}`,
    request_content: `테스트 ${i} 내용`,
    request_cost: "200,000",
    request_state: i % 2 == 0 ? "완료" : "모집 중",
    transaction_state: "대기중",
    // "created_time": Date.now(),
    // "updated_time": Date.now(),
    created_time: formattedDate,
    updated_time: formattedDate,
    is_deleted: 0,
    applicant_idx: i + 1,
    // "favoriteItem": (i % 2 == 0 ? "찜" : "찜해제"),
  });
}

const Favorite = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerBackTitle: null,
      title: "찜한 의뢰",
      headerTintColor: theme["default-btn"],
    });
  });

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%", height: "100%" }}
        data={dummyData}
        renderItem={({ item }) => <FavoriteItem item={item} />}
        keyExtractor={(item) => item.request_idx.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
});

export default Favorite;
