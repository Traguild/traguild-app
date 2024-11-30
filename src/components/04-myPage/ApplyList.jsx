import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { theme } from "../../resources/theme/common";
import { getContents } from "../../resources/js/common";

const ApplyList = () => {
  const [applyList, setApplyList] = useState([]);
  useLayoutEffect(() => {
    const getApplyList = async () => {
      const user_idx = await AsyncStorage.getItem("user_idx");
      const res = await API.POST({
        url: "/requestApplicant/getApply",
        data: {
          user_idx,
          page: 1,
          limit: 10,
          status: "대기",
        },
      });

      setApplyList(res);
    };
    getApplyList();
  }, []);

  const proceedApply = async ({ request_idx, user_idx, applicant_state }) => {
    const res = await API.POST({
      url: "/requestApplicant/update",
      data: { request_idx, user_idx, applicant_state },
    });

    if (res) {
      if (applicant_state === "승인") {
        API.POST({
          url: "/requestApplicant/rejectAll",
          data: { request_idx },
        });
        API.POST({
          url: "/requestInfo/update",
          data: {
            request_idx,
            request_state: "완료",
            applicant_idx: user_idx,
          },
        });
      }

      setApplyList((prev) =>
        prev.filter(
          (item) =>
            item.request_idx !== request_idx && item.user_idx !== user_idx
        )
      );
    }
  };

  const handleApply = (item) => {
    Alert.alert(
      `${item.request_title}`,
      `지원자 ${item.user_nickname}님을 ${item.applicant_state}하시겠습니까?`,
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "계속하기",
          onPress: () => {
            proceedApply(item);
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View key={item.request_idx} style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={styles.title}>의뢰: {item.request_title}</Text>
        <View style={styles.subtitleRow}>
          <Text style={styles.subtitle}>
            {item?.user_nickname ?? "알 수 없음"}
          </Text>
        </View>
        <Text style={styles.applyIntro}>
          {getContents(item.applicant_intro, 25)}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.approveButton]}
          onPress={() => handleApply({ ...item, applicant_state: "승인" })}
        >
          <Text style={styles.buttonText}>승인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.rejectButton]}
          onPress={() => handleApply({ ...item, applicant_state: "반려" })}
        >
          <Text style={{ ...styles.buttonText, color: "#ff7f51" }}>반려</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      style={{ width: "100%" }}
      data={applyList}
      renderItem={renderItem}
      keyExtractor={(item) => item.request_idx.toString()}
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <Text
          style={{
            alignSelf: "center",
            color: "gray",
            marginTop: 20,
          }}
        >
          지원자가 없습니다.
        </Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  itemContainer: {
    backgroundColor: theme["home-bg"],
    padding: 15,
    marginBottom: 10,
    borderBottomWidth: 0.45,
    borderColor: theme["default-border"],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemContent: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  subtitleRow: {
    flexDirection: "row",
    marginTop: 5,
  },
  subtitle: {
    fontSize: 15,
  },
  applyIntro: {
    color: "gray",
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  approveButton: {
    backgroundColor: "#6a994e",
  },
  rejectButton: {
    borderWidth: 1,
    borderColor: "#ff7f51",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 15,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: theme["default-btn"],
  },
});

export default ApplyList;
