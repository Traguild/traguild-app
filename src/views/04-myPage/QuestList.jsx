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

// IMPORT COMPONENTS
import QuestListItem from "src/components/04-myPage/QuestListItem";

const dummyAllData = []; // 전체 데이터
const dummyMyRequests = []; // 내가 의뢰한 글 데이터
const dummyMyApplications = []; // 내가 신청한 글 데이터
const states = ["대기", "완료", "반려"];

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

  dummyAllData.push({
    request_idx: i,
    user_idx: i % 2 === 0 ? 1 : 2,
    request_title: `전체 의뢰 ${i}`,
    request_content: `내용 ${i}`,
    request_cost: "200,000",
    request_state: states[i % 3],
    created_time: formattedDate,
  });

  if (i % 2 === 0) {
    dummyMyRequests.push({
      request_idx: i,
      user_idx: 1,
      request_title: `내가 의뢰한 글 ${i}`,
      request_content: `내용 ${i}`,
      request_cost: "200,000",
      request_state: states[i % 3],
      created_time: formattedDate,
    });
  }

  if (i % 2 !== 0) {
    dummyMyApplications.push({
      request_idx: i,
      user_idx: 2,
      request_title: `내가 신청한 글 ${i}`,
      request_content: `내용 ${i}`,
      request_cost: "150,000", //구별 하기 위해 값 바꿈
      request_state: states[i % 3],
      created_time: formattedDate,
    });
  }
}

const QuestList = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerBackTitle: null,
      title: "의뢰 내역",
      headerTintColor: theme["default-btn"],
    });
  });

  const [mainFilter, setMainFilter] = useState("전체");
  const [subFilter, setSubFilter] = useState("전체");

  const filteredMainData =
    mainFilter === "전체"
      ? dummyAllData
      : mainFilter === "내가 의뢰한 글"
        ? dummyMyRequests
        : dummyMyApplications;

  const finalData =
    subFilter === "전체"
      ? filteredMainData
      : filteredMainData.filter((item) => item.request_state === subFilter);

  return (
    <View style={styles.container}>
      <View style={styles.mainFilterContainer}>
        {["전체", "내가 의뢰한 글", "내가 신청한 글"].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.mainFilterButton,
              mainFilter === filter && styles.activeMainFilterButton,
            ]}
            onPress={() => setMainFilter(filter)}
          >
            <Text
              style={
                mainFilter === filter
                  ? styles.focusedMainFilterText
                  : styles.mainFilterText
              }
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        style={{ width: "100%" }}
        data={finalData}
        renderItem={({ item }) => <QuestListItem item={item} />}
        keyExtractor={(item) => item.request_idx.toString()}
      />
    </View>
  );
};
/**<View style={styles.subFilterContainer}>
        {["전체", "대기", "완료", "반려"].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.subFilterButton,
              subFilter === filter && styles.activeSubFilterButton,
            ]}
            onPress={() => setSubFilter(filter)}
          >
            <Text style={styles.subFilterText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View> */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "white",
  },
  mainFilterButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  activeMainFilterButton: {
    backgroundColor: theme["filter-btn"],
  },
  mainFilterText: {
    color: "black",
    fontWeight: "500",
  },
  focusedMainFilterText: {
    color: "white",
    fontWeight: "800",
  },
  subFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
  },
  subFilterButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  activeSubFilterButton: {
    backgroundColor: theme["request-proceed"],
  },
  subFilterText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default QuestList;
