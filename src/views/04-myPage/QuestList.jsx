import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { FontAwesome5 } from "@expo/vector-icons";

// IMPORT LAYOUTS

// IMPORT COMPONENTS
import QuestListItem from "src/components/04-myPage/QuestListItem";

const dummyData = []; //내가 지원한 더미
const dummyData2 = []; //내가 모집중인 더미
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
    request_state2: i % 3 === 0 ? "대기" : i % 3 === 1 ? "반려" : "완료",
    transaction_state: "대기중",
    // "created_time": Date.now(),
    // "updated_time": Date.now(),
    created_time: formattedDate,
    updated_time: formattedDate,
    is_deleted: 0,
    applicant_idx: i + 1,
    view_option: i % 2 == 0 ? "mine" : "yours",
  });
}

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

  dummyData2.push({
    request_idx: i,
    user_idx: 1,
    request_state_region: "경상남도",
    request_city_region: "창원시",
    request_title: `테스트 ${i}`,
    request_content: `테스트 ${i} 내용`,
    request_cost: "200,000",
    request_state: i % 2 == 0 ? "완료" : "모집 중",
    request_state2: i % 3 === 0 ? "대기" : i % 3 === 1 ? "반려" : "완료",
    transaction_state: "대기중",
    created_time: formattedDate,
    updated_time: formattedDate,
    is_deleted: 0,
    applicant_idx: i + 1,
    view_option: i % 2 == 0 ? "mine" : "yours",
  });
}

const QuestList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={dummyData}
        renderItem={({ item }) => <QuestListItem item={item} />}
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
  },

  floatingButton: {
    backgroundColor: theme["btn-floating"],

    position: "absolute",
    bottom: 25,
    right: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
});

export default QuestList;
